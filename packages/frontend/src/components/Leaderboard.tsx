import { LeaderboardEntry } from 'routing-games-shared';
import './Leaderboard.css';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr key={entry.playerId}>
              <td className="rank">{idx + 1}</td>
              <td className="name">{entry.playerName.slice(0, 12)}</td>
              <td className="score">
                <span className="wins">{entry.wins}W</span>
                <span className="losses">{entry.losses}L</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {entries.length === 0 && (
        <p className="empty-state">No players yet</p>
      )}
    </div>
  );
}
