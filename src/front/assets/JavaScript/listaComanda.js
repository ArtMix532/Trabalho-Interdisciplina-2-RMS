let valorPagamentoElement = document.getElementById("valorPagamento");
async function exibirComanda() {
    valorPagamentoElement = document.getElementById("valorPagamento");
    if (!valorPagamentoElement) {
        console.error("Elemento valorPagamento não encontrado!");
        return;
    }

  // Obtém o elemento da página onde os itens serão exibidos
  const listaComanda = document.getElementById("list-produtos");
  const totalComandaElement = document.getElementById("total-comanda");
  const servico10Element = document.getElementById("servico10");

  // Obtém o ID da comanda a partir da URL
  const urlParams = new URLSearchParams(window.location.search);
  const comandaId = urlParams.get("id");

  if (!comandaId) {
    listaComanda.innerHTML = `<p class="erro">Comanda não encontrada na URL.</p>`;
    return;
  }

  listaComanda.innerHTML = "";

  try {
    // Faz uma requisição para buscar os itens da comanda específica
    const response = await fetch(`http://localhost:8080/comanda/${comandaId}`, {
      method: "GET",
    });

    // Verifica se a requisição foi bem-sucedida
    if (!response.ok) {
      throw new Error("Erro ao buscar itens da comanda");
    }

    // Converte os dados recebidos em JSON
    const data = await response.json();
    const itensPedido = data.itensPedido;

    if (!itensPedido || itensPedido.length === 0) {
      listaComanda.innerHTML = `<p class="info">Nenhum item encontrado para esta comanda.</p>`;
      return;
    }

    // Agrupa os itens pelo nome do prato
    const itensAgrupados = itensPedido.reduce((acc, item) => {
      const nomePrato = item.prato.nome;
      if (!acc[nomePrato]) {
        acc[nomePrato] = {
          quantidade: item.quantidade,
          preco: item.prato.preco,
        };
      } else {
        acc[nomePrato].quantidade += item.quantidade;
      }
      return acc;
    }, {});

    // Calcular o total da comanda
    let totalComanda = 0;

    // Renderiza os itens agrupados
    let index = 0; // Para alternar as cores dos itens
    for (const [nomePrato, detalhes] of Object.entries(itensAgrupados)) {
      const itemProdutoLista = document.createElement("div");
      itemProdutoLista.innerHTML = `
        <p class="nome-list text-comanda">${nomePrato}</p>
        <p class="qtd-list text-comanda">${detalhes.quantidade}</p>
        <p class="preco-list text-comanda">R$: ${detalhes.preco.toFixed(2)}</p>
      `;
      itemProdutoLista.classList.add("item-produto-lista");

      // Adiciona a classe "cor" para itens com índice ímpar
      if (index % 2 !== 0) {
        itemProdutoLista.classList.add("cor");
      }

      listaComanda.appendChild(itemProdutoLista);

      // Calcula o valor total do item (quantidade * preço)
      totalComanda += detalhes.quantidade * detalhes.preco;

      index++;
    }

    // Armazena o total sem taxa de serviço em um atributo `data-*`
    totalComandaElement.setAttribute("data-total-base", totalComanda);

    // Calcular a taxa de serviço (10%)
    const taxaServico = totalComanda * 0.10;

    // Exibir o total comanda
    totalComandaElement.innerHTML = `R$: ${(totalComanda + taxaServico).toFixed(2)}`;

    // Exibir a taxa de serviço
    servico10Element.innerHTML = `R$: ${taxaServico.toFixed(2)}`;

    // Exibir o valor total incluindo a taxa
    valorPagamentoElement.innerHTML = `Valor a ser pago: R$ ${(totalComanda + taxaServico).toFixed(2)}`;

  } catch (error) {
    // Exibe erros no console para facilitar o debug
    console.error("Erro ao carregar os itens:", error);

    // Exibe uma mensagem de erro na interface
    listaComanda.innerHTML = `<p class="erro">Não foi possível carregar os itens da comanda.</p>`;
  }
}

document.getElementById("taxaServicoNao").addEventListener("change", atualizarValorPagamento);
document.getElementById("taxaServicoSim").addEventListener("change", atualizarValorPagamento);

function atualizarValorPagamento() {
  const taxaServicoNao = document.getElementById("taxaServicoNao").checked;
  const taxaServicoSim = document.getElementById("taxaServicoSim").checked;

  const totalComandaElement = document.getElementById("total-comanda");
  const servico10Element = document.getElementById("servico10");
  const valorPagamentoElement = document.getElementById("valorPagamento");

  // Obtém o total base armazenado no atributo `data-total-base`
  const totalBase = parseFloat(totalComandaElement.getAttribute("data-total-base"));

  // Calcula a taxa de serviço
  const taxaServico = totalBase * 0.10;

  // Atualiza os valores com base na seleção
  if (taxaServicoSim) {
    // Inclui a taxa de serviço
    valorPagamentoElement.innerHTML = `Valor a ser pago: R$ ${totalBase.toFixed(2)}`;
  } else {
    // Remove a taxa de serviço
    valorPagamentoElement.innerHTML = `Valor a ser pago: R$ ${(totalBase + taxaServico).toFixed(2)}`;
  }

  // Atualiza a exibição da taxa de serviço
  servico10Element.innerHTML = `R$: ${taxaServico.toFixed(2)}`;
}

export{
  valorPagamentoElement
}

// Adiciona um evento para executar a função quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  exibirComanda();
});
