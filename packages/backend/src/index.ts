import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import {
  ChallengeRound,
  PlayerSubmission,
  RoutingSolution,
  SCALE_FACTOR,
} from 'routing-games-shared';

// Load environment variables
dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const io = new IOServer(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Types
interface GameSession {
  id: string;
  players: Map<string, PlayerInfo>;
  currentRound: ChallengeRound | null;
}

interface PlayerInfo {
  id: string;
  name: string;
  socket: any;
  wins: number;
  losses: number;
  ties: number;
}

// In-memory storage (replace with database in production)
const sessions = new Map<string, GameSession>();
const players = new Map<string, PlayerInfo>();

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/leaderboard', (req: Request, res: Response) => {
  const leaderboard = Array.from(players.values())
    .map((p) => ({
      playerId: p.id,
      playerName: p.name,
      wins: p.wins,
      losses: p.losses,
      ties: p.ties,
      winRate: p.wins / Math.max(p.wins + p.losses, 1),
    }))
    .sort((a, b) => b.wins - a.wins)
    .slice(0, 100);

  res.json(leaderboard);
});

// WebSocket handlers
io.on('connection', (socket) => {
  console.log(`[WS] Client connected: ${socket.id}`);

  socket.on('player:join', ({ playerId, playerName }) => {
    const player: PlayerInfo = {
      id: playerId || uuidv4(),
      name: playerName || `Player-${socket.id.slice(0, 6)}`,
      socket,
      wins: 0,
      losses: 0,
      ties: 0,
    };

    players.set(player.id, player);
    socket.emit('player:joined', { playerId: player.id });
    io.emit('leaderboard:updated', getLeaderboard());

    console.log(`[WS] Player joined: ${player.name}`);
  });

  socket.on('round:request', ({ playerId }) => {
    const round = generateChallengeRound();
    socket.emit('round:created', round);
    console.log(`[WS] Round created for ${playerId}`);
  });

  socket.on('solution:submit', ({ playerId, solution }) => {
    const player = players.get(playerId);
    if (!player) return;

    socket.emit('solution:received', { success: true });
    console.log(`[WS] Solution received from ${player.name}`);
  });

  socket.on('disconnect', () => {
    console.log(`[WS] Client disconnected: ${socket.id}`);
  });
});

// Helper functions
function generateChallengeRound(): ChallengeRound {
  const depot = { id: 0, x: randomRange(70, 120), y: randomRange(240, 340) };
  const customers = [];

  for (let i = 0; i < 8; i++) {
    let point, tries = 0;
    do {
      point = {
        id: i + 1,
        x: randomRange(190, 740),
        y: randomRange(50, 510),
        demand: Math.floor(randomRange(2, 6)),
      };
      tries++;
    } while (
      customers.some(
        (c) => Math.hypot(c.x - point.x, c.y - point.y) < 55
      ) &&
      tries < 200
    );
    customers.push(point);
  }

  return {
    id: uuidv4(),
    roundNumber: 1,
    problemType: 'VRP',
    depot,
    customers,
    createdAt: new Date(),
  };
}

function getLeaderboard() {
  return Array.from(players.values())
    .map((p) => ({
      playerId: p.id,
      playerName: p.name,
      wins: p.wins,
      losses: p.losses,
      ties: p.ties,
      winRate: p.wins / Math.max(p.wins + p.losses, 1),
    }))
    .sort((a, b) => b.wins - a.wins);
}

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 WebSocket enabled for real-time gaming`);
});
