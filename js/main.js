/**
 * Netbitrage main.js
 * - 모바일 네비게이션 토글
 * - 스크롤 등장 애니메이션 (.reveal)
 * - 문의 폼 → 메일 전송 (Web3Forms, 백엔드 없는 정적 사이트용)
 *
 * 보안 주의: 이 사이트는 프로그램을 "소개"만 합니다. 전략 수치/소스코드/세부 로직은
 * 어떤 형태로도 클라이언트에 노출하지 않습니다.
 */
(function () {
  "use strict";

  /* ---------- 문의 폼 → 메일 전송 설정 (Web3Forms) ----------
   * 정적 사이트에서 백엔드 없이 메일을 보내기 위해 Web3Forms 를 사용합니다.
   * https://web3forms.com 에서 받는 메일 주소로 Access Key 를 발급받아 교체하세요.
   */
  var WEB3FORMS_ACCESS_KEY = "57cc4300-8810-4097-89d7-a27c0b58a604";

  var PROGRAM_LABELS = {
    arbitrage: "무위험 차익거래 (롱·숏 양방 헤지)",
    short: "상장숏 (신규 상장 SHORT)",
    both: "두 프로그램 모두",
    etc: "기타 / 일반 문의",
  };

  /* ---------- 1. 모바일 네비게이션 ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  /* ---------- 2. 스크롤 등장 애니메이션 ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 3. 문의 폼 ---------- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var success = document.getElementById("form-success");
    var errorBox = document.getElementById("form-error");
    var submitBtn = form.querySelector('button[type="submit"]');

    var show = function (box, text) {
      if (!box) return;
      if (text) box.textContent = text;
      box.classList.add("show");
    };
    var hide = function (box) { if (box) box.classList.remove("show"); };

    // URL ?program= 으로 관심 프로그램 기본 선택
    var pre = new URLSearchParams(window.location.search).get("program");
    var sel = form.querySelector("#program");
    if (sel && pre && PROGRAM_LABELS[pre]) sel.value = pre;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hide(success);
      hide(errorBox);

      if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.indexOf("YOUR_") === 0) {
        show(errorBox, "메일 전송 키가 아직 설정되지 않았습니다. 관리자에게 문의해 주세요.");
        return;
      }
      // 허니팟(봇 차단)
      if (form.querySelector('input[name="botcheck"]') && form.querySelector('input[name="botcheck"]').checked) return;

      var val = function (name) {
        return (form.elements[name] && form.elements[name].value || "").trim();
      };
      var programId = val("program");
      var payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name: "Netbitrage 문의",
        subject: "[Netbitrage 문의] " + (val("name") || "이름 미입력"),
        name: val("name"),
        email: val("email"),
        "연락처": val("phone") || "(미입력)",
        "관심 프로그램": PROGRAM_LABELS[programId] || "선택 안 함",
        message: val("message"),
      };

      var original = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "전송 중..."; }

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(function (res) { return res.json().then(function (r) { return { ok: res.ok, r: r }; }); })
        .then(function (out) {
          if (out.ok && out.r.success) {
            show(success);
            form.reset();
          } else {
            show(errorBox, "전송에 실패했습니다. 잠시 후 다시 시도하거나 메일로 직접 연락해 주세요.");
          }
        })
        .catch(function () {
          show(errorBox, "네트워크 오류로 전송하지 못했습니다. 인터넷 연결을 확인해 주세요.");
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = original; }
        });
    });
  }

  /* ---------- 4. 연도 자동 갱신 ---------- */
  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initReveal();
    initContactForm();
    initYear();
  });
})();
