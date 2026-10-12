function setTexto(id, texto) {
  const el = document.getElementById(id);
  if (el) el.textContent = texto;
}

function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function renderBarras(distribuicao) {
  const rotulos = [
    "5 estrelas",
    "4 estrelas",
    "3 estrelas",
    "2 estrelas",
    "1 estrela",
  ];

  return distribuicao
    .map(
      (porcentagem, indice) => `
      <div>${rotulos[indice]} (${porcentagem}%)</div>
      <div class="barra">
        <div class="preenchimento" style="width: ${porcentagem}%"></div>
      </div>`
    )
    .join("");
}

function renderComentario(avaliacao) {
  return `
    <div class="comentario">
      <div class="perfil">
        <img src="${avaliacao.imagem}" alt="Perfil Comentario" loading="lazy" />
        <h3>${avaliacao.nome}</h3>
      </div>
      <div class="aval_clt aval1">
        ${Profissionais.renderEstrelas(avaliacao.nota)}
        <h4>${avaliacao.titulo}</h4>
      </div>
      <h4>Avaliado em ${avaliacao.data}</h4>
      <h3>Manutenção verificada</h3>
      <p>${avaliacao.texto}</p>
      <h4>${avaliacao.uteis} pessoas acharam esta avaliação útil</h4>
      <div class="bnt_coment">
        <button class="bnt comen util like-button">Útil</button>
        <p class="like-message" style="display: none">
          👍 Você achou esta avaliação útil!
        </p>
        <button class="bnt comen denunciar">Denunciar</button>
      </div>
    </div>`;
}

function preencherPerfil(profissional) {
  document.title = `TechFix - ${profissional.nome}`;

  // ---------- Banner ----------
  const imagem = document.getElementById("clt_imagem");
  if (imagem) {
    imagem.src = profissional.imagem;
    imagem.alt = `Foto de ${profissional.nome}`;
  }

  setTexto("clt_nome", profissional.nome);
  setTexto("clt_cargo", profissional.cargo);
  setTexto("clt_nota", profissional.avaliacao.toFixed(1));
  setHTML("clt_estrelas", Profissionais.renderEstrelas(profissional.avaliacao));
  setTexto(
    "clt_total_avaliacoes",
    `${profissional.total_avaliacoes} Avaliações de Clientes`
  );
  setHTML("clt_grafico", renderBarras(profissional.distribuicao));
  setTexto(
    "clt_projetos",
    `Mais de ${profissional.projetos_concluidos} projetos concluídos`
  );
  setHTML(
    "clt_selos",
    profissional.selos
      .map(
        (selo) => `
        <div class="direito">
          <div class="direito_i"><i class="${selo.icone}"></i></div>
          <h4>${selo.texto}</h4>
        </div>`
      )
      .join("")
  );
  setTexto(
    "clt_preco",
    `R$${Profissionais.formatarPreco(profissional.preco_dia)} por dia`
  );

  const botaoContratar = document.getElementById("bnt_contratar");
  if (botaoContratar) {
    botaoContratar.href = `agendamento.html?id=${profissional.id}`;
  }

  // ---------- Descrição ----------
  setTexto("clt_biografia", profissional.biografia);
  setTexto("clt_educacao", profissional.educacao);
  setHTML(
    "clt_contato",
    `Para mais informações ou para discutir possíveis serviços, entre em contato: <br /><br />
     E-mail: <br />
     ${profissional.contato.email} <br /><br />
     Número: <br />
     ${profissional.contato.telefone}`
  );

  setHTML(
    "clt_trabalhos",
    profissional.trabalhos
      .map(
        (trabalho) => `
        <div class="card">
          <img src="${trabalho.imagem}" alt="Trabalho concluído" loading="lazy" />
          <h1>${trabalho.titulo}</h1>
          <p>${trabalho.descricao}</p>
        </div>`
      )
      .join("")
  );

  // ---------- Item Consertado (opcional) ----------
  const secaoItem = document.getElementById("item");

  if (profissional.item) {
    setHTML(
      "clt_item_tabela",
      profissional.item.especificacoes
        .map(
          (especificacao) => `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd">${especificacao.recurso}</td>
            <td style="padding: 10px; border: 1px solid #ddd">${especificacao.especificacao}</td>
          </tr>`
        )
        .join("")
    );
    setHTML(
      "clt_item_imgs",
      profissional.item.imagens
        .map(
          (src) => `
          <div class="img">
            <img src="${src}" alt="Item consertado" loading="lazy" />
          </div>`
        )
        .join("")
    );
    setTexto("clt_item_sobre", profissional.item.sobre);
    setHTML(
      "clt_item_preco",
      `${profissional.item.titulo}: <span>${profissional.item.preco}</span>`
    );
  } else if (secaoItem) {
    secaoItem.classList.add("oculto");
  }

  // ---------- Avaliações ----------
  setHTML(
    "clt_aval_estrelas",
    Profissionais.renderEstrelas(profissional.avaliacao)
  );
  setTexto("clt_aval_nota", `${profissional.avaliacao.toFixed(1)} of 5`);
  setHTML("clt_aval_grafico", renderBarras(profissional.distribuicao));
  setHTML(
    "clt_comentarios",
    profissional.avaliacoes_clientes.map(renderComentario).join("")
  );
}

function mostrarErroCarregamento() {
  const main = document.querySelector("main");
  if (!main) return;

  main.innerHTML = `
    <section class="erro_carregamento">
      <i class="ri-error-warning-line"></i>
      <h1>Não foi possível carregar o perfil</h1>
      <p>Verifique se o site está rodando com um servidor local (Live Server) e tente novamente.</p>
      <a href="serviço.html"><button class="bnt">VOLTAR AOS SERVIÇOS</button></a>
    </section>`;
}

document.addEventListener("DOMContentLoaded", async () => {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id");

  if (!id) {
    window.location.replace("404.html");
    return;
  }

  let profissionais;

  try {
    profissionais = await Profissionais.carregarProfissionais();
  } catch (erro) {
    console.error(erro);
    mostrarErroCarregamento();
    return;
  }

  const profissional = Profissionais.getPorId(profissionais, id);

  if (!profissional) {
    window.location.replace("404.html");
    return;
  }

  preencherPerfil(profissional);
});

// ---------- Botão "Útil" (conteúdo dinâmico) ----------
document.addEventListener("click", (evento) => {
  const botao = evento.target.closest(".like-button");
  if (!botao) return;

  const area = botao.closest(".bnt_coment");
  const mensagem = area ? area.querySelector(".like-message") : null;

  if (mensagem) {
    mensagem.style.display = "block";
    setTimeout(() => {
      mensagem.style.display = "none";
    }, 3000);
  }
});