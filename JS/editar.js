// Carregar dados no perfil
document.addEventListener("DOMContentLoaded", () => {
  const perfil = JSON.parse(localStorage.getItem("perfil")) || {};

  // Página de perfil
  if (document.body.contains(document.querySelector(".perfil"))) {
    if (perfil.avatar) document.querySelector(".perfil_img img").src = perfil.avatar;
    if (perfil.nome) document.querySelector(".nome h1").textContent = perfil.nome;
    if (perfil.profissao) document.querySelector(".nome h3").textContent = perfil.profissao;
    if (perfil.pronome) document.querySelector(".nome h2").textContent = perfil.pronome;
    if (perfil.local) document.querySelector(".endereços a[href^='#']").textContent = perfil.local;
    if (perfil.email) document.querySelector(".endereços a[href^='mailto']").textContent = perfil.email;
    if (perfil.telefone) document.querySelector(".endereços a[href^='tel']").textContent = perfil.telefone;
    if (perfil.biografia) document.querySelector(".biografia .bio").textContent = perfil.biografia;
    if (perfil.educacao) document.querySelector(".biografia .edu").textContent = perfil.educacao;

    // Link para editar
    const editarLink = document.getElementById("editar");
    if (editarLink) editarLink.href = "editar.html";
  }

  // Página de edição
  if (document.getElementById("form-editar")) {
    const form = document.getElementById("form-editar");
    const preview = document.getElementById("preview");
    const avatarInput = document.getElementById("avatar");

    // Preenche com dados salvos
    document.getElementById("nome").value = perfil.nome || "";
    document.getElementById("pronome").value = perfil.pronome || "";
    document.getElementById("profissao").value = perfil.profissao || "";
    document.getElementById("local").value = perfil.local || "";
    document.getElementById("email").value = perfil.email || "";
    document.getElementById("telefone").value = perfil.telefone || "";
    document.getElementById("biografia").value = perfil.biografia || "";
    document.getElementById("educacao").value = perfil.educacao || "";
    if (perfil.avatar) preview.src = perfil.avatar;

    // Preview da imagem
    avatarInput.addEventListener("change", () => {
      const file = avatarInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          preview.src = reader.result;
        };
        reader.readAsDataURL(file);
      }
    });

    // Salvar
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const dados = {
        nome: document.getElementById("nome").value,
        pronome: document.getElementById("pronome").value,
        profissao: document.getElementById("profissao").value,
        local: document.getElementById("local").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        biografia: document.getElementById("biografia").value,
        educacao: document.getElementById("educacao").value,
        avatar: preview.src || perfil.avatar || ""
      };

      try {
        localStorage.setItem("perfil", JSON.stringify(dados));
        window.location.href = "perfil.html";
      } catch (err) {
        alert("Erro ao salvar: " + err.message);
      }
    });
  }
});
