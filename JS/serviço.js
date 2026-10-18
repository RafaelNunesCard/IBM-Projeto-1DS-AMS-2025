const prefereMenosMovimento = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let listaCarregada = false;

function montarFiltros() {
  const container = document.getElementById("tipos");
  if (!container || !window.CATEGORIAS) return;

  const botoesCategorias = window.CATEGORIAS.map(
    (cat) => `
      <div class="tipos" data-categoria="${cat.slug}">
        <div class="i"><i class="${cat.icone}"></i></div>
        <h2>${cat.nome}</h2>
      </div>`
  ).join("");

  container.innerHTML = `
    ${botoesCategorias}
    <div class="tipos ativo" data-categoria="todos">
      <div class="i"><i class="ri-grid-fill"></i></div>
      <h2>Todos</h2>
    </div>`;
}

function criarCard(profissional) {
  const card = document.createElement("div");
  card.className = "card_clt";
  const categorias = profissional.categorias || [profissional.categoria];
  card.setAttribute("data-categoria", categorias.join(","));

  card.innerHTML = `
    <div class="clt">
      <div class="img_clt">
        <img src="${profissional.imagem}" alt="Foto de ${profissional.nome}" loading="lazy" />
      </div>
      <div class="text_clt">
        <h1>${profissional.nome}</h1>
        <h3>${profissional.cargo}</h3>
        <p><strong>Descrição:</strong> ${profissional.descricao_curta}</p>
        <div class="alinha_clt">
          <div>
            <div class="aval_clt">
              ${Profissionais.renderEstrelas(profissional.avaliacao)}
              <h3>${profissional.avaliacao.toFixed(1)}</h3>
            </div>
            <h2>R$${Profissionais.formatarPreco(profissional.preco_dia)} por dia</h2>
          </div>
          <div class="but_clt">
            <a href="contratar.html?id=${profissional.id}">
              <button class="bnt">VER PERFIL</button>
            </a>
          </div>
        </div>
      </div>
    </div>`;

  return card;
}

async function carregarLista() {
  const container = document.getElementById("lista_profissionais");
  if (!container) return;

  try {
    const profissionais = await Profissionais.carregarProfissionais();

    container.innerHTML = "";
    const fragmento = document.createDocumentFragment();

    profissionais.forEach((profissional) => {
      fragmento.appendChild(criarCard(profissional));
    });

    container.appendChild(fragmento);
    listaCarregada = true;
  } catch (erro) {
    console.error(erro);

    container.innerHTML = `
      <div class="lista_erro">
        <i class="ri-error-warning-line"></i>
        <p>Não foi possível carregar os profissionais. Verifique se o site está rodando com um servidor local (Live Server).</p>
        <button class="bnt" id="recarregar_lista">TENTAR NOVAMENTE</button>
      </div>`;

    const recarregar = document.getElementById("recarregar_lista");
    if (recarregar) recarregar.addEventListener("click", carregarLista);
  }
}

function atualizarCards(animar = false) {
  if (!listaCarregada) return;

  const buscaEl = document.getElementById("search");
  const textoBusca = buscaEl ? buscaEl.value.toLowerCase().trim() : "";

  let categoriaAtiva = document
    .querySelector("#tipos .tipos.ativo")
    ?.getAttribute("data-categoria");

  if (!categoriaAtiva) categoriaAtiva = "todos";

  const cards = document.querySelectorAll(".card_clt");
  let visiveis = 0;

  cards.forEach((card) => {
    const titulo =
      card.querySelector(".text_clt h1")?.textContent.toLowerCase() || "";
    const categoriaCard = card.getAttribute("data-categoria");

    const combinaBusca = titulo.includes(textoBusca);
    const categoriasDoCard = (categoriaCard || "").split(",");
    const combinaCategoria =
      categoriaAtiva === "todos" || categoriasDoCard.includes(categoriaAtiva);
    const mostrar = combinaBusca && combinaCategoria;

    card.style.display = mostrar ? "flex" : "none";

    if (mostrar) {
      visiveis++;

      if (animar && !prefereMenosMovimento) {
        card.animate(
          [
            { opacity: 0, transform: "translateY(16px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 350, easing: "ease-out" }
        );
      }
    }
  });

  const contador = document.getElementById("contador_resultados");
  if (contador) {
    if (visiveis === 0) contador.textContent = "Nenhum resultado";
    else if (visiveis === 1) contador.textContent = "1 profissional encontrado";
    else contador.textContent = `${visiveis} profissionais encontrados`;
  }

  const vazio = document.getElementById("sem_resultados");
  if (vazio) vazio.hidden = visiveis !== 0;
}

document.addEventListener("DOMContentLoaded", () => {
  montarFiltros();

  const botoes = document.querySelectorAll("#tipos .tipos");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      // REMOVE ativo de todos
      botoes.forEach((b) => b.classList.remove("ativo"));

      // ADICIONA ativo no botão clicado
      botao.classList.add("ativo");

      atualizarCards(true);
    });
  });

  // busca
  const busca = document.getElementById("search");
  if (busca) busca.addEventListener("keyup", () => atualizarCards());

  // limpar filtros (estado vazio)
  const limpar = document.getElementById("limpar_filtros");
  if (limpar) {
    limpar.addEventListener("click", () => {
      if (busca) busca.value = "";
      botoes.forEach((b) => b.classList.remove("ativo"));
      const todos = document.querySelector(
        '#tipos .tipos[data-categoria="todos"]'
      );
      if (todos) todos.classList.add("ativo");
      atualizarCards(true);
    });
  }

  carregarLista().then(() => atualizarCards());
});