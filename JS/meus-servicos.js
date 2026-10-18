/* =====================================================================
   TechFix — Meus Serviços (área do profissional)
   ---------------------------------------------------------------------
   CRUD de serviços do profissional logado, salvos em localStorage.servicos.
   Cada serviço: { id, profissional_id, categoria_slug, titulo,
                    descricao, preco, ativo }
   Espelha a tabela `servicos` do schema (profissional_id + categoria_id).
   ===================================================================== */

function $(id) {
  return document.getElementById(id);
}

function lerArmazenamento(chave) {
  try {
    return JSON.parse(localStorage.getItem(chave)) || [];
  } catch {
    return [];
  }
}

function salvarArmazenamento(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {
    console.warn(`Não foi possível salvar "${chave}":`, erro);
  }
}

function usuarioLogado() {
  try {
    return JSON.parse(localStorage.getItem("loggedUser"));
  } catch {
    return null;
  }
}

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

/* ------------------------------------------------------------------ */
/* Formulário (modal)                                                  */
/* ------------------------------------------------------------------ */

let focoAnterior = null;

function preencherSelectCategorias() {
  const select = $("ms_categoria");
  select.innerHTML = window.Categorias.lista()
    .map((c) => `<option value="${c.slug}">${c.nome}</option>`)
    .join("");
}

function atualizarDicaCategoria() {
  const categoria = window.Categorias.porSlug($("ms_categoria").value);
  $("ms_categoria_exemplo").textContent = categoria ? categoria.exemplo : "";
}

function abrirFormulario(servico) {
  focoAnterior = document.activeElement;

  $("ms_popup_titulo").textContent = servico ? "Editar serviço" : "Novo serviço";
  $("ms_id").value = servico ? servico.id : "";
  $("ms_titulo").value = servico ? servico.titulo : "";
  $("ms_categoria").value = servico ? servico.categoria_slug : window.CATEGORIAS[0].slug;
  $("ms_descricao").value = servico ? servico.descricao || "" : "";
  $("ms_preco").value = servico && servico.preco != null ? servico.preco : "";
  atualizarDicaCategoria();

  const overlay = $("ms_overlay");
  const popup = $("ms_popup");
  overlay.hidden = false;
  popup.hidden = false;

  requestAnimationFrame(() => {
    overlay.classList.add("visivel");
    popup.classList.add("visivel");
  });

  $("ms_titulo").focus();
}

function fecharFormulario() {
  const overlay = $("ms_overlay");
  const popup = $("ms_popup");

  overlay.classList.remove("visivel");
  popup.classList.remove("visivel");

  const esconder = () => {
    overlay.hidden = true;
    popup.hidden = true;
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) esconder();
  else setTimeout(esconder, 220);

  if (focoAnterior) focoAnterior.focus();
}

/* ------------------------------------------------------------------ */
/* Lista                                                               */
/* ------------------------------------------------------------------ */

function renderizarLista(profissionalId) {
  const todos = lerArmazenamento("servicos");
  const meus = todos.filter((s) => s.profissional_id === profissionalId);

  const lista = $("ms_lista");
  const vazio = $("ms_vazio");

  if (!meus.length) {
    lista.innerHTML = "";
    vazio.hidden = false;
    return;
  }

  vazio.hidden = true;

  lista.innerHTML = meus
    .map((servico) => {
      const categoria = window.Categorias.porSlug(servico.categoria_slug);
      const precoTexto =
        servico.preco != null
          ? `R$ ${formatarPreco(servico.preco)}`
          : `<small>usa seu preço/dia padrão</small>`;

      return `
        <article class="ms-card ${servico.ativo ? "" : "ms-card--inativo"}" data-id="${servico.id}">
          <span class="ms-card__status">${servico.ativo ? "Ativo" : "Pausado"}</span>
          <div class="ms-card__topo">
            <span class="ms-card__icone"><i class="${categoria ? categoria.icone : "ri-tools-line"}"></i></span>
            <div>
              <div class="ms-card__categoria">${categoria ? categoria.nome : "Categoria removida"}</div>
              <h3>${servico.titulo}</h3>
            </div>
          </div>
          <p>${servico.descricao || "Sem descrição."}</p>
          <div class="ms-card__preco">${precoTexto}</div>
          <div class="ms-card__acoes">
            <button type="button" class="btn btn-secundario" data-acao="editar">
              <i class="ri-edit-line"></i> Editar
            </button>
            <button type="button" class="btn btn-secundario" data-acao="pausar">
              <i class="${servico.ativo ? "ri-pause-line" : "ri-play-line"}"></i>
              ${servico.ativo ? "Pausar" : "Ativar"}
            </button>
            <button type="button" class="btn btn-perigo" data-acao="excluir">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </article>`;
    })
    .join("");
}

/* ------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  const usuario = usuarioLogado();
  const ehProfissional = Boolean(usuario && usuario.tipo === "profissional");

  if (!ehProfissional) {
    $("ms_aviso").hidden = false;
    $("ms_lista").hidden = true;
    $("ms_vazio").hidden = true;
    $("bnt_novo_servico").hidden = true;
    return;
  }

  preencherSelectCategorias();
  renderizarLista(usuario.id);

  $("ms_categoria").addEventListener("change", atualizarDicaCategoria);

  $("bnt_novo_servico").addEventListener("click", () => abrirFormulario(null));
  $("ms_cancelar").addEventListener("click", fecharFormulario);
  $("ms_overlay").addEventListener("click", fecharFormulario);

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !$("ms_popup").hidden) fecharFormulario();
  });

  $("ms_form").addEventListener("submit", (evento) => {
    evento.preventDefault();

    const id = $("ms_id").value;
    const titulo = $("ms_titulo").value.trim();
    const categoria_slug = $("ms_categoria").value;
    const descricao = $("ms_descricao").value.trim();
    const precoCampo = $("ms_preco").value;
    const preco = precoCampo ? Number(precoCampo) : null;

    if (!titulo) {
      alert("Dê um título para o serviço.");
      return;
    }

    const todos = lerArmazenamento("servicos");

    if (id) {
      const servico = todos.find((s) => String(s.id) === id);
      if (servico) {
        servico.titulo = titulo;
        servico.categoria_slug = categoria_slug;
        servico.descricao = descricao;
        servico.preco = preco;
      }
    } else {
      todos.push({
        id: Date.now(),
        profissional_id: usuario.id,
        categoria_slug,
        titulo,
        descricao,
        preco,
        ativo: true,
      });
    }

    salvarArmazenamento("servicos", todos);
    renderizarLista(usuario.id);
    fecharFormulario();
  });

  $("ms_lista").addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-acao]");
    if (!botao) return;

    const card = botao.closest(".ms-card");
    const id = card.dataset.id;
    const todos = lerArmazenamento("servicos");
    const servico = todos.find((s) => String(s.id) === id);
    if (!servico) return;

    const acao = botao.dataset.acao;

    if (acao === "editar") {
      abrirFormulario(servico);
    } else if (acao === "pausar") {
      servico.ativo = !servico.ativo;
      salvarArmazenamento("servicos", todos);
      renderizarLista(usuario.id);
    } else if (acao === "excluir") {
      if (!confirm(`Excluir o serviço "${servico.titulo}"?`)) return;
      salvarArmazenamento(
        "servicos",
        todos.filter((s) => String(s.id) !== id)
      );
      renderizarLista(usuario.id);
    }
  });
});
