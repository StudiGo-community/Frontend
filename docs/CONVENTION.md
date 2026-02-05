# 📐 Code Convention

> 일관된 코드 스타일 유지를 위한 규칙입니다.

---

## 네이밍 규칙

| 대상           | 규칙                       | 예시                            |
| :------------- | :------------------------- | :------------------------------ |
| 파일/폴더      | kebab-case (공통)          | /common-components              |
| 컴포넌트 파일  | PascalCase.tsx             | PillList.tsx                    |
| 커스텀 훅 파일 | camelCase.ts               | useDebounce.ts                  |
| 변수 네이밍    | camelCase (약어 지양)      | changeResponseFormToRequestData |
| 아이콘         | 이름 뒤에 항상 Icon 붙이기 | <UserIcon />                    |

---

## 파일 네이밍

- **컴포넌트**: PascalCase를 사용하여 인터페이스의 직관성을 높입니다.
- **커스텀 훅**: use 접두사와 함께 camelCase를 사용합니다.
- **기타**: 모든 폴더명과 설정 파일은 kebab-case를 지향합니다.

---

## 코드 스타일

### 기본 규칙

> - **함수**: 화살표 함수 사용
> - **타입**: interface 사용 (Zod 추출 타입 제외)
> - **Import**: 반드시 절대경로(@/src/...)로 작성
> - **Tanstack query**: useQuery는 별도 훅으로 분리하여 features/(도메인)/api에서 관리

---

## 컴포넌트 작성 규칙

### 함수 컴포넌트 사용

```tsx
// ✅ Good
const Button = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>
}

export default Button
```

### Props 타입 정의

```tsx
// ✅ Good - interface 사용
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}
```

---

## Communication

| 도구    | 용도                        |
| ------- | --------------------------- |
| Discord | 실시간 소통                 |
| Notion  | 데일리 스크럼, 일정, 회의록 |
| Figma   | 디자인 협업                 |

---

<p align="right"><a href="../README.md">⬅️ Back to README</a></p>
