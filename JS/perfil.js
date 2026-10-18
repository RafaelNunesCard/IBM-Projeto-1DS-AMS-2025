/* =====================================================================
   TechFix — Perfil
   ---------------------------------------------------------------------
   Renderiza os dados salvos em localStorage (perfil / loggedUser),
   cuida do avatar e do popup de status.
   ===================================================================== */

const ROTULOS_STATUS = {
  vacation: "Estou de férias",
  sick: "Estou doente",
  focusing: "Estou focado",
  grief: "Estou de luto",
};

const ROTULOS_DURACAO = {
  hour: "Uma hora",
  day: "Um dia",
  week: "Uma semana",
  month: "Um mês",
};

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

function formatarTelefone(telefone) {
  const numeros = String(telefone || "").replace(/\D/g, "");

  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }
  if (numeros.length === 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }
  return telefone || "";
}

/* ------------------------------------------------------------------ */
/* Avatar                                                              */
/* ------------------------------------------------------------------ */

function ajustarAvatar(imagem) {
  const aplicar = () => {
    const largura = imagem.naturalWidth;
    const altura = imagem.naturalHeight;

    imagem.classList.remove("img-horizontal", "img-vertical", "img-quadrada");

    if (!largura || !altura) return;
    if (largura > altura) imagem.classList.add("img-horizontal");
    else if (altura > largura) imagem.classList.add("img-vertical");
    else imagem.classList.add("img-quadrada");
  };

  if (imagem.complete && imagem.naturalWidth) aplicar();
  else imagem.addEventListener("load", aplicar, { once: true });
}

/* ------------------------------------------------------------------ */
/* Dados do perfil                                                     */
/* ------------------------------------------------------------------ */

function preencherContato(id, valor, href) {
  const link = $(id);

  if (valor) {
    link.textContent = valor;
    if (href) link.href = href;
    else link.removeAttribute("href");
    link.removeAttribute("aria-disabled");
  } else {
    link.textContent = id === "perfil_email" ? "E-mail não informado" : "Telefone não informado";
    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
  }
}

function preencherPerfil(perfil, loggedUser) {
  const nome = perfil.nome || loggedUser.nome || "Usuário";

  $("perfil_nome").textContent = nome;
  $("perfil_profissao").textContent = perfil.profissao || "Cliente";

  const pronome = $("perfil_pronome");
  if (perfil.pronome && perfil.pronome.trim()) {
    pronome.textContent = perfil.pronome.trim();
    pronome.hidden = false;
  } else {
    pronome.hidden = true;
  }

  $("perfil_local").textContent = perfil.local || "Local não informado";

  const email = perfil.email || loggedUser.email;
  preencherContato(
    "perfil_email",
    email,
    email ? `mailto:${String(email).trim()}` : ""
  );

  const telefone = perfil.telefone;
  preencherContato(
    "perfil_telefone",
    telefone ? formatarTelefone(telefone) : "",
    telefone ? `tel:+55${String(telefone).replace(/\D/g, "")}` : ""
  );

  $("perfil_biografia").textContent =
    perfil.biografia || "Você ainda não adicionou uma biografia.";
  $("perfil_educacao").textContent =
    perfil.educacao || "Você ainda não adicionou informações de educação.";

  const imagem = $("perfil_avatar");
  if (perfil.avatar) imagem.src = perfil.avatar;
  ajustarAvatar(imagem);

  const temDados = Boolean(
    perfil.nome || perfil.email || loggedUser.nome || loggedUser.email
  );
  $("perfil_aviso").hidden = temDados;

  const avaliacoes = lerArmazenamento("avaliacoes") || [];
  let agendamentosDoUsuario = [];

  if (window.Agendamentos && loggedUser.id) {
    agendamentosDoUsuario =
      loggedUser.tipo === "profissional"
        ? window.Agendamentos.doProfissional(loggedUser.id)
        : window.Agendamentos.doCliente(loggedUser.id);
  }

  $("stat_agendamentos").textContent = agendamentosDoUsuario.length || 0;
  $("stat_avaliacoes").textContent = avaliacoes.length || 0;
}

/* ------------------------------------------------------------------ */
/* Status                                                              */
/* ------------------------------------------------------------------ */

let statusAtual = null;
let focoAnterior = null;

function renderizarBadge() {
  const badge = $("status_badge");
  const remover = $("status_remover");

  if (statusAtual && ROTULOS_STATUS[statusAtual.categoria]) {
    $("status_badge_texto").textContent = ROTULOS_STATUS[statusAtual.categoria];
    badge.hidden = false;
    remover.hidden = false;
  } else {
    badge.hidden = true;
    remover.hidden = true;
  }
}

function sincronizarSelects() {
  if (statusAtual) {
    if (ROTULOS_STATUS[statusAtual.categoria])
      $("status_categoria").value = statusAtual.categoria;
    if (ROTULOS_DURACAO[statusAtual.duracao])
      $("status_duracao").value = statusAtual.duracao;
  }
}

function abrirStatus() {
  sincronizarSelects();
  focoAnterior = document.activeElement;

  const overlay = $("status_overlay");
  const popup = $("status_popup");

  overlay.hidden = false;
  popup.hidden = false;
  document.body.classList.add("status-aberto");

  requestAnimationFrame(() => {
    overlay.classList.add("visivel");
    popup.classList.add("visivel");
  });

  $("status_categoria").focus();
}

function fecharStatus() {
  const overlay = $("status_overlay");
  const popup = $("status_popup");

  overlay.classList.remove("visivel");
  popup.classList.remove("visivel");
  document.body.classList.remove("status-aberto");

  const esconder = () => {
    overlay.hidden = true;
    popup.hidden = true;
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) esconder();
  else setTimeout(esconder, 260);

  if (focoAnterior) focoAnterior.focus();
}

function salvarStatus(status) {
  const perfil = lerArmazenamento("perfil") || {};
  if (status) perfil.status = status;
  else delete perfil.status;

  try {
    localStorage.setItem("perfil", JSON.stringify(perfil));
  } catch (erro) {
    console.warn("Não foi possível salvar o status:", erro);
  }

  statusAtual = status;
  renderizarBadge();
}

function ligarEventos() {
  $("bnt_status").addEventListener("click", abrirStatus);
  $("status_cancelar").addEventListener("click", fecharStatus);
  $("status_overlay").addEventListener("click", fecharStatus);

  $("status_aplicar").addEventListener("click", () => {
    salvarStatus({
      categoria: $("status_categoria").value,
      duracao: $("status_duracao").value,
      atualizadoEm: new Date().toISOString(),
    });
    fecharStatus();
  });

  $("status_remover").addEventListener("click", () => {
    salvarStatus(null);
    fecharStatus();
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !$("status_popup").hidden) fecharStatus();
  });
}

/* ------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  const perfil = lerArmazenamento("perfil") || {};
  const loggedUser = lerArmazenamento("loggedUser") || {};

  preencherPerfil(perfil, loggedUser);

  const botaoServicos = $("bnt_meus_servicos");
  if (botaoServicos) botaoServicos.hidden = loggedUser.tipo !== "profissional";

  const botaoAgendamentos = $("bnt_agendamentos");
  const textoAgendamentos = $("bnt_agendamentos_texto");
  if (botaoAgendamentos && loggedUser.tipo === "profissional") {
    botaoAgendamentos.href = "solicitacoes.html";
    if (textoAgendamentos) textoAgendamentos.textContent = "Solicitações";
  }

  statusAtual = perfil.status || null;
  renderizarBadge();

  ligarEventos();
});
