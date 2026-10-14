function mostrarGrafico(avaliacao) {
  const grafico = avaliacao.querySelector(".grafico");
  grafico.classList.add("visible"); // Adiciona a classe "visible"
}

function esconderGrafico(avaliacao) {
  const grafico = avaliacao.querySelector(".grafico");
  grafico.classList.remove("visible"); // Remove a classe "visible"
}
