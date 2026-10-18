/* =====================================================================
   TechFix — Agendamento
   ---------------------------------------------------------------------
   Orquestra o fluxo completo em 3 passos:
     1. Escolha das datas (calendário)
     2. Método de pagamento (Pix / Cartão)
     3. Resumo + confirmação (modal de sucesso)
   Carrega o profissional do JSON a partir de ?id=<slug>.
   ===================================================================== */

const TAXA_SERVICO = 0.05;
const LIMITE_MESES_FUTUROS = 12;

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];
const MESES_ABREV = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

const ROTULOS_METODO = {
  pix: "Pix",
  cartao: "Cartão de Crédito/Débito",
};

const hoje = new Date();
hoje.setHours(0, 0, 0, 0);

const estado = {
  profissional: null,
  datas: new Set(),
  metodo: null,
  mes: hoje.getMonth(),
  ano: hoje.getFullYear(),
  // Quando true, o profissional é uma conta cadastrada de verdade
  // (não um dos perfis fictícios da vitrine) — o pedido vira um
  // agendamento real, com status e visível pro profissional aceitar.
  modoReal: false,
  servicoReal: null,
};

/* ------------------------------------------------------------------ */
/* Fluxo real (profissional cadastrado, não a vitrine fictícia)       */
/* ------------------------------------------------------------------ */

function lerArmazenamentoJSON(chave) {
  try {
    return JSON.parse(localStorage.getItem(chave)) || [];
  } catch {
    return [];
  }
}

function carregarServicoReal(servicoId) {
  const servicos = lerArmazenamentoJSON("servicos");
  const servico = servicos.find((s) => String(s.id) === String(servicoId));
  if (!servico || servico.ativo === false) return null;

  const profissionais = lerArmazenamentoJSON("profissionais");
  const conta = profissionais.find(
    (p) => String(p.id) === String(servico.profissional_id)
  );
  if (!conta) return null;

  const categoria =
    window.Categorias && window.Categorias.porSlug
      ? window.Categorias.porSlug(servico.categoria_slug)
      : null;

  estado.servicoReal = servico;

  return {
    id: conta.id,
    nome: conta.nome,
    cargo: categoria ? categoria.nome : servico.titulo,
    imagem: "../img/Perfis/Default perfil.jpg",
    avaliacao: 0,
    total_avaliacoes: 0,
    preco_dia: servico.preco != null ? servico.preco : conta.preco_dia || 0,
  };
}

function $(id) {
  return document.getElementById(id);
}

function criarData(iso) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

function paraIso(data) {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

function diaCurto(iso) {
  const data = criarData(iso);
  return `${DIAS_SEMANA[data.getDay()]}, ${data.getDate()} ${
    MESES_ABREV[data.getMonth()]
  }`;
}

function diaLongo(iso) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(
    criarData(iso)
  );
}

function dinheiro(valor) {
  return `R$ ${valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function ordenarDatas() {
  return [...estado.datas].sort();
}

/* ------------------------------------------------------------------ */
/* Perfil do profissional                                              */
/* ------------------------------------------------------------------ */

function preencherPerfil(profissional) {
  document.title = `TechFix - Agendar com ${profissional.nome}`;

  const imagem = $("prof_imagem");
  if (imagem) {
    imagem.src = profissional.imagem;
    imagem.alt = `Foto de ${profissional.nome}`;
  }

  $("prof_nome").textContent = profissional.nome;
  $("prof_cargo").textContent = profissional.cargo;
  $("prof_estrelas").innerHTML = Profissionais.renderEstrelas(
    profissional.avaliacao
  );
  $("prof_nota").textContent = profissional.avaliacao.toFixed(1);
  $("prof_total").textContent = `${profissional.total_avaliacoes} avaliações`;
  $("prof_preco").textContent = `${dinheiro(profissional.preco_dia)} / dia`;

  const voltar = $("voltar_perfil");
  if (voltar) voltar.href = `contratar.html?id=${profissional.id}`;
}

function mostrarErroCarregamento() {
  const main = document.querySelector("main");
  if (!main) return;

  main.innerHTML = `
    <section class="agend-erro">
      <i class="ri-error-warning-line"></i>
      <h1>Não foi possível carregar o profissional</h1>
      <p>Verifique se o site está rodando com um servidor local (Live Server) e tente novamente.</p>
      <a href="serviço.html"><button class="btn btn-primario" type="button">VOLTAR AOS SERVIÇOS</button></a>
    </section>`;
}

/* ------------------------------------------------------------------ */
/* Passo 1 — Calendário                                                */
/* ------------------------------------------------------------------ */

function podeVoltarMes() {
  return (
    estado.ano > hoje.getFullYear() ||
    (estado.ano === hoje.getFullYear() && estado.mes > hoje.getMonth())
  );
}

function podeAvancarMes() {
  const limite = new Date(
    hoje.getFullYear(),
    hoje.getMonth() + LIMITE_MESES_FUTUROS,
    1
  );
  return new Date(estado.ano, estado.mes, 1) < limite;
}

function renderCalendario() {
  const calendario = $("calendario");
  calendario.innerHTML = "";

  const mesNome = MESES[estado.mes];
  $("mes_ano").textContent = `${mesNome
    .charAt(0)
    .toUpperCase()}${mesNome.slice(1)} de ${estado.ano}`;

  const btnPrev = $("prev_mes");
  const btnNext = $("next_mes");
  btnPrev.disabled = !podeVoltarMes();
  btnNext.disabled = !podeAvancarMes();

  DIAS_SEMANA.forEach((dia) => {
    const cabecalho = document.createElement("div");
    cabecalho.className = "dia-semana";
    cabecalho.textContent = dia;
    cabecalho.setAttribute("aria-hidden", "true");
    calendario.appendChild(cabecalho);
  });

  const primeiroDia = new Date(estado.ano, estado.mes, 1).getDay();
  for (let i = 0; i < primeiroDia; i++) {
    const vazio = document.createElement("div");
    vazio.className = "dia-vazio";
    calendario.appendChild(vazio);
  }

  const diasNoMes = new Date(estado.ano, estado.mes + 1, 0).getDate();

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const data = new Date(estado.ano, estado.mes, dia);
    const iso = paraIso(data);
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "dia";
    botao.textContent = dia;
    botao.dataset.data = iso;

    if (data.getTime() === hoje.getTime()) botao.classList.add("hoje");

    if (data < hoje) {
      botao.classList.add("passado");
      botao.disabled = true;
      botao.setAttribute("aria-label", `${dia} de ${mesNome}: indisponível`);
    } else {
      const selecionado = estado.datas.has(iso);
      botao.classList.add("disponivel");
      botao.setAttribute("aria-pressed", String(selecionado));
      botao.setAttribute(
        "aria-label",
        `${selecionado ? "Remover" : "Selecionar"} ${diaLongo(iso)}`
      );
      if (selecionado) botao.classList.add("selecionado");
      botao.addEventListener("click", () => alternarData(iso));
    }

    calendario.appendChild(botao);
  }
}

function alternarData(iso) {
  if (estado.datas.has(iso)) estado.datas.delete(iso);
  else estado.datas.add(iso);

  atualizarCalendarioSelecao();
  atualizarResumo();
}

function atualizarCalendarioSelecao() {
  document.querySelectorAll(".dia.disponivel").forEach((botao) => {
    const iso = botao.dataset.data;
    const selecionado = estado.datas.has(iso);
    botao.classList.toggle("selecionado", selecionado);
    botao.setAttribute("aria-pressed", String(selecionado));
    botao.setAttribute(
      "aria-label",
      `${selecionado ? "Remover" : "Selecionar"} ${diaLongo(iso)}`
    );
  });
  atualizarContadorDias();
}

function atualizarContadorDias() {
  const total = estado.datas.size;
  const contador = $("dias_qtd");

  if (total === 0) contador.textContent = "Nenhuma data selecionada";
  else if (total === 1) contador.textContent = "1 dia selecionado";
  else contador.textContent = `${total} dias selecionados`;

  $("limpar_datas").disabled = total === 0;
}

/* ------------------------------------------------------------------ */
/* Passo 2 — Pagamento                                                 */
/* ------------------------------------------------------------------ */

const CAMPOS_CARTAO = [
  { id: "numero_cartao", erro: "erro_numero_cartao" },
  { id: "nome_cartao", erro: "erro_nome_cartao" },
  { id: "validade", erro: "erro_validade" },
  { id: "cvv", erro: "erro_cvv" },
];

function apenasDigitos(valor) {
  return (valor || "").replace(/\D/g, "");
}

function validarCartao() {
  const numero = apenasDigitos($("numero_cartao").value);
  const nome = $("nome_cartao").value.trim();
  const validade = $("validade").value;
  const cvv = apenasDigitos($("cvv").value);

  const erros = {};

  if (numero.length !== 16) {
    erros.numero_cartao = "Informe os 16 dígitos do cartão.";
  }
  if (nome.length < 3) {
    erros.nome_cartao = "Informe o nome completo do titular.";
  }
  if (!validade) {
    erros.validade = "Informe a validade.";
  } else if (validade < paraIso(hoje).slice(0, 7)) {
    erros.validade = "Cartão vencido.";
  }
  if (cvv.length < 3 || cvv.length > 4) {
    erros.cvv = "CVV deve ter 3 ou 4 dígitos.";
  }

  return { valido: Object.keys(erros).length === 0, erros };
}

function limparErrosCartao() {
  CAMPOS_CARTAO.forEach(({ id, erro }) => {
    $(id).classList.remove("campo-invalido");
    $(erro).textContent = "";
  });
}

function mostrarErrosCartao(erros) {
  limparErrosCartao();
  CAMPOS_CARTAO.forEach(({ id, erro }) => {
    if (erros[id]) {
      $(id).classList.add("campo-invalido");
      $(erro).textContent = erros[id];
    }
  });

  const primeiroCampo = CAMPOS_CARTAO.find(({ id }) => erros[id]);
  if (primeiroCampo) $(primeiroCampo.id).focus();
}

function selecionarMetodo(metodo) {
  estado.metodo = metodo;

  document.querySelectorAll(".metodo").forEach((botao) => {
    const ativo = botao.dataset.metodo === metodo;
    botao.classList.toggle("ativo", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  });

  document.querySelectorAll(".painel-metodo").forEach((painel) => {
    painel.hidden = painel.dataset.painel !== metodo;
  });

  atualizarResumo();
}

function gerarChavePix() {
  if (window.crypto && crypto.getRandomValues) {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return hex.replace(
      /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
      "$1-$2-$3-$4-$5"
    );
  }

  const hex = () => Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0");
  return `${hex()}${hex()}-${hex()}-4${hex().slice(1)}-a${hex().slice(1)}-${hex()}${hex()}${hex()}`;
}

/* ------------------------------------------------------------------ */
/* Resumo                                                              */
/* ------------------------------------------------------------------ */

function calcularTotais() {
  const subtotal = estado.profissional.preco_dia * estado.datas.size;
  const taxa = subtotal * TAXA_SERVICO;
  return { subtotal, taxa, total: subtotal + taxa };
}

function renderChips() {
  const chips = $("resumo_chips");
  const vazio = $("resumo_vazio");
  chips.innerHTML = "";

  const datas = ordenarDatas();
  vazio.hidden = datas.length > 0;

  datas.forEach((iso) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.innerHTML = `${diaCurto(iso)} <button type="button" aria-label="Remover ${diaLongo(
      iso
    )}"><i class="ri-close-line"></i></button>`;

    chip.querySelector("button").addEventListener("click", () => {
      estado.datas.delete(iso);
      atualizarCalendarioSelecao();
      atualizarResumo();
    });

    chips.appendChild(chip);
  });
}

function usuarioLogado() {
  try {
    return JSON.parse(localStorage.getItem("loggedUser"));
  } catch {
    return null;
  }
}

function validarFluxo() {
  const usuario = usuarioLogado();
  if (!usuario || usuario.tipo !== "cliente") {
    return {
      valido: false,
      aviso: "Entre com uma conta de cliente para solicitar este serviço.",
    };
  }
  if (estado.datas.size === 0) {
    return { valido: false, aviso: "Selecione ao menos uma data no calendário." };
  }
  if (!estado.metodo) {
    return { valido: false, aviso: "Escolha um método de pagamento." };
  }
  if (estado.metodo === "cartao") {
    const cartao = validarCartao();
    if (!cartao.valido) {
      return { valido: false, aviso: "Revise os dados do cartão." };
    }
  }
  return { valido: true, aviso: "" };
}

function atualizarResumo() {
  renderChips();

  const { subtotal, taxa, total } = calcularTotais();
  $("resumo_subtotal").textContent = dinheiro(subtotal);
  $("resumo_taxa").textContent = dinheiro(taxa);
  $("resumo_total").textContent = dinheiro(total);

  const validacao = validarFluxo();
  const aviso = $("resumo_aviso");
  aviso.textContent = validacao.aviso;
  aviso.hidden = validacao.valido;

  $("bnt_confirmar").disabled = !validacao.valido;
}

/* ------------------------------------------------------------------ */
/* Modal de sucesso                                                    */
/* ------------------------------------------------------------------ */

let elementoFocoAnterior = null;

