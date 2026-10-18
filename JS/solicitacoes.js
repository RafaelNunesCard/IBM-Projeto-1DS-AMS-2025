/* =====================================================================
   TechFix — Solicitações (área do profissional)
   ---------------------------------------------------------------------
   Lista os agendamentos recebidos pelo profissional logado e permite
   aceitar / recusar / avançar o status.
   ===================================================================== */

function $(id) {
  return document.getElementById(id);
}

function usuarioLogadoSolicitacoes() {
  try {
    return JSON.parse(localStorage.getItem("loggedUser"));
  } catch {
    return null;
  }
}

function dinheiroSolicitacoes(valor) {
  return `R$ ${Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  })}`;
}

function datasResumo(datas) {
  if (!Array.isArray(datas) || !datas.length) return "Sem datas";
  const ordenadas = [...datas].sort();
  if (ordenadas.length === 1) return formatarData(ordenadas[0]);
  return `${formatarData(ordenadas[0])} até ${formatarData(
    ordenadas[ordenadas.length - 1]
  )} (${ordenadas.length} dias)`;
}

function formatarData(iso) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

const ACOES_POR_STATUS = {
  solicitado: [
    { acao: "aceito", rotulo: "Aceitar", classe: "btn-primario" },
    { acao: "recusado", rotulo: "Recusar", classe: "btn-perigo" },
  ],
  aceito: [
    { acao: "em_andamento", rotulo: "Iniciar atendimento", classe: "btn-primario" },
  ],
  em_andamento: [
    { acao: "concluido", rotulo: "Marcar concluído", classe: "btn-primario" },
  ],
};

let abaAtiva = "solicitado";
let profissionalId = null;

function renderizarLista() {
  const todos = window.Agendamentos.doProfissional(profissionalId);

  const filtrados =
    abaAtiva === "historico"
      ? todos.filter((a) => a.status === "recusado" || a.status === "cancelado")
      : todos.filter((a) => a.status === abaAtiva);

  const lista = $("sol_lista");
  const vazio = $("sol_vazio");

  if (!filtrados.length) {
    lista.innerHTML = "";
    vazio.hidden = false;
    return;
  }

  vazio.hidden = true;

  lista.innerHTML = filtrados
    .map((agendamento) => {
      const acoes = ACOES_POR_STATUS[agendamento.status] || [];
      const botoes = acoes
        .map(
          (a) =>
            `<button type="button" class="btn ${a.classe}" data-id="${agendamento.id}" data-para="${a.acao}">${a.rotulo}</button>`
        )
        .join("");

      return `
        <article class="ag-card">
          <div class="ag-card__info">
            <span class="ag-status ag-status--${agendamento.status}">${
        window.Agendamentos.ROTULOS_STATUS[agendamento.status] || agendamento.status
      }</span>
            <span class="ag-card__titulo">${agendamento.servico_titulo || "Serviço"}</span>
            <span class="ag-card__pessoa"><i class="ri-user-fill"></i> ${agendamento.cliente_nome}</span>
            <span class="ag-card__datas">${datasResumo(agendamento.datas)}</span>
          </div>
          <div class="ag-card__valores">
            <span class="ag-card__total">${dinheiroSolicitacoes(agendamento.valor_total)}</span>
            <span class="ag-card__pedido">${agendamento.numero_pedido}</span>
          </div>
          <div class="ag-card__acoes">${botoes}</div>
        </article>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const usuario = usuarioLogadoSolicitacoes();
  const ehProfissional = Boolean(usuario && usuario.tipo === "profissional");

  if (!ehProfissional) {
    $("sol_aviso").hidden = false;
    $("sol_abas").hidden = true;
    $("sol_lista").hidden = true;
    return;
  }

  profissionalId = usuario.id;
  renderizarLista();

  $("sol_abas").addEventListener("click", (evento) => {
    const botao = evento.target.closest(".ag-aba");
    if (!botao) return;

    document.querySelectorAll(".ag-aba").forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    abaAtiva = botao.dataset.status;
    renderizarLista();
  });

  $("sol_lista").addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-id]");
    if (!botao) return;

    window.Agendamentos.atualizarStatus(botao.dataset.id, botao.dataset.para);
    renderizarLista();
  });
});
