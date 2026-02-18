import { useState } from 'react';
import resumeData from '../data/resumeData';

function ProjectCard({ project }) {
  return (
    <article className="reveal group relative rounded-2xl border border-slate-100 bg-white overflow-hidden hover:border-primary-200 hover:shadow-xl hover:shadow-primary-600/5 transition-all duration-300">
      <div className="p-8 md:p-10">
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-2.5 py-0.5 text-xs font-bold rounded-md uppercase tracking-wide ${
              project.type === 'Team'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-emerald-50 text-emerald-600'
            }`}
          >
            {project.type}
          </span>
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-bold rounded-md tracking-wide bg-violet-50 text-violet-600"
            >
              {tag}
            </span>
          ))}
          <span className="text-sm text-slate-400">{project.period}</span>
        </div>

        {/* Title & subtitle */}
        <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-base text-slate-500 mb-6">{project.subtitle}</p>

        {/* Highlights */}
        <ul className="space-y-3 mb-8">
          {project.highlights.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Link */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            project.isLive
              ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm shadow-primary-600/25'
              : 'text-primary-600 border border-primary-200 hover:bg-primary-50'
          }`}
        >
          {project.linkLabel}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>

      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  );
}

export default function Projects() {
  const { projects, moreProjects } = resumeData;
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 reveal">
          <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-2">Portfolio</p>
          <h2 className="text-3xl font-bold text-slate-900">Projects</h2>
        </div>

        {/* Main projects */}
        <div className="grid gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>

        {/* More projects (expandable) */}
        {showMore && (
          <div className="grid gap-8 mt-8">
            {moreProjects.map((project, idx) => (
              <ProjectCard key={`more-${idx}`} project={project} />
            ))}
          </div>
        )}

        {/* More button — 한 번 열면 사라짐 */}
        {!showMore && moreProjects.length > 0 && (
          <div className="mt-10 text-center reveal">
            <button
              onClick={() => setShowMore(true)}
              className="px-5 py-2 text-sm font-medium text-slate-400 hover:text-primary-600 transition-colors cursor-pointer"
            >
              More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
