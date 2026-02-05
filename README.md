# 📚 STUDIGO - 커뮤니티 플랫폼 개발 프로젝트

> 함께 공부하고 소통하는 학습 커뮤니티, StudiGo의 프론트엔드 저장소입니다.

---

## 📖 프로젝트 소개

> StudiGo는 학습자들이 정보를 공유하고 질문을 주고받는 커뮤니티 서비스입니다.
> 이번 단계에서는 게시글 상세 조회, 수정, 삭제 기능 및 퀴즈 인터랙션 등 사용자 중심의 핵심 기능을 구현합니다.

---

## 🔗 배포 링크

> ### 🚧 https://studigo.kro.kr/community

> **테스트 계정**
>
> - [공통 비밀번호: string135!]

# USER

user@example.com
user1@example.com
user2@example.com
user3@example.com
user4@example.com
user5@example.com
user6@example.com
user7@example.com
user8@example.com
user9@example.com

# STAFF (is_staff = true)

staff1@example.com
staff2@example.com
staff3@example.com
staff4@example.com
staff5@example.com
staff6@example.com
staff7@example.com
staff8@example.com
staff9@example.com

# ADMIN (is_staff = true, is_superuser = true)

admin1@example.com
admin2@example.com
admin3@example.com
admin4@example.com
admin5@example.com
admin6@example.com
admin7@example.com
admin8@example.com
admin9@example.com

---

## 🚀 Getting Started

### 저장소 클론

```bash
git clone https://github.com/StudiGo-community/Frontend.git
cd frontend
```

### 환경 변수 설정

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 아래 내용을 추가합니다.

```env
NEXT_PUBLIC_API_BASE_URL=https://api.studi-go.site/api/v1
NEXT_PUBLIC_KAKAO_REDIRECT_URI=https://studi-go.site/auth/kakao/callback
```

### 설치

```bash
npm ci
```

### 개발 서버 실행

```bash
npm run dev
```

---

## ✨ 주요 기능

### 커뮤니티 (핵심 기능)

- 게시글 목록 조회 (카테고리 필터링 및 검색)
- 게시글 상세 정보 조회 및 조회수 트래킹
- 게시글 작성 / 수정 / 삭제 (CRUD)
- 게시글 좋아요 토글 및 부적절한 콘텐츠 신고
- 게시글 댓글 작성 / 수정 / 삭제 (CRUD)

```
1. 게시글 관리 및 인터랙션
리치 텍스트 에디팅: Tiptap 에디터를 도입하여 마크다운 기반의 풍부한 본문 작성 및 HTML 직렬화(Serialization) 구현

권한 기반 접근 제어: 작성자 ID와 현재 로그인 유저 ID를 비교하여 본인 게시글에 대해서만 수정/삭제 권한 부여

낙관적 업데이트 (Optimistic Updates): TanStack Query의 useMutation을 활용하여 좋아요 클릭 시 서버 응답 전 UI를 즉시 갱신하는 최적화된 UX 제공


2. 데이터 렌더링 및 검증
다형성 렌더링 (Polymorphic Rendering): 에디터에서 작성된 데이터를 Tailwind Typography(prose)를 통해 시안과 1:1로 일치하는 고품질 뷰 제공

런타임 타입 안정성: Zod 스키마로 요청 데이터를 검증하고, 추출된 타입을 전역에 적용하여 any 사용을 배제한 안정적 아키텍처 구축
```

### 실시간 채팅방

- 실시간 메시지 송수신 및 채팅방 참여
- 채팅 내역 무한 스크롤 및 캐싱
- 접속자 리스트 조회 및 실시간 알림
- 한국어-스페인어 번역 및 TTS 지원

```
1. 실시간 통신 및 상태 관리
실시간 스트리밍: WebSocket 또는 실시간 API 연동을 통해 끊김 없는 사용자 간 소통 환경 구축

채팅 최적화: features/chat 레이어 내 전용 스토어(Zustand)와 유틸리티(useChatScroll)를 통해 대량의 메시지 데이터 흐름을 효율적으로 제어


2. 다국어 학습 지원 기능 (Learning Support)
실시간 언어 번역: 외부 번역 API를 연동하여 한국어-스페인어 간 즉각적인 메시지 번역 기능을 제공함으로써 학습 편의성 증대

음성 합성(TTS): 텍스트 데이터를 음성으로 변환하여 제공함으로써 원어민 발음 학습 및 언어 습득 효율성 극대화
```

### 마이페이지

- 내 프로필 정보 조회 및 프로필 이미지 수정
- 내가 작성한 게시글 및 활동 내역(좋아요/댓글) 통합 관리
- 일일 출결(Attendance) 현황 확인 및 오늘의 퀴즈 연동
- 계정 보안 관리 및 회원 탈퇴 프로세스

