# 📁 Project Structure

> Feature-Sliced Design (FSD) 기반 프로젝트 폴더 구조입니다.

---

## 디렉토리 구조

```text
📦 프로젝트 루트
│
├── 📂 docs/                  # 📚 프로젝트 규칙 및 가이드라인 문서
│   ├── README.md
│   ├── CONVENTION.md
│   ├── BRANCH.md
│   ├── COMMIT.md
│   └── STRUCTURE.md
│
├── 📂 src/
│   ├── 📂 app/               # 📄 [Pages Layer] Next.js App Router (페이지 및 레이아웃 조립)
│   │   ├── (route-groups)/   # 논리적 라우트 그룹 관리
│   │   ├── layout.tsx        # 전역 레이아웃 설정
│   │   └── page.tsx          # 메인 엔트리 페이지
│   │
│   ├── 📂 features/          # ✨ [Features Layer] 독립적인 비즈니스 가치 단위
│   │   ├── community/        # 게시글 CRUD 및 유저 인터랙션 기능
│   │   ├── chat/             # 실시간 메시징, 번역(KR-ES), TTS 지원
│   │   ├── auth/             # 소셜 로그인 및 권한 관리
│   │   └── my-page/          # 개인 프로필 및 학습 데이터 관리
│   │
│   └── 📂 shared/            # 🛠️ [Shared Layer] 애플리케이션 전체 공용 도구
│       ├── 📂 ui/            # 범용 UI 컴포넌트 (Button, Input, Modal)
│       ├── 📂 api/           # Axios 인스턴스 및 공통 요청 설정
│       ├── 📂 lib/           # 전역 유틸리티 (cn, formatDate)
│       └── 📂 types/         # 전역 공유 타입 및 인터페이스
│
├── .husky/                   # 🐶 Git Hooks 설정 (pre-commit 린트 체크)
├── public/                   # 🖼️ 정적 에셋 (Images, Icons, Fonts)
├── package.json
├── tsconfig.json
├── next.config.mjs
└── README.md
```

---

## 주요 디렉토리 설명

| 디렉토리   | 설명                                                                                  |
| :--------- | :------------------------------------------------------------------------------------ |
| `app`      | Next.js 라우팅 계층으로, 하위 레이어들을 조립하여 최종 화면을 구성합니다.             |
| `features` | 기능(도메인) 단위의 비즈니스 로직을 포함하며, UI, API, Model을 독립적으로 관리합니다. |
| `shared`   | 특정 도메인에 종속되지 않는 범용 재사용 모듈을 관리하는 최하위 계층입니다.            |
| `public`   | 이미지, 아이콘 등 클라이언트에서 직접 참조하는 정적 파일을 관리합니다.                |

---

## Features 폴더 구조

> **Feature 기반 아키텍처**를 사용
> 각 Feature는 반드시 **Public API (`index.ts`)**를 통해서만 외부에 노출

```
📂 features/community/
├── 📂 ui/ # 해당 기능에서만 사용하는 전용 UI 컴포넌트
├── 📂 api/ # TanStack Query 훅 및 도메인 전용 통신 로직
├── 📂 model/ # 도메인 전용 Zod 스키마 및 TypeScript 타입
├── 📂 lib/ # 해당 기능 내에서만 사용하는 유틸리티 함수
└── index.ts # 외부 계층으로 기능을 노출하는 유일한 통로
```

---

## 컴포넌트 폴더 구조

```
📂 shared/ui/button/
├── Button.tsx # 컴포넌트 마크업 및 로직 구현
├── Button.stories.tsx # Storybook 기반 시각적 문서화
├── Button.test.tsx # 컴포넌트 단위 테스트 (선택)
└── index.ts # 외부 참조를 위한 barrel export
```

---

## 참고사항

> - **상향 참조 제한**: `shared` 레이어는 상위 계층인 `features`의 코드를 참조할 수 없습니다.
> - **Public API 준수**: `features` 내 코드는 반드시 `index.ts`에 공개된 것만 가져와 사용합니다.
> - **레이어 격리**: 각 `feature`는 상호 참조를 지양하며, 필요 시 `shared`로 로직을 이동합니다.
> - **절대 경로**: 모든 import는 반드시 `@/src/...` 형태의 절대 경로를 사용합니다.

---

<p align="right"><a href="../README.md">⬅️ Back to README</a></p>
