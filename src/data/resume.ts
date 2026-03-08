import type { PersonalInfo, CoreValue, FocusArea, SkillCategory, Education, Award, OtherExperience, ResumeProject } from '@/types';

export const personal: PersonalInfo = {
  name: '박해남',
  nameEn: 'Haenam Park',
  title: 'Backend Developer',
  phone: '010-8382-5873',
  email: 'phn00dev@gmail.com',
  github: 'baobab00',
  githubUrl: 'https://github.com/baobab00',
  siteUrl: 'https://baobab00.github.io',
};

export const focus: FocusArea[] = [
  {
    title: 'Backend Architecture',
    tag: '#Backend_Architecture',
    description:
      '서비스의 근간이 되는 백엔드 구조를 설계하는 데 흥미를 느낍니다. 단순히 동작하는 코드가 아니라, 역할과 책임이 명확히 분리된 구조를 고민합니다. 도메인 간의 경계를 정하고 API 설계에서 일관성을 확보하는 과정에서, "기술적 선택이 서비스의 확장성과 안정성에 어떤 영향을 주는가"를 늘 생각합니다.',
  },
  {
    title: 'AI-driven Service',
    tag: '#AI_driven_Service',
    description:
      'ChatGPT, Gemini 등 AI 서비스를 꾸준히 사용하면서 "AI가 사용자에게 어떤 가치를 줄 수 있는가"에 대해 깊이 고민하게 되었습니다. 편리함 이면에 있는 환각(hallucination), 프라이버시 리스크, 비용 구조 같은 비즈니스적 한계도 함께 바라봅니다. 사용자 입장에서 체감하는 가치를 극대화하면서도, 기술의 한계를 솔직하게 설계에 반영하는 서비스를 만들고 싶습니다.',
  },
  {
    title: 'Product Thinking',
    tag: '#Product_Thinking',
    description:
      '"이 기능이 왜 필요한가?"를 먼저 묻는 습관이 있습니다. 요구사항을 받으면 곧바로 코드를 쓰기보다는, 그 이면의 사용자 맥락과 비즈니스 목적을 이해하려 합니다. 기술은 목적이 아니라 수단이라고 생각하며, 사용자에게 실질적인 가치가 전달될 때 비로소 좋은 제품이 된다고 믿습니다.',
  },
];

export const coreValues: CoreValue[] = [
  {
    title: "'왜'를 묻고 본질을 구현하는 개발",
    description: [
      '코드를 작성하기 전, 요구사항의 배경과 비즈니스적 맥락을 먼저 살핍니다.',
      '요구의 목적을 정확히 이해할 때 비로소 기술이 사용자에게 실질적인 가치를 전달할 수 있다고 생각합니다.',
    ],
  },
  {
    title: '동료와 주파수를 맞추며 소통하는 자세',
    description: [
      '동료와 대화할 때 상대의 상황과 맥락에 맞춰 소통하려 합니다.',
      '기술적 복잡함을 쉬운 언어로 풀어내고, 팀의 싱크를 맞추는 과정에 보람을 느낍니다.',
    ],
  },
  {
    title: '팀의 성공을 동력으로 삼는 성장',
    description: [
      '개인의 성취보다 팀이 목표를 달성했을 때 얻는 에너지가 더 큽니다.',
      '맡은 역할을 끝까지 책임지고 완수하며, 동료들이 믿고 의지할 수 있는 팀 플레이어로서 기여하고 싶습니다.',
    ],
  },
];

export const skills: Record<string, SkillCategory> = {
  Languages: {
    items: [
      { name: 'Python', logo: 'python', color: '3776AB', logoColor: 'white' },
      { name: 'TypeScript', logo: 'typescript', color: '3178C6', logoColor: 'white' },
      { name: 'JavaScript', logo: 'javascript', color: 'F7DF1E', logoColor: 'black' },
    ],
    core: ['TypeScript'],
  },
  Backend: {
    items: [
      { name: 'FastAPI', logo: 'fastapi', color: '009688', logoColor: 'white' },
      { name: 'Node.js', logo: 'nodedotjs', color: '5FA04E', logoColor: 'white' },
      { name: 'Express', logo: 'express', color: '000000', logoColor: 'white' },
    ],
    core: ['Node.js', 'Express'],
  },
  Frontend: {
    items: [
      { name: 'React', logo: 'react', color: '61DAFB', logoColor: 'black' },
      { name: 'Next.js', logo: 'nextdotjs', color: '000000', logoColor: 'white' },
      { name: 'Tailwind CSS', logo: 'tailwindcss', color: '06B6D4', logoColor: 'white' },
    ],
    core: [],
  },
  Database: {
    items: [
      { name: 'PostgreSQL', logo: 'postgresql', color: '4169E1', logoColor: 'white' },
      { name: 'SQLite', logo: 'sqlite', color: '003B57', logoColor: 'white' },
      { name: 'Firebase', logo: 'firebase', color: 'DD2C00', logoColor: 'white' },
      { name: 'Prisma', logo: 'prisma', color: '2D3748', logoColor: 'white' },
    ],
    core: ['PostgreSQL'],
  },
  'Infra & DevOps': {
    items: [
      { name: 'Docker', logo: 'docker', color: '2496ED', logoColor: 'white' },
      { name: 'AWS', logo: 'amazonwebservices', color: '232F3E', logoColor: 'white' },
      { name: 'Vercel', logo: 'vercel', color: '000000', logoColor: 'white' },
      { name: 'GitHub Actions', logo: 'githubactions', color: '2088FF', logoColor: 'white' },
    ],
    core: [],
  },
};

