
---
title: "GitHub Pages를 기술 블로그의 원본 저장소로 쓰기"
description: "Obsidian의 private note와 공개 블로그를 분리하고, GitHub Pages를 canonical source로 두는 운영 구조를 정했다."
pubDate: 2026-07-01
tags:
  - github-pages
  - astro
  - publishing
  - portfolio
sourceBoundary: "Meta publishing note. No private source material."
---

기술 블로그의 첫 결정은 글감이 아니라 **어디를 원본으로 둘 것인가**였다.

이번 블로그는 GitHub Pages를 원본으로 둔다. 이유는 단순하다. 내가 쓰려는 글 대부분은 코드, 테스트, 배포, 운영 기록과 연결된다. 따라서 글이 GitHub 계정, repository, commit, 검증 명령과 붙어 있을수록 신뢰도가 높다.

## 운영 구조

```text
Private notes: Obsidian / local wiki
Public source: GitHub Pages repository
Distribution: Velog, LinkedIn, Dev.to when useful
Evidence: GitHub repositories, docs, build output
```

핵심은 private note와 public post를 섞지 않는 것이다.

- 원본 작업 메모에는 민감한 맥락이 남을 수 있다.
- 공개 블로그에는 익명화된 문제 구조, 재현 가능한 명령, 검증 결과만 남긴다.
- Velog와 LinkedIn은 유통 채널이고, canonical source는 이 사이트다.

## 왜 GitHub Pages인가

GitHub Pages는 화려한 CMS가 아니다. 대신 기술 블로그에 필요한 장점이 있다.

1. 글과 코드가 같은 계정 아래 있다.
2. 모든 변경이 git history로 남는다.
3. GitHub Actions로 build gate를 붙일 수 있다.
4. custom domain을 붙이기 쉽다.
5. 정적 사이트라 운영 비용과 장애면이 작다.

블로그 자체도 하나의 작은 engineering artifact로 관리할 수 있다.

## 공개 전 검사

이 repo에는 최소한의 public content check를 둔다.

```text
npm run check:content
npm run build
```

검사 목적은 완벽한 보안이 아니라 실수를 줄이는 것이다. 내부 도메인, 계정 ID, secret, private note 경로 같은 문자열이 공개 repo에 들어오는 것을 초기에 막는다.

## 다음 글 후보

초기 글은 공개 부담이 낮고 검증 기록이 명확한 것부터 쓴다.

1. PWA service worker cache 때문에 삭제한 UI가 다시 보인 문제
2. RAG 포트폴리오에서 과장 claim을 scanner로 막는 방법
3. React Native WebView에서 analytics identity를 native/web 양쪽에 동기화하는 방법

첫 목표는 글을 많이 쓰는 것이 아니다. **비공개 운영 메모를 공개 가능한 기술 설명으로 바꾸는 pipeline을 만드는 것**이다.
