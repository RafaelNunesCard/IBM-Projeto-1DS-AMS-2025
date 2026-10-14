document.addEventListener("click", (evento) => {
  const popup = document.getElementById("popup");
  if (!popup) return;

  // ABRIR: botão denunciar (conteúdo dinâmico) ou openPopup legado
  if (evento.target.closest(".denunciar") || evento.target.closest("#openPopup")) {
    popup.style.display = "block";
    return;
  }

  // FECHAR: X ou clique fora do conteúdo
  if (evento.target.closest(".close") || evento.target === popup) {
    closePopup();
  }
});

function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "none";
}

function sendFeedback() {
  alert("Feedback enviado!");
  closePopup();
}