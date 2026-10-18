/* =====================================================================
   TechFix — Serviços reais na página de Serviços
   ---------------------------------------------------------------------
   Lista, abaixo da vitrine fictícia, os serviços que profissionais de
   verdade cadastraram em "Meus Serviços" (localStorage.servicos), pra
   dar um jeito de encontrar e solicitar agendamento com eles.
   ===================================================================== */

function lerArmazenamentoServicosReais(chave) {
  try {
    return JSON.parse(localStorage.getItem(chave)) || [];
  } catch {
    return [];
  }
}

function formatarPrecoServicoReal(valor) {
  return Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

document.addEventListener("DOMContentLoaded", () => {
  const secao = document.getElementById("servicos_reais");
  const lista = document.getElementById("lista_servicos_reais");
  if (!secao || !lista) return;

  const servicos = lerArmazenamentoServicosReais("servicos").filter(
    (s) => s.ativo !== false
  );
  const profissionais = lerArmazenamentoServicosReais("profissionais");

  if (!servicos.length) return;

  secao.hidden = false;

  lista.innerHTML = servicos
    .map((servico) => {
      const conta = profissionais.find(
        (p) => String(p.id) === String(servico.profissional_id)
      );
      if (!conta) return "";

      const categoria =
        window.Categorias && window.Categorias.porSlug
          ? window.Categorias.porSlug(servico.categoria_slug)
          : null;
      const preco = servico.preco != null ? servico.preco : conta.preco_dia;

      return `
        <article class="servico-real-card">
          <span class="servico-real-card__icone">
            <i class="${categoria ? categoria.icone : "ri-tools-line"}"></i>
          </span>
          <div class="servico-real-card__corpo">
            <span class="servico-real-card__categoria">${
              categoria ? categoria.nome : "Serviço"
            }</span>
            <h3>${servico.titulo}</h3>
            <p>${servico.descricao || "Sem descrição."}</p>
            <span class="servico-real-card__profissional">
              <i class="ri-user-fill"></i> ${conta.nome}
            </span>
          </div>
          <div class="servico-real-card__acao">
            ${
              preco != null
                ? `<strong>R$ ${formatarPrecoServicoReal(preco)}</strong>`
                : "<strong>Sob consulta</strong>"
            }
            <a class="btn btn-primario" href="agendamento.html?servico=${servico.id}">
              Solicitar
            </a>
          </div>
        </article>`;
    })
    .join("");
});
