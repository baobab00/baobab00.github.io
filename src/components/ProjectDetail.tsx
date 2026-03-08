'use client';

import Link from 'next/link';
import type { Project } from '@/types';
import AnimatedSection from './AnimatedSection';

interface ProjectDetailProps {
  project: Project;
}

const numberBadgeStyle: Record<string, string> = {
  featured: 'bg-blue-50 text-blue-600',
  live: 'bg-emerald-50 text-emerald-600',
  opensource: 'bg-amber-50 text-amber-600',
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const badgeColor = numberBadgeStyle[project.projectType] || 'bg-zinc-100 text-zinc-600';

  return (
    <>
      {/* Detail Page Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-primary) 80%, transparent)', borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-heading text-sm sm:text-base font-bold tracking-tight transition-colors"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            HN.
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/#portfolio"
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              Portfolio
            </Link>
          </div>
        </div>
      </header>

    <div className="max-w-3xl mx-auto px-6 pt-24 pb-12 sm:pt-28 sm:pb-16">
      {/* Back Navigation */}
      <AnimatedSection>
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-1.5 text-sm transition-colors mb-8 group"
          style={{ color: 'var(--text-faint)' }}
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Portfolio로 돌아가기
        </Link>
      </AnimatedSection>

      {/* ── 1. Project Overview ───────────────────────────── */}
      <AnimatedSection delay={0.05}>
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className={`badge badge-${project.projectType}`}>
              {project.projectType === 'featured' ? 'Featured' : project.projectType === 'live' ? 'Live Service' : 'Open Source'}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>{project.period}</span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--border-secondary)' }} />
            <span className="text-xs" style={{ color: 'var(--text-faint)' }}>
              {project.teamType === 'Team' ? '팀 프로젝트' : '개인 프로젝트'}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            {project.title}
          </h1>

          <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{project.subtitle}</p>

          <ul className="space-y-1.5">
            {project.overview.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--text-faint)' }} />
                {item}
              </li>
            ))}
          </ul>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mt-6">
            {project.techStack.map((tech) => (
              <span key={tech} className="text-xs px-2.5 py-1 rounded-md font-medium" style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }}>
                {tech}
              </span>
            ))}
          </div>
        </header>
      </AnimatedSection>

      {/* ── 2. Problem Definition ─────────────────────────── */}
      <AnimatedSection delay={0.1}>
        <section className="mb-12">
          <SectionHeader title="문제 정의" subtitle="Why this project?" />
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.problemDefinition}</p>
        </section>
      </AnimatedSection>

      {/* ── 3. Key Features ───────────────────────────────── */}
      <AnimatedSection delay={0.15}>
        <section className="mb-12">
          <SectionHeader title="핵심 기능" subtitle="Key Features" />
          <div className="space-y-4">
            {project.keyFeatures.map((feature, i) => (
              <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-primary)' }}>
                <div className="flex items-start gap-3">
                  <span className={`shrink-0 w-6 h-6 rounded-lg ${badgeColor} flex items-center justify-center text-xs font-bold mt-0.5`}>
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-[15px] font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>{feature.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* ── 4. Tech Decisions ─────────────────────────────── */}
      <AnimatedSection delay={0.2}>
        <section className="mb-12">
          <SectionHeader title="기술 선택 이유" subtitle="Tech Decisions" />
          <div className="space-y-4">
            {project.techDecisions.map((decision, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-px mt-1" style={{ backgroundColor: 'var(--border-secondary)' }} />
                <div>
                  <h4 className="text-[15px] font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                    <span className="inline-block px-2 py-0.5 text-xs font-mono rounded mr-2" style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }}>
                      {decision.tech}
                    </span>
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{decision.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* ── 5. Problem Solving ────────────────────────────── */}
      {project.problemSolving.length > 0 && (
        <AnimatedSection delay={0.25}>
          <section className="mb-12">
            <SectionHeader title="문제 해결 경험" subtitle="Problem Solving" />
            <div className="space-y-6">
              {project.problemSolving.map((ps, i) => (
                <div key={i} className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border-primary)' }}>
                  {/* Problem */}
                  <div className="px-3 sm:px-5 py-2 sm:py-3 border-b" style={{ backgroundColor: 'color-mix(in srgb, #ef4444 6%, var(--bg-card))', borderColor: 'var(--border-primary)' }}>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-red-700/80 uppercase tracking-wider mb-0.5">Problem</p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{ps.problem}</p>
                      </div>
                    </div>
                  </div>
                  {/* Approach */}
                  <div className="px-3 sm:px-5 py-2 sm:py-3 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-blue-700/80 uppercase tracking-wider mb-0.5">Approach</p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{ps.approach}</p>
                      </div>
                    </div>
                  </div>
                  {/* Result */}
                  <div className="px-3 sm:px-5 py-2 sm:py-3" style={{ backgroundColor: 'color-mix(in srgb, #10b981 6%, var(--bg-card))' }}>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-emerald-700/80 uppercase tracking-wider mb-0.5">Result</p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{ps.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* ── 6. Outcomes & Learnings ───────────────────────── */}
      <AnimatedSection delay={0.3}>
        <section className="mb-12">
          <SectionHeader title="성과 및 배운 점" subtitle="Outcomes" />
          <ul className="space-y-2">
            {project.outcomes.map((outcome, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {outcome}
              </li>
            ))}
          </ul>
        </section>
      </AnimatedSection>

      {/* ── 7. Links ──────────────────────────────────────── */}
      {project.links.length > 0 && (
        <AnimatedSection delay={0.35}>
          <section className="mb-12">
            <SectionHeader title="링크" subtitle="Links" />
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {project.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all group"
                  style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
                >
                  {link.label.toLowerCase().includes('github') ? (
                    <svg className="w-4 h-4 text-zinc-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  )}
                  {link.label}
                  <svg className="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Bottom navigation */}
      <AnimatedSection delay={0.4}>
        <div className="pt-8 border-t" style={{ borderColor: 'var(--border-primary)' }}>
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-1.5 text-sm transition-colors group"
            style={{ color: 'var(--text-faint)' }}
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            다른 프로젝트 보기
          </Link>
        </div>
      </AnimatedSection>
    </div>
    </>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h2 className="section-title">{title}</h2>
      <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-faint)' }}>{subtitle}</p>
    </div>
  );
}
