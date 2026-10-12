/* =====================================================================
   TechFix — Carregador de profissionais (compartilhado)
   ---------------------------------------------------------------------
   Carrega JSON/profissionais.json uma única vez e expõe helpers
   usados pelas páginas serviço.html e contratar.html.
   ===================================================================== */

window.Profissionais = (() => {
  const CAMINHO_JSON = "../JSON/profissionais.json";

  let cache = null;

  async function carregarProfissionais() {
    if (cache) return cache;

    const resposta = await fetch(CAMINHO_JSON);

    if (!resposta.ok) {
      throw new Error(`Falha ao carregar profissionais (HTTP ${resposta.status})`);
    }

    cache = await resposta.json();
    return cache;
  }

  function getPorId(lista, id) {
    return lista.find((profissional) => profissional.id === id) || null;
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