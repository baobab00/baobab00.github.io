'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allProjects, getProjectsByType } from '@/data/projects';
import ProjectCard from './ProjectCard';
import AnimatedSection from './AnimatedSection';
import CursorGlow from './CursorGlow';
import DotGrid from './DotGrid';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'featured', label: 'Featured' },
  { key: 'live', label: 'Live Service' },
  { key: 'opensource', label: 'Open Source' },
] as const;

export default function PortfolioTab() {
  const [activeFilter, setActiveFilter] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = getProjectsByType(activeFilter);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      {/* Interactive background layers — full viewport */}
      <DotGrid containerRef={containerRef} />
      <CursorGlow containerRef={containerRef} />

      {/* Content (above background layers) */}
      <div className="relative max-w-5xl mx-auto px-6 py-12 sm:py-16" style={{ zIndex: 1 }}>
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-10">
            <h1
              className="text-3xl sm:text-4xl font-extrabold tracking-[0.05em] uppercase"
              style={{ fontFamily: 'var(--font-mono-nav)', color: 'var(--text-primary)' }}
            >
              Projects
            </h1>
            <p
              className="mt-2 text-sm sm:text-base tracking-[0.02em]"
              style={{ fontFamily: 'var(--font-mono-nav)', color: 'var(--text-muted)', wordSpacing: '-0.15em' }}
            >
              Defining problems, Solving them with technology
            </p>
          </div>
        </AnimatedSection>

        {/* Filter */}
        <AnimatedSection delay={0.1}>
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {filters.map((f) => {
              const count = f.key === 'all' ? allProjects.length : getProjectsByType(f.key).length;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200`}
                  style={{ color: activeFilter === f.key ? 'var(--text-primary)' : 'var(--text-faint)' }}
                >
                  {activeFilter === f.key && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-full shadow-sm"
                      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {f.label}
                    <span className="text-[10px] font-mono" style={{ color: activeFilter === f.key ? 'var(--text-faint)' : 'var(--text-faint)' }}>
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
