# 배포 · 로컬 실행 안내

정적 사이트라 빌드가 필요 없다. 파일을 그대로 웹서버에 올리거나 로컬에서 띄우면 된다.

마지막 업데이트: 2026-06-10

---

## 1. 로컬에서 보기

```powershell
cd C:\project\Netbitrage_homepage
python -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

`index.html` 을 더블클릭해 열어도 동작하지만, 문의 폼의 `fetch` 전송은 `http(s)://` 환경에서
가장 안정적이므로 로컬 서버 사용을 권장한다.

## 2. 외부 공개 (같은 네트워크 / 인터넷)

```powershell
# 모든 인터페이스에 바인딩
python -m http.server 8000 --bind 0.0.0.0
# Windows 방화벽 인바운드 허용 (관리자 PowerShell)
New-NetFirewallRule -DisplayName "Netbitrage 8000" -Direction Inbound -Protocol TCP -LocalPort 8000 -Action Allow
```

- 같은 와이파이(LAN): `http://<PC 사설 IP>:8000`
- 인터넷(WAN): 공유기 8000 포트포워딩 + 공인 IP. 임시 공개는 `ngrok http 8000` 또는 `cloudflared` 가 더 안전하다.
- 공개가 끝나면 방화벽 규칙/포트포워딩을 반드시 삭제한다.

## 3. 정식 배포 (권장)

- 정적 호스팅: GitHub Pages, Netlify, Cloudflare Pages, Vercel 등에 폴더째 업로드.
- 커스텀 도메인을 쓰려면 호스팅의 도메인 설정에서 연결한다(이 사이트는 기존 계측기기 사이트와
  **별도 도메인/별도 배포**로 운영하는 것을 전제로 한다).
- 운영 환경에서는 `http.server` 대신 정식 웹서버 + HTTPS 를 사용한다.

## 4. 배포 전 점검

- 문의 폼: [`../js/main.js`](../js/main.js) 의 `WEB3FORMS_ACCESS_KEY` 가 본인 키로 교체됐는지.
- 안내 이메일: [`../contact.html`](../contact.html) 의 표시용 메일 주소가 맞는지.
- 정보 경계: [`content-policy.md`](./content-policy.md) 의 체크리스트 통과 여부.

> 참고: `docs/` 는 운영자용 **내부 문서**다. 정식 호스팅에 올릴 때는 `index/arbitrage/short/contact.html`
> 와 `css/`, `js/` 만 배포하고 `docs/` 는 제외하는 것을 권장한다(불필요한 내부 정보 노출 방지).
