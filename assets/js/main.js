/* Frituur Madelyn — kleine scripts voor de hele site. */
(function () {
  "use strict";

  /* Openingsuren: 0 = zondag … 6 = zaterdag. Tijden in "uu:mm".
     Pas ook de openingHoursSpecification in index.html aan als dit wijzigt. */
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
        ? HOURS[d].map(function (s) { return s[0] + " – " + s[1]; }).join(" en ")
        : "gesloten";
      return '<tr' + (d === today ? ' class="today"' : '') + '><th scope="row">' +
        cap(DAYS[d]) + '</th><td>' + slots + '</td></tr>';
    }).join("");
  }

  function mobileMenu() {
    var btn = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".nav");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
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

  function fadeIn() {
    var items = document.querySelectorAll(".fade");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
  showToday();
  mobileMenu();
  photos();
  fadeIn();
})();
