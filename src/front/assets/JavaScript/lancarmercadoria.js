function filtrarProdutos() {
    const input = document.getElementById("alimentoInput").value.toLowerCase();
    const options = document.querySelectorAll("#options li");
    options.forEach(option => {
      option.style.display = option.textContent.toLowerCase().includes(input) ? "block" : "none";
    });
  }

  // Selecionar produto e exibir no campo de nome
  function selecionarProduto(produto) {
    document.getElementById("nomeProduto").textContent = produto;
    document.getElementById("alimentoInput").value = "";
    filtrarProdutos();
  }