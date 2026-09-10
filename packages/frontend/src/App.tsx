import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ChallengeRound, LeaderboardEntry } from 'routing-games-shared';
import GameCanvas from './components/GameCanvas';
import Leaderboard from './components/Leaderboard';
import './App.css';

const socket = io();

export default function App() {
  const [playerId, setPlayerId] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [currentRound, setCurrentRound] = useState<ChallengeRound | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    socket.on('player:joined', ({ playerId: id }) => {
      setPlayerId(id);
      setGameStarted(true);
    });

    socket.on('round:created', (round) => {
      setCurrentRound(round);
    });

    socket.on('leaderboard:updated', (data) => {
      setLeaderboard(data);
    });

    return () => {
      socket.off('player:joined');
      socket.off('round:created');
      socket.off('leaderboard:updated');
    };
  }, []);

  const handleStartGame = () => {
    const name = playerName || `Player-${Math.random().toString(36).slice(2, 8)}`;
    setPlayerName(name);
    socket.emit('player:join', { playerName: name });
  };

  const handleNewRound = () => {
    socket.emit('round:request', { playerId });
  };

  if (!gameStarted) {
    return (
      <div className="app-container login-screen">
        <div className="login-card">
          <h1>🎮 Routing Games</h1>
          <p>Interactive Vehicle Routing Problem Challenges</p>
          <input
            type="text"
            placeholder="Enter your name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
          />
          <button onClick={handleStartGame}>Start Playing</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1>🎮 Routing Games</h1>
          <p className="subtitle">VRP Competition Platform</p>
        </div>
        <div className="header-right">
          <span className="player-info">
            Welcome, <strong>{playerName}</strong>
          </span>
          <button className="btn-primary" onClick={handleNewRound}>
            New Round
          </button>
        </div>
      </header>

      <main className="app-main">
        {currentRound ? (
          <div className="game-layout">
            <div className="game-area">
              <GameCanvas round={currentRound} playerId={playerId} />
            </div>
            <aside className="sidebar">
              <Leaderboard entries={leaderboard.slice(0, 10)} />
            </aside>
          </div>
        ) : (
          <div className="loading-screen">
            <div className="spinner"></div>
            <p>Loading game...</p>
          </div>
        )}
      </main>
    </div>
  );
}
