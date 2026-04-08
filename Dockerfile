FROM oven/bun:latest
WORKDIR /app

# Copy package files first for better caching
COPY package.json bun.lockb* ./
RUN bun install

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Ensure static files are copied to output directory
RUN cp -r public/* .output/public/ 2>/dev/null || true

# expose the port
EXPOSE 4000

# set environment variables for Bun
ENV BUN_SERVER_HOST=0.0.0.0
ENV BUN_SERVER_PORT=4000
ENV HOST=0.0.0.0
ENV PORT=4000

# start the server
CMD ["bun", ".output/server/index.mjs"]
