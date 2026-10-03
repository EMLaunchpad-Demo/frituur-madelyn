/* =========================================================================
   FRITUUR MADELYN — gedeelde scripts
   Vanilla JS, geen libraries. Werkt op elke pagina; elk onderdeel start
   enkel als de bijhorende elementen op die pagina staan.
   ========================================================================= */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ------------------------------------------------- OPENINGSUREN (bron) */
  /* 0 = zondag … 6 = zaterdag. null = gesloten.
     Elk blok is [openen, sluiten] in minuten na middernacht.
     >>> AANPASSEN: één plek voor de hele site. Pas ook hours-* in de HTML aan. */
  var HOURS = {
    0: [[11 * 60, 14 * 60], [16 * 60 + 30, 22 * 60]],
    1: null,
    2: [[11 * 60, 14 * 60], [16 * 60 + 30, 22 * 60]],
    3: [[11 * 60, 14 * 60], [16 * 60 + 30, 22 * 60]],
    4: [[11 * 60, 14 * 60], [16 * 60 + 30, 22 * 60]],
    5: [[11 * 60, 14 * 60], [16 * 60 + 30, 23 * 60]],
    6: [[11 * 60, 14 * 60], [16 * 60 + 30, 23 * 60]]
  };
  var DAYS = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];

  function fmt(m) {
    return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  }

  function statusNow() {
    var now = new Date(), d = now.getDay(), m = now.getHours() * 60 + now.getMinutes();
    var today = HOURS[d];
    if (today) {
      for (var i = 0; i < today.length; i++) {
        var o = today[i][0], c = today[i][1];
        if (m >= o && m < c) return { open: true, close: c, txt: "Nu open · tot " + fmt(c) };
        if (m < o) return { open: false, txt: "Vandaag open vanaf " + fmt(o) };
      }
    }
    for (var k = 1; k <= 7; k++) {
      var nd = (d + k) % 7;
      if (HOURS[nd]) {
        return { open: false, txt: "Gesloten · " + DAYS[nd].toLowerCase() + " vanaf " + fmt(HOURS[nd][0][0]) };
      }
    }
    return { open: false, txt: "Tijdelijk gesloten" };
  }

  function renderStatus() {
    var s = statusNow();
    $$("[data-status-pill]").forEach(function (pill) {
      pill.classList.toggle("is-open", s.open);
      pill.classList.toggle("is-closed", !s.open);
      var t = $(".txt", pill);
      if (t) t.textContent = s.txt;
    });
    $$("[data-status-text]").forEach(function (el) { el.textContent = s.txt; });
  }

  function renderHoursTable() {
    var t = $("[data-hours-table]");
    if (!t) return;
    var today = new Date().getDay();
    var order = [1, 2, 3, 4, 5, 6, 0];
    t.innerHTML = order.map(function (d) {
      var txt = HOURS[d]
        ? HOURS[d].map(function (r) { return fmt(r[0]) + "–" + fmt(r[1]); }).join("  &  ")
        : "Gesloten";
      return '<tr class="' + (d === today ? "today" : "") + '">' +
             '<td class="day">' + DAYS[d] + '</td>' +
             '<td class="hr">' + txt + '</td></tr>';
    }).join("");
  }

  /* ------------------------------------------------------------- NAVIGATIE */
  function initNav() {
    var nav = $("#nav");
    if (nav) {
      var onScroll = function () { nav.classList.toggle("solid", window.scrollY > 20); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    var ham = $("#ham"), mm = $("#mobile-menu"), mc = $("#m-close");
    if (ham && mm) {
      ham.addEventListener("click", function () {
        mm.classList.add("show");
        document.body.style.overflow = "hidden";
      });
      var close = function () {
        mm.classList.remove("show");
        document.body.style.overflow = "";
      };
      if (mc) mc.addEventListener("click", close);
      $$("a", mm).forEach(function (a) { a.addEventListener("click", close); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    }
  }

  /* ----------------------------------------------------------------- THEMA */
  function sysDark() { return window.matchMedia("(prefers-color-scheme: dark)").matches; }
  function isDark() {
    var cur = document.documentElement.getAttribute("data-theme");
    return cur ? cur === "dark" : sysDark();
  }
  function paintThemeIcon() {
    $$("[data-theme-icon]").forEach(function (el) {
      el.innerHTML = isDark()
        ? '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'
        : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
    });
  }
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("fm-theme"); } catch (e) { }
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    paintThemeIcon();
    $$("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = isDark() ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try { localStorage.setItem("fm-theme", next); } catch (e) { }
        paintThemeIcon();
      });
    });
  }

  /* ------------------------------------------------------- SCROLL-REVEAL */
  function initReveal() {
    var els = $$(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------- FOTOVLAKKEN */
  /* Ontbreekt een foto (nog niet aangeleverd), dan blijft de getekende
     illustratie staan in plaats van een gebroken-afbeelding-icoon. */
  function initShots() {
    $$(".shot").forEach(function (shot) {
      var img = shot.querySelector("img");
      if (!img) { shot.classList.add("no-img"); return; }
      var fail = function () { shot.classList.add("no-img"); };
      if (img.complete) {
        if (img.naturalWidth === 0) fail();
      } else {
        img.addEventListener("error", fail, { once: true });
      }
    });
  }

  /* ------------------------------------------- MENUKAART: actieve categorie */
  function initMenuSpy() {
    var nav = $(".menu-nav");
    if (!nav) return;
    var links = $$("a", nav);
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
                    .filter(Boolean);
    if (!secs.length || !("IntersectionObserver" in window)) return;
    var spy = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
        var active = nav.querySelector("a.active");
        if (active) active.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      });
    }, { rootMargin: "-150px 0px -70% 0px" });
    secs.forEach(function (s) { spy.observe(s); });
  }

  /* ------------------------------------------------------------------ INIT */
  function init() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    renderStatus();
    renderHoursTable();
    initNav();
    initTheme();
    initReveal();
    initShots();
    initMenuSpy();
    setInterval(renderStatus, 60000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
