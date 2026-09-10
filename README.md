# 🎮 Routing Games

Interactive multiplayer platform for **Vehicle Routing Problem (VRP)** and **Capacitated VRP (CVRP)** competitions. Challenge algorithms with human strategy and compete on real-time leaderboards.

## 🎯 Features

- **Interactive Canvas**: Visual VRP problem representation with click-to-select customers
- **Real-time Multiplayer**: WebSocket-powered live competitions
- **Dual Algorithms**: 
  - **VRP Solver**: Nearest Neighbor + 2-Opt optimization
  - **CVRP Solver**: Clarke & Wright savings algorithm + 2-Opt
- **Live Leaderboards**: Track player performance across challenges
- **Educational**: Learn optimization techniques through gameplay
- **Responsive Design**: Mobile and desktop compatible

## 🏗️ Project Structure

```
routing-games/
├── packages/
│   ├── frontend/          # React + TypeScript web app
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── vite.config.ts
│   │   └── index.html
│   ├── backend/           # Node.js + Express server
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── .env.example
│   └── shared/            # TypeScript types & utilities
│       └── src/
│           ├── types.ts
│           └── utils.ts
├── docs/                  # Documentation
├── package.json           # Monorepo workspace config
└── tsconfig.json         # Shared TypeScript config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/HOM05/routing-games.git
cd routing-games

# Install dependencies (monorepo)
npm install

# Copy environment file
cp packages/backend/.env.example packages/backend/.env
```

### Development

```bash
# Start both frontend and backend in development mode
npm run dev

# Or run separately
npm run dev:frontend  # Runs on http://localhost:5173
npm run dev:backend   # Runs on http://localhost:3000
```

### Build

```bash
# Build all packages
npm run build

# Build specific package
npm run build:frontend
npm run build:backend
```

## 🎮 How to Play

1. **Enter your name** and join the game
2. **Receive a challenge round** with customers displayed on canvas
3. **Click customers in order** to create your route
4. **Submit your solution** and see how it compares to the algorithm
5. **Earn points** based on solution quality
6. **Climb the leaderboard** to become the ultimate routing champion

## 📊 Game Rules

### VRP Mode
- Visit all customers exactly once
- Return to depot
- Minimize total distance
- No vehicle capacity constraints

### CVRP Mode
- Visit all customers exactly once
- Respect vehicle capacity limits
- Use multiple vehicles if needed
- Minimize total distance

## 🔧 Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Socket.IO Client** - Real-time communication

### Backend
- **Express.js** - Web framework
- **Socket.IO** - WebSocket server
- **TypeScript** - Type safety
- **Node.js** - Runtime

### Shared
- **TypeScript** - Shared types and utilities

## 📝 API Documentation

### WebSocket Events

#### Client → Server
```typescript
// Player joins the game
emit('player:join', { playerId: string; playerName: string })

// Request new challenge round
emit('round:request', { playerId: string })

// Submit solution
emit('solution:submit', { playerId: string; solution: RoutingSolution })
```

#### Server → Client
```typescript
// Round created
on('round:created', (round: ChallengeRound) => {})

// Leaderboard updated
on('leaderboard:updated', (entries: LeaderboardEntry[]) => {})
```

## 🧪 Testing

```bash
npm run test
```

## 🚀 Deployment

### Vercel (Frontend)

```bash
npm install -g vercel
vercel --prod
```

### Deployment Checklist
- [ ] Set up environment variables
- [ ] Configure database (if not using in-memory)
- [ ] Set up WebSocket proxy (if needed)
- [ ] Test WebSocket connections in production

## 📚 Educational Background

This project implements fundamental concepts from:
- **Vehicle Routing Problems** (VRP / CVRP)
- **Optimization Algorithms**: 
  - Nearest Neighbor (NN)
  - Clarke & Wright Savings
  - 2-Opt local search
- **Game Theory**: Competitive learning through play

## 🎓 Learning Resources

- [Operations Research Online](https://www.or-tools.dev/)
- [Genetic Algorithms for TSP](https://en.wikipedia.org/wiki/Travelling_salesman_problem)
- [Graph Optimization](https://en.wikipedia.org/wiki/Graph_theory)

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💼 Author

**Holman** - Industrial Engineering PhD  
University: UTB (Universidad Tecnológica de Bolívar)

---

**Made with ❤️ for optimization enthusiasts and competitive gamers**
