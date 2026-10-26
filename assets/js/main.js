/* Frituur Madelyn: kleine scripts voor de hele site. */
(function () {
  "use strict";

  /* Openingsuren: 0 = zondag ... 6 = zaterdag. Tijden in "uu:mm".
     Bron: de vorige website (frituurmadelyn.be). Wijzigen de uren, pas dan ook aan:
     - de openingHoursSpecification in index.html en contact.html
     - de vaste tabel in index.html en contact.html (voor wie geen JavaScript heeft)
     - de footer van alle pagina's */
  var HOURS = {
    1: [["11:00", "14:00"], ["16:30", "22:00"]],
    2: [["11:00", "14:00"], ["16:30", "22:00"]],
    3: [["11:00", "14:00"], ["16:30", "22:00"]],
    4: [["11:00", "14:00"], ["16:30", "22:00"]],
    5: [["11:00", "14:00"], ["16:30", "23:00"]],
    6: [["11:00", "14:00"], ["16:30", "23:00"]],
    0: [["11:00", "14:00"], ["16:30", "22:00"]]
  };
  var DAYS = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

  function mins(t) { var p = t.split(":"); return +p[0] * 60 + +p[1]; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function status() {
    var now = new Date();
    var day = now.getDay();
    var m = now.getHours() * 60 + now.getMinutes();
    var today = HOURS[day] || [];
    for (var i = 0; i < today.length; i++) {
      if (m >= mins(today[i][0]) && m < mins(today[i][1])) {
        return { open: true, text: "Nu open, tot " + today[i][1] };
      }
      if (m < mins(today[i][0])) {
        return { open: false, text: "Nu gesloten, vandaag weer open om " + today[i][0] };
      }
    }
    for (var d = 1; d <= 7; d++) {
      var next = (day + d) % 7;
      if (HOURS[next] && HOURS[next].length) {
        var when = d === 1 ? "morgen" : DAYS[next];
        return { open: false, text: "Nu gesloten, " + when + " open vanaf " + HOURS[next][0][0] };
      }
    }
    return { open: false, text: "Tijdelijk gesloten" };
  }

  function showToday() {
    var el = document.querySelector("[data-today]");
    if (el) {
      var s = status();
      el.classList.toggle("is-open", s.open);
      el.querySelector("span:last-child").textContent = s.text;
    }

    var table = document.querySelector("[data-hours]");
    if (!table) return;
    var order = [1, 2, 3, 4, 5, 6, 0];
    var today = new Date().getDay();
    table.innerHTML = order.map(function (d) {
      var slots = HOURS[d] && HOURS[d].length
        ? HOURS[d].map(function (s) { return s[0] + "-" + s[1]; }).join(" en ")
        : "gesloten";
      return '<tr' + (d === today ? ' class="today"' : '') + '><th scope="row">' +
        cap(DAYS[d]) + '</th><td>' + slots + '</td></tr>';
    }).join("");
  }

  function mobileMenu() {
    var btn = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".nav");
    if (!btn || !nav) return;
    function set(open) {
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    btn.addEventListener("click", function () { set(!nav.classList.contains("open")); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { set(false); btn.focus(); }
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
  }

  /* Laadt een foto niet, dan blijft er een warm kleurvlak staan
     in plaats van een gebroken-afbeelding-icoon. */
  function photos() {
    document.querySelectorAll(".photo img, .hero > img, .banner > img").forEach(function (img) {
      function fail() { (img.closest(".photo") || img).classList.add("missing"); img.style.visibility = "hidden"; }
      if (img.complete && img.naturalWidth === 0) fail();
      else img.addEventListener("error", fail, { once: true });
    });
  }

  /* De kaart van Google Maps laadt pas als iemand erop klikt. */
  function maps() {
    document.querySelectorAll("[data-map]").forEach(function (box) {
      var btn = box.querySelector("[data-map-load]");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var frame = document.createElement("iframe");
        frame.src = box.getAttribute("data-map");
        frame.title = box.getAttribute("data-map-title") || "Kaart";
        frame.loading = "lazy";
        frame.referrerPolicy = "no-referrer-when-downgrade";
        box.innerHTML = "";
        box.classList.add("loaded");
        box.appendChild(frame);
      });
    });
  }

  /* Staat het formulier (nog) niet in de pagina, toon dan telefoon en e-mail. */
  function form() {
    var box = document.querySelector(".contact-form");
    if (!box || box.querySelector("iframe")) return;
    var p = document.createElement("p");
    p.className = "form-fallback";
    p.innerHTML = 'Bel ons op <a href="tel:+32465646225">0465 64 62 25</a> of ' +
      '<a href="tel:+3212742024">012 74 20 24</a>, of mail naar ' +
      '<a href="mailto:frituurmadelynbv6@gmail.com">frituurmadelynbv6@gmail.com</a>. ' +
      'Vermeld je datum, het aantal personen en wat je wilt.';
    box.appendChild(p);
  }

  /* Rustig inschuiven bij scrollen. De class "js" (die de blokken eerst verbergt)
     zet dit script pas zelf, nadat alles wat al in beeld staat zichtbaar is gezet.
     Laadt dit script niet, dan blijft alles gewoon zichtbaar. */
  function fadeIn() {
    var items = document.querySelectorAll(".fade");
    var root = document.documentElement;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
      else io.observe(el);
    });
    root.classList.add("js");
  }

  /* Menukaart: de rubriek waarin je zit, krijgt een gele lijn in de springbalk. */
  function jumpBar() {
    var nav = document.querySelector(".jump");
    var bar = nav && nav.querySelector(".wrap");
    if (!bar) return;
    var links = {};
    bar.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var groups = [].slice.call(document.querySelectorAll(".menu-group[id]"));
    var linkFor = {};
    groups.forEach(function (g, i) {
      linkFor[g.id] = links[g.id] || (i > 0 ? linkFor[groups[i - 1].id] : null);
    });
    var current = null;
    function mark(a) {
      if (a === current) return;
      if (current) current.removeAttribute("aria-current");
      current = a;
      if (!a) return;
      a.setAttribute("aria-current", "true");
      var left = a.getBoundingClientRect().left - bar.getBoundingClientRect().left + bar.scrollLeft;
      if (left < bar.scrollLeft + 20 || left + a.offsetWidth > bar.scrollLeft + bar.clientWidth - 20) {
        bar.scrollTo({ left: Math.max(0, left - 20), behavior: "smooth" });
      }
    }
    var ticking = false;
    function update() {
      ticking = false;
      var line = nav.getBoundingClientRect().bottom + 40;
      var active = null;
      groups.forEach(function (g) {
        var r = g.getBoundingClientRect();
        if (r.top + 52 <= line && r.bottom > line) active = linkFor[g.id];
      });
      mark(active);
      /* boven de eerste rubriek: springbalk terug naar het begin */
      if (!active && groups.length && groups[0].getBoundingClientRect().top > line && bar.scrollLeft > 0) {
        bar.scrollLeft = 0;
      }
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* Elk onderdeel apart: een fout in het ene houdt de andere niet tegen. */
  function run(fn) {
    try { fn(); } catch (err) { if (window.console) console.error(err); }
  }

  run(fadeIn);
  run(function () {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });
  run(showToday);
  run(mobileMenu);
  run(photos);
  run(maps);
  run(form);
  run(jumpBar);
})();
