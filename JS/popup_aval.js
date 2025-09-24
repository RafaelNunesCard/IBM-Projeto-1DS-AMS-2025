document.addEventListener("DOMContentLoaded", () => {
// ==================== POPUP AVALIAÇÃO ====================
  const popupAvaliacao = document.getElementById("popup-avaliacao");
  const btnAbrirAvaliacao = document.querySelector(".deixe .bnt");
  const btnFecharAvaliacao = document.querySelector(".close-avaliacao");
  const btnCancelarAvaliacao = document.querySelector(".cancel-avaliacao");
  const estrelas = document.querySelectorAll(".estrelas-avaliacao i");

  if (popupAvaliacao && btnAbrirAvaliacao) {
    // Abrir
    btnAbrirAvaliacao.addEventListener("click", () => {
      popupAvaliacao.style.display = "block";
    });

    // Fechar (X)
    btnFecharAvaliacao.addEventListener("click", () => {
      popupAvaliacao.style.display = "none";
    });

    // Fechar (Cancelar)
    btnCancelarAvaliacao.addEventListener("click", () => {
      popupAvaliacao.style.display = "none";
    });

    // Fechar clicando fora
    window.addEventListener("click", (e) => {
      if (e.target === popupAvaliacao) {
        popupAvaliacao.style.display = "none";
      }
    });

    // Estrelas de avaliação
    estrelas.forEach((estrela, index) => {
      estrela.addEventListener("click", () => {
        estrelas.forEach((s, i) => {
          if (i <= index) {
            s.classList.remove("ri-star-line");
            s.classList.add("ri-star-fill"); // preenchida
          } else {
            s.classList.remove("ri-star-fill");
            s.classList.add("ri-star-line"); // vazia
          }
        });
      });
    });
  }
});
