/* =========================================================
   Pedalea X la Calle — script compartido
   Sin dependencias. Progresivo: el sitio funciona sin JS.

   La cabecera aleatoria NO se sortea aquí: se elige y se precarga en el <head>
   de cada página, para que el navegador la pida una sola vez y lo antes
   posible (es el elemento LCP). Ver el <script> del <head> de los HTML.
   ========================================================= */
(function () {
  "use strict";

  /* --- 1. Menú móvil (abrir/cerrar) --- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* --- 2. Submenús desplegables (clic en móvil) --- */
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

  /* --- 3. Marcar el enlace de navegación activo --- */
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a[href]").forEach(function (a) {
    var target = a.getAttribute("href").split("#")[0];
    if (target === here) a.setAttribute("aria-current", "page");
  });

  /* --- 4. Reveal al hacer scroll --- */
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

  /* --- 5. Botón "volver arriba" (se crea por JS, aparece al bajar) --- */
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

  /* --- 6. Lightbox: ampliar imágenes .zoomable al hacer click --- */
  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.innerHTML = '<button class="lightbox__close" type="button" aria-label="Cerrar">×</button><img alt="">';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector("img");
  function closeLb() { lb.classList.remove("open"); lbImg.removeAttribute("src"); }
  document.addEventListener("click", function (e) {
    var z = e.target.closest ? e.target.closest("img.zoomable") : null;
    if (z) { lbImg.src = z.getAttribute("data-full") || z.currentSrc || z.src; lbImg.alt = z.alt || ""; lb.classList.add("open"); }
  });
  lb.addEventListener("click", closeLb);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
})();
