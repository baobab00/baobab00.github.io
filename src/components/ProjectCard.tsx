'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project, ProjectType } from '@/types';
import { useTextScramble } from '@/hooks/useTextScramble';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const typeConfig: Record<ProjectType, { badge: string; badgeClass: string; cardClass: string; icon: React.ReactNode }> = {
  featured: {
    badge: 'Featured',
    badgeClass: 'badge-featured',
    cardClass: 'card-featured',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
      </svg>
    ),
  },
  live: {
    badge: 'Live',
    badgeClass: 'badge-live',
    cardClass: 'card-live',
    icon: <span className="live-dot" />,
  },
  opensource: {
    badge: 'Open Source',
    badgeClass: 'badge-opensource',
    cardClass: 'card-opensource',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const config = typeConfig[project.projectType];
  const { display: scrambledTitle, scramble, reset: resetScramble } = useTextScramble({
    text: project.title,
    speed: 25,
  });

  // Detect touch device on mount to disable 3D tilt
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href={`/projects/${project.id}`} className="block group">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => { setIsHovered(true); scramble(); }}
          onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); resetScramble(); }}
          className={`card ${config.cardClass} p-6 transition-all duration-300 cursor-pointer relative overflow-hidden`}
          style={{
            transform: isHovered && !isTouchDevice
              ? `perspective(800px) rotateY(${mousePos.x * 2}deg) rotateX(${-mousePos.y * 2}deg) translateY(-2px)`
              : 'perspective(800px) rotateY(0) rotateX(0) translateY(0)',
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
          }}
        >
          {/* Subtle gradient overlay on hover */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none opacity-30 transition-opacity"
              style={{
                background: `radial-gradient(circle at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, ${
                  project.projectType === 'featured' ? 'rgba(37, 99, 235, 0.06)' :
                  project.projectType === 'live' ? 'rgba(16, 185, 129, 0.06)' :
                  'rgba(245, 158, 11, 0.06)'
                }, transparent 60%)`,
              }}
            />
          )}

          {/* Header */}
          <div className="flex items-start justify-between mb-3 relative">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className="text-base sm:text-lg font-bold transition-colors"
                  style={{ fontFamily: 'var(--font-card-title)', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                >
                  {scrambledTitle}
                </h3>
                <span className={`badge ${config.badgeClass} flex items-center gap-1`}>
                  {config.icon}
                  {config.badge}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.subtitle}</p>
            </div>
          </div>

          {/* Period & Team */}
          <div className="flex items-center gap-3 text-[11px] sm:text-xs mb-4" style={{ color: 'var(--text-faint)' }}>
            <span className="font-mono">{project.period}</span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--border-secondary)' }} />
            <span>{project.teamType === 'Team' ? '팀 프로젝트' : '개인 프로젝트'}</span>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 5).map((tech) => (
              <span key={tech} className="text-[11px] px-2 py-0.5 rounded-md font-medium" style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-muted)' }}>
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="text-[11px] px-2 py-0.5 rounded-md" style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-faint)' }}>
                +{project.techStack.length - 5}
              </span>
            )}
          </div>

          {/* Key highlights (compact) */}
          <ul className="space-y-1">
            {project.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="text-xs leading-relaxed pl-3 relative before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full" style={{ color: 'var(--text-muted)' }}>
                {h}
              </li>
            ))}
          </ul>

          {/* Arrow indicator */}
          <div className="flex justify-end mt-4">
            <span className="text-xs transition-colors flex items-center gap-1" style={{ color: 'var(--text-faint)' }}>
              자세히 보기
              <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
