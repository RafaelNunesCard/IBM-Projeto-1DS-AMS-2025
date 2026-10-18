document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  // === ALTERNAR ENTRE LOGIN E CADASTRO ===
  // Pode haver mais de um botão (link no formulário + botão no painel lateral)
  const registerBtns = document.querySelectorAll(".register-bnt");
  const loginBtns = document.querySelectorAll(".login-bnt");

  if (container) {
    registerBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        container.classList.add("active");
      });
    });

    loginBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        container.classList.remove("active");
      });
    });
  }

  // === MOSTRAR / OCULTAR SENHA ===
  document.querySelectorAll(".toggle-pass").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector("input");
      if (!input) return;

      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";

      const icon = btn.querySelector("i");
      if (icon) {
        icon.classList.toggle("ri-eye-line", !isPassword);
        icon.classList.toggle("ri-eye-off-line", isPassword);
      }
    });
  });

  // === TIPO DE CONTA (cliente / profissional) ===
  // Cliente e profissional são contas completamente separadas: cada
  // tipo vai para sua própria lista no localStorage (clientes /
  // profissionais), espelhando as duas tabelas do banco.
  const radiosTipo = document.querySelectorAll('input[name="tipo-conta"]');
  const campoProfissao = document.getElementById("cad-profissao");

  function tipoContaSelecionado() {
    const marcado = document.querySelector('input[name="tipo-conta"]:checked');
    return marcado ? marcado.value : "cliente";
  }

  function sincronizarCamposProfissional() {
    if (!campoProfissao) return;
    campoProfissao.required = tipoContaSelecionado() === "profissional";
  }

  radiosTipo.forEach((radio) =>
    radio.addEventListener("change", sincronizarCamposProfissional)
  );
  sincronizarCamposProfissional();

  // === CADASTRO ===
  const btnCadastro = document.getElementById("bnt-cadastro");
  btnCadastro?.addEventListener("click", (e) => {
    e.preventDefault();

    const tipo = tipoContaSelecionado();
    const nome = document.getElementById("cad-nome").value.trim();
    const email = document.getElementById("cad-email").value.trim().toLowerCase();
    const senha = document.getElementById("cad-senha").value;
    const profissao = document.getElementById("cad-profissao").value.trim();
    const precoDiaCampo = document.getElementById("cad-preco-dia");
    const precoDia = precoDiaCampo && precoDiaCampo.value ? Number(precoDiaCampo.value) : null;

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos para se cadastrar.");
      return;
    }

    if (tipo === "profissional" && !profissao) {
      alert("Conte qual é a sua profissão ou especialidade.");
      return;
    }

    const chave = tipo === "profissional" ? "profissionais" : "clientes";
    const contas = JSON.parse(localStorage.getItem(chave)) || [];

    if (contas.find((c) => c.email === email)) {
      alert(
        tipo === "profissional"
          ? "Já existe uma conta de profissional com esse e-mail."
          : "Este e-mail já está cadastrado."
      );
      return;
    }

    const novaConta = { id: Date.now(), nome, email, senha, tipo };

    if (tipo === "profissional") {
      novaConta.profissao = profissao;
      novaConta.preco_dia = precoDia;
    }

    contas.push(novaConta);
    localStorage.setItem(chave, JSON.stringify(contas));

    alert("Cadastro realizado com sucesso! Agora você pode entrar.");
    container?.classList.remove("active");
  });

  // === LOGIN ===
  const btnLogin = document.getElementById("bnt-login");
  btnLogin?.addEventListener("click", () => {
    const campoEmail = document.getElementById("log-email");
    const campoSenha = document.getElementById("log-senha");
    if (!campoEmail || !campoSenha) return;

    const email = campoEmail.value.trim().toLowerCase();
    const senha = campoSenha.value;

    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    const profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];

    const contaValida =
      clientes.find((c) => c.email === email && c.senha === senha) ||
      profissionais.find((p) => p.email === email && p.senha === senha);

    if (!contaValida) {
      alert("E-mail ou senha incorretos.");
      return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(contaValida));
    window.location.href = "home.html"; // Redireciona após o login
  });
});
