/* =====================================================================
   TechFix — Carregador de profissionais (compartilhado)
   ---------------------------------------------------------------------
   Carrega profissionais via API (/api/profissionais), que retorna os
   profissionais com serviço ativo cadastrado no backend.
   ===================================================================== */

window.Profissionais = (() => {
  const CAMINHO_API = "/api/profissionais";

  let cache = null;

  function mapearProfissionalApi(dados) {
    const servicos = dados.servicos || [];

    return {
      id: String(dados.id),
      nome: dados.nome,
      cargo: dados.profissao || servicos[0]?.titulo || "",
      categoria: servicos[0]?.categoria_slug || "",
      categorias: servicos.map((s) => s.categoria_slug),
      imagem: dados.avatar_url || "../img/Perfis/Default perfil.jpg",
      preco_dia: dados.preco_dia ?? servicos[0]?.preco ?? 0,
      avaliacao: 0,
      total_avaliacoes: 0,
      projetos_concluidos: 0,
      distribuicao: [0, 0, 0, 0, 0],
      selos: [],
      descricao_curta: servicos[0]?.descricao || "",
      biografia: dados.bio || "",
      educacao: dados.educacao || "",
      contato: { email: dados.email, telefone: dados.telefone || "" },
      trabalhos: [],
      avaliacoes_clientes: [],
      servicos,
      origem: "conta",
    };
  }

  async function carregarProfissionais() {
    if (cache) return cache;

    const resposta = await fetch(CAMINHO_API);

    if (!resposta.ok) {
      throw new Error(`Falha ao carregar profissionais (HTTP ${resposta.status})`);
    }

    const data = await resposta.json();
    const lista = data?.dados?.profissionais || [];

    cache = lista.map(mapearProfissionalApi);
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
