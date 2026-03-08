'use client';

import { useEffect, useRef } from 'react';

interface CursorGlowProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const FADE_ZONE = 200;

export default function CursorGlow({ containerRef }: CursorGlowProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      // Distance from nearest container edge
      const edgeDist = Math.min(relX, relY, rect.width - relX, rect.height - relY);
      const edgeOpacity = Math.max(0, Math.min(1, edgeDist / FADE_ZONE));

      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        if (glowRef.current) {
          // Use viewport coordinates directly (fixed positioning)
          glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
          glowRef.current.style.opacity = String(edgeOpacity);
        }
      });
    };

    const onLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [containerRef]);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      style={{ opacity: 0 }}
      aria-hidden="true"
    />
  );
}
