/* =========================================================================
   FRITUUR MADELYN — gedeelde scripts
   Vanilla JS, geen libraries. Werkt op elke pagina; elk onderdeel start
   enkel als de bijhorende elementen op die pagina staan.
   ========================================================================= */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = function () {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

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
      el.textContent = isDark() ? "dark_mode" : "light_mode";
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
  function observeIn(selector, opts) {
    var els = $$(selector);
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, opts || { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------- HERO: intro-sequentie */
  function initHero() {
    var hero = $(".hero");
    if (!hero) return;
    requestAnimationFrame(function () { hero.classList.add("hero-in"); });
    var cone = $(".cone-wrap", hero);
    if (cone && !reduced()) {
      cone.addEventListener("animationend", function (e) {
        if (e.animationName === "coneIn") cone.classList.add("settled");
      });
    }
  }

  /* -------------------------------------------------------- HERO: parallax */
  function initParallax() {
    var hero = $(".hero");
    if (!hero || reduced()) return;
    var ticking = false;
    function update() {
      var r = hero.getBoundingClientRect();
      // 0 wanneer de hero bovenaan staat, 1 wanneer hij net uit beeld is
      var p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      hero.style.setProperty("--sy", p.toFixed(3));
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* --------------------------------------------------------- FOTOVLAKKEN */
  /* Ontbreekt een foto (nog niet aangeleverd), dan blijft de getekende
     achtergrond staan in plaats van een gebroken-afbeelding-icoon. */
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
    observeIn(".shot", { rootMargin: "0px 0px -5% 0px", threshold: 0.1 });
  }

  /* ------------------------------- MENUKAART: spy + schuivende indicator */
  function initMenuNav() {
    var nav = $(".menu-nav");
    if (!nav) return;

    var indicator = document.createElement("span");
    indicator.className = "indicator";
    nav.insertBefore(indicator, nav.firstChild);

    var links = $$("a", nav);
    function moveTo(link) {
      if (!link) return;
      nav.style.setProperty("--ix", (link.offsetLeft - nav.scrollLeft) + "px");
      nav.style.setProperty("--iw", link.offsetWidth + "px");
    }
    function setActive(link) {
      links.forEach(function (a) { a.classList.toggle("active", a === link); });
      moveTo(link);
    }
    nav.addEventListener("scroll", function () {
      var a = nav.querySelector("a.active"); if (a) moveTo(a);
    }, { passive: true });
    window.addEventListener("resize", function () {
      var a = nav.querySelector("a.active"); if (a) moveTo(a);
    });

    var secs = links.map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    }).filter(Boolean);

    setActive(links[0]);

    if (secs.length && "IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (!en.isIntersecting) return;
          var link = nav.querySelector('a[href="#' + en.target.id + '"]');
          if (link) {
            setActive(link);
            link.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
          }
        });
      }, { rootMargin: "-150px 0px -70% 0px" });
      secs.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ------------------------- MENUKAART: regels komen één voor één binnen */
  function initMenuLines() {
    var rows = $$(".mi");
    if (!rows.length) return;
    if (!("IntersectionObserver" in window) || reduced()) {
      rows.forEach(function (r) { r.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var sibs = Array.prototype.slice.call(el.parentNode.children);
        el.style.transitionDelay = Math.min(sibs.indexOf(el), 8) * 45 + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.1 });
    rows.forEach(function (r) { io.observe(r); });
  }

  /* --------------------------------- MARQUEE buigt mee met de scrollsnelheid */
  function initMarquee() {
    var m = $(".marquee");
    if (!m || reduced()) return;
    var last = window.scrollY, idle = null;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      var v = Math.max(-9, Math.min(9, (y - last) * 0.35));
      last = y;
      m.style.setProperty("--skew", v.toFixed(2) + "deg");
      clearTimeout(idle);
      idle = setTimeout(function () { m.style.setProperty("--skew", "0deg"); }, 140);
    }, { passive: true });
  }

  /* ------------------------------------------------------------------ INIT */
  function init() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    renderStatus();
    renderHoursTable();
    initNav();
    initTheme();
    initHero();
    initParallax();
    observeIn(".reveal");
    initShots();
    initMenuNav();
    initMenuLines();
    initMarquee();
    setInterval(renderStatus, 60000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
