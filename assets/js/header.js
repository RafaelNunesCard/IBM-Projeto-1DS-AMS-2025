(function () {
  var header = document.getElementById("header");
  if (!header) return;

  var toggle = document.getElementById("menu_toggle");
  var menu = document.getElementById("menu_principal");
  var LIMITE_DESKTOP = 768;

  function aoRolar() {
    if (window.scrollY > 8) header.classList.add("rolado");
    else header.classList.remove("rolado");
  }
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });

  if (!toggle || !menu) return;

  function estaAberto() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  function abrir() {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu de navegação");
    menu.classList.add("aberto");
    document.body.classList.add("menu-aberto");
    var primeiro = menu.querySelector("a");
    if (primeiro) primeiro.focus({ preventScroll: true });
  }

  function fechar(voltarFoco) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu de navegação");
    menu.classList.remove("aberto");
    document.body.classList.remove("menu-aberto");
    if (voltarFoco) toggle.focus({ preventScroll: true });
  }

  toggle.addEventListener("click", function () {
    if (estaAberto()) fechar(false);
    else abrir();
  });

  menu.addEventListener("click", function (evento) {
    if (evento.target.closest("a") && estaAberto()) fechar(false);
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && estaAberto()) fechar(true);
  });

  document.addEventListener("click", function (evento) {
    if (!estaAberto()) return;
    if (header.contains(evento.target)) return;
    fechar(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > LIMITE_DESKTOP && estaAberto()) fechar(false);
  });
})();
