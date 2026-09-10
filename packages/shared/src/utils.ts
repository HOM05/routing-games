import { Customer, SCALE_FACTOR } from './types';

/**
 * Calculate Euclidean distance between two points
 */
export function calculateDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

/**
 * Convert pixels to kilometers
 */
export function pixelsToKm(pixels: number): number {
  return pixels * SCALE_FACTOR;
}

/**
 * Calculate total distance of a route
 */
export function calculateRoutDistance(
  depot: Customer,
  customerSequence: Customer[]
): number {
  if (customerSequence.length === 0) return 0;

  let totalDistance = calculateDistance(depot, customerSequence[0]);

  for (let i = 0; i < customerSequence.length - 1; i++) {
    totalDistance += calculateDistance(
      customerSequence[i],
      customerSequence[i + 1]
    );
  }

  totalDistance += calculateDistance(
    customerSequence[customerSequence.length - 1],
    depot
  );

  return totalDistance;
}

/**
 * Validate if a route respects vehicle capacity
 */
export function validateCapacity(
  customers: Customer[],
  capacity: number
): boolean {
  const totalDemand = customers.reduce((sum, c) => sum + (c.demand || 0), 0);
  return totalDemand <= capacity;
}

/**
 * Format distance for display
 */
export function formatDistance(distanceKm: number): string {
  return `${distanceKm.toFixed(1)} km`;
}
