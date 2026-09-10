// Export all types
export * from './types';

// Export utilities
export { calculateDistance, calculateRoutDistance } from './utils';

// Export constants
export const PROBLEM_TYPES = ['VRP', 'CVRP'] as const;
export const DEFAULT_VEHICLE_CAPACITY = 16;
export const SCALE_FACTOR = 0.09; // pixels to km