export const featuredProjects: ResumeProject[] = [
  {
    title: 'ResumeLink',
    subtitle: 'AI 기반 이력서 생성 및 포트폴리오 관리 & 개발자 네트워킹 플랫폼',
    type: 'Team',
    period: '2025.07 – 08',
    highlights: [
      '커피챗 신청-승인 프로세스와 실시간 채팅 도메인을 논리적으로 분리하여, 승인된 관계에서만 채팅 채널이 생성 및 활성화되도록 접근 제어 로직 구현',
      'WebSocket을 활용한 실시간 이벤트 핸들러와 Prisma 기반의 REST API를 결합하여, 실시간 메시지 브로드캐스팅과 채팅 이력의 안정적인 DB 영속화 달성',
      '메시지 읽음 상태 관리를 위해 DB 내 LastReadMessageId를 갱신하고, 서버 사이드에서 UnreadCount를 연산하여 제공함으로써 클라이언트 간 데이터 정합성 유지',
      '팀 프로젝트 리드로서 TypeScript 기반의 API 명세와 DTO 표준을 수립하고, Git Flow 및 마일스톤 관리를 통해 개발 생산성 및 코드 품질 유지',
    ],
    link: 'https://github.com/ResumeLink2025',
    linkLabel: 'Organization',
    isLive: false,
    detailId: 'resumelink',
  },
  {
    title: 'LectureSummarizer',
    subtitle: '강의 영상을 로컬에서 전사하고, AI로 타임라인·학습 노트를 구조화해 제공하는 시스템',
    type: 'Solo',
    period: '2025.10 – 11',
    highlights: [
      'Content Script에서 미디어 URL을 실시간 캐처하고, DOM 비디오 요소 탐지를 결합하여 YouTube 및 일반 웹페이지 영상을 자동 감지하는 Chrome Extension 구현',
      'Express 서버와 FastAPI Whisper 서버를 마이크로서비스로 분리하고, FFmpeg 오디오 변환과 Faster-Whisper CPU 로컬 전사를 결합한 7단계 처리 파이프라인 설계',
      'GPT-4o-mini 기반 도메인 추론·전문 용어 교정·타임라인 노트·학습 노트 순차 생성 후, MarkdownIt 렌더링과 KaTeX 수식 지원을 포함한 3탭 HTML 인터페이스로 최종 결과물 출력',
      '단계별 PerformanceTracker로 세션당 7단계 소요 시간을 측정하고, 로그 회귀 모델 기반 영상 길이별 처리 시간 예측과 웹 대시보드 실시간 시각화 구현',
      'pystray 기반 Windows 시스템 트레이 앱으로 서버 원클릭 제어를 구현하고, Python·Node.js·FFmpeg·Whisper 모델을 포함한 Portable 빌드 스크립트로 무설치 배포 환경 구축',
    ],
    link: 'https://github.com/baobab00/lecture-summarizer',
    linkLabel: 'Repository',
    isLive: false,
    detailId: 'lecture-summarizer',
  },
  {
    title: 'YT Insights',
    subtitle: 'YouTube Most Replayed 히트맵을 분석해 시청자 행동을 정량화하는 영상 분석 서비스',
    type: 'Solo',
    period: '2025.11 – 12',
    highlights: [
      'Playwright Headless Chrome으로 Most Replayed 히트맵 SVG를 실시간 스크래핑하고, M·C·L 명령어 파서로 Cubic Bezier 끝점을 추출한 뒤 Y좌표 반전·정규화를 거쳐 popularity 시계열 데이터를 생성하는 수집 파이프라인 구현',
      'IQR 적응형 임계값과 피크 돌출도를 결합한 하이라이트 탐지, Time-based Window와 Absolute Threshold를 적용한 안정성 평가 등 시청 행동 지표 엔진을 통계적으로 설계·구현',
      'SVG Cubic Bezier 제어점을 활용한 De Casteljau 보간 엔진으로 저해상도 히트맵을 복원하고, 영상 길이별 최적 분당 포인트 밀도를 자동 산출하여 데이터 품질 계층 제공',
      '4단계 duration fallback 체인(video.duration → ytInitialPlayerResponse → DOM → YouTube Data API)과 챕터별 다중 SVG 좌표 병합으로 클라우드 환경 및 챕터 영상에 대응',
    ],
    link: 'https://ytinsights.dev',
    linkLabel: 'Live Demo',
    isLive: true,
    detailId: 'yt-insights',
  },
];

export const education: Education[] = [
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
];

export const awards: Award[] = [
  {
    title: '웹 풀 사이클 개발 데브코스 6기 프로젝트 최우수상',
    project: 'ResumeLink',
    org: 'Grepp Inc.',
    date: '2025.07',
  },
];

export const otherExperience: OtherExperience[] = [
  { period: '2022.05 – 06', content: '지방선거 구청장 후보 선거 사무소 기획실 근무' },
  { period: '2024.06 – 12', content: '편의점 파트타임 근로 (세븐일레븐)' },
];
