/* =====================================================================
   TechFix — Página de Contato
   Validação inline do formulário + animações de entrada
   ===================================================================== */

const form = document.getElementById("contactForm");

if (form) {
  const bntEnviar = document.getElementById("bnt_enviar");
  const successEl = document.getElementById("success");
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const campos = [
    {
      input: document.getElementById("name"),
      wrapper: document.getElementById("campo_name"),
      erro: document.getElementById("erro_name"),
      validar: (valor) => (valor ? "" : "Informe seu nome."),
    },
    {
      input: document.getElementById("email"),
      wrapper: document.getElementById("campo_email"),
      erro: document.getElementById("erro_email"),
      validar: (valor) => {
        if (!valor) return "Informe seu e-mail.";
        if (!regexEmail.test(valor)) return "Digite um e-mail válido.";
        return "";
      },
    },
    {
      input: document.getElementById("message"),
      wrapper: document.getElementById("campo_message"),
      erro: document.getElementById("erro_message"),
      validar: (valor) => (valor ? "" : "Escreva sua mensagem."),
    },
  ];

  function validarCampo(campo) {
    const mensagem = campo.validar(campo.input.value.trim());

    campo.wrapper.classList.toggle("erro", Boolean(mensagem));
    campo.erro.textContent = mensagem;
    campo.input.setAttribute("aria-invalid", mensagem ? "true" : "false");

    return !mensagem;
  }

  function limparErros() {
    campos.forEach((campo) => {
      campo.wrapper.classList.remove("erro");
      campo.erro.textContent = "";
      campo.input.setAttribute("aria-invalid", "false");
    });
  }

  campos.forEach((campo) => {
    campo.input.addEventListener("blur", () => validarCampo(campo));

    campo.input.addEventListener("input", () => {
      if (campo.wrapper.classList.contains("erro")) validarCampo(campo);
    });
  });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const tudoValido = campos.map(validarCampo).every(Boolean);
    if (!tudoValido) return;

    bntEnviar.disabled = true;
    bntEnviar.textContent = "ENVIANDO...";

    setTimeout(() => {
      bntEnviar.disabled = false;
      bntEnviar.textContent = "ENVIAR MENSAGEM";

      form.reset();
      limparErros();

      successEl.classList.add("mostrar");
      setTimeout(() => successEl.classList.remove("mostrar"), 5000);
    }, 600);
  });
}

/* ============ Reveal on scroll ============ */

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const alvos = document.querySelectorAll(".card, .card_faq, .faq");

  alvos.forEach((alvo, indice) => {
    alvo.classList.add("reveal");
    alvo.style.transitionDelay = `${Math.min(indice * 60, 300)}ms`;
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        entrada.target.classList.add("in-view");
        observador.unobserve(entrada.target);

        setTimeout(() => {
          entrada.target.style.transitionDelay = "";
        }, 1500);
      });
    },
    { threshold: 0.12 }
  );

  alvos.forEach((alvo) => observador.observe(alvo));
}