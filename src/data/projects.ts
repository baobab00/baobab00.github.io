import type { Project } from '@/types';

export const allProjects: Project[] = [
  // ─── KGN ───────────────────────────────────────────────────────
  {
    id: 'kgn',
    title: 'KGN',
    subtitle: 'AI 에이전트에게 영속적이고 쿼리 가능한 메모리를 제공하는 CLI + MCP 서버',
    teamType: 'Solo',
    projectType: 'opensource',
    period: '2026.03 ~',
    tags: ['Python', 'PostgreSQL', 'MCP'],
    highlights: [
      '7 레이어 계층형 아키텍처 + Single SQL Source 원칙의 21개 모듈 설계',
      'MCP 1.26.0 기반 12개 tool 제공, 3가지 전송 프로토콜(stdio, SSE, streamable-http) 지원',
      'PyPI + VS Code Marketplace 동시 배포, GitHub Actions CI/CD 파이프라인 구축',
      '84개 테스트 파일, 2031+ 테스트 케이스, 93%+ 커버리지 달성',
    ],
    techStack: ['Python', 'PostgreSQL', 'pgvector', 'FastMCP', 'FastAPI', 'Typer', 'Pydantic v2', 'pygls', 'Docker', 'GitHub Actions'],
    link: 'https://github.com/baobab00/kgn',
    linkLabel: 'Repository',
    isLive: false,
    overview: [
      'AI 에이전트에게 영속적이고 쿼리 가능한 메모리를 제공하는 CLI + MCP 서버',
      '커스텀 .kgn/.kge 파일 포맷으로 지식 노드와 관계를 정의하고, PostgreSQL + pgvector 기반 시맨틱 검색과 그래프 쿼리를 지원',
      'Claude Desktop, Claude Code 등 AI 에이전트가 MCP 프로토콜을 통해 지식 그래프를 직접 읽기/쓰기/태스크 관리',
    ],
    problemDefinition:
      'AI 에이전트는 대화가 끝나면 컨텍스트를 완전히 잃습니다. 프로젝트의 아키텍처 결정, 설계 의도, 코드 간 관계 같은 구조화된 지식은 단순 텍스트 파일로 저장할 수 없고, 검색·쿼리도 불가능합니다. 지식 간 관계를 명시적으로 표현하면서 영속적으로 저장하고, 다음 세션에서 시맨틱 검색으로 즉시 활용할 수 있는 시스템이 필요했습니다.',
    keyFeatures: [
      { title: '커스텀 파일 포맷 (Layer 0)', description: 'YAML frontmatter + Markdown body로 구성된 .kgn(노드)/.kge(엣지) 포맷을 직접 설계했습니다. 파서는 YAML 파싱 → Pydantic v2 모델 검증 → Markdown body 추출의 3단계로 동작하며, 10가지 유효성 검증 규칙(V1-V10)을 적용합니다. 역직렬화도 지원하여 Pydantic 모델을 다시 .kgn/.kge 파일로 변환할 수 있습니다.' },
      { title: '벡터 검색 (Layer 2)', description: 'OpenAI text-embedding-3-small로 1536차원 벡터를 생성하고, pgvector HNSW 인덱스로 Top-K cosine similarity 검색을 수행합니다. 임베딩 모듈은 client(API 호출), factory(프로바이더 팩토리), service(비즈니스 로직)로 분리했고, API 키가 없는 환경에서는 임베딩을 스킵하는 graceful degradation 전략을 적용했습니다.' },
      { title: 'MCP 서버 (Layer 5)', description: 'MCP 1.26.0 기반으로 12개 tool(Read 4 + Task 3 + Workflow 2 + Write 3)을 제공합니다. Read tool로 노드 조회·BFS 서브그래프 추출·시맨틱 유사도 Top-K 검색을, Task tool로 lease 기반 태스크 체크아웃·완료·실패 처리를, Write tool로 노드/엣지 인제스트·태스크 큐 등록을 지원합니다. stdio, HTTP SSE, streamable-http 3가지 전송 프로토콜을 모두 지원합니다.' },
      { title: '멀티 에이전트 오케스트레이션 (Layer 4)', description: '5개 역할(genesis/worker/reviewer/indexer/admin) 기반 RBAC로 역할별 생성 가능 노드 타입과 태스크 접근을 제한합니다. design-to-impl, issue-resolution, knowledge-indexing 3개 워크플로우 템플릿으로 DAG 기반 서브태스크를 생성하며, advisory locking으로 동일 노드 동시 수정을 차단합니다. 태스크는 lease_expires_at으로 만료를 관리하고, max_attempts(기본 3) 초과 시 자동 FAILED 전환합니다.' },
      { title: 'LSP 서버 + VS Code 확장', description: 'pygls 기반으로 진단(V1-V10 규칙 실시간 검증), 자동완성(타입/상태/프로젝트 ID), 호버(노드 ID 위 정보 표시), CodeLens(인라인 액션), Semantic Token(하이라이팅), 서브그래프 프리뷰 등 8개 LSP 모듈을 구현했습니다. VS Code 확장으로 패키징하여 VS Code Marketplace에 배포했습니다.' },
    ],
    techDecisions: [
      { tech: 'PostgreSQL + pgvector', reason: '관계형 쿼리와 벡터 검색을 단일 DB에서 처리하여 인프라 복잡도를 낮추고, HNSW 인덱스로 검색 성능을 확보했습니다.' },
      { tech: 'Pydantic v2', reason: '커스텀 파일 포맷의 스키마 검증을 런타임에서 엄격하게 수행하면서도, Python 타입 힌트와 자연스럽게 통합할 수 있었습니다.' },
      { tech: 'Single SQL Source 원칙', reason: 'db/repository.py 하나에 모든 SQL을 집중하여, 스키마 변경 시 영향 범위를 한정하고 쿼리 일관성을 보장했습니다.' },
    ],
    problemSolving: [
      {
        problem: '여러 AI 에이전트가 동시에 같은 노드를 수정할 때, 마지막 쓰기가 이전 변경을 덮어쓰는 Lost Update 문제가 발생했습니다. 에이전트는 서로의 작업을 인지하지 못하기 때문에, 충돌을 사전에 방지하거나 사후에 감지할 수 있는 메커니즘이 없으면 지식 그래프의 정합성을 보장할 수 없었습니다.',
        approach: '이 문제를 "동시성 제어"와 "충돌 해소"라는 두 축으로 분리해서 접근했습니다. 먼저 PostgreSQL advisory lock으로 노드 단위 비관적 잠금을 적용하여, 같은 노드에 대한 동시 수정 자체를 차단했습니다. 그리고 충돌이 감지된 경우에는 단순히 에러를 반환하는 대신, 자동으로 review 태스크를 생성하여 reviewer 역할의 에이전트가 변경 사항을 비교·판단하도록 워크플로우를 설계했습니다.',
        result: '2031개 테스트 케이스 중 동시성 관련 테스트를 포함하여 멀티 에이전트 환경에서의 데이터 정합성을 검증했습니다. 충돌을 단순한 에러가 아닌 협업 기회로 전환하는 구조를 확립했습니다.',
      },
      {
        problem: '9개의 순차적 SQL 마이그레이션(001_init_enums ~ 009_conflict_activity_types)을 안전하게 관리해야 했습니다. 개인 프로젝트이지만 스키마가 계속 확장되면서, 마이그레이션 순서가 꼬이거나 이전 스키마와 호환되지 않는 변경이 적용될 위험이 있었습니다.',
        approach: '마이그레이션 파일의 번호 체계를 엄격하게 관리하는 것은 기본이고, 근본적으로 "변경이 안전한지 어떻게 확인할 것인가"가 핵심 문제라고 판단했습니다. INSERT-only 감사 로그(Rule R5: agent_activities 테이블은 절대 UPDATE/DELETE 없음)를 도입하여, 모든 스키마 변경과 데이터 변경의 이력을 불변 로그로 남기도록 했습니다. 이를 통해 문제 발생 시 정확히 어느 시점에서 어떤 변경이 일어났는지 추적할 수 있게 했습니다.',
        result: '스키마 변경이 안전하게 적용 가능한 구조를 확립했고, 감사 로그를 통해 디버깅 시 변경 이력 추적이 즉시 가능합니다.',
      },
    ],
    outcomes: [
      'Python 기반 7 레이어 계층형 아키텍처를 직접 설계하며, 각 레이어가 하위만 의존하고 순환 참조를 원천 차단하는 구조의 유지보수 이점을 체감했습니다',
      '2031개 테스트 케이스와 93%+ 커버리지를 달성하면서, 테스트가 단순한 검증 도구가 아니라 리팩토링 시 안전망 역할을 한다는 것을 실감했습니다. 특히 E2E 테스트 10개 모듈이 기능 파이프라인 전체를 검증하면서 회귀 버그를 조기에 잡아줬습니다',
      'PyPI와 VS Code Marketplace에 동시 배포하면서, 패키지 버전 관리, 의존성 명세, GitHub Actions CI/CD 파이프라인 구축까지 오픈소스 배포의 전체 사이클을 경험했습니다',
      'MCP 프로토콜을 직접 구현하면서, AI 에이전트의 도구 사용 인터페이스를 설계하는 과정에서 "에이전트가 어떤 맥락 정보를 필요로 하는가"를 역으로 고민하게 되었고, 이것이 tool 설계의 핵심이라는 것을 배웠습니다',
      'ARCHITECTURE.md에 16개 Mermaid 다이어그램을 포함한 기술 문서를 작성하며, 설계 의사결정의 근거를 문서화하는 습관을 형성했습니다',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/baobab00/kgn' },
    ],
  },

  // ─── ResumeLink ────────────────────────────────────────────────
  {
    id: 'resumelink',
    title: 'ResumeLink',
    subtitle: 'AI 기반 이력서 생성 및 포트폴리오 관리 & 개발자 네트워킹 플랫폼',
    teamType: 'Team',
    projectType: 'featured',
    period: '2025.07 – 08',
    highlights: [
      '커피챗 신청-승인 프로세스와 실시간 채팅 도메인 분리',
      'WebSocket + REST API 결합으로 실시간 전송 + 영속 저장',
      '서버 사이드 UnreadCount 연산으로 데이터 정합성 유지',
      '팀 리드로서 API 명세 표준 수립 및 Git Flow 관리',
    ],
    techStack: ['TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'WebSocket'],
    link: 'https://github.com/ResumeLink2025',
    linkLabel: 'Organization',
    isLive: false,
    overview: [
      '프로그래머스 데브코스 6기 팀 프로젝트로 개발한 AI 기반 이력서 생성 및 개발자 네트워킹 플랫폼',
      '커피챗 신청-승인 프로세스를 통해 네트워킹 기회를 제공하고, 승인된 관계에서만 실시간 채팅이 가능하도록 접근 제어를 설계',
      '프로젝트 최우수상 수상',
    ],
    problemDefinition:
      '개발자 커뮤니티에서 멘토링이나 피어 리뷰를 위한 자연스러운 연결 수단이 부족했습니다. 기존 플랫폼은 이력서 관리와 네트워킹이 분리되어 있어, 프로필을 확인한 뒤 바로 대화를 시작하기 어려웠습니다. 프로필 기반 매칭부터 대화까지 하나의 플랫폼에서 자연스럽게 이어지는 구조가 필요했습니다.',
    keyFeatures: [
      { title: '커피챗 도메인 분리', description: '커피챗 신청-승인 프로세스와 실시간 채팅을 논리적으로 분리하여, 커피챗 승인이 채팅방 생성의 선행 조건이 되도록 접근 제어 로직을 설계했습니다. 승인되지 않은 관계에서는 채팅 채널 자체가 생성되지 않으므로, 비인가 접근을 구조적으로 차단합니다. 도메인 분리를 통해 커피챗 로직 변경이 채팅 로직에 영향을 주지 않도록 결합도를 낮췄습니다.' },
      { title: '실시간 메시지 시스템', description: 'WebSocket으로 실시간 메시지 브로드캐스팅을 처리하고, Prisma REST API로 메시지를 DB에 영속화하는 이중 구조를 설계했습니다. WebSocket은 즉시성을, REST API는 데이터 안정성을 각각 담당하여, 메시지가 실시간으로 전달되면서도 DB에 안전하게 저장되는 구조를 구현했습니다.' },
      { title: '읽음 상태 관리', description: 'DB 내 LastReadMessageId를 사용자별로 관리하고, 서버 사이드에서 UnreadCount를 계산하여 단일 진실 소스(Single Source of Truth)를 유지했습니다. 클라이언트에서 카운트를 관리하면 다중 디바이스/탭 환경에서 불일치가 발생하므로, 서버 연산 기반으로 일관된 상태를 보장하는 방식을 선택했습니다.' },
    ],
    techDecisions: [
      { tech: 'WebSocket + REST API 결합', reason: '실시간성이 필요한 메시지 전송은 WebSocket, 영속화와 조회는 REST API로 분리하여 각 프로토콜의 강점을 활용했습니다.' },
      { tech: 'Prisma ORM', reason: 'TypeScript와의 자연스러운 타입 통합으로 개발 생산성을 높이고, 팀 전체가 일관된 DB 접근 패턴을 사용할 수 있었습니다.' },
      { tech: 'Git Flow', reason: '팀 프로젝트에서 feature/develop/release/hotfix 브랜치 전략으로 병렬 개발 시 충돌을 최소화하고 릴리스 품질을 관리했습니다.' },
    ],
    problemSolving: [
      {
        problem: '초기 설계에서 커피챗 승인 여부와 관계없이 채팅 채널이 미리 생성되어 있었고, 승인 전 사용자가 URL을 직접 입력하면 채팅이 가능해지는 접근 제어 취약점이 발견되었습니다. 인증(로그인)은 되어 있지만 인가(권한)가 제대로 작동하지 않는 상태였습니다.',
        approach: '이 문제를 "도메인 경계가 명확하지 않아서 발생한 구조적 결함"으로 판단했습니다. 단순히 채팅 진입 시 승인 여부를 체크하는 것이 아니라, 커피챗 도메인과 채팅 도메인을 논리적으로 분리하고, 채팅방 생성 자체를 커피챗 승인의 후행 이벤트로 설계했습니다. 승인 이벤트가 발생해야만 채팅 채널이 생성되므로, 비인가 접근을 체크 로직이 아닌 구조로 원천 차단할 수 있었습니다.',
        result: '승인된 관계에서만 채팅이 가능한 안전한 접근 제어를 구현했고, 도메인 분리를 통해 향후 커피챗 로직 변경이 채팅에 영향을 주지 않는 유연한 구조를 확보했습니다.',
      },
      {
        problem: '클라이언트 측에서 미읽음 메시지 수를 각각 관리하고 있었는데, 같은 사용자가 여러 탭이나 디바이스에서 접속하면 UnreadCount가 서로 다르게 표시되는 데이터 불일치 문제가 발생했습니다. 한쪽에서 읽어도 다른 쪽에 반영되지 않았습니다.',
        approach: '이 문제의 본질은 "상태의 진실 소스가 분산되어 있다"는 것이었습니다. 클라이언트가 각자 카운트를 관리하는 방식을 폐기하고, 서버에서 LastReadMessageId를 기준으로 UnreadCount를 매번 계산하여 응답하는 구조로 전환했습니다. 상태를 저장하는 것이 아니라 조회 시점에 계산하는 방식이므로, 어떤 디바이스에서 접근하든 항상 동일한 결과를 보장합니다.',
        result: '다중 디바이스/탭 환경에서도 일관된 미읽음 수를 보장하는 구조를 확립했습니다.',
      },
    ],
    outcomes: [
      '프로그래머스 데브코스 6기 프로젝트 최우수상을 수상했습니다',
      '팀 리드로서 TypeScript 기반 API 명세·DTO 표준을 수립하고, Git Flow 전략을 도입했습니다. "어떻게 만들 것인가"보다 "팀이 어떻게 함께 일할 것인가"를 먼저 설계하는 경험이 개발 리더십에 대한 시각을 넓혀줬습니다',
      'WebSocket과 REST API를 결합하는 과정에서, 실시간성과 안정성이라는 두 가지 상충되는 요구사항을 프로토콜 분리로 해결하는 패턴을 체득했습니다',
      '접근 제어 취약점을 구조적 설계로 해결하면서, 보안 문제를 "체크 로직 추가"가 아니라 "구조적으로 불가능하게 만드는 것"이 더 안전하다는 교훈을 얻었습니다',
    ],
    links: [
      { label: 'GitHub Organization', url: 'https://github.com/ResumeLink2025' },
    ],
  },

  // ─── MeNode ────────────────────────────────────────────────────
  {
    id: 'menode',
    title: 'MeNode',
    subtitle: '@노드와 #날짜 태그로 기록을 구조화하고, 관계 시각화로 맥락을 탐색하는 개인 기록 서비스',
    teamType: 'Solo',
    projectType: 'live',
    period: '2026.01 ~',
    tags: ['Next.js', 'Prisma', 'AWS RDS'],
    highlights: [
      'Notes 단일 입력 → @노드·#날짜 관계 자동 파생 데이터 모델 설계',
      '시간 감쇠·공동 언급·최근성 3축 지표 + WMA 알고리즘 기반 관계 시각화',
      '한국어 날짜 표현 토큰 기반 파서 직접 설계 (11가지 토큰 카테고리)',
      'Vercel + AWS RDS 프로덕션 배포 및 Capacitor Android 앱 빌드',
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Three.js', 'Prisma', 'Auth.js v5', 'PostgreSQL', 'Vercel', 'AWS RDS', 'Capacitor'],
    link: 'https://menode.app',
    linkLabel: 'Live Demo',
    isLive: true,
    overview: [
      '자유 텍스트 기록에서 사람·개념 간 관계를 자동으로 파생하고, 2D 공간에 시각화하는 개인 기록 서비스',
      '@멘션과 #날짜표현을 입력하면 시스템이 자동으로 Node, Mention, DateContext 관계를 생성',
      '320px 최소 지원 반응형 UI와 Capacitor Android 앱까지 모바일 대응을 설계',
    ],
    problemDefinition:
      '기존 메모 앱은 기록 간 관계를 표현하기 어렵습니다. 특정 사람이나 주제가 시간 흐름에 따라 어떻게 연결되는지 파악하려면 수많은 메모를 일일이 검색해야 하고, 관계의 강도나 맥락은 사용자의 기억에만 의존하게 됩니다. 단일 입력에서 자연스럽게 관계를 파생하고, 시간 감쇠·공동 언급·최근성 같은 지표로 관계를 정량화하여 시각적으로 탐색할 수 있는 시스템이 필요했습니다.',
    keyFeatures: [
      { title: '관계 자동 파생', description: 'Notes에 @멘션을 사용하면 해당 이름의 Node가 자동 생성되고, NoteMention 관계로 연결됩니다. mentionCount로 동일 노드의 반복 멘션 횟수를 추적하여 관계 강도를 측정합니다. Prisma 스키마 레벨에서 부분 인덱스(WHERE deleted_at IS NULL)와 복합 인덱스(userId, createdAt DESC)를 적용하여 소프트 삭제된 데이터를 쿼리에서 자동 제외하고 검색 성능을 확보했습니다.' },
      { title: '한국어 날짜 파서', description: '한국어 날짜 표현을 토큰 단위로 분리·해석하는 규칙 기반 파서를 직접 설계했습니다. tokenizer(문자열→토큰), calculator(토큰→날짜), validator(유효성 검증), types(타입 정의) 4개 모듈로 구성됩니다. #내일오후2시, #다다음주월요일 같은 표현을 11가지 토큰 카테고리(RELATIVE_DAY, WEEK, WEEKDAY, MONTH 등)의 패턴 매칭만으로 정규화하며, AI 추론 없이 100% 결정론적으로 동작합니다.' },
      { title: 'Space 관계 시각화', description: '시간 감쇠 중요도(e^(-daysSince/τ) 가중합), 공동 언급 유사도(cosine 정규화 co-occurrence), 최근성(마지막 사용 시점 기반) 3축 지표를 조합합니다. Weighted Mean Angle 알고리즘으로 노드의 각도를 이웃 노드의 가중 평균으로 반복 수렴시켜, 동일 입력에 대해 항상 동일한 좌표를 출력하는 결정론적 레이아웃을 구현했습니다. Canvas 2D에 동심원 기반 관계도를 렌더링합니다.' },
      { title: '크로스 플랫폼 모바일 대응', description: '320px 최소 지원 반응형 UI를 설계하고, Canvas 터치 인터랙션(탭·드래그·핀치줌)을 구현했습니다. Capacitor 기반으로 Android WebView 앱을 빌드하여 네이티브 앱 형태로도 배포 가능하도록 했습니다. 모바일 환경에서의 성능을 고려하여 레이아웃 캐싱(space-cache.ts)으로 동일 데이터에 대한 재계산을 방지합니다.' },
    ],
    techDecisions: [
      { tech: 'Next.js App Router', reason: '서버 컴포넌트와 API Routes를 단일 프레임워크에서 관리하고, Vercel 배포와의 자연스러운 통합으로 인프라 복잡도를 최소화했습니다.' },
      { tech: '규칙 기반 파서 (vs. AI 추론)', reason: 'AI 추론은 비결정적이고 API 비용이 발생합니다. 명시적 패턴 매칭만으로 100% 결정론적 파싱을 보장하고, 오프라인에서도 동작하도록 설계했습니다.' },
      { tech: 'Weighted Mean Angle (vs. Force-Directed)', reason: '동일 입력에 대해 항상 동일한 좌표를 출력하는 결정론적 레이아웃이 필요했습니다. 물리 시뮬레이션은 매번 다른 결과를 생성하므로 WMA를 선택했습니다.' },
    ],
    problemSolving: [
      {
        problem: 'Vercel 서버리스 환경에서 AWS RDS PostgreSQL에 접속할 때, 연결 지연과 SSL 인증서 검증 실패가 반복적으로 발생했습니다. 로컬에서는 정상 동작하지만 프로덕션 배포 후 간헐적으로 DB 연결이 끊기는 상황이었습니다.',
        approach: '이 문제를 서버리스 환경의 구조적 특성에서 비롯된 것으로 파악했습니다. Vercel의 서버리스 함수는 콜드 스타트 시마다 새로운 DB 연결을 생성하므로, 커넥션 풀링과 SSL 설정을 서버리스 환경에 맞게 재구성해야 했습니다. Prisma pg-adapter 설정을 최적화하고, prisma.config.ts에서 서울 리전 RDS 에 맞는 SSL 인증서와 보안 헤더(CSP 등)를 적용했습니다.',
        result: '서울 리전 Vercel + AWS RDS 조합으로 안정적인 프로덕션 서비스를 운영 중이며, 현재까지 DB 연결 관련 장애 없이 서비스되고 있습니다.',
      },
      {
        problem: '"다다음주"를 파싱할 때 "다음주"가 먼저 매칭되어 "다"가 잔류하는 문제가 발생했습니다. 한국어 날짜 표현은 짧은 단어가 긴 단어의 접두사가 되는 경우가 많아(다음주/다다음주, 어제/그저께), 단순 순차 매칭으로는 올바른 토큰 분리가 불가능했습니다.',
        approach: '이 문제를 "토큰 매칭의 우선순위 문제"로 인식하고, 긴 패턴 우선 매칭(greedy match) 전략을 적용했습니다. 토큰 사전을 문자열 길이 내림차순으로 정렬하여 "다다음주"가 "다음주"보다 먼저 시도되도록 했습니다. 또한 파서의 스코프를 "명시적 패턴만 처리"로 엄격히 한정하여, 패턴에 없는 애매한 표현은 추론하지 않고 무시하도록 의도적으로 설계했습니다.',
        result: '11가지 토큰 카테고리로 대부분의 한국어 날짜 표현을 안정적으로 파싱하는 결정론적 파서를 완성했으며, 패턴 추가만으로 새로운 표현을 지원할 수 있는 확장 가능한 구조를 확보했습니다.',
      },
    ],
    outcomes: [
      '"단일 입력에서 관계를 자동 파생한다"는 핵심 사상을 데이터 모델로 구현하면서, 스키마 설계가 제품의 사용자 경험을 직접 결정한다는 것을 체감했습니다. 부분 인덱스, Soft delete, 감사 로그 등 실무 패턴을 직접 적용해봤습니다',
      'WMA 결정론적 레이아웃 알고리즘을 직접 설계하면서, 기존 라이브러리(Force-Directed)를 쓰지 않고 요구사항에 맞는 알고리즘을 직접 만드는 경험을 했습니다. "왜 이 알고리즘을 선택했는가"에 대한 근거를 ADR로 남기는 습관도 이 과정에서 형성됐습니다',
      'Vercel + AWS RDS 프로덕션 배포를 직접 경험하면서, 서버리스 환경의 DB 연결 관리, SSL 설정, 보안 헤더 적용 등 운영 관점의 엔지니어링을 경험했습니다',
      'ADR(Architecture Decision Record) 15개로 아키텍처 결정의 근거를 문서화하는 습관을 형성했습니다. 특히 "토큰 기반 파서 vs AI 추론", "WMA vs Force-Directed" 같은 트레이드오프 기록이 이후 유지보수에 큰 도움이 됐습니다',
    ],
    links: [
      { label: 'Live Service', url: 'https://menode.app' },
    ],
  },

  // ─── POKUZZLE ──────────────────────────────────────────────────
  {
    id: 'pokuzzle',
    title: 'POKUZZLE',
    subtitle: '8×8 그리드 위 인접 타일로 포커 핸드를 구성하는 전략 퍼즐 웹 게임',
    teamType: 'Solo',
    projectType: 'live',
    period: '2026.02',
    tags: ['TypeScript', 'React', 'Canvas'],
    highlights: [
      'React + Canvas 하이브리드 구조로 UI 유연성과 보드 렌더링 성능 동시 확보',
      'BFS 연결성 + Hamiltonian 경로 탐색으로 경로 검증 엔진 구현',
      'EventBus 기반 이벤트 드리븐 아키텍처로 5개 시스템 모듈 느슨한 결합',
      '128개 테스트(Vitest)로 핸드 평가·경로 탐색·상태 파이프라인 검증',
    ],
    techStack: ['TypeScript', 'React', 'HTML5 Canvas', 'Vite', 'Vitest'],
    link: 'https://pokuzzle.com',
    linkLabel: 'Live Demo',
    isLive: true,
    overview: [
      '8×8 카드 그리드에서 인접한 타일을 선택하여 포커 핸드를 구성하는 전략 퍼즐 웹 게임',
      '12가지 핸드 랭크, Shape Multiplier, Lock & Ability, Combo 시스템 등 다층적 게임 메커니즘 설계',
      'EventBus 기반 이벤트 드리븐 아키텍처로 5개 시스템 모듈의 느슨한 결합을 달성',
    ],
    problemDefinition:
      '카드 게임과 퍼즐 게임의 전략적 깊이를 결합한 새로운 장르를 만들고 싶었습니다. 단순 매칭이 아닌, 경로의 기하학적 형태(직선/L자/T자/대각선)와 핸드 조합이 점수에 영향을 미치는 다층 전략 구조를 목표로 했고, 이를 뒷받침할 수 있는 게임 엔진 수준의 아키텍처가 필요했습니다.',
    keyFeatures: [
      { title: 'BFS 연결성 + Hamiltonian 경로', description: '타일 선택 시 4/8방향 BFS로 모든 타일이 연결되어 있는지 먼저 검증합니다. 연결이 확인되면 DFS 기반 Hamiltonian 경로 탐색으로 모든 타일을 정확히 한 번 방문하는 경로를 찾고, 방향 변경 횟수를 계산하여 LINEAR(0회)/L_SHAPE(1회) 형태를 판별합니다. Hamiltonian 경로가 존재하지 않으면 브랜칭이 있는 것이므로 T_SHAPE으로 분류합니다. 대각선 사용 여부는 4방향-only 연결 불가 시 DIAGONAL로 판별합니다.' },
      { title: '포커 핸드 평가 엔진', description: '1~5장 가변 핸드를 지원하며, 3벌 덱(156장) 환경 전용 히든 족보(Five of a Kind, Flush House, Wild Flush)를 포함한 12가지 랭크를 평가합니다. 와일드 카드 처리는 1장일 때 52가지 대체를 모두 시도하고, 2장 이상은 재귀적 DFS로 조합을 탐색합니다. 5장 전부 와일드인 경우 즉시 최고 랭크(Wild Flush)를 반환하는 조기 종료로 불필요한 연산을 방지합니다.' },
      { title: 'EventBus 아키텍처', description: 'Observer 패턴 기반 EventBus를 중앙 메시지 브로커로 사용하여, GameStateManager(오케스트레이터), ScoringSystem(점수·콤보·피버), LockSystem(잠금·미션), AbilitySystem(능력치), RefillSystem(재충전) 5개 모듈이 이벤트 구독만으로 소통합니다. 핸들러 에러가 다른 핸들러에 전파되지 않도록 try-catch로 에러를 격리하고, once()로 1회성 구독을 지원합니다.' },
      { title: 'Canvas 렌더링 최적화', description: 'React + Canvas 하이브리드 구조에서, 디바이스 픽셀 비율(DPR)을 고려한 오프스크린 캔버스에 타일을 미리 렌더링하여 캐싱합니다. requestAnimationFrame 기반 60fps 렌더링 루프를 구현하고, BoardRenderer(보드 전체), TileRenderer(개별 타일 그라데이션·글로우), AnimationManager(타일 제거·리필·피버 애니메이션)로 렌더링 책임을 분리했습니다.' },
    ],
    techDecisions: [
      { tech: 'React + Canvas 하이브리드', reason: 'UI(점수, 버튼, 모달)는 React의 선언적 렌더링으로, 보드(8×8 그리드, 애니메이션)는 Canvas의 명령형 렌더링으로 분리하여 각각의 강점을 활용했습니다.' },
      { tech: 'EventBus (vs. Redux/Context)', reason: '게임 시스템 모듈 간 통신은 이벤트 기반이 자연스럽습니다. 상태 관리 라이브러리보다 Observer 패턴이 게임 루프의 비동기적 특성에 더 적합했습니다.' },
      { tech: 'Vitest', reason: 'Vite 기반 프로젝트에서 빠른 테스트 실행과 TypeScript 네이티브 지원이 필요했고, 128개 테스트가 밀리초 단위로 완료됩니다.' },
    ],
    problemSolving: [
      {
        problem: '와일드카드가 2장 이상 포함된 핸드에서 최적 조합을 탐색할 때, 가능한 대체 조합의 수가 기하급수적으로 증가했습니다. 와일드 1장은 52가지, 2장은 52×52=2,704가지, 3장 이상은 수만 가지 조합을 평가해야 하므로, 순진한 전수 탐색으로는 실시간 게임에서 사용할 수 없는 수준의 지연이 발생했습니다.',
        approach: '이 문제를 "탐색 공간을 줄이는 것"과 "탐색을 빨리 끝내는 것" 두 가지로 분리해서 접근했습니다. 먼저 5장 전부 와일드인 경우는 즉시 최고 랭크(Wild Flush)를 반환하는 조기 종료를 적용했고, 1장인 경우는 52가지 대체를 순차 시도하되 Royal Flush가 발견되면 즉시 중단합니다. 2장 이상은 재귀적 DFS로 한 장씩 대체하며 탐색하되, 각 재귀 단계에서 현재까지의 최고 랭크보다 높은 랭크가 불가능한 조합은 가지치기하는 방식을 적용했습니다.',
        result: '최악의 경우에도 실시간 평가가 가능한 수준의 성능을 유지하면서, 모든 와일드 카드 조합에 대해 정확한 최적 핸드를 도출합니다.',
      },
      {
        problem: 'GameStateManager, ScoringSystem, LockSystem, AbilitySystem, RefillSystem 5개 모듈이 서로의 상태에 의존하면서, 한 모듈의 상태 변경이 다른 모듈에 예측하기 어려운 영향을 미치는 복잡성이 발생했습니다. 특히 핸드 완료 후 Lock 해제 → Ability 획득 → 점수 계산 → 리필의 순서가 꼬이면 게임 상태가 비정상이 되었습니다.',
        approach: '이 문제의 근본 원인을 "모듈 간 직접 호출로 인한 강한 결합"으로 판단했습니다. 직접 호출을 모두 제거하고, EventBus를 중앙 메시지 브로커로 도입하여 모듈 간 통신을 이벤트 기반으로 전환했습니다. 그리고 실행 순서 문제는 GameStateManager가 8단계 상태 파이프라인(INIT→IDLE→SELECTING→EVALUATING→CLEARING→REFILLING→IDLE)을 오케스트레이션하는 방식으로 해결했습니다. 각 단계 전환 시 이벤트를 발행하고, 해당 이벤트를 구독하는 모듈만 반응하므로 실행 순서가 상태 전이에 의해 자연스럽게 결정됩니다.',
        result: '각 시스템이 독립적으로 테스트 가능해졌고(9개 테스트 스위트, 128개 테스트), 새로운 시스템(예: Ability) 추가 시 기존 코드 변경 없이 이벤트 구독만으로 통합할 수 있는 확장 가능한 구조를 확보했습니다.',
      },
    ],
    outcomes: [
      'BFS 연결성 검증과 Hamiltonian 경로 탐색을 결합한 알고리즘을 직접 설계하면서, 이산 수학적 개념을 실제 게임 메커니즘으로 구현하는 과정을 경험했습니다. 특히 "연결성"과 "형태 판별"을 분리해서 접근한 것이 알고리즘 설계의 핵심이었습니다',
      'EventBus 아키텍처를 직접 구현하면서, 이벤트 드리븐 설계가 모듈 간 결합도를 얼마나 효과적으로 낮추는지 체감했습니다. Redux나 Context를 쓰지 않은 것은 의도적인 선택이었고, 게임이라는 도메인에서 Observer 패턴이 왜 더 자연스러운지를 직접 확인했습니다',
      '게임 상태 파이프라인 오케스트레이션을 설계하면서, 상태 머신이 복잡한 비즈니스 로직의 실행 순서를 명확하게 관리하는 도구라는 것을 배웠습니다',
      '기술적 완성도와 사용자 경험의 교차점에서 제품을 만드는 감각을 키웠습니다. 턴 타이머 없음, 즉각 피드백, 연속 보상 루프 같은 설계 판단이 기술이 아닌 사용자 관점에서 이루어졌습니다',
    ],
    links: [
      { label: 'Live Demo', url: 'https://pokuzzle.com' },
    ],
  },

  // ─── YT Insights ───────────────────────────────────────────────
  {
    id: 'yt-insights',
    title: 'YT Insights',
    subtitle: 'YouTube Most Replayed 히트맵을 분석해 시청자 행동을 정량화하는 영상 분석 서비스',
    teamType: 'Solo',
    projectType: 'live',
    period: '2025.11 – 12',
    tags: ['Next.js', 'Playwright', 'Statistics'],
    highlights: [
      'SVG 히트맵 스크래핑 → Bezier 파싱 → 보간 → 통계 분석 전체 파이프라인',
      'IQR 적응형 임계값 + 피크 돌출도 기반 하이라이트 탐지',
      'De Casteljau 보간으로 저해상도 데이터 복원',
      '4단계 duration fallback 체인 및 챕터 대응',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Playwright', 'IndexedDB', 'KaTeX'],
    link: 'https://ytinsights.dev',
    linkLabel: 'Live Demo',
    isLive: true,
    overview: [
      'YouTube Most Replayed 히트맵을 Playwright로 스크래핑하고, SVG Cubic Bezier 곡선을 파싱·보간하여 시청자 행동을 정량화하는 영상 분석 서비스',
      '5가지 통계 지표(Replay Peak, Drop Rate, Stability, Highlight Density, Engagement Curve)로 시청 패턴을 분석',
      'KaTeX 수식 렌더링으로 각 지표의 수학적 설명을 Wiki에 제공',
    ],
    problemDefinition:
      'YouTube의 "Most Replayed" 히트맵은 시청자 행동의 풍부한 데이터를 담고 있지만, 단순 시각적 표시에 그칩니다. 어떤 구간이 왜 많이 재시청되었는지, 이탈이 심한 구간은 어디인지, 전체적인 시청 안정성은 어떤지를 정량적으로 분석하면 콘텐츠 크리에이터에게 유용한 인사이트가 됩니다. 하지만 이 데이터는 공식 API로 제공되지 않아, 수집부터 분석까지 전체 파이프라인을 직접 구축해야 했습니다.',
    keyFeatures: [
      { title: 'SVG 히트맵 스크래핑', description: 'Playwright Headless Chrome으로 YouTube 영상 페이지를 로드하고, SVG path의 d 속성에서 M(이동)·C(Cubic Bezier)·L(직선) 명령어를 파싱합니다. Y좌표 반전·정규화를 거쳐 0~1 범위의 popularity 시계열 데이터를 생성합니다. 영상 길이(duration) 획득은 DOM 직접 추출 → 페이지 메타데이터 → YouTube Data API v3 → SVG 좌표 역추정의 4단계 fallback 체인으로 안정성을 확보했습니다.' },
      { title: 'De Casteljau 보간 엔진', description: 'YouTube 히트맵 SVG의 Cubic Bezier 세그먼트를 De Casteljau 알고리즘으로 N등분 보간하여 저해상도 데이터를 복원합니다. 영상 길이에 비례하여 목표 분당 포인트 밀도(targetPointsPerMinute)를 자동 산출하고, needsInterpolation() 함수가 영상 길이 대비 원본 포인트 부족 여부를 판단하여 보간을 적응적으로 적용합니다.' },
      { title: '5가지 통계 분석 지표', description: 'Replay Peak(원본 데이터에서 직접 최대값 탐색, 이동평균 왜곡 방지), Drop Rate(Window=3 스무딩 후 1차 차분 기반 최대 하락 구간 탐지), Stability Score(5초 단위 시간 기반 윈도우 + CRITICAL_VARIANCE=400 절대 임계값으로 영상 간 비교 가능한 안정성 지표), Highlight Density(IQR 적응형 임계값 + 피크 돌출도 + 로컬 딥 기반 분할), Engagement Curve(이동평균 스무딩 참여도 곡선)를 구현했습니다.' },
      { title: 'Wiki(수식 문서)', description: '앱 내 /wiki 경로에서 각 지표의 수학적 계산 방식과 해석 가이드를 KaTeX 수식 렌더링으로 제공합니다. Stability Score의 공식(stability = 1 - min(1, localVariance / CRITICAL_VARIANCE))이나 Bezier 보간 공식 등 분석 엔진의 수학적 근거를 사용자가 직접 확인할 수 있습니다.' },
    ],
    techDecisions: [
      { tech: 'Playwright (vs. API 직접 호출)', reason: 'YouTube Most Replayed 데이터는 공식 API로 제공되지 않아, Headless Chrome 기반 스크래핑이 유일한 수집 방법이었습니다.' },
      { tech: 'IQR 기반 임계값 (vs. 고정 임계값)', reason: '영상마다 popularity 분포가 다르므로, IQR(사분위수 범위) 기반 적응형 임계값이 고정 임계값보다 다양한 영상에 안정적으로 작동합니다.' },
      { tech: 'Absolute Threshold Stability', reason: '상대적 Min-Max 정규화는 잔잔한 영상이 과대 표현되는 문제가 있어, 절대 임계값(CRITICAL_VARIANCE = 400)으로 영상 간 비교 가능한 지표를 설계했습니다.' },
    ],
    problemSolving: [
      {
        problem: 'YouTube 페이지에서 영상 길이(duration)를 가져오는 방법이 환경에 따라 다르게 동작했습니다. 로컬 브라우저에서는 video.duration으로 바로 가져올 수 있지만, 클라우드 서버리스 환경에서는 DOM이 완전히 로드되지 않거나, 지역 제한 영상에서는 메타데이터 자체가 다른 형식으로 제공되어 duration을 안정적으로 획득할 수 없었습니다.',
        approach: '이 문제를 "단일 방법에 의존하면 어떤 환경에서든 실패할 수 있다"는 관점에서 접근했습니다. 4단계 fallback 체인을 설계하여 video.duration → ytInitialPlayerResponse(페이지 메타데이터) → DOM 파싱 → YouTube Data API v3 순으로 시도하되, 각 단계에서 실패하면 자동으로 다음 방법으로 전환됩니다. 각 fallback 단계에는 타임아웃과 유효성 검증을 포함하여, 잘못된 값이 전파되지 않도록 했습니다.',
        result: '클라우드 환경, 지역 제한 영상, 라이브 종료 영상 등 다양한 예외 상황에서도 안정적으로 duration을 획득하며, 프로덕션에서 duration 획득 실패로 인한 분석 중단이 발생하지 않습니다.',
      },
      {
        problem: '챕터가 있는 영상에서 히트맵이 전체 영상이 아닌 챕터별로 분리된 SVG로 제공되었습니다. 기존 파싱 로직은 단일 SVG path를 전제로 작성되어 있어, 챕터 영상에서는 첫 번째 챕터의 데이터만 파싱되고 나머지가 누락되는 문제가 있었습니다.',
        approach: '챕터별 SVG가 별도의 좌표계를 사용한다는 것을 분석하고, 각 챕터의 시간 범위(startTime, endTime)를 먼저 파악한 뒤, 챕터별 SVG 좌표를 전체 영상 타임라인의 해당 구간에 정확히 매핑하여 병합하는 로직을 구현했습니다. 챕터 경계에서 데이터가 불연속이 되지 않도록, 인접 챕터의 경계값을 보간으로 연결했습니다.',
        result: '챕터 유무에 관계없이 일관된 전체 영상 데이터를 분석 엔진에 제공하며, 분석 결과에서 챕터 경계가 인위적인 불연속으로 나타나지 않습니다.',
      },
    ],
    outcomes: [
      '데이터 파이프라인 전체(수집→파싱→보간→분석→시각화)를 처음부터 끝까지 직접 설계·구현하면서, 각 단계의 입출력 인터페이스를 명확하게 정의하는 것이 파이프라인 안정성의 핵심이라는 것을 배웠습니다',
      'IQR 적응형 임계값, 피크 돌출도, Absolute Threshold 등 통계 개념을 분석 엔진에 직접 적용하면서, 수학적 근거가 있는 알고리즘이 사용자에게 신뢰감을 준다는 것을 경험했습니다. Wiki 페이지를 통해 수식을 투명하게 공개한 것도 이 맥락입니다',
      'De Casteljau 곡선 보간을 실전에 적용하면서, 수학적 알고리즘을 코드로 구현하는 과정에서의 부동소수점 오차 처리, 적응형 밀도 산출 같은 실무적 고려사항을 경험했습니다',
      '4단계 fallback 패턴을 설계하면서, "하나의 방법이 실패해도 서비스가 중단되지 않는 구조"가 프로덕션 서비스의 기본 요건이라는 것을 체감했습니다',
    ],
    links: [
      { label: 'Live Demo', url: 'https://ytinsights.dev' },
    ],
  },

  // ─── LectureSummarizer ─────────────────────────────────────────
  {
    id: 'lecture-summarizer',
    title: 'LectureSummarizer',
    subtitle: '강의 영상을 로컬에서 전사하고, AI로 타임라인·학습 노트를 구조화해 제공하는 시스템',
    teamType: 'Solo',
    projectType: 'opensource',
    period: '2025.10 – 11',
    tags: ['Node.js', 'FastAPI', 'Chrome Extension'],
    highlights: [
      'Chrome Extension + Node.js + Python FastAPI 3티어 마이크로서비스',
      '7단계 처리 파이프라인 설계 (비디오 → 전사 → 분석 → 노트)',
      '로그 회귀 모델 기반 처리 시간 예측 시스템',
      'Portable 빌드 + 시스템 트레이 앱으로 무설치 배포',
    ],
    techStack: ['Chrome Extension', 'Node.js', 'Express', 'Python', 'FastAPI', 'Faster-Whisper', 'FFmpeg', 'OpenAI API'],
    link: 'https://github.com/baobab00/lecture-summarizer',
    linkLabel: 'Repository',
    isLive: false,
    overview: [
      'YouTube 및 일반 웹페이지의 강의 영상을 로컬에서 전사하고, GPT-4o-mini로 타임라인·학습 노트를 자동 생성하는 시스템',
      'Chrome Extension → Node.js → Python FastAPI의 3티어 마이크로서비스 구조',
      'Portable 빌드로 Python·Node.js·FFmpeg·Whisper 모델을 포함한 무설치 배포 지원',
    ],
    problemDefinition:
      '긴 강의 영상을 시청하며 직접 노트를 작성하는 것은 비효율적입니다. 기존 요약 서비스는 클라우드 전사에 의존하여 분당 $0.006의 비용이 발생하고, 한국어 전문 용어 처리가 미흡했습니다. 로컬 전사(완전 무료) + AI 요약(1시간 강의 기준 $0.002~0.005)으로 비용 효율적인 학습 노트를 자동 생성하되, 사용자가 개발 환경을 직접 설치할 필요 없이 바로 사용할 수 있어야 했습니다.',
    keyFeatures: [
      { title: '7단계 처리 파이프라인', description: '비디오 선택 → yt-dlp 동영상 다운로드 → FFmpeg 음성 추출(32kbps 16kHz MP3) → 20MB 초과 시 자동 분할 → Faster-Whisper 로컬 전사(타임스탬프 세그먼트) → GPT-4o-mini 내용 분석(도메인 감지, 전문 용어 교정) → 3탭 HTML 노트 생성(스크립트/타임라인/학습 요약). 각 단계가 독립 모듈로 구현되어, 한 단계의 실패가 다른 단계에 전파되지 않는 실패 격리 구조입니다.' },
      { title: 'Chrome Extension 미디어 감지', description: 'Content Script에서 YouTube URL과 DOM <video> 요소를 자동 감지하고, MediaSource/Blob URL도 캡처를 시도합니다. Manifest v3 Service Worker가 메시지 브로커 역할을 하며, Extension → Node.js API 서버 간 통신을 중계합니다. SSE 기반 실시간 진행도를 Extension popup에 표시하여 처리 상태를 시각적으로 확인할 수 있습니다.' },
      { title: '성능 측정·예측', description: 'PerformanceTracker 클래스가 세션 ID 기반으로 7단계 각각의 시작/종료 시간을 자동 측정하고, 단계별 소요 시간과 비율(%)을 JSON으로 직렬화합니다. PerformanceLogger가 최대 200개 세션 이력을 보관하며, 과거 데이터 기반 로그 회귀 모델로 영상 길이 대비 예상 처리 시간을 산출하여 사용자에게 예측값을 제공합니다.' },
      { title: '무설치 배포', description: 'build-portable.ps1 스크립트로 Python·Node.js·FFmpeg·Whisper 모델을 모두 포함한 Portable ZIP을 생성합니다. 첫 실행 시 setup_script.py가 의존성을 자동 설치하고, pystray 기반 Windows 시스템 트레이 앱으로 원클릭 서버 제어(시작/중지), 상태 아이콘(idle/running/error), 웹 대시보드 열기를 지원합니다.' },
    ],
    techDecisions: [
      { tech: '마이크로서비스 분리', reason: 'Chrome Extension(UI), Node.js(오케스트레이션), Python(ML 전사)은 각각의 런타임과 역할이 뚜렷하므로 분리하여 독립 배포·확장이 가능하도록 했습니다.' },
      { tech: 'Faster-Whisper CPU (vs. Cloud API)', reason: '클라우드 전사 비용이 분당 $0.006인 반면, 로컬 Faster-Whisper는 완전 무료입니다. 1시간 강의 전체 비용이 $0.002~0.005(GPT 요약만)로 절감됩니다.' },
      { tech: 'Portable 빌드', reason: '사용자가 Python, Node.js, FFmpeg 등을 직접 설치하는 것은 높은 진입장벽입니다. 모든 의존성을 포함한 무설치 패키지로 사용자 경험을 최우선합니다.' },
    ],
    problemSolving: [
      {
        problem: 'Whisper 모델 로드 시 사용자 시스템의 메모리 부족으로 로드가 실패하거나, Portable 환경에서 모델 캐시 경로가 표준 경로와 달라 모델 파일을 찾지 못하는 문제가 반복적으로 발생했습니다. 로컬 ML 추론이라는 특성상, 다양한 사용자 환경에서의 안정적인 모델 관리가 필수적이었습니다.',
        approach: '이 문제를 "모델 생명주기 관리"와 "환경 적응"이라는 두 측면으로 분리했습니다. 모델 관리는 FastAPI의 lifespan 이벤트를 활용하여 서버 시작 시 모델 로드, 종료 시 언로드를 자동화하고, 로드 실패 시 최대 3회 재시도하는 복원 로직을 구현했습니다. 환경 적응은 Portable 빌드에서 모델 캐시 경로를 실행 파일 기준 상대 경로로 자동 탐지하도록 하여, 표준 설치 환경과 Portable 환경 모두에서 동일하게 동작하도록 했습니다.',
        result: '다양한 시스템 환경(메모리 2GB~16GB)에서 안정적으로 모델을 로드하고, 실패 시 graceful 복구가 가능합니다.',
      },
      {
        problem: '1시간 이상의 긴 강의를 전사할 때, 추출된 오디오 파일이 수백 MB에 달하면서 Whisper 모델의 메모리 한계를 초과하는 상황이 발생했습니다. 전사 프로세스가 OOM(Out of Memory)으로 강제 종료되어, 긴 강의의 전사 자체가 불가능했습니다.',
        approach: '전사 프로세스에 오디오 전체를 한 번에 넘기는 것이 아니라, 파이프라인에 "음성 분할" 단계를 추가하는 것이 근본적인 해결책이라고 판단했습니다. 20MB 초과 시 FFmpeg로 오디오를 자동 분할하고, 각 청크를 순차 전사한 후 타임스탬프를 오프셋 보정하여 매끄럽게 병합하는 로직을 구현했습니다. 분할 기준은 무음 구간(silence detection)을 우선 탐색하되, 무음 구간이 없으면 시간 기반으로 균등 분할합니다.',
        result: '1시간 이상의 긴 강의도 메모리 제한 없이 안정적으로 처리되며, 분할점의 타임스탬프 불일치 없이 연속적인 전사 결과를 생성합니다.',
      },
    ],
    outcomes: [
      '3티어 마이크로서비스 아키텍처를 직접 설계하면서, 프로세스 간 통신(Chrome Extension→Node.js REST→Python FastAPI), 독립 재시작, 실패 격리 같은 분산 시스템의 기본 패턴을 실전에서 경험했습니다',
      '7단계 파이프라인의 데이터 흐름을 설계하면서, 각 단계의 입출력 명세를 명확히 하는 것이 파이프라인 디버깅의 핵심이라는 것을 배웠습니다. 특히 PerformanceTracker로 단계별 병목을 정량적으로 파악할 수 있게 한 것이 최적화에 크게 도움됐습니다',
      'Portable 빌드와 시스템 트레이 앱을 구현하면서, "사용자가 개발 환경을 모른다"는 전제 하에 제품을 설계하는 경험을 했습니다. 기술적 완성도만큼 사용자의 진입 장벽을 낮추는 것이 제품의 가치를 결정한다는 것을 체감했습니다',
      'Chrome Extension Manifest v3 환경에서 Service Worker 기반 메시지 패싱, Content Script DOM 탐지, SSE 실시간 진행도를 구현하며 브라우저 확장 프로그램 개발 역량을 쌓았습니다',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/baobab00/lecture-summarizer' },
    ],
  },

  // ─── ChatGPT Blur ──────────────────────────────────────────────
  {
    id: 'chatgpt-blur',
    title: 'ChatGPT Blur',
    subtitle: 'ChatGPT 대화 내용을 블러 처리해 프라이버시를 보호하는 Chrome 확장 프로그램',
    teamType: 'Solo',
    projectType: 'live',
    period: '2025.09',
    tags: ['Chrome Extension', 'MutationObserver'],
    highlights: [
      'MutationObserver(50ms 디바운스)로 SPA DOM 변경 실시간 감지',
      '클래스·alt 텍스트·크기 기반 3중 필터링으로 블러 오적용 방지',
      'data-message-id 기반 개별 메시지 잠금·해제 상태 관리',
      'Chrome Web Store 실제 배포 및 운영',
    ],
    techStack: ['JavaScript', 'Chrome Extension', 'Chrome Storage API', 'MutationObserver'],
    link: 'https://chromewebstore.google.com/detail/chatgpt-blur/ghageddlnooippamdabmohhaaccimkfo',
    linkLabel: 'Chrome Web Store',
    isLive: true,
    overview: [
      'ChatGPT 대화 내용을 영역별로 블러 처리하여, 화면 공유나 프레젠테이션 중 대화 프라이버시를 보호하는 Chrome 확장 프로그램',
      'MutationObserver로 SPA 환경의 동적 DOM 변경을 실시간 감지하고 블러를 자동 재적용',
      'Chrome Web Store에 실제 배포하여 운영 중',
    ],
    problemDefinition:
      '화면 공유 중 ChatGPT 대화 내용이 그대로 노출되는 프라이버시 문제가 있었습니다. 기존 블러 확장 프로그램은 범용적이어서 ChatGPT의 SPA 특성을 고려하지 못했고, React 렌더링으로 DOM이 갱신될 때마다 블러가 풀려 새 메시지가 노출되는 문제가 있었습니다. ChatGPT에 특화된, SPA 환경에서도 안정적으로 동작하는 블러 도구가 필요했습니다.',
    keyFeatures: [
      { title: 'SPA 실시간 DOM 감지', description: 'MutationObserver를 childList와 subtree 옵션으로 ChatGPT 대화 컨테이너를 감시하되, 50ms 디바운스를 적용하여 React의 빈번한 DOM 업데이트로 인한 불필요한 재연산을 방지합니다. 새 메시지가 추가되거나 대화가 전환되면 블러를 자동으로 재적용하여, 사용자가 수동으로 블러를 재설정할 필요가 없습니다.' },
      { title: '영역별 선택적 블러', description: '사이드바(nav 내 menu-item), 대화(data-message-id 기반), 미디어(oaiusercontent·data/blob URL·picture 요소) 등 영역별로 CSS filter blur를 독립 적용합니다. --blur-amount CSS 변수로 블러 강도를 동적 제어하고, 사이드바에서는 상단 header, aside(앱/Codex), 하단 프로필, GPT 탐색 메뉴를 textContent 매칭(한국어/영어)으로 정밀하게 예외 처리합니다.' },
      { title: '개별 메시지 토글', description: 'data-message-id 기반 Set으로 블러 해제된 메시지 ID를 관리합니다. Ctrl+Shift+Click으로 특정 메시지만 토글할 수 있고, Ctrl+Shift+V로 전체 블러를 한 번에 켜고 끕니다. 페이지 전환 시 해제 상태를 의도적으로 초기화하여, 새 대화에서 실수로 이전 해제 상태가 유지되는 것을 방지합니다.' },
      { title: '설정 영속화', description: 'Chrome Storage API(sync)에 블러 강도·자동 적용 여부·영역별 설정을 저장하여, 브라우저를 재시작해도 설정이 유지됩니다. Background Script ↔ Content Script 간 메시지 패싱으로 단축키 기반 전역 토글을 구현했습니다.' },
    ],
    techDecisions: [
      { tech: 'MutationObserver + 디바운스', reason: 'ChatGPT SPA에서 DOM이 빈번하게 변경되므로, 50ms 디바운스로 불필요한 재연산을 방지하면서도 즉각적인 블러 재적용을 보장합니다.' },
      { tech: 'CSS filter blur (vs. overlay)', reason: '오버레이 방식은 클릭 이벤트를 차단하여 UX를 해치지만, CSS filter는 원본 레이아웃과 인터랙션을 보존하면서 시각적 프라이버시만 제공합니다.' },
    ],
    problemSolving: [
      {
        problem: '대화 영역의 이미지를 블러 처리할 때, 아바타·아이콘·프로필 이미지 같은 UI 요소까지 함께 블러되어 ChatGPT의 인터페이스 자체가 사용하기 어려워지는 문제가 발생했습니다. 단순히 img 태그를 전부 블러하는 방식으로는 콘텐츠 이미지와 UI 이미지를 구분할 수 없었습니다.',
        approach: '이 문제를 "예외를 식별하는 정밀도의 문제"로 파악하고, 단일 기준이 아닌 3중 필터링을 설계했습니다. (1) 클래스 기반: avatar, rounded-full 클래스를 포함하면 UI 요소로 판별, (2) alt 텍스트 기반: alt 속성에 "avatar"가 포함되면 제외, (3) 크기 기반: naturalWidth 또는 naturalHeight가 48px 이하면 아이콘으로 판별하여 제외. 이 세 가지 기준을 OR 조건으로 결합하여, 하나라도 해당되면 블러를 적용하지 않도록 했습니다.',
        result: '프로필 이미지, UI 아이콘 등은 정상 표시되면서 대화 내용의 이미지만 정확하게 블러 처리되어, 블러 상태에서도 ChatGPT 인터페이스를 정상적으로 사용할 수 있습니다.',
      },
    ],
    outcomes: [
      'Chrome Web Store에 실제 제품을 출시하면서, 개발 → 심사 → 배포 → 업데이트의 제품 라이프사이클 전체를 경험했습니다. 사용자 리뷰와 피드백을 반영하여 v2 리팩토링(2025.12~2026.01)을 진행한 경험은 "출시가 끝이 아니라 시작"이라는 것을 체감하게 해줬습니다',
      'SPA 환경에서 MutationObserver를 활용한 동적 DOM 감지를 구현하면서, 모던 웹 애플리케이션의 렌더링 특성과 그에 맞는 DOM 조작 전략을 깊이 이해하게 되었습니다',
      '화면 공유 중 프라이버시 노출이라는 실제 불편함을 직접 기술로 해결한 경험이, "사용자 문제를 발견하고 기술로 해결하는 것"이 개발의 본질이라는 확신을 갖게 해줬습니다',
    ],
    links: [
      { label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/chatgpt-blur/ghageddlnooippamdabmohhaaccimkfo' },
      { label: 'GitHub', url: 'https://github.com/baobab00/chatgpt-blur-extension' },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return allProjects.find((p) => p.id === id);
}

export function getProjectsByType(type: string): Project[] {
  if (type === 'all') return allProjects;
  return allProjects.filter((p) => p.projectType === type);
}
