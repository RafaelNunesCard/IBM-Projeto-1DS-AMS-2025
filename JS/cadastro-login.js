const container = document.querySelector(".container");
const registerBnt = document.querySelector(".register-bnt");
const loginBnt = document.querySelector(".login-bnt");

registerBnt.addEventListener("click", () => {
  container.classList.add("active");
});

loginBnt.addEventListener("click", () => {
  container.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const btnCadastro = document.getElementById("bnt-cadastro");
  const btnLogin = document.getElementById("bnt-login");

  // === CADASTRO ===
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
      alert("Fill out all fields to register.");
      return;
    }

    // Verificar se já existe usuário com esse email
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      alert("This email is already registered.");
      return;
    }

    // Salvar no localStorage
    users.push({ nome, email, senha });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully! You can now log in.");
  });

  // === LOGIN ===
  btnLogin?.addEventListener("click", () => {
    const loginForm = document.querySelector(".login"); // <--- IMPORTANTE

    const email = loginForm.querySelector('input[type="text"]').value;
    const senha = loginForm.querySelector('input[type="password"]').value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find((u) => u.email === email && u.senha === senha);

    if (validUser) {
      localStorage.setItem("loggedUser", JSON.stringify(validUser));
      window.location.href = "home.html"; // Redireciona após o login
    } else {
      alert("Incorrect email or password.");
    }
  });
});
