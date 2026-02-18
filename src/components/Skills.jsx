import resumeData from '../data/resumeData';

export default function Skills() {
  const { skills } = resumeData;

  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 reveal">
          <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-2">Tech Stack</p>
          <h2 className="text-3xl font-bold text-slate-900">Skills</h2>
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, { items, core }]) => (
            <div
              key={category}
              className="reveal p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                      core.includes(skill)
                        ? 'bg-primary-600 text-white shadow-sm shadow-primary-600/25'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex items-center gap-4 text-xs text-slate-400 reveal">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-primary-600" />
            <span>주력 기술</span>
          </div>
        </div>
      </div>
    </section>
  );
}
