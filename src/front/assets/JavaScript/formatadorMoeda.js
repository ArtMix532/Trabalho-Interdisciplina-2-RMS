function aplicarMascaraValor(input) {
  // Remove tudo que não seja número
  let valor = input.value.replace(/\D/g, "");

  // Converte para um número decimal
  valor = (valor / 100).toFixed(2) + "";

  // Divide a parte inteira e decimal
  let partes = valor.split(".");
  let parteInteira = partes[0];
  let parteDecimal = partes.length > 1 ? "," + partes[1] : "";

  // Adiciona separadores de milhar
  parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Atualiza o valor do input com "R$ " como prefixo
  input.value = "R$ " + parteInteira + parteDecimal;
}

// Aguarda o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  // Lista de IDs que podem estar em diferentes páginas
  const ids = [
    "ValorPago",
    "alterarPrecoPrato",
    "precoPrato",
    "nomeCliente-0",
    "nomeCliente-1",
    "nomeCliente-2",
    "nomeCliente-3",
    "nomeCliente-4",
    "nomeCliente-5",
    "nomeCliente-6",
    "nomeCliente-7",
    "nomeCliente-8",
    "nomeCliente-9",
  ];

  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      // Aplica o listener somente se o elemento existir
      element.addEventListener("input", function () {
        aplicarMascaraValor(this);
      });
    }
  });
});
