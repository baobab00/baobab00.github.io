const resumeData = {
  personal: {
    name: '박해남',
    nameEn: 'Haenam Park',
    title: 'Backend Developer',
    phone: '010-8382-5873',
    email: 'phn00dev@gmail.com',
    github: 'baobab00',
    githubUrl: 'https://github.com/baobab00',
    siteUrl: 'https://baobab00.github.io',
  },

  focus: ['Backend_Architecture', 'AI-driven_Service', 'Product_Thinking'],

  coreValues: [
    {
      title: "'왜'를 묻고 본질을 구현하는 개발",
      description:
        '코드를 작성하기 전, 요구사항의 배경과 비즈니스적 맥락을 먼저 살핍니다. 요구의 목적을 정확히 이해할 때 비로소 기술이 사용자에게 실질적인 가치를 전달할 수 있다고 생각합니다.',
    },
    {
      title: '동료와 주파수를 맞추며 소통하는 자세',
      description:
        '동료와 대화할 때 상대의 상황과 맥락에 맞춰 소통하려 합니다. 기술적 복잡함을 쉬운 언어로 풀어내고, 팀의 싱크를 맞추는 과정에 보람을 느낍니다.',
    },
    {
      title: '팀의 성공을 동력으로 삼는 성장',
      description:
        '개인의 성취보다 팀이 목표를 달성했을 때 얻는 에너지가 더 큽니다. 맡은 역할을 끝까지 책임지고 완수하며, 동료들이 믿고 의지할 수 있는 팀 플레이어로서 기여하고 싶습니다.',
    },
  ],

  skills: {
    Backend: { items: ['TypeScript', 'Node.js', 'Express', 'FastAPI'], core: ['TypeScript', 'Node.js', 'Express'] },
    Frontend: { items: ['React', 'Next.js'], core: [] },
    Database: { items: ['PostgreSQL', 'MySQL'], core: [] },
    DevOps: { items: ['Git', 'AWS', 'Docker'], core: [] },
    AI: { items: ['OpenAI API', 'Gemini API'], core: [] },
  },

  projects: [
    {
      title: 'ResumeLink',
      subtitle: 'AI 기반 이력서 생성 및 포트폴리오 관리 & 개발자 네트워킹 플랫폼',
      type: 'Team',
      period: '2025.07 – 08',
      highlights: [
        '커피챗 도메인을 독립 설계하고, 각 커피챗 요청에 대해 수락 이후에만 채팅이 활성화되도록 승인 기반 접근 제어 구현',
        '실시간 송수신은 WebSocket, 영속화 및 조회는 REST API로 분리해 책임을 나누어 메시지 정합성과 조회 안정성 확보',
        'lastReadMessageId/unreadCount 기반으로 메시지 읽음·미확인 메시지 수를 서버에서 일관되게 계산해 클라이언트 로직 단순화',
        '팀 공통 규칙(명세/우선순위/일정)을 세우고, 프로젝트 전반의 기능 개발을 리드하며 생산성 유지',
      ],
      link: 'https://github.com/ResumeLink2025',
      linkLabel: 'Organization',
      isLive: false,
    },
    {
      title: 'LectureSummarizer',
      subtitle: '강의 영상을 로컬에서 전사하고, AI로 타임라인·학습 노트를 구조화해 제공하는 시스템',
      type: 'Solo',
      period: '2025.10 – 11',
      highlights: [
        '로컬 환경에서 동작하는 전사·분석·생성까지의 파이프라인 설계 및 구현',
        '세션 단위 진행도 추적(/api/progress)·작업 취소(/api/cancel)를 제공하고, 단계별 처리 시간을 기록해 실행 상태 추적과 안정성 확보',
        'AI 구조화 실패 시 복구(재시도·보정)가 가능하도록 처리 로직을 구성해 결과 품질과 처리 안정성 강화',
        '트레이 앱으로 서버를 원클릭 제어하고, 웹 대시보드에서 로그와 성능 지표(단계별 시간/예측)를 시각화해 운영 및 디버깅 가능하도록 구성',
      ],
      link: 'https://github.com/baobab00/lecture-summarizer',
      linkLabel: 'Repository',
      isLive: false,
    },
    {
      title: 'YT Insights',
      subtitle: 'YouTube Most Replayed 히트맵을 분석해 시청자 행동을 정량화하는 영상 분석 서비스',
      type: 'Solo',
      period: '2025.11 – 12',
      highlights: [
        'Playwright 기반으로 Most Replayed SVG 히트맵(Path) 스크래핑 후, Bezier 보간으로 시청 곡선을 수치 데이터로 재구성',
        '히트맵 해상도/노이즈 한계를 고려해 스무딩·보간·정규화를 적용하고, 영상 간 비교 가능한 지표(재시청/이탈/안정성/하이라이트) 설계',
        '지표의 계산 방식과 해석 기준을 Wiki 형태로 문서화해 산출 기준 일관성과 지표 신뢰도 확보',
        'IndexedDB(30일 TTL) 캐싱, 중복 분석 방지, 요청/에러/트래픽 집계 등 운영 로그 수집을 포함한 실사용 중심 분석 파이프라인 구축',
      ],
      link: 'https://ytinsights.dev',
      linkLabel: 'Live Demo',
      isLive: true,
    },
  ],

  moreProjects: [
    {
      title: 'ChatGPT Blur',
      subtitle: 'ChatGPT 대화 내용을 블러 처리해 프라이버시를 보호하는 Chrome 확장 프로그램',
      type: 'Solo',
      period: '2025.09',
      highlights: [
        'MutationObserver(50ms 디바운스)로 ChatGPT DOM 변경을 실시간 감지하고, 사이드바·대화·미디어 등 영역별 CSS filter blur 선택 적용',
        'data-message-id 기반 Set으로 개별 메시지 잠금·해제 상태를 관리하고, Ctrl+Shift+Click 토글로 메시지 단위 블러 제어 구현',
        '아바타·아이콘·프로필 등 UI 예외 요소를 클래스·alt 텍스트·크기 기반으로 필터링해 블러 오적용 방지',
        'Chrome Storage API로 블러 강도·자동 적용·영역 설정을 영속화하고, Background↔Content Script 메시지 패싱으로 단축키 기반 전역 토글 구현',
      ],
      link: 'https://chromewebstore.google.com/detail/chatgpt-blur/ghageddlnooippamdabmohhaaccimkfo',
      linkLabel: 'Chrome Web Store',
      isLive: true,
    },
    {
      title: 'MeNode',
      subtitle: '@노드와 #날짜 태그로 기록을 구조화하고, 관계 시각화로 맥락을 탐색하는 개인 기록 서비스',
      type: 'Solo',
      tags: ['with AI'],
      period: '2026.01 ~',
      highlights: [
        'Notes 단일 입력에서 @노드·#날짜 태그를 파싱해 Nodes/DateContext 관계를 자동 파생하는 데이터 모델을 설계하고, 모든 탐색을 이 연결 기반 계산으로 처리하는 구조 구현',
        '시간 감쇠 중요도·공동 언급 유사도·최근성 3축 지표를 산출하고, Weighted Mean Angle 알고리즘으로 결정론적 좌표를 계산해 Canvas 2D에 동심원 기반 관계 시각화를 렌더링하는 Space 엔진 구현',
        '상대 날짜, 절대 날짜, 시간 조합 등 한국어 날짜 표현을 토큰 단위로 분리·해석하는 규칙 기반 파서를 설계하고, 추론·보정 없이 명시적 패턴 매칭만으로 정규화하도록 구현',
        'Vercel과 AWS RDS 간 레이턴시 및 SSL 이슈를 최적화하고, Prisma 기반 배포 자동화와 Cron 데이터 관리, 보안 헤더를 적용한 프로덕션 환경 구축',
        '320px 최소 지원 반응형 UI, Canvas 터치 인터랙션(탭·드래그·핀치줌), Capacitor 기반 Android WebView 앱 빌드까지 모바일 대응 전반을 설계·구현',
      ],
      link: 'https://menode.app',
      linkLabel: 'Live Demo',
      isLive: true,
    },
  ],

  education: [
    {
      school: '경남대학교',
      major: '컴퓨터공학부 컴퓨터공학 전공',
      period: '2019.03 – 2026.02',
    },
    {
      school: 'programmers 데브코스',
      major: '타입스크립트로 함께하는 웹 풀 사이클 개발',
      period: '2025.01 – 2025.07',
    },
  ],

  awards: [
    {
      title: '웹 풀 사이클 개발 데브코스 6기 프로젝트 최우수상',
      project: 'ResumeLink',
      org: 'Grepp Inc.',
      date: '2025.07',
    },
  ],

  otherExperience: [
    { period: '2022.05 – 06', content: '지방선거 구청장 후보 선거 사무소 기획실 근무' },
    { period: '2024.06 – 12', content: '편의점 파트타임 근로 (세븐일레븐)' },
  ],
};

export default resumeData;
