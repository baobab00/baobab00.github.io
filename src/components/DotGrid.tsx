'use client';

import { useEffect, useRef } from 'react';

interface DotGridProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const DOT_GAP = 32;
const BASE_RADIUS = 1;
const MAX_RADIUS = 2.8;
const GLOW_RANGE = 140;

export default function DotGrid({ containerRef }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number>(0);
  const dpr = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Hide on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    dpr.current = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr.current;
      canvas.height = rect.height * dpr.current;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr.current, 0, 0, dpr.current, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    const isDark = () => document.documentElement.classList.contains('dark');

    const draw = () => {
      const w = canvas.width / dpr.current;
      const h = canvas.height / dpr.current;
      ctx.clearRect(0, 0, w, h);

      const dark = isDark();
      const baseColor = dark ? 'rgba(255,255,255,' : 'rgba(0,0,0,';
      const baseAlpha = dark ? 0.08 : 0.07;
      const glowAlpha = dark ? 0.4 : 0.25;
      const accentR = dark ? 96 : 37;
      const accentG = dark ? 165 : 99;
      const accentB = dark ? 250 : 235;

      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let x = DOT_GAP / 2; x < w; x += DOT_GAP) {
        for (let y = DOT_GAP / 2; y < h; y += DOT_GAP) {
          const dx = mx - x;
          const dy = my - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let radius = BASE_RADIUS;
          let alpha = baseAlpha;
          let color = `${baseColor}${alpha})`;

          if (!isTouch && dist < GLOW_RANGE) {
            const t = 1 - dist / GLOW_RANGE;
            const ease = t * t;
            radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * ease;
            alpha = baseAlpha + (glowAlpha - baseAlpha) * ease;
            color = `rgba(${accentR},${accentG},${accentB},${alpha})`;
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf.current);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
