'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type Tab = 'resume' | 'portfolio';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-primary) 80%, transparent)', borderColor: 'var(--border-primary)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Name */}
        <button
          onClick={() => onTabChange('resume')}
          className="font-heading text-sm sm:text-base font-bold tracking-tight transition-colors"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          HN.
        </button>

        {/* Center: Tab Navigation */}
        <nav className="flex items-center gap-1 rounded-full p-1 dark:ring-1 dark:ring-white/10" style={{ backgroundColor: 'var(--bg-muted)' }} role="tablist">
          {(['resume', 'portfolio'] as const).map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => onTabChange(tab)}
              className="relative px-3 sm:px-5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200"
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full shadow-sm"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className="relative z-10 text-[11px] sm:text-xs tracking-widest"
                style={{ fontFamily: 'var(--font-mono-nav)', color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)' }}
              >
                {tab === 'resume' ? 'RESUME' : 'PORTFOLIO'}
              </span>
            </button>
          ))}
        </nav>

        {/* Right: Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full transition-colors"
          style={{ color: 'var(--text-muted)' }}
          aria-label="테마 전환"
        >
          {mounted && (
            theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )
          )}
        </button>
      </div>
    </header>
  );
}
