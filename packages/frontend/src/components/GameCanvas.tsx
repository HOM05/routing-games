import { useRef, useEffect, useState } from 'react';
import { ChallengeRound } from 'routing-games-shared';
import './GameCanvas.css';

interface GameCanvasProps {
  round: ChallengeRound;
  playerId: string;
}

export default function GameCanvas({ round, playerId }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<number[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += 32) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw selected route
    if (selectedRoute.length > 0) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(round.depot.x, round.depot.y);

      selectedRoute.forEach((idx) => {
        const customer = round.customers[idx];
        ctx.lineTo(customer.x, customer.y);
      });

      ctx.lineTo(round.depot.x, round.depot.y);
      ctx.stroke();
    }

    // Draw depot
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(round.depot.x, round.depot.y, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#c89b3c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(round.depot.x, round.depot.y, 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('D', round.depot.x, round.depot.y);

    // Draw customers
    round.customers.forEach((customer, idx) => {
      const selected = selectedRoute.includes(idx);
      const order = selectedRoute.indexOf(idx) + 1;

      ctx.fillStyle = selected ? '#ef4444' : '#334155';
      ctx.beginPath();
      ctx.arc(customer.x, customer.y, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(customer.x, customer.y, 10, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#f1f5f9';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(customer.demand || customer.id), customer.x, customer.y);

      if (order > 0) {
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(String(order), customer.x, customer.y - 16);
      }
    });
  }, [round, selectedRoute]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    let closest = -1;
    let closestDist = Infinity;

    round.customers.forEach((customer, idx) => {
      const dist = Math.hypot(customer.x - x, customer.y - y);
      if (dist < 18 && dist < closestDist) {
        closestDist = dist;
        closest = idx;
      }
    });

    if (closest >= 0) {
      if (selectedRoute.includes(closest)) {
        setSelectedRoute(selectedRoute.filter((i) => i !== closest));
      } else {
        setSelectedRoute([...selectedRoute, closest]);
      }
    }
  };

  return (
    <div className="game-canvas-container">
      <canvas
        ref={canvasRef}
        width={800}
        height={560}
        onClick={handleCanvasClick}
        className="routing-canvas"
      />
      <div className="canvas-footer">
        <p>Click customers to create your route • Selected: {selectedRoute.length}</p>
      </div>
    </div>
  );
}
