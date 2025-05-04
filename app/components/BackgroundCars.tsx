'use client';
import { useEffect, useRef, useState } from 'react';

// Blue car SVG
const carSvg = (
  <g>
    <rect x="8" y="12" width="48" height="12" rx="6" fill="#2563eb" />
    <rect x="16" y="6" width="32" height="12" rx="6" fill="#3b82f6" />
    <circle cx="18" cy="26" r="4" fill="#1e293b" />
    <circle cx="46" cy="26" r="4" fill="#1e293b" />
    <rect x="24" y="10" width="8" height="6" rx="2" fill="#fff" />
    <rect x="32" y="10" width="8" height="6" rx="2" fill="#fff" />
  </g>
);

const MAX_CARS = 8;
const MIN_CARS = 6;
const TOTAL_CARS = 16; // Total cars in the pool

interface Car {
  id: number;
  size: number;
  x: number;
  y: number;
  speed: number;
  direction: number; // 1 for right, -1 for left
  active: boolean; // Whether car is currently on screen
  element: SVGSVGElement | null;
}

export default function BackgroundCars() {
  const carRefs = useRef<(SVGSVGElement | null)[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [visibleCars, setVisibleCars] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);
  
  // Initialize cars
  useEffect(() => {
    setMounted(true);
    
    // Create car pool with initial random states
    const initialCars: Car[] = Array.from({ length: TOTAL_CARS }).map((_, i) => {
      const size = 48 + Math.random() * 24; // Random size between 48-72
      const direction = Math.random() > 0.5 ? 1 : -1;
      const speed = (0.2 + Math.random() * (0.4 * 0.8)) / 3; // Top speed reduced by 20%
      
      // Start position - either off-screen left or right
      const x = direction > 0 ? -10 : 110;
      // Random vertical position, avoid very top and bottom
      const y = 10 + Math.random() * 80;
      
      // Initial cars - only activate MIN_CARS
      const active = i < MIN_CARS;
      
      return {
        id: i + 1,
        size,
        x,
        y,
        speed,
        direction,
        active,
        element: null
      };
    });
    
    setCars(initialCars);
    setVisibleCars(MIN_CARS);
    lastUpdateTime.current = performance.now();
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Update car positions and manage visible count
  useEffect(() => {
    if (!mounted || cars.length === 0) return;
    
    // Store references to DOM elements
    carRefs.current.forEach((ref, i) => {
      if (ref && cars[i]) {
        cars[i].element = ref;
      }
    });
    
    const animate = (timestamp: number) => {
      // Calculate delta time
      const deltaTime = timestamp - lastUpdateTime.current;
      lastUpdateTime.current = timestamp;
      const timeMultiplier = deltaTime / 16.67; // Normalize to ~60fps
      
      setCars(prevCars => {
        const newCars = [...prevCars];
        let currentlyVisible = 0;
        
        // First count how many active cars
        for (const car of newCars) {
          if (car.active) currentlyVisible++;
        }
        
        // Update positions for active cars
        for (let i = 0; i < newCars.length; i++) {
          const car = newCars[i];
          
          if (car.active) {
            // Update x position
            car.x += car.direction * car.speed * timeMultiplier;
            
            // Check if car went off-screen
            if ((car.direction > 0 && car.x > 110) || 
                (car.direction < 0 && car.x < -10)) {
              
              car.active = false;
              currentlyVisible--;
            }
            
            // Update visual
            if (car.element) {
              updateCarVisual(car);
            }
          }
        }
        
        // Do we need to add more cars?
        if (currentlyVisible < MIN_CARS) {
          const carsToAdd = MIN_CARS - currentlyVisible;
          let added = 0;
          
          // Find inactive cars to activate
          for (let i = 0; i < newCars.length && added < carsToAdd; i++) {
            const car = newCars[i];
            
            if (!car.active) {
              // Reset this car with new random values
              const direction = Math.random() > 0.5 ? 1 : -1;
              car.direction = direction;
              car.x = direction > 0 ? -10 : 110; // Start off-screen
              car.y = 10 + Math.random() * 80; // Random vertical position
              car.speed = (0.2 + Math.random() * (0.4 * 0.8)) / 3; // Top speed reduced by 20%
              car.active = true;
              
              added++;
              currentlyVisible++;
            }
          }
        }
        // Should we add a random car occasionally?
        else if (currentlyVisible < MAX_CARS && Math.random() < 0.01) {
          // Find an inactive car to activate
          for (let i = 0; i < newCars.length; i++) {
            const car = newCars[i];
            
            if (!car.active) {
              // Reset this car with new random values
              const direction = Math.random() > 0.5 ? 1 : -1;
              car.direction = direction;
              car.x = direction > 0 ? -10 : 110; // Start off-screen
              car.y = 10 + Math.random() * 80; // Random vertical position
              car.speed = (0.2 + Math.random() * (0.4 * 0.8)) / 3; // Top speed reduced by 20%
              car.active = true;
              
              currentlyVisible++;
              break; // Only add one car at a time randomly
            }
          }
        }
        
        setVisibleCars(currentlyVisible);
        return newCars;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cars, mounted]);
  
  // Helper function to update car's visual appearance
  const updateCarVisual = (car: Car) => {
    if (!car.element) return;
    
    // Position the car
    car.element.style.left = `${car.x}%`;
    car.element.style.top = `${car.y}%`;
    
    // Flip the car if moving left
    const scaleX = car.direction < 0 ? -1 : 1;
    car.element.style.transform = `translate(-50%, -50%) scale(${scaleX}, 1)`;
  };

  if (!mounted) return null;

  return (
    <div className="pointer-events-none select-none absolute inset-0 z-0">
      {/* Animated cars */}
      {cars.map((car, i) => (
        <svg
          key={car.id}
          ref={el => { carRefs.current[i] = el; }}
          width={car.size}
          height={car.size * 0.5}
          style={{ 
            position: 'absolute',
            left: `${car.x}%`,
            top: `${car.y}%`,
            transformOrigin: 'center center',
            opacity: car.active ? '0.3' : '0',
            transition: 'opacity 0.3s'
          }}
          viewBox="0 0 64 32"
          fill="none"
        >
          {carSvg}
        </svg>
      ))}
    </div>
  );
} 