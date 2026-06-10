# Netbitrage Homepage

상장따리(델타 중립 헤지 차익)와 상장숏(신규 상장 단기 SHORT) **자동매매 프로그램을 소개·홍보**하고,
방문자를 **메일 문의**로 연결하는 정적 사이트입니다. HTML + CSS + 바닐라 JavaScript 로 제작했습니다.

> 이 사이트는 두 프로그램을 "소개"만 합니다. **소스코드와 전략 세부 파라미터(특히 상장숏)는
> 어떤 형태로도 노출하지 않습니다.** 콘텐츠 수정 시 [`docs/content-policy.md`](docs/content-policy.md) 의
> 공개/비공개 경계를 반드시 지키세요.

## 페이지 구성

| 파일 | 설명 |
|------|------|
| `index.html` | 메인 — 히어로, 두 프로그램 요약, 강점, 리스크 고지, 문의 CTA |
| `arbitrage.html` | 상장따리 소개 — 델타 중립 헤지 개념·직관·자동화 흐름 (수치/코드 비공개) |
| `short.html` | 상장숏 소개 — 단기 과열 회귀 개념만 추상화 (전략 디테일 비공개) |
| `contact.html` | 도입 문의 — 메일 문의 폼 (관심 프로그램 선택) |

## 폴더 구조

```
Netbitrage_homepage/
├── index.html
├── arbitrage.html
├── short.html
├── contact.html
├── css/
│   └── style.css        # 다크 테마 디자인 시스템
├── js/
│   └── main.js          # 네비 토글 + 등장 애니메이션 + 문의 폼 전송
├── docs/
│   ├── plan.md          # 작업 플랜 / 진행 로그
│   ├── content-policy.md# 공개/비공개 경계 가이드
│   └── deployment.md    # 정적 사이트 실행/배포 안내
└── README.md
```

## 실행 방법

별도 빌드가 없습니다. `index.html` 을 브라우저로 열거나 로컬 서버로 띄웁니다.

```bash
# Python 3
python -m http.server 8000
# http://localhost:8000 접속
```

## 문의 메일 설정 (Web3Forms)

문의 폼은 백엔드 없이 [Web3Forms](https://web3forms.com) 로 메일을 전송합니다.
[`js/main.js`](js/main.js) 상단의 `WEB3FORMS_ACCESS_KEY` 와 수신 메일을 본인 것으로 교체하세요.

```js
var WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // 발급받은 키로 교체
```

- 받는 메일 주소는 Web3Forms 대시보드(Access Key 발급 시 지정한 주소)에서 결정됩니다.
- `contact.html` 의 안내용 이메일 텍스트(`a01095895690@gmail.com`)도 함께 바꿔주세요.

## 콘텐츠 수정

문구/카피는 각 HTML 파일에서 직접 수정합니다. 디자인은 [`css/style.css`](css/style.css) 의
CSS 변수(`:root`)에서 색상·간격을 일괄 조정할 수 있습니다.
