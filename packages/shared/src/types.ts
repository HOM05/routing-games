// ============================================
// ROUTING GAMES - SHARED TYPES
// ============================================

/**
 * Customer/Node in the routing problem
 */
export interface Customer {
  id: number;
  x: number;
  y: number;
  demand?: number; // For CVRP
  label?: string;
}

/**
 * Route solution
 */
export interface Route {
  vehicleId: number;
  customerIds: number[];
  distance: number;
  demand?: number; // For CVRP
}

/**
 * Solution to a routing problem
 */
export interface RoutingSolution {
  routes: Route[];
  totalDistance: number;
  vehiclesUsed: number;
  feasible: boolean;
  executionTimeMs: number;
}

/**
 * Challenge round data
 */
export interface ChallengeRound {
  id: string;
  roundNumber: number;
  problemType: 'VRP' | 'CVRP';
  depot: Customer;
  customers: Customer[];
  vehicleCapacity?: number;
  createdAt: Date;
}

/**
 * Player submission for a round
 */
export interface PlayerSubmission {
  playerId: string;
  playerName: string;
  roundId: string;
  solution: RoutingSolution;
  submittedAt: Date;
}

/**
 * Challenge result
 */
export interface ChallengeResult {
  roundId: string;
  humanSubmission?: PlayerSubmission;
  algorithmSolution?: RoutingSolution;
  winner: 'human' | 'algorithm' | 'tie';
  humanAdvantage: number; // percentage
  finalScores: {
    human: number;
    algorithm: number;
    ties: number;
  };
}

/**
 * Leaderboard entry
 */
export interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  wins: number;
  losses: number;
  ties: number;
  winRate: number;
  totalScore: number;
  lastUpdated: Date;
}

/**
 * WebSocket events
 */
export interface RoutingGameEvents {
  // Client -> Server
  'player:join': { playerId: string; playerName: string };
  'player:leave': { playerId: string };
  'round:request': { playerId: string };
  'solution:submit': { playerId: string; solution: RoutingSolution };
  'algorithm:request': { roundId: string };

  // Server -> Client
  'round:created': ChallengeRound;
  'algorithm:solved': RoutingSolution;
  'result:computed': ChallengeResult;
  'leaderboard:updated': LeaderboardEntry[];
  'error': { message: string };
}
