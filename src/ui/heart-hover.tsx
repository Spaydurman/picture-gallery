// HeartHoverGesture.tsx
import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

export default function HeartHoverGesture() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [message, setMessage] = useState("Move your mouse in a ♥ shape without clicking");

  const pointsRef = useRef<Point[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    const clear = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#f9fafb";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawPoints = (pts: Point[]) => {
      clear();
      if (pts.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    clear();

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // record new point
      pointsRef.current.push({ x, y });
      drawPoints(pointsRef.current);

      // debounce analysis
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (pointsRef.current.length > 15) {
          if (looksLikeHeart(pointsRef.current)) {
            setMessage("❤️ Heart gesture detected!");
          } else {
            setMessage("❌ Not a heart, try again!");
          }
        }
        pointsRef.current = [];
        clear();
      }, 1500);
    };

    canvas.addEventListener("mousemove", handleMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        style={{ border: "2px solid #ddd", borderRadius: "8px", background: "#f9fafb" }}
      />
      <p>{message}</p>
    </div>
  );
}

// --- naive heart detection ---
function looksLikeHeart(points: Point[]): boolean {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const norm = points.map((p) => ({
    x: (p.x - minX) / (maxX - minX || 1),
    y: (p.y - minY) / (maxY - minY || 1),
  }));

  // aspect ratio check: hearts wider than tall
  const aspect = (maxX - minX) / (maxY - minY);
  if (aspect < 0.8 || aspect > 1.6) return false;

  // two bumps at top
  const top = norm.filter((p) => p.y < 0.5);
  const left = top.filter((p) => p.x < 0.5);
  const right = top.filter((p) => p.x > 0.5);

  if (left.length === 0 || right.length === 0) return false;
  const leftPeak = Math.min(...left.map((p) => p.y));
  const rightPeak = Math.min(...right.map((p) => p.y));
  if (leftPeak > 0.3 || rightPeak > 0.3) return false;

  // bottom point check
  const bottom = norm.reduce((a, b) => (b.y > a.y ? b : a));
  if (bottom.x < 0.4 || bottom.x > 0.6 || bottom.y < 0.9) return false;

  return true;
}
