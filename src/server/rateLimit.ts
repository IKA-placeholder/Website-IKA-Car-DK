// Rate limiting utility for API endpoints
// Blocks IPs that make more than 50 requests per minute for 1 hour

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  blockedUntil?: number;
}

// In-memory store for rate limiting (in production, use Redis)
const rateLimitStore = new Map<string, RateLimitEntry>();

const MAX_REQUESTS_PER_MINUTE = 50;
const BLOCK_DURATION_MS = 60 * 60 * 1000; // 1 hour in milliseconds
const WINDOW_MS = 60 * 1000; // 1 minute in milliseconds

/**
 * Clean up old entries periodically to prevent memory leaks
 */
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    // Remove entries that are no longer blocked and window has passed
    if (!entry.blockedUntil && now - entry.firstRequest > WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
    // Remove expired blocks
    if (entry.blockedUntil && now > entry.blockedUntil) {
      rateLimitStore.delete(ip);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes

/**
 * Check if an IP is rate limited
 * @param ip - The IP address to check
 * @param customLimit - Optional custom limit (default: 50)
 * @returns Object with allowed status and optional message
 */
export function checkRateLimit(ip: string, customLimit?: number): { allowed: boolean; message?: string; remaining?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  const limit = customLimit || MAX_REQUESTS_PER_MINUTE;

  // If IP is blocked, check if block has expired
  if (entry?.blockedUntil) {
    if (now < entry.blockedUntil) {
      const minutesLeft = Math.ceil((entry.blockedUntil - now) / 60000);
      return {
        allowed: false,
        message: `For mange anmodninger. Din IP er blokeret i ${minutesLeft} minutter.`,
      };
    }
    // Block expired, remove entry
    rateLimitStore.delete(ip);
  }

  // If no entry or window has passed, create new entry
  if (!entry || now - entry.firstRequest > WINDOW_MS) {
    rateLimitStore.set(ip, {
      count: 1,
      firstRequest: now,
    });
    return {
      allowed: true,
      remaining: limit - 1,
    };
  }

  // Increment request count
  entry.count++;

  // Check if limit exceeded
  if (entry.count > limit) {
    entry.blockedUntil = now + BLOCK_DURATION_MS;
    return {
      allowed: false,
      message: `For mange anmodninger. Du har overskredet grænsen på ${limit} anmodninger pr. minut. Din IP er blokeret i 1 time.`,
    };
  }

  return {
    allowed: true,
    remaining: limit - entry.count,
  };
}

/**
 * Get client IP from request headers
 * Handles various proxy setups
 */
export function getClientIP(headers: Headers): string {
  // Try X-Forwarded-For first (common for proxies)
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim();
  }
  
  // Try X-Real-IP
  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  // Fallback to a default (in production, you'd want better handling)
  return 'unknown';
}

/**
 * Middleware function to apply rate limiting
 * Usage: wrap your handler with this
 */
export function withRateLimit<T extends (...args: any[]) => any>(
  handler: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>) => {
    // Try to extract headers from context or args
    // This is a simplified version - adjust based on your framework
    const context = args[0] as any;
    const headers = context?.headers || new Headers();
    const ip = getClientIP(headers);
    
    const result = checkRateLimit(ip);
    
    if (!result.allowed) {
      throw new Error(result.message);
    }
    
    return handler(...args);
  };
}
