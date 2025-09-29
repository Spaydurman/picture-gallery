// ImageTrailHeart.tsx
import { useEffect, useRef, useState } from "react";

const images = [
  "/src/assets/images/us/171542217425696.jpg",
  "/src/assets/images/us/171542218141616.jpg",
  "/src/assets/images/us/1715422182297050.jpg",
  // ... your full list
];

interface TrailItem {
  id: number;
  x: number;
  y: number;
  src: string;
}

export default function ImageTrailHeart() {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [heartDetected, setHeartDetected] = useState(false);
  const positions = useRef<{ x: number; y: number }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Add trail
      const newTrail: TrailItem = {
        id: nextId.current++,
        x: clientX,
        y: clientY,
        src: images[imgIndex % images.length],
      };

      setTrail((prev) => [...prev.slice(-20), newTrail]);
      setImgIndex((prev) => prev + 1);

      // Save positions
      positions.current.push({ x: clientX, y: clientY });
      if (positions.current.length > 300) {
        positions.current.shift();
      }

      checkHeart();
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [imgIndex]);

  const checkHeart = () => {
    const pts = positions.current;
    if (pts.length < 100) return;

    // normalize drawn path into 0-1 box
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const normPts = pts.map((p) => ({
      x: (p.x - minX) / (maxX - minX || 1),
      y: 1 - (p.y - minY) / (maxY - minY || 1), // flip Y
    }));

    // generate ideal heart curve points
    const heart: { x: number; y: number }[] = [];
    for (let t = 0; t < Math.PI * 2; t += 0.1) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      heart.push({ x, y });
    }
    // normalize heart
    const hx = heart.map((p) => p.x);
    const hy = heart.map((p) => p.y);
    const minHX = Math.min(...hx);
    const maxHX = Math.max(...hx);
    const minHY = Math.min(...hy);
    const maxHY = Math.max(...hy);

    const normHeart = heart.map((p) => ({
      x: (p.x - minHX) / (maxHX - minHX || 1),
      y: (p.y - minHY) / (maxHY - minHY || 1),
    }));

    // compare drawn path to heart curve (sample 100 points)
    const step = Math.floor(normPts.length / 100);
    const sample = normPts.filter((_, i) => i % step === 0);

    let totalDist = 0;
    sample.forEach((p, i) => {
      const h = normHeart[i % normHeart.length];
      totalDist += Math.hypot(p.x - h.x, p.y - h.y);
    });
    const avgDist = totalDist / sample.length;

    if (avgDist < 0.1) {
      setHeartDetected(true);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {trail.map((item) => (
        <img
          key={item.id}
          src={item.src}
          className="absolute w-12 h-12 object-cover rounded-full pointer-events-none"
          style={{ left: item.x, top: item.y, transform: "translate(-50%, -50%)" }}
        />
      ))}

      {heartDetected && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-3xl text-red-500 font-bold">
          ❤️ Heart Detected!
        </div>
      )}
    </div>
  );
}
