/* =====================================================================
   TechFix — Meus Agendamentos (área do cliente)
   ---------------------------------------------------------------------
   Lista, só pra leitura, o status de cada agendamento do cliente
   logado. O cliente não aceita/recusa — só acompanha.
   ===================================================================== */

function $(id) {
  return document.getElementById(id);
}

function usuarioLogadoMeusAgendamentos() {
  try {
    return JSON.parse(localStorage.getItem("loggedUser"));
  } catch {
    return null;
  }
}

function dinheiroMeusAgendamentos(valor) {
  return `R$ ${Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  })}`;
}

function formatarDataMeusAgendamentos(iso) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function datasResumoMeusAgendamentos(datas) {
  if (!Array.isArray(datas) || !datas.length) return "Sem datas";
  const ordenadas = [...datas].sort();
  if (ordenadas.length === 1) return formatarDataMeusAgendamentos(ordenadas[0]);
  return `${formatarDataMeusAgendamentos(
    ordenadas[0]
  )} até ${formatarDataMeusAgendamentos(ordenadas[ordenadas.length - 1])} (${
    ordenadas.length
  } dias)`;
}

document.addEventListener("DOMContentLoaded", () => {
  const usuario = usuarioLogadoMeusAgendamentos();
  const ehCliente = Boolean(usuario && usuario.tipo === "cliente");

  if (!ehCliente) {
    $("meusag_aviso").hidden = false;
    $("meusag_lista").hidden = true;
    return;
  }

  const agendamentos = window.Agendamentos.doCliente(usuario.id);
  const lista = $("meusag_lista");
  const vazio = $("meusag_vazio");

  if (!agendamentos.length) {
    vazio.hidden = false;
    return;
  }

  lista.innerHTML = agendamentos
    .map(
      (agendamento) => `
        <article class="ag-card">
          <div class="ag-card__info">
            <span class="ag-status ag-status--${agendamento.status}">${
        window.Agendamentos.ROTULOS_STATUS[agendamento.status] || agendamento.status
      }</span>
            <span class="ag-card__titulo">${agendamento.servico_titulo || "Serviço"}</span>
            <span class="ag-card__pessoa"><i class="ri-tools-fill"></i> ${agendamento.profissional_nome}</span>
            <span class="ag-card__datas">${datasResumoMeusAgendamentos(agendamento.datas)}</span>
          </div>
          <div class="ag-card__valores">
            <span class="ag-card__total">${dinheiroMeusAgendamentos(agendamento.valor_total)}</span>
            <span class="ag-card__pedido">${agendamento.numero_pedido}</span>
          </div>
        </article>`
    )
    .join("");
});
