# 📌 Branch Strategy

> Git Flow를 간소화한 **StudiGo 브랜치 전략**을 사용합니다.

---

## 브랜치 구조

```
main (배포)
└── develop (개발)
    ├── feature/이슈번호--작업-내용
    ├── fix/이슈번호--작업-내용
    ├── refactor/이슈번호--작업-내용
    ├── hotfix/이슈번호--작업-내용
    └── release/이슈번호--작업-내용
```

---

## 브랜치 유형

| 종류     | 설명                 | 예시               | 설명                      |
| :------- | :------------------- | :----------------- | :------------------------ |
| Main     | 메인 브랜치          | main               | 그대로 사용               |
| Develop  | 배포 전 개발 브랜치  | develop            | 그대로 사용               |
| Feature  | 기능 개발 브랜치     | feature/10--signin | 로그인 기능 브랜치        |
| Hotfix   | 디버깅 브랜치        | hotfix-1.1.4       | 1.1버전 디버깅            |
| Release  | 배포하기 위한 브랜치 | release-1.11.1     | 1.1버전 배포              |
| Refactor | 리팩토링 브랜치      | refactor/30--chat  | 채팅 기능 리팩토링 브랜치 |

---

## 브랜치 생성 규칙

> 기능별 브랜치를 `develop` 브랜치로부터 분기하여 생성합니다.

### 네이밍 규칙

```
<타입>/이슈번호--<작업명>
```

---

## 머지 전 체크 사항

- **내 브랜치가 최신 브랜치인지 확인**: dev 브랜치로 이동후 pull
- **작업 브랜치로 이동후 rebase 해보기**: 히스토리 정리를 위해 rebase를 진행
- **빌드 상의 문제가 없는지 확인**: npm run build 로 빌드 에러가 발생하는지 확인
- **새로 설치한 패키지가 있다면 알리기**: package.json / package-lock.json 파일 변동 시 팀원들에게 npm ci 요청
- **소통**: 변동사항 발생 시 ZEP 또는 디스코드 알리기

---

<p align="right"><a href="../README.md">⬅️ Back to README</a></p>
