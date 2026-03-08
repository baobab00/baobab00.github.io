'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import ResumeTab from '@/components/ResumeTab';
import PortfolioTab from '@/components/PortfolioTab';

type Tab = 'resume' | 'portfolio';

const tabVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('resume');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Tab;
    if (hash === 'portfolio') setActiveTab('portfolio');
  }, []);

  useEffect(() => {
    window.history.replaceState(null, '', `#${activeTab}`);
  }, [activeTab]);

  return (
    <>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pt-16 sm:pt-20">
        <AnimatePresence mode="wait">
          {activeTab === 'resume' ? (
            <motion.div key="resume" variants={tabVariants} initial="initial" animate="animate" exit="exit">
              <ResumeTab />
            </motion.div>
          ) : (
            <motion.div key="portfolio" variants={tabVariants} initial="initial" animate="animate" exit="exit">
              <PortfolioTab />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <footer className="py-8 mt-12 sm:mt-20" style={{ borderTop: '1px solid var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
            © 2026 Haenam Park
          </p>
        </div>
      </footer>
    </>
  );
}
