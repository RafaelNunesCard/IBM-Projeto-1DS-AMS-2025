function atualizarCards() {
  const textoBusca = document.getElementById("search").value.toLowerCase();
  let categoriaAtiva = document.querySelector("#tipos .tipos.ativo")?.getAttribute("data-categoria");
  
  if (!categoriaAtiva) categoriaAtiva = "todos";  

  const cards = document.querySelectorAll(".card_clt");

  cards.forEach(card => {
    const textoCard = card.querySelector(".text_clt h1").textContent.toLowerCase();
    const categoriaCard = card.getAttribute("data-categoria");

    const combinaBusca = textoCard.includes(textoBusca);
    const combinaCategoria = categoriaAtiva === "todos" || categoriaAtiva === categoriaCard;

    card.style.display = combinaBusca && combinaCategoria ? "flex" : "none";
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll("#tipos .tipos");

  botoes.forEach(botao => {
    botao.addEventListener("click", () => {

      // REMOVE ativo de todos
      botoes.forEach(b => b.classList.remove("ativo"));

      // ADICIONA ativo no botão clicado
      botao.classList.add("ativo");

      atualizarCards();
    });
  });
});

// busca
document.getElementById("search").addEventListener("keyup", atualizarCards);