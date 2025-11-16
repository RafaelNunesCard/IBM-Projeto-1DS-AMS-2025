const input = document.getElementById('digita');
const mensagens = document.getElementById('mensagens');
const enviarBtn = document.getElementById('enviar');
const res = document.getElementById('horasbotas');
const res2 = document.getElementById('ult-msg')

function enviar() {
    const texto = input.value.trim();
    if (texto === "") return;

    // Criar DIV da mensagem
    const bloco = document.createElement("div");
    bloco.classList.add("my-mensagens");

    const msg = document.createElement("div");
    msg.classList.add("mensagem", "user-mensagem");

    // Hora atual
    const agora = new Date();
    const hora = agora.getHours().toString().padStart(2, "0");
    const min = agora.getMinutes().toString().padStart(2, "0");
    const horario = `${hora}:${min}`;

    // Texto da mensagem
    const p = document.createElement("p");
    p.innerHTML = `${texto} <span class="hora">${horario}</span>`;

    // Foto do usuário
    const foto = document.createElement("div");
    foto.classList.add("mini-foto");
    foto.innerHTML = `<img src="../img/Perfis/Default perfil.jpg" alt="Usuario">`;

    // Montar estrutura
    msg.appendChild(p);
    msg.appendChild(foto);
    bloco.appendChild(msg);
    mensagens.appendChild(bloco);

    input.value = "";
    input.focus();

    // Scroll sempre no final
    mensagens.scrollTop = mensagens.scrollHeight;
    res.textContent = horario
    res2.textContent = texto
}

// Enviar ao apertar Enter
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") enviar();
});

// Enviar ao clicar
enviarBtn.addEventListener("click", enviar);
