/* =====================================================================
   TechFix — Dados de Agendamentos
   ---------------------------------------------------------------------
   Módulo compartilhado pra ler/gravar localStorage.agendamentos.
   Cada agendamento: { id, numero_pedido, cliente_id, cliente_nome,
     profissional_id, profissional_nome, servico_id, servico_titulo,
     datas: [iso...], metodo_pagamento, subtotal, taxa_servico,
     valor_total, status, criado_em, atualizado_em }
   status: solicitado | aceito | recusado | em_andamento | concluido | cancelado
   ===================================================================== */

window.Agendamentos = (() => {
  const CHAVE = "agendamentos";

  const ROTULOS_STATUS = {
    solicitado: "Aguardando o profissional",
    aceito: "Aceito",
    recusado: "Recusado",
    em_andamento: "Em andamento",
    concluido: "Concluído",
    cancelado: "Cancelado",
  };

  function listar() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE)) || [];
    } catch {
      return [];
    }
  }

  function salvarTodos(lista) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(lista));
    } catch (erro) {
      console.warn("Não foi possível salvar agendamentos:", erro);
    }
  }

  async function criar(dados) {
    const resposta = await fetch("/api/agendamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const data = await resposta.json().catch(() => ({}));

    if (!resposta.ok || data.status !== "ok") {
      throw new Error(data.mensagem || "Não foi possível criar o agendamento.");
    }

    const registro = data.dados?.agendamento;
    if (registro) {
      salvarTodos([...listar(), registro]);
    }
    return registro;
  }

  function doCliente(clienteId) {
    return listar()
      .filter((a) => String(a.cliente_id) === String(clienteId))
      .sort((a, b) => (b.criado_em || "").localeCompare(a.criado_em || ""));
  }

  function doProfissional(profissionalId) {
    return listar()
      .filter((a) => String(a.profissional_id) === String(profissionalId))
      .sort((a, b) => (b.criado_em || "").localeCompare(a.criado_em || ""));
  }

  async function atualizarStatus(id, novoStatus) {
    const resposta = await fetch(`/api/agendamentos/${id}/acao`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus }),
    });

    const data = await resposta.json().catch(() => ({}));

    if (!resposta.ok || data.status !== "ok") {
      throw new Error(data.mensagem || "Não foi possível atualizar o status.");
    }

    const atualizado = data.dados?.agendamento;
    if (atualizado) {
      salvarTodos(listar().map((a) => (String(a.id) === String(id) ? { ...a, ...atualizado } : a)));
    }
    return atualizado;
  }

  return {
    listar,
    criar,
    doCliente,
    doProfissional,
    atualizarStatus,
    ROTULOS_STATUS,
  };
})();
