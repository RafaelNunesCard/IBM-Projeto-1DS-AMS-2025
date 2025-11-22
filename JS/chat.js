// Espera o DOM carregar completamente
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("digita");
  const mensagens = document.getElementById("mensagens");
  const enviarBtn = document.getElementById("enviar");

  const res = document.querySelector("#Jorge #horasbotas");
  const res2 = document.querySelector("#Jorge #ult-msg");

  // PEGAR AVATAR DO LOCALSTORAGE (do script de perfil)
  let perfil = {};
  let avatar = "../img/Perfis/Default perfil.jpg";

  try {
    const perfilSalvo = localStorage.getItem("perfil");
    if (perfilSalvo) {
      perfil = JSON.parse(perfilSalvo);
      avatar = perfil.avatar || avatar;
    }
    console.log("✅ Perfil carregado:", perfil);
    console.log("✅ Avatar:", avatar);
  } catch (e) {
    console.warn("⚠️ Erro ao carregar perfil do localStorage:", e);
  }

  // Verificar se os elementos existem
  if (!input || !mensagens || !enviarBtn) {
    console.error("❌ ERRO: Elementos não encontrados!");
    console.log("Input existe?", !!input);
    console.log("Mensagens existe?", !!mensagens);
    console.log("Botão existe?", !!enviarBtn);
    return;
  }

  console.log("✅ Chat carregado com sucesso!");

  function enviar() {
    const texto = input.value.trim();
    if (texto === "") return;

    // Criar bloco da mensagem
    const bloco = document.createElement("div");
    bloco.classList.add("my-mensagens");

    const msg = document.createElement("div");
    msg.classList.add("mensagem", "user-mensagem");

    // Hora formatada
    const agora = new Date();
    const hora = agora.getHours().toString().padStart(2, "0");
    const min = agora.getMinutes().toString().padStart(2, "0");
    const horario = `${hora}:${min}`;

    // Texto da mensagem
    const p = document.createElement("p");
    p.innerHTML = `${texto} <span class="hora">${horario}</span>`;

    // Foto do usuário (agora usando avatar do localStorage)
    const foto = document.createElement("div");
    foto.classList.add("mini-foto");
    foto.innerHTML = `<img src="${avatar}" alt="Usuario">`;

    msg.appendChild(p);
    msg.appendChild(foto);
    bloco.appendChild(msg);
    mensagens.appendChild(bloco);

    input.value = "";
    input.focus();

    mensagens.scrollTop = mensagens.scrollHeight;

    if (res) res.textContent = horario;
    if (res2) res2.innerHTML = texto;

    console.log("✅ Mensagem enviada:", texto);
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      enviar();
    }
  });

  enviarBtn.addEventListener("click", enviar);
});

//Função de esconder o chat e mobile
let perfils = document.getElementById("pessoas");
let profile = document.getElementById("perfil");
let perfil = document.getElementById("Jorge");
let defult = document.getElementById("cont1");
let conversa = document.getElementById("cont2");

function checkMobile() {
  return window.innerWidth <= 1024;
}
const isMobile = checkMobile();

if (isMobile) {
  profile.classList.add("esconder");
}

function ativar() {
  perfil.classList.toggle("ativado");

  if (isMobile) {
    if (perfil.classList.contains("ativado")) {
      perfils.classList.add("esconder");
      profile.classList.remove("esconder");
      conversa.classList.remove("esconder");
    } else {
      perfils.classList.remove("esconder");
      profile.classList.add("esconder");
      conversa.classList.add("esconder");
    }
    return;
  }

  // ----- DESKTOP -----
  if (perfil.classList.contains("ativado")) {
    defult.classList.add("esconder");
    conversa.classList.remove("esconder");
  } else {
    defult.classList.remove("esconder");
    conversa.classList.add("esconder");
  }
}

//Fução das opções
const more = document.getElementById("more");
let opção = document.getElementById("opção");

more.addEventListener("click", mostrar);

function mostrar() {
  more.classList.toggle("ativado");

  if (more.classList.contains("ativado")) {
    opção.classList.add("visivel");
  } else {
    opção.classList.remove("visivel");
  }
}

//Silenciar
const silenciar = document.getElementById("silenciar");
let notificação = document.getElementById("notificação");
let texTsilenciar = document.getElementById("text-silenciar");
let silenciarIco = document.getElementById("silenciar1");

silenciar.addEventListener("click", trocar);

function trocar(event) {
  event.preventDefault();
  silenciar.classList.toggle("a");

  if (silenciar.classList.contains("a")) {
    notificação.classList.remove("ri-notification-4-line");
    notificação.classList.add("ri-notification-off-line");
    silenciarIco.classList.add("visivel")
    texTsilenciar.textContent = " Silenciado";
  } else {
    notificação.classList.add("ri-notification-4-line");
    notificação.classList.remove("ri-notification-off-line");
    silenciarIco.classList.remove("visivel");
    texTsilenciar.textContent = " Silenciar";
  }
}

//Bloquear
const Bloquear = document.getElementById("bloquear");
let block = document.getElementById("block");
let texTblock = document.getElementById("text-block");
let blockIco = document.getElementById("block1");

Bloquear.addEventListener("click", bloqueio);

function bloqueio(event) {
  event.preventDefault();
  Bloquear.classList.toggle("b");

  if (Bloquear.classList.contains("b")) {
    block.classList.add("girar");
    blockIco.classList.add("visivel");
    texTblock.textContent = " Bloqueado";
  } else {
    block.classList.remove("girar");
    blockIco.classList.remove("visivel");
    texTblock.textContent = " Bloquear";
  }
}

//Denunciar
const Denunciar = document.getElementById("denunciar");
let denun = document.getElementById("denun");
let texTdenun = document.getElementById("text-denun");
let denunIco = document.getElementById("denun1");

Denunciar.addEventListener("click", denunciando);

function denunciando(event) {
  event.preventDefault();
  Denunciar.classList.toggle("c");

  if (Denunciar.classList.contains("c")) {
    denun.classList.remove("ri-alert-line");
    denun.classList.add("ri-alert-fill");
    denunIco.classList.add("visivel");
  } else {
    denun.classList.remove("ri-alert-fill");
    denun.classList.add("ri-alert-line");
    denunIco.classList.remove("visivel");
  }
}
