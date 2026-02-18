import Giscus from '@giscus/react';

export default function Guestbook() {
  return (
    <section id="guestbook" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-2">Message</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Guestbook</h2>
          <p className="text-base text-slate-500 leading-relaxed">
            방문해 주셔서 감사합니다.
            <br />
            자유롭게 한마디 남겨주세요!
          </p>
        </div>

        {/* Giscus widget card */}
        <div className="reveal rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          {/* Helper text */}
          <div className="flex items-center gap-2 mb-6 pb-5 border-b border-slate-100">
            <svg className="w-5 h-5 text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            <p className="text-sm text-slate-500">
              GitHub 계정으로 로그인 후 댓글을 남길 수 있습니다.
            </p>
          </div>

          <Giscus
            id="guestbook-comments"
            repo="baobab00/baobab00.github.io"
            repoId="R_kgDORS8rzA"
            category="Guestbook"
            categoryId="DIC_kwDORS8rzM4C2s9P"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme="light"
            lang="ko"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
