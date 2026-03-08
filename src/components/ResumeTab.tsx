'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { personal, focus, coreValues, skills, featuredProjects, education, awards, otherExperience } from '@/data/resume';
import AnimatedSection from './AnimatedSection';
import TypewriterText from './FlipText';
import Modal from './Modal';

export default function ResumeTab() {
  const [showAwardModal, setShowAwardModal] = useState(false);
  const [activeFocusIdx, setActiveFocusIdx] = useState<number | null>(null);

  const toggleFocus = (idx: number) => {
    setActiveFocusIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
      {/* ── Hero / Personal Info ─────────────────────────── */}
      <AnimatedSection>
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Dark mode spotlight glow */}
            <div className="profile-glow" />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden profile-soft-edge">
              <Image
                src="/images/profile.png"
                alt="박해남 프로필"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-2">
          {/* Name: Korean + English on one line */}
          <h1
            className="text-3xl sm:text-4xl font-extrabold tracking-tight inline-flex items-baseline gap-3 justify-center flex-wrap"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            {personal.name}
            <span className="text-xl sm:text-2xl font-medium" style={{ color: 'var(--text-faint)' }}>{personal.nameEn}</span>
          </h1>

          {/* Title area: left = role titles, right = hashtags */}
          <div className="flex flex-col sm:flex-row items-center justify-center mt-5 sm:mt-4 gap-5 sm:gap-10">
            {/* Left: stacked role text */}
            <div className="flex flex-col items-center gap-1 sm:gap-0.5">
              <div className="h-7 sm:h-8 flex items-center">
                <TypewriterText
                  words={['BACKEND', 'FULLSTACK']}
                  typeSpeed={100}
                  eraseSpeed={50}
                  holdTime={5000}
                  className="text-lg sm:text-xl font-bold tracking-[0.2em]"
                  style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
                />
              </div>
              <span
                className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase"
                style={{ color: 'var(--text-muted)' }}
              >
                DEVELOPER
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-10 self-center" style={{ background: 'var(--border-secondary)' }} />

            {/* Right: Focus hashtags — horizontal row */}
            <div className="flex flex-row flex-wrap gap-1.5 items-center justify-center sm:justify-start">
              {focus.map((f, idx) => (
                <button
                  key={f.title}
                  onClick={() => toggleFocus(idx)}
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full transition-all cursor-pointer group flex items-center gap-1 ${
                    activeFocusIdx === idx
                      ? 'text-white'
                      : 'hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: activeFocusIdx === idx ? 'var(--accent)' : 'var(--bg-muted)',
                    color: activeFocusIdx === idx ? '#fff' : 'var(--text-muted)',
                  }}
                >
                  #{f.title.replace(/\s+/g, '_')}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${activeFocusIdx === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Focus Area Expandable Content */}
        <AnimatePresence mode="wait">
          {activeFocusIdx !== null && (
            <motion.div
              key={activeFocusIdx}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="rounded-xl px-5 py-4 max-w-2xl mx-auto" style={{ backgroundColor: 'var(--bg-muted)', border: '1px solid var(--border-primary)' }}>
                <h3 className="text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                  {focus[activeFocusIdx].title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {focus[activeFocusIdx].description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Row */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6 flex-wrap text-sm" style={{ color: 'var(--text-secondary)' }}>
          <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {personal.email}
          </a>
          <span className="hidden sm:inline" style={{ color: 'var(--border-secondary)' }}>|</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {personal.phone}
          </span>
        </div>
      </AnimatedSection>

      <div className="mt-12 space-y-0">
        {/* ── Core Values ────────────────────────────────── */}
        <AnimatedSection className="resume-section" delay={0.1}>
          <h2 className="section-title mb-5">About</h2>
          <div className="space-y-5">
            {coreValues.map((v, i) => (
              <div key={i} className="flex gap-4 sm:gap-6 items-start">
                <div className="shrink-0 w-0.5 self-stretch rounded-full mt-0.5" style={{ backgroundColor: 'var(--about-accent-bar)' }} />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold mb-1.5 leading-snug" style={{ color: 'var(--text-primary)' }}>{v.title}</h3>
                  <div className="space-y-1">
                    {v.description.map((line, j) => (
                      <p key={j} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Tech Stack ─────────────────────────────────── */}
        <AnimatedSection className="resume-section" delay={0.15}>
          <h2 className="section-title mb-5">Tech Stack</h2>
          <div className="space-y-4">
            {Object.entries(skills).map(([category, { items }], idx, arr) => {
              // Group: Languages alone, Backend+Frontend together, Database+Infra together
              const isGroupStart = idx === 1 || idx === 3; // Backend, Database
              const isGroupEnd = idx === 2 || idx === 4; // Frontend, Infra
              const isUngrouped = idx === 0; // Languages

              const content = (
                <div key={category} className={isUngrouped ? 'pb-4' : ''}  style={isUngrouped ? { borderBottom: '1px solid var(--border-primary)' } : {}}>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-secondary)' }}>{category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <img
                        key={item.name}
                        src={`https://img.shields.io/badge/${encodeURIComponent(item.name)}-${item.color}?style=for-the-badge&logo=${item.logo}&logoColor=${item.logoColor || 'white'}`}
                        alt={item.name}
                        className="h-[22px] sm:h-[25px]"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              );

              if (isGroupStart) {
                const nextEntry = Object.entries(skills)[idx + 1];
                return (
                  <div key={category} className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4" style={{ borderBottom: '1px solid var(--border-primary)' }}>
                    {content}
                    {nextEntry && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-secondary)' }}>{nextEntry[0]}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {nextEntry[1].items.map((item) => (
                            <img
                              key={item.name}
                              src={`https://img.shields.io/badge/${encodeURIComponent(item.name)}-${item.color}?style=for-the-badge&logo=${item.logo}&logoColor=${item.logoColor || 'white'}`}
                              alt={item.name}
                              className="h-[22px] sm:h-[25px]"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (isGroupEnd) return null; // Rendered inside group above

              return content;
            })}
          </div>
        </AnimatedSection>

        {/* ── Featured Projects ───────────────────────────── */}
        <AnimatedSection className="resume-section" delay={0.2}>
          <h2 className="section-title mb-5">Projects</h2>
          <div className="space-y-6">
            {featuredProjects.map((project, i) => (
              <AnimatedSection key={project.title} delay={0.1 * i}>
                <div className="group p-6 sm:p-7 rounded-xl border transition-all duration-300" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
                        <span className={`badge ${project.type === 'Team' ? 'badge-featured' : 'badge-live'}`}>
                          {project.type}
                        </span>
                        {project.isLive && (
                          <span className="flex items-center gap-1 badge badge-live">
                            <span className="live-dot" style={{ width: 6, height: 6 }} />
                            Live
                          </span>
                        )}
                      </div>
                      <p className="text-sm mt-2.5" style={{ color: 'var(--text-muted)' }}>{project.subtitle}</p>
                    </div>
                    <span className="text-xs font-mono shrink-0" style={{ color: 'var(--text-faint)' }}>{project.period}</span>
                  </div>

                  <ul className="space-y-2 mb-4 mt-4">
                    {project.highlights.map((h, j) => (
                      <li key={j} className="text-sm leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full" style={{ color: 'var(--text-secondary)' }}>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-3 text-xs">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      {project.linkLabel} →
                    </a>
                    <Link
                      href={`/projects/${project.detailId}`}
                      className="transition-colors"
                      style={{ color: 'var(--text-faint)' }}
                    >
                      상세 보기 →
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Education & Awards (2-column) ───────────────── */}
        <AnimatedSection className="resume-section" delay={0.25}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h2 className="section-title mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{edu.school}</h3>
                      <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{edu.major}</p>
                    </div>
                      <span className="text-xs font-mono shrink-0" style={{ color: 'var(--text-faint)' }}>{edu.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h2 className="section-title mb-4">Certificate & Award</h2>
              <div className="space-y-3">
                {awards.map((award, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {/* Award image thumbnail */}
                    <button
                      onClick={() => setShowAwardModal(true)}
                      className="shrink-0 w-16 h-16 rounded-lg border flex items-center justify-center hover:shadow-md transition-all cursor-pointer group"
                      style={{
                        background: 'linear-gradient(135deg, var(--accent-bg), color-mix(in srgb, var(--accent) 15%, transparent))',
                        borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
                        color: 'var(--accent)',
                      }}
                      aria-label="수상 상장 보기"
                    >
                      <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0" />
                      </svg>
                    </button>
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{award.title}</h3>
                      <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {award.org} · {award.date}
                      </p>
                      <p className="text-sm mt-0.5" style={{ color: 'var(--text-faint)' }}>프로젝트: {award.project}</p>
                      <button
                        onClick={() => setShowAwardModal(true)}
                        className="text-xs text-blue-500 hover:text-blue-600 mt-1 transition-colors"
                      >
                        상장 보기 →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Other Experience ────────────────────────────── */}
        <AnimatedSection className="resume-section" delay={0.3}>
          <h2 className="section-title mb-4">Other Experience</h2>
          <div className="space-y-2">
            {otherExperience.map((exp, i) => (
              <div key={i} className="flex items-start gap-4 text-sm">
                <span className="text-xs font-mono shrink-0 pt-0.5" style={{ color: 'var(--text-faint)' }}>{exp.period}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{exp.content}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* ── Award Image Modal ────────────────────────────── */}
      <Modal
        isOpen={showAwardModal}
        onClose={() => setShowAwardModal(false)}
        title="프로젝트 최우수상"
      >
        <div className="p-4 sm:p-6">
          <Image
            src="/images/award-certificate.png"
            alt="웹 풀 사이클 개발 데브코스 6기 프로젝트 최우수상"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </Modal>
    </div>
  );
}