function gerarNumeroPedido() {
  const aleatorio = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TF-${Date.now().toString(36).toUpperCase().slice(-5)}${aleatorio}`;
}

function abrirModal() {
  const { subtotal, taxa, total } = calcularTotais();
  const datas = ordenarDatas();

  $("sucesso_resumo").innerHTML = `
    <div class="sucesso-linha">
      <span>Profissional</span>
      <strong>${estado.profissional.nome}</strong>
    </div>
    <div class="sucesso-linha">
      <span>Datas</span>
      <strong>${datas.map(diaCurto).join(" • ")}</strong>
    </div>
    <div class="sucesso-linha">
      <span>Pagamento</span>
      <strong>${ROTULOS_METODO[estado.metodo]}</strong>
    </div>
    <div class="sucesso-linha">
      <span>Subtotal (${datas.length}x ${dinheiro(
    estado.profissional.preco_dia
  )})</span>
      <strong>${dinheiro(subtotal)}</strong>
    </div>
    <div class="sucesso-linha">
      <span>Taxa de serviço (5%)</span>
      <strong>${dinheiro(taxa)}</strong>
    </div>
    <div class="sucesso-linha sucesso-linha--total">
      <span>Total</span>
      <strong>${dinheiro(total)}</strong>
    </div>`;

  let numeroPedido = gerarNumeroPedido();

  if (estado.modoReal && window.Agendamentos) {
    const usuario = usuarioLogado();
    const registro = window.Agendamentos.criar({
      numero_pedido: numeroPedido,
      cliente_id: usuario.id,
      cliente_nome: usuario.nome,
      profissional_id: estado.profissional.id,
      profissional_nome: estado.profissional.nome,
      servico_id: estado.servicoReal ? estado.servicoReal.id : null,
      servico_titulo: estado.servicoReal ? estado.servicoReal.titulo : estado.profissional.cargo,
      datas,
      metodo_pagamento: estado.metodo,
      subtotal,
      taxa_servico: taxa,
      valor_total: total,
    });
    numeroPedido = registro.numero_pedido;

    const titulo = $("sucesso_titulo");
    if (titulo) titulo.textContent = "Pedido enviado!";

    const inicio = $("sucesso_inicio");
    if (inicio) {
      inicio.href = "meus-agendamentos.html";
      inicio.textContent = "Ver meus agendamentos";
    }
  }

  $("sucesso_pedido").textContent = numeroPedido;

  elementoFocoAnterior = document.activeElement;

  const modal = $("modal_sucesso");
  modal.hidden = false;
  modal.classList.add("aberto");
  document.body.classList.add("modal-aberto");
  $("sucesso_fechar").focus();
}

function fecharModal() {
  const modal = $("modal_sucesso");
  modal.classList.remove("aberto");
  modal.hidden = true;
  document.body.classList.remove("modal-aberto");

  if (elementoFocoAnterior) elementoFocoAnterior.focus();
}

/* ------------------------------------------------------------------ */
/* Inicialização                                                       */
/* ------------------------------------------------------------------ */

function ligarEventos() {
  $("prev_mes").addEventListener("click", () => {
    estado.mes--;
    if (estado.mes < 0) {
      estado.mes = 11;
      estado.ano--;
    }
    renderCalendario();
  });

  $("next_mes").addEventListener("click", () => {
    estado.mes++;
    if (estado.mes > 11) {
      estado.mes = 0;
      estado.ano++;
    }
    renderCalendario();
  });

  $("limpar_datas").addEventListener("click", () => {
    estado.datas.clear();
    atualizarCalendarioSelecao();
    atualizarResumo();
  });

  document.querySelectorAll(".metodo").forEach((botao) => {
    botao.addEventListener("click", () => selecionarMetodo(botao.dataset.metodo));
  });

  CAMPOS_CARTAO.forEach(({ id, erro }) => {
    const campo = $(id);
    campo.addEventListener("input", () => {
      campo.classList.remove("campo-invalido");
      $(erro).textContent = "";
      atualizarResumo();
    });
  });

  $("bnt_confirmar").addEventListener("click", () => {
    const validacao = validarFluxo();
    if (!validacao.valido) {
      atualizarResumo();
      return;
    }
    if (estado.metodo === "cartao") {
      const cartao = validarCartao();
      if (!cartao.valido) {
        mostrarErrosCartao(cartao.erros);
        atualizarResumo();
        return;
      }
    }
    abrirModal();
  });

  $("sucesso_fechar").addEventListener("click", fecharModal);
  $("modal_sucesso").addEventListener("click", (evento) => {
    if (evento.target === evento.currentTarget) fecharModal();
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !$("modal_sucesso").hidden) fecharModal();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id");
  const servicoId = parametros.get("servico");

  let profissional = null;

  if (servicoId) {
    estado.modoReal = true;
    profissional = carregarServicoReal(servicoId);

    if (!profissional) {
      window.location.replace("404.html");
      return;
    }

    const voltar = $("voltar_perfil");
    if (voltar) {
      voltar.href = "serviço.html";
      voltar.innerHTML =
        '<i class="ri-arrow-left-line"></i> Voltar aos serviços';
    }
  } else if (id) {
    let profissionais;

    try {
      profissionais = await Profissionais.carregarProfissionais();
    } catch (erro) {
      console.error(erro);
      mostrarErroCarregamento();
      return;
    }

    profissional = Profissionais.getPorId(profissionais, id);

    if (!profissional) {
      window.location.replace("404.html");
      return;
    }
  } else {
    window.location.replace("404.html");
    return;
  }

  estado.profissional = profissional;

  preencherPerfil(profissional);
  $("pix_chave").textContent = gerarChavePix();

  renderCalendario();
  atualizarContadorDias();
  ligarEventos();
  atualizarResumo();
});
