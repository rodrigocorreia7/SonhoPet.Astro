'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';

interface PawPrint {
  id: number;
  x: number;
  y: number;
  angle: number;
  isLeft: boolean;
  scale: number;
}

export const PawTrail: React.FC = () => {
  const [paws, setPaws] = useState<PawPrint[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const isLeftRef = useRef<boolean>(true);
  const nextIdRef = useRef<number>(0);

  const removePaw = useCallback((id: number) => {
    setPaws((prev) => prev.filter((p) => p.id !== id));
  }, []);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      return;
    }

    const minDistance = 44; // Distance threshold between footprints

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      if (!lastPosRef.current) {
        lastPosRef.current = { x, y };
        return;
      }

      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance >= minDistance) {
        // Calculate angle of movement in degrees
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

        // Alternating lateral offset for natural walking gait
        const perpAngle = (angle + 90) * (Math.PI / 180);
        const lateralOffset = isLeftRef.current ? -9 : 9;
        const pawX = x + Math.cos(perpAngle) * lateralOffset;
        const pawY = y + Math.sin(perpAngle) * lateralOffset;

        const newId = nextIdRef.current++;
        const newPaw: PawPrint = {
          id: newId,
          x: pawX,
          y: pawY,
          angle: angle + (isLeftRef.current ? -6 : 6),
          isLeft: isLeftRef.current,
          scale: 0.8 + Math.random() * 0.2,
        };

        isLeftRef.current = !isLeftRef.current;
        lastPosRef.current = { x, y };

        setPaws((prev) => [...prev.slice(-16), newPaw]);

        setTimeout(() => {
          removePaw(newId);
        }, 1100);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [removePaw]);

  if (paws.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none" 
      aria-hidden="true"
    >
      {paws.map((paw) => (
        <div
          key={paw.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-paw-fade"
          style={{
            left: `${paw.x}px`,
            top: `${paw.y}px`,
            transform: `translate(-50%, -50%) rotate(${paw.angle}deg) scale(${paw.scale})`,
          }}
        >
          {/* Vector Paw Print in Warm Beige / Sand (#C59B6D) */}
          <svg
            width="20"
            height="18"
            viewBox="0 0 34 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_1px_2px_rgba(197,155,109,0.25)]"
          >
            {/* Main Pad */}
            <path
              d="M22.2 16.57C20.4 14.7 19.72 11 16 11C12.09 11 10.35 14.93 9.39 16.75C8.43 18.57 5 19.8 5 22.06C5 25.45 8.29 28.2 12.35 28.2C13.88 28.2 14.82 27.13 16.49 27.13C18.16 27.13 19.1 28.2 20.64 28.2C24.7 28.2 27.99 25.45 27.99 22.06C28 19.43 24 18.45 22.2 16.57Z"
              fill="#C59B6D"
            />
            {/* Toe 1 */}
            <path
              d="M7.35 8.49C8.69 11.22 9.01 15.73 7.13 16.65C5.25 17.57 1.91 14.54 0.57 11.8C-0.77 9.06 0.57 6.28 2.44 5.36C4.31 4.44 6.01 5.75 7.35 8.49Z"
              fill="#C59B6D"
            />
            {/* Toe 2 */}
            <path
              d="M15.5 3C16.22 6 15.58 10.43 13.56 10.93C11.54 11.43 8.89 7.71 8.17 4.76C7.45 1.81 8.91 0.69 10.93 0.19C12.95 -0.31 14.77 0 15.5 3Z"
              fill="#C59B6D"
            />
            {/* Toe 3 */}
            <path
              d="M26.45 6C25.38 8.85 22.32 12.18 20.36 11.45C18.4 10.72 18.45 6.19 19.52 3.34C20.59 0.49 23.51 0.4 25.46 1.14C27.41 1.88 27.53 3.1 26.45 6Z"
              fill="#C59B6D"
            />
            {/* Toe 4 */}
            <path
              d="M31.81 14.25C29.48 16.25 25.18 17.63 23.81 16.05C22.44 14.47 24.58 9.5 26.91 7.54C29.24 5.58 32.24 6.39 33.56 7.99C34.88 9.59 34.13 12.29 31.81 14.25Z"
              fill="#C59B6D"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
