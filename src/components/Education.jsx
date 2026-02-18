import { useState } from 'react';
import resumeData from '../data/resumeData';

export default function Education() {
  const { education, awards, otherExperience } = resumeData;
  const [showCert, setShowCert] = useState(false);

  return (
    <section id="education" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education */}
          <div className="reveal">
            <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-2">Background</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-10">Education</h2>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-primary-500 before:ring-4 before:ring-primary-100"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h3 className="text-base font-bold text-slate-900">{edu.school}</h3>
                    <span className="text-xs text-slate-400 font-medium shrink-0">{edu.period}</span>
                  </div>
                  <p className="text-sm text-slate-500">{edu.major}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Other Experience */}
          <div className="reveal">
            <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-2">Achievement</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-10">Awards</h2>

            {awards.map((award, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 mb-8"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-100 text-primary-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.568 6.023 6.023 0 01-2.77-.568" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 mb-1">{award.title}</h3>
                    <p className="text-sm text-slate-500">
                      <button
                        onClick={() => setShowCert(true)}
                        className="text-primary-600 font-semibold hover:underline cursor-pointer"
                      >
                        {award.project}
                      </button>
                      <span className="mx-1.5 text-slate-300">·</span>
                      {award.org}
                      <span className="mx-1.5 text-slate-300">·</span>
                      {award.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Other Experience */}
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 mt-8">Other Experience</h3>
            <div className="space-y-3">
              {otherExperience.map((exp, idx) => (
                <div key={idx} className="flex gap-4 text-sm">
                  <span className="text-slate-400 font-medium shrink-0 w-28">{exp.period}</span>
                  <span className="text-slate-600">{exp.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 modal-backdrop"
          onClick={() => setShowCert(false)}
        >
          <div
            className="relative max-w-lg w-full mx-4 modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCert(false)}
              className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg text-slate-500 hover:text-slate-900 transition-colors z-10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src="/award-certificate.png"
              alt="최우수상 상장"
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
