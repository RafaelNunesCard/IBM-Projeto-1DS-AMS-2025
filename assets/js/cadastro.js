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

  // === CADASTRO ===
  const btnCadastro = document.getElementById("bnt-cadastro");
  btnCadastro?.addEventListener("click", (e) => {
    e.preventDefault();

    const nome = document.querySelector('.Cadastrar input[type="text"]').value;
    const email = document.querySelector(
      '.Cadastrar input[type="email"]'
    ).value;
    const senha = document.querySelector(
      '.Cadastrar input[type="password"]'
    ).value;

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos para se cadastrar.");
      return;
    }

    // Verificar se já existe usuário com esse email
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      alert("Este e-mail já está cadastrado.");
      return;
    }

    // Salvar no localStorage
    users.push({ nome, email, senha });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Cadastro realizado com sucesso! Agora você pode entrar.");
  });

  // === LOGIN ===
  const btnLogin = document.getElementById("bnt-login");
  btnLogin?.addEventListener("click", () => {
    const loginForm = document.querySelector(".login");
    if (!loginForm) return;

    const email = loginForm.querySelector('input[type="text"]').value;
    const senha = loginForm.querySelector('input[type="password"]').value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find((u) => u.email === email && u.senha === senha);

    if (validUser) {
      localStorage.setItem("loggedUser", JSON.stringify(validUser));
      window.location.href = "home.php"; // Redireciona após o login
    } else {
      alert("E-mail ou senha incorretos.");
    }
  });
});
