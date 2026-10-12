/* =====================================================================
   TechFix — Editar perfil
   Preenche, valida e salva os dados do usuário em localStorage.
   ===================================================================== */

const AVATAR_PADRAO = "../img/Perfis/Default perfil.jpg";

function $(id) {
  return document.getElementById(id);
}

function lerArmazenamento(chave) {
  try {
    return JSON.parse(localStorage.getItem(chave)) || null;
  } catch {
    return null;
  }
}

const VALIDACOES = {
  nome: (valor) => (valor.trim() ? "" : "Informe seu nome."),
  email: (valor) =>
    !valor.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim())
      ? ""
      : "Informe um e-mail válido (ex: voce@email.com).",
  telefone: (valor) =>
    !valor.trim() || /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(valor.trim())
      ? ""
      : "Telefone inválido. Use (11) 99999-9999.",
};

function definirErro(id, mensagem) {
  const campo = $(id);
  const erro = $("erro_" + id);

  campo.classList.toggle("campo-invalido", Boolean(mensagem));
  if (erro) erro.textContent = mensagem;
}

function validarFormulario() {
  let primeiroInvalido = null;

  Object.entries(VALIDACOES).forEach(([id, validar]) => {
    const mensagem = validar($(id).value);
    definirErro(id, mensagem);
    if (mensagem && !primeiroInvalido) primeiroInvalido = $(id);
  });

  return primeiroInvalido;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = $("form-editar");
  if (!form) return;

  const perfil = lerArmazenamento("perfil") || {};
  const loggedUser = lerArmazenamento("loggedUser") || {};

  const preview = $("preview");
  const avatarInput = $("avatar");
  const aviso = $("form_aviso");

  $("nome").value = perfil.nome || loggedUser.nome || "";
  $("pronome").value = perfil.pronome || "";
  $("profissao").value = perfil.profissao || "";
  $("local").value = perfil.local || "";
  $("email").value = perfil.email || loggedUser.email || "";
  $("telefone").value = perfil.telefone || "";
  $("biografia").value = perfil.biografia || "";
  $("educacao").value = perfil.educacao || "";

  if (perfil.avatar) preview.src = perfil.avatar;
  else preview.src = AVATAR_PADRAO;

  avatarInput.addEventListener("change", () => {
    const arquivo = avatarInput.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = () => {
      preview.src = leitor.result;
    };
    leitor.readAsDataURL(arquivo);
  });

  ["nome", "email", "telefone"].forEach((id) => {
    $(id).addEventListener("input", () => definirErro(id, ""));
  });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const primeiroInvalido = validarFormulario();
    if (primeiroInvalido) {
      primeiroInvalido.focus();
      return;
    }

    const dados = {
      nome: $("nome").value.trim(),
      pronome: $("pronome").value.trim(),
      profissao: $("profissao").value.trim(),
      local: $("local").value.trim(),
      email: $("email").value.trim(),
      telefone: $("telefone").value.trim(),
      biografia: $("biografia").value.trim(),
      educacao: $("educacao").value.trim(),
      avatar: preview.src || perfil.avatar || "",
    };

    try {
      localStorage.setItem(
        "perfil",
        JSON.stringify({ ...perfil, ...dados })
      );

      loggedUser.nome = dados.nome;
      loggedUser.email = dados.email;
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    } catch (erro) {
      aviso.textContent = "Não foi possível salvar os dados: " + erro.message;
      aviso.hidden = false;
      return;
    }

    aviso.textContent = "Dados salvos com sucesso! Redirecionando...";
    aviso.hidden = false;

    setTimeout(() => {
      window.location.href = "perfil.html";
    }, 1000);
  });
});
