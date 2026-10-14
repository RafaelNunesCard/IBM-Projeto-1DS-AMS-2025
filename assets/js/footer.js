(function () {
  var ano = document.getElementById("ano_atual");
  if (ano) ano.textContent = String(new Date().getFullYear());

  var voltar = document.getElementById("voltar_topo");
  if (voltar) {
    voltar.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var form = document.getElementById("newsletter");
  if (!form) return;

  var campo = document.getElementById("news_email");
  var msg = document.getElementById("news_msg");
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function responder(texto, classe) {
    if (!msg) return;
    msg.hidden = false;
    msg.className = "newsletter-msg " + classe;
    msg.textContent = texto;
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (!campo) return;
    var valor = (campo.value || "").trim();
    if (!EMAIL.test(valor)) {
      responder("Informe um e-mail válido para se inscrever.", "erro");
      campo.focus();
      return;
    }
    responder("Inscrição confirmada! Em breve você receberá novidades.", "ok");
    form.reset();
  });
})();
