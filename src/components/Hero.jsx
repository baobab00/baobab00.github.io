import { useState } from 'react';
import resumeData from '../data/resumeData';

const focusDetails = {
  Backend_Architecture: {
    title: 'Backend Architecture',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    description:
      '서비스의 근간이 되는 백엔드 구조를 설계하는 데 흥미를 느낍니다. 단순히 동작하는 코드가 아니라, 역할과 책임이 명확히 분리된 구조를 고민합니다. 도메인 간의 경계를 정하고 API 설계에서 일관성을 확보하는 과정에서, "기술적 선택이 서비스의 확장성과 안정성에 어떤 영향을 주는가"를 늘 생각합니다.',
  },
  'AI-driven_Service': {
    title: 'AI-driven Service',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    description:
      'ChatGPT, Gemini 등 AI 서비스를 꾸준히 사용하면서 "AI가 사용자에게 어떤 가치를 줄 수 있는가"에 대해 깊이 고민하게 되었습니다. 편리함 이면에 있는 환각(hallucination), 프라이버시 리스크, 비용 구조 같은 비즈니스적 한계도 함께 바라봅니다. 사용자 입장에서 체감하는 가치를 극대화하면서도, 기술의 한계를 솔직하게 설계에 반영하는 서비스를 만들고 싶습니다.',
  },
  Product_Thinking: {
    title: 'Product Thinking',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    description:
      '"이 기능이 왜 필요한가?"를 먼저 묻는 습관이 있습니다. 요구사항을 받으면 곧바로 코드를 쓰기보다는, 그 이면의 사용자 맥락과 비즈니스 목적을 이해하려 합니다. 기술은 목적이 아니라 수단이라고 생각하며, 사용자에게 실질적인 가치가 전달될 때 비로소 좋은 제품이 된다고 믿습니다.',
  },
};

export default function Hero() {
  const { personal, focus } = resumeData;
  const [activeTag, setActiveTag] = useState(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Greeting tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          <span className="text-sm font-medium text-primary-700">Backend Developer</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6 animate-fade-in-up">
          <span className="text-primary-600">&apos;왜&apos;</span>를 묻고,
          <br />
          본질을 구현합니다.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          비즈니스의 맥락을 이해하고,
          <br />
          기술로 사용자에게 가치를 전달하는
          <br />
          개발자{' '}
          <span className="font-semibold text-slate-700">{personal.name}</span>입니다.
        </p>

        {/* Focus tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {focus.map((tag, i) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="px-4 py-1.5 text-sm font-medium text-primary-600 bg-white border border-primary-200 rounded-full shadow-sm hover:bg-primary-50 hover:border-primary-300 hover:shadow-md hover:scale-105 transition-all cursor-pointer animate-nudge"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              #{tag}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400 mb-12 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
          클릭하여 자세히 보기
        </p>

        {/* CTA */}
        <div className="flex justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
          <a
            href="#projects"
            className="px-6 py-3 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
          >
            프로젝트 보기
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="px-6 py-3 text-sm font-semibold text-primary-600 bg-white border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
          >
            연락하기
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Focus Detail Modal */}
      {activeTag && focusDetails[activeTag] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 modal-backdrop"
          onClick={() => setActiveTag(null)}
        >
          <div
            className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setActiveTag(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon + tag */}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-50 text-primary-600 mb-5">
              {focusDetails[activeTag].icon}
            </div>
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-50 rounded-full mb-4">
              #{activeTag}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {focusDetails[activeTag].title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {focusDetails[activeTag].description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
