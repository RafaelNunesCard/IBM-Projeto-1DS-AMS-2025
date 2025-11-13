document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".pag");
  const formularios = document.querySelectorAll(".form");
  const botaoConfirmar = document.getElementById("showConfirmed");
  let metodoSelecionado = null;

  // Esconde todos os formulários no início
  formularios.forEach(form => form.style.display = "none");

  // Quando clicar em um botão de método de pagamento
  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      // Identifica qual formulário deve ser mostrado
      const id = botao.getAttribute("data-form");
      metodoSelecionado = id;

      // Esconde todos os formulários
      formularios.forEach(form => form.style.display = "none");

      // Mostra apenas o formulário do método selecionado
      const formSelecionado = document.getElementById(id);
      if (formSelecionado) {
        formSelecionado.style.display = "block";
      }
    });
  });

  // Validação no botão Confirm
  botaoConfirmar.addEventListener("click", (e) => {
    e.preventDefault();

    if (!metodoSelecionado) {
      alert("Selecione uma forma de pagamento antes de confirmar!");
      return;
    }

    let valido = true;
    let mensagemErro = "";

    switch (metodoSelecionado) {
      case "pix":
        alert("Pagamento via PIX selecionado! QR Code exibido.");
        break;

      case "cartao":
        const numero = document.getElementById("numero_cartao").value.trim();
        const nome = document.getElementById("nome_cartao").value.trim();
        const validade = document.getElementById("validade").value;
        const cvv = document.getElementById("cvv").value.trim();

        if (!numero || numero.length < 16) {
          valido = false;
          mensagemErro = "Número do cartão inválido!";
        } else if (!nome) {
          valido = false;
          mensagemErro = "Nome do titular é obrigatório!";
        } else if (!validade) {
          valido = false;
          mensagemErro = "Data de validade obrigatória!";
        } else if (!cvv || cvv.length < 3) {
          valido = false;
          mensagemErro = "CVV inválido!";
        }

        if (valido) {
          alert("Cartão validado com sucesso!");
        } else {
          alert(mensagemErro);
        }
        break;

      case "boleto":
        alert("Boleto gerado! Você receberá o link para pagamento.");
        break;

      case "dinheiro":
        const troco = document.getElementById("troco").value;
        if (troco && troco < 0) {
          alert("Valor para troco inválido!");
        } else {
          alert("Pagamento em dinheiro selecionado.");
        }
        break;

      default:
        alert("Selecione uma forma de pagamento válida!");
    }
  });
});

