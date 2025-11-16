const input = document.getElementById('digita');
const mensagens = document.getElementById('mensagens');
const enviarBtn = document.getElementById('enviar');
const res = document.getElementById('horasbotas');
const res2 = document.getElementById('ult-msg');
const tempo = document.getElementById('tempo')

// PEGAR PERFIL SALVO
const perfil = JSON.parse(localStorage.getItem("perfil")) || {};
const avatar = perfil.avatar || "../img/Perfis/Default perfil.jpg";

function enviar() {
    const texto = input.value.trim();
    if (texto === "") return;

    const bloco = document.createElement("div");
    bloco.classList.add("my-mensagens");

    const msg = document.createElement("div");
    msg.classList.add("mensagem", "user-mensagem");

    const agora = new Date();
    const hora = agora.getHours().toString().padStart(2, "0");
    const min = agora.getMinutes().toString().padStart(2, "0");
    const horario = `${hora}:${min}`;

    const p = document.createElement("p");
    p.innerHTML = `${texto} <span class="hora">${horario}</span>`;

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
    res.textContent = horario;
    res2.textContent = texto;
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") enviar();
});

enviarBtn.addEventListener("click", enviar);