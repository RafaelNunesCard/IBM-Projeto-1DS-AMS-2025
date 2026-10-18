/* =====================================================================
   TechFix — Carregador de profissionais (compartilhado)
   ---------------------------------------------------------------------
   Carrega JSON/profissionais.json (catálogo fictício de demonstração)
   e junta com as contas reais de profissional (localStorage.profissionais)
   que já tenham ao menos um serviço ativo cadastrado em "Meus Serviços".
   Só assim um pedido feito contra uma conta real chega pra alguém de
   verdade aceitar/recusar — profissionais fictícios do JSON continuam
   aparecendo no catálogo, mas não têm login por trás, então pedidos
   feitos com eles nunca aparecem numa tela de "Solicitações".
   ===================================================================== */

window.Profissionais = (() => {
  const CAMINHO_JSON = "../JSON/profissionais.json";

  let cache = null;

  function lerArmazenamento(chave) {
    try {
      return JSON.parse(localStorage.getItem(chave)) || [];
    } catch {
      return [];
    }
  }

  function montarProfissionaisDeContas() {
    const contas = lerArmazenamento("profissionais");
    const servicos = lerArmazenamento("servicos");

    return contas
      .map((conta) => {
        const servicosDaConta = servicos.filter(
          (s) => String(s.profissional_id) === String(conta.id) && s.ativo
        );

        if (!servicosDaConta.length) return null; // sem serviço ativo, não aparece no catálogo

        const categorias = [...new Set(servicosDaConta.map((s) => s.categoria_slug))];
        const precoBase =
          conta.preco_dia != null
            ? conta.preco_dia
            : servicosDaConta.find((s) => s.preco != null)?.preco || 0;

        return {
          id: String(conta.id),
          nome: conta.nome,
          cargo: conta.profissao || servicosDaConta[0].titulo,
          categoria: categorias[0],
          categorias,
          imagem: conta.avatar_url || "../img/Perfis/Default perfil.jpg",
          preco_dia: precoBase,
          avaliacao: 0,
          total_avaliacoes: 0,
          projetos_concluidos: 0,
          distribuicao: [0, 0, 0, 0, 0],
          selos: [],
          descricao_curta: servicosDaConta[0].descricao || `${servicosDaConta.length} serviço(s) cadastrado(s).`,
          biografia:
            conta.biografia || "Esse profissional ainda não escreveu uma biografia.",
          educacao: conta.educacao || "",
          contato: { email: conta.email, telefone: conta.telefone || "" },
          trabalhos: [],
          avaliacoes_clientes: [],
          servicos: servicosDaConta,
          origem: "conta",
        };
      })
      .filter(Boolean);
  }

  async function carregarProfissionais() {
    if (cache) return cache;

    const resposta = await fetch(CAMINHO_JSON);

    if (!resposta.ok) {
      throw new Error(`Falha ao carregar profissionais (HTTP ${resposta.status})`);
    }

    const fixos = await resposta.json();
    const deContas = montarProfissionaisDeContas();

    cache = [...deContas, ...fixos];
    return cache;
  }

  function getPorId(lista, id) {
    return lista.find((profissional) => String(profissional.id) === String(id)) || null;
  }

  function renderEstrelas(nota) {
    let html = "";

    for (let i = 1; i <= 5; i++) {
      if (nota >= i) html += '<i class="ri-star-fill"></i>';
      else if (nota >= i - 0.5) html += '<i class="ri-star-half-fill"></i>';
      else html += '<i class="ri-star-line"></i>';
    }

    return html;
  }

  function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return { carregarProfissionais, getPorId, renderEstrelas, formatarPreco };
})();
