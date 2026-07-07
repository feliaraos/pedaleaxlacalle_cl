/* =========================================================
   Pedalea X la Calle — script compartido
   Sin dependencias. Progresivo: el sitio funciona sin JS.
   ========================================================= */
(function () {
  "use strict";

  /* --- 1. Cabecera: imagen aleatoria en cada carga --- */
  var banner = document.getElementById("banner");
  if (banner) {
    var n = 1 + Math.floor(Math.random() * 3); // 1..3
    banner.src = "img/cabecera-" + n + ".jpg";
  }

  /* --- 2. Menú móvil (abrir/cerrar) --- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* --- 3. Submenús desplegables (clic en móvil) --- */
  document.querySelectorAll(".menu__btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (window.matchMedia("(max-width: 680px)").matches) {
        e.preventDefault();
        var sub = btn.nextElementSibling;
        if (sub) {
          var open = sub.classList.toggle("open");
          btn.setAttribute("aria-expanded", open ? "true" : "false");
        }
      }
    });
  });

  /* --- 4. Marcar el enlace de navegación activo --- */
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a[href]").forEach(function (a) {
    var target = a.getAttribute("href").split("#")[0];
    if (target === here) a.setAttribute("aria-current", "page");
  });

  /* --- 5. Reveal al hacer scroll --- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* --- 6. Botón "volver arriba" (se crea por JS, aparece al bajar) --- */
  var toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.type = "button";
  toTop.setAttribute("aria-label", "Volver arriba");
  toTop.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 15 12 9 18 15"/></svg>';
  document.body.appendChild(toTop);

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function toggleToTop() {
    if (window.scrollY > window.innerHeight * 0.9) toTop.classList.add("show");
    else toTop.classList.remove("show");
  }
  window.addEventListener("scroll", toggleToTop, { passive: true });
  toggleToTop();
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
})();
