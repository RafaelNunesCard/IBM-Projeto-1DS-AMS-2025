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

  function criar(dados) {
    const lista = listar();
    const registro = {
      id: Date.now(),
      status: "solicitado",
      criado_em: new Date().toISOString(),
      atualizado_em: new Date().toISOString(),
      ...dados,
    };
    lista.push(registro);
    salvarTodos(lista);
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

  function atualizarStatus(id, novoStatus) {
    const lista = listar();
    const agendamento = lista.find((a) => String(a.id) === String(id));
    if (agendamento) {
      agendamento.status = novoStatus;
      agendamento.atualizado_em = new Date().toISOString();
      salvarTodos(lista);
    }
    return agendamento || null;
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
