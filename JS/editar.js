document.addEventListener("DOMContentLoaded", () => {
  const perfil = JSON.parse(localStorage.getItem("perfil")) || {};
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

  // --- FUNÇÃO PARA FORMATAR BONITINHO NA EXIBIÇÃO ---
  function formatarTelefone(tel) {
    tel = tel.replace(/\D/g, ""); // remove tudo que não é número

    if (tel.length === 11) {
      return `(${tel.slice(0, 2)}) ${tel.slice(2, 7)}-${tel.slice(7, 11)}`; // (11) 98765-4321
    }
    if (tel.length === 10) {
      return `(${tel.slice(0, 2)}) ${tel.slice(2, 6)}-${tel.slice(6, 10)}`; // (11) 3456-7890
    }
    return tel; // se não encaixar, deixa como está
  }

  // ------------------ PÁGINA DE PERFIL ------------------
  if (document.body.contains(document.querySelector(".perfil"))) {
    if (perfil.avatar)
      document.querySelector(".perfil_img img").src = perfil.avatar;

    // 👇 PRIORIDADE: primeiro mostra nome do perfil, depois loggedUser
    document.querySelector(".nome h1").textContent =
      perfil.nome || loggedUser.nome || "Usuário";

    document.querySelector(".nome h3").textContent =
      perfil.profissao || "Profissão não informada";

    document.querySelector(".nome h2").textContent = perfil.pronome || "";

    document.querySelector(".endereços a[href^='#']").textContent =
      perfil.local || "Local não informado";

    document.querySelector(".endereços a[href^='mailto']").textContent =
      perfil.email || loggedUser.email || "E-mail não informado";

    // --- TELEFONE FORMATADO NA EXIBIÇÃO ---
    if (perfil.telefone) {
      const telFormatado = formatarTelefone(perfil.telefone);
      document.querySelector(".endereços a[href^='tel']").textContent =
        telFormatado;
    }

    if (perfil.biografia)
      document.querySelector(".biografia .bio").textContent = perfil.biografia;
    if (perfil.educacao)
      document.querySelector(".biografia .edu").textContent = perfil.educacao;

    const editarLink = document.getElementById("editar");
    if (editarLink) editarLink.href = "editar.html";
  }

  // ------------------ PÁGINA DE EDIÇÃO ------------------
  if (document.getElementById("form-editar")) {
    const form = document.getElementById("form-editar");
    const preview = document.getElementById("preview");
    const avatarInput = document.getElementById("avatar");

    // Preenche com dados salvos
    document.getElementById("nome").value =
      perfil.nome || loggedUser.nome || "";
    document.getElementById("pronome").value = perfil.pronome || "";
    document.getElementById("profissao").value = perfil.profissao || "";
    document.getElementById("local").value = perfil.local || "";
    document.getElementById("email").value =
      perfil.email || loggedUser.email || "";
    document.getElementById("telefone").value = perfil.telefone || "";
    document.getElementById("biografia").value = perfil.biografia || "";
    document.getElementById("educacao").value = perfil.educacao || "";
    if (perfil.avatar) preview.src = perfil.avatar;

    // Preview da imagem
    avatarInput.addEventListener("change", () => {
      const file = avatarInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => (preview.src = reader.result);
        reader.readAsDataURL(file);
      }
    });

    // SALVAR
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const telefone = document.getElementById("telefone").value.trim();
      const regexTel = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;

      if (!regexTel.test(telefone)) {
        alert(
          "Telefone inválido! Exemplos válidos:\n11 99876-4321\n(11)998764321"
        );
        return;
      }

      // SALVAR OS DADOS
      const dados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: telefone,
        profissao: document.getElementById("profissao").value,
        local: document.getElementById("local").value,
        biografia: document.getElementById("biografia").value,
        educacao: document.getElementById("educacao").value,
        avatar: preview.src || perfil.avatar || "",
      };

      // SALVA O PERFIL
      localStorage.setItem("perfil", JSON.stringify(dados));

      // 🔥 ATUALIZA TAMBÉM O LOGGEDUSER
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};
      loggedUser.nome = dados.nome;
      loggedUser.email = dados.email;

      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

      try {
        localStorage.setItem("perfil", JSON.stringify(dados));
        window.location.href = "perfil.html";
      } catch (err) {
        alert("Erro ao salvar: " + err.message);
      }
    });
  }
});
