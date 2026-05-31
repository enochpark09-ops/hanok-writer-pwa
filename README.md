# HanokWriter PWA

채널별 AI 글쓰기 에이전트 — Double Y Space / 온도(溫度)

## 기능
- 카테고리: 라이프스타일 / 문화·예술 / 철학·에세이
- 채널: WordPress 블로그 / X / Instagram
- Claude API 스트리밍 글 생성
- 히스토리 저장 (최대 50개)
- PWA 설치 가능

## 설치 & 실행
```bash
npm install
npm run dev
```

## 배포 (Vercel)
```bash
npm run build
vercel --prod
```

## 환경
- API 키는 앱 설정 탭에서 입력 (localStorage 저장)
- Model: claude-sonnet-4-20250514