```
1. 개인화 서비스 및 데이터 관리
데이터 아카이빙: 사용자의 파편화된 활동 이력을 도메인별 영역에서 체계적으로 관리하여 개인 맞춤형 대시보드 제공

게이미피케이션 요소: 일일 출결 확인 시스템과 학습 바로가기 기능을 결합하여 사용자의 지속적인 방문 및 학습 동기 부여


2. 반응형 UI 및 최적화
디자이너적 관점의 인터페이스: 프로필 이미지 업로드 및 정보 수정 시 즉각적인 시각적 피드백을 제공하여 데이터 변경 상태를 직관적으로 인지하도록 구현
```

---

## 🧰 기술 스택

<div>

#### Framework / Language

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> 
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=React&logoColor=61DAFB"> 
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"> 
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">

#### Styling / UI

<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"> 
<img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"> 
<img src="https://img.shields.io/badge/Tiptap-000000?style=for-the-badge&logo=tiptap&logoColor=white"> 
<img src="https://img.shields.io/badge/Lucide_Icons-FF4154?style=for-the-badge&logo=lucide&logoColor=white">

#### State & Data Management

<img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white"> 
<img src="https://img.shields.io/badge/zustand-433e38?style=for-the-badge&logo=zustand&logoColor=white"> 
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> 
<img src="https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"> 
<img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white">

#### Code Quality / Dev Tools

<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white"> 
<img src="https://img.shields.io/badge/Prettier-FF4F8B?style=for-the-badge&logo=Prettier&logoColor=white"> 
<img src="https://img.shields.io/badge/MSW-FF6A00?style=for-the-badge&logo=mockserviceworker&logoColor=white"> 
<img src="https://img.shields.io/badge/husky-054a76?style=for-the-badge&logo=git&logoColor=white">

#### 배포

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"> 
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">

</div>

---

## 👥 팀 소개

### FE

| <a href="https://github.com/jihyekim830"><img src="https://github.com/jihyekim830.png" width=100px /><br/><sub><b>@jihyekim830</b></sub></a><br/> |          <a href="https://github.com/pje8740"><img src="https://github.com/pje8740.png" width=100px /><br/><sub><b>@pje8740</b></sub></a><br/>           | <a href="https://github.com/fortes42-lgtm"><img src="https://github.com/fortes42-lgtm.png" width=100px /><br/><sub><b>@fortes42-lgtm</b></sub></a><br/> |
| :-----------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                      김지혜                                                                       |                                                                          박재은                                                                          |                                                                         박진우                                                                          |
|                                                                    팀장 (Lead)                                                                    |                                                                           팀원                                                                           |                                                                          팀원                                                                           |
|        프로젝트 초기 세팅, 화면정의서, <br/>공통 컴포넌트(모달, 토스트, 인풋), 오늘의 문제 학습배너, 채팅방 및 실시간 채팅, 어드민 페이지         | 프로젝트 초기 세팅, 화면정의서, <br/>공통 컴포넌트(드롭다운, 푸터, 페이지네이션), 로그인 및 회원가입, 마이페이지 및 계정관리(인증, 사용내역, 수정, 탈퇴) |              와이어프레임, 플로우차트, <br/>공통 컴포넌트(헤더, 버튼), 커뮤니티 메인페이지, 게시글(CRUD) 및 상세 페이지, 게시글 댓글(CRUD)              |

---

## 📑 프로젝트 규칙

> 자세한 내용은 각 문서를 참고해주세요.

| 문서                                  | 설명          |
| ------------------------------------- | ------------- |
| [BRANCH.md](./docs/BRANCH.md)         | 브랜치 전략   |
| [COMMIT.md](./docs/COMMIT.md)         | 커밋 컨벤션   |
| [CONVENTION.md](./docs/CONVENTION.md) | 코드 컨벤션   |
| [STRUCTURE.md](./docs/STRUCTURE.md)   | 프로젝트 구조 |

---

## 🧪 코드 품질 관리

- **Husky** pre-commit 훅을 통한 ESLint / Prettier 자동 검사
- **FSD Architecture** 계층 간 의존성 규칙 준수로 코드 결합도 최소화
- **No-Any Policy** 전역 Interface 정의 및 Strict Type-Safety 유지
- **MSW** API 모킹을 통한 독립적인 기능 개발 및 테스트 환경 구축
- **Zod** 런타임 스키마 검증을 통한 API 데이터 정합성 확보

---

## 🔚 마무리

> **OZ Coding School Final Collaboration Project**

<p align="right"><a href="#-studigo---학습-커뮤니티-플랫폼">⬆️ Back to Top</a></p>
