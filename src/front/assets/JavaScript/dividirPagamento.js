
function usarValorPagamento() {
  console.log(valorPagamentoElement?.innerHTML); // Use o valor com segurança
}

document.addEventListener("DOMContentLoaded", () => {
  const dividirPagamento = document.getElementById("dividirPagamento");
  const opcaoSolo = document.getElementById("opcaoSolo");
  const inputContainer = document.getElementById("inputContainer");

  dividirPagamento.addEventListener("change", gerarInputDePessoas);
  opcaoSolo.addEventListener("change", removerInputDePessoas);

  function gerarInputDePessoas() {
    if (dividirPagamento.checked) {
      if (!document.getElementById("inputQtdPessoas")) {
        const divInputPessoas = document.createElement("div");
        divInputPessoas.className = "inputQtdPessoas";
        divInputPessoas.id = "inputQtdPessoas";
        divInputPessoas.innerHTML = `
                  <div class="boxInput2">
                      <input
                          type="number"
                          class="input"
                          placeholder="1"
                          autocomplete="off"
                          id="inputQtdPessoasDividir"
                      />
                  </div>
                  <div class="box-button">
                      <button class="button-3" id="btnDividir">Dividir</button>
                  </div>
                  <div class="valor-pagamento-h1">
              <h1 id="valorPagamentoSugerido">Valor sugerido por pessoa: </h1>
            </div>
              `;
        inputContainer.appendChild(divInputPessoas);

        const btnDividir = document.getElementById("btnDividir");
        btnDividir.addEventListener("click", dividirComanda);
      }
    }
  }

  function removerInputDePessoas() {
    const inputPessoas = document.getElementById("inputQtdPessoas");
    if (inputPessoas) {
      inputContainer.removeChild(inputPessoas);
    }

    const inputsPagamento = document.getElementById("inputs-pagamento");
    const pagamentoBoxes =
      inputsPagamento.getElementsByClassName("pagamento-box");

    Array.from(pagamentoBoxes).forEach((box, index) => {
      if (index > 0) {
        inputsPagamento.removeChild(box);
      }
    });
  }

  function dividirComanda() {
    const inputQtdPessoasDividir = document
      .getElementById("inputQtdPessoasDividir")
      .value.trim();

    // Verificação adicional para garantir que o valor seja válido
    if (
      !inputQtdPessoasDividir ||
      isNaN(inputQtdPessoasDividir) ||
      parseInt(inputQtdPessoasDividir) <= 0
    ) {
      alertCriadoRed(msgNPessoas);
      return;
    }

    // Recebe o valor do input como uma string e converte para número inteiro
    const qtdPessoas = parseInt(inputQtdPessoasDividir, 10);

    // Validação para garantir que o valor seja menor ou igual a 10
    if (qtdPessoas > 10) {
      console.error("A quantidade de pessoas não pode ser maior que 10.");
      alertCriadoRed(msg10Pessoas);
    } else if (isNaN(qtdPessoas)) {
      console.error("Entrada inválida. Certifique-se de digitar um número.");
      alertCriadoRed(msg10Pessoas);
    } else {
      console.log(`A quantidade de pessoas é válida: ${qtdPessoas}`);
      // Continue com o processamento aqui
    }


    const inputsPagamento = document.getElementById("inputs-pagamento");
    inputsPagamento.innerHTML = "";

    for (let i = 0; i < qtdPessoas; i++) {
      const pagamentoBox = document.createElement("div");
      pagamentoBox.className = "pagamento-box";

      const nomeClienteId = `nomeCliente-${i}`;
      const medidaProdutoId = `medidaProduto-${i}`;

      pagamentoBox.innerHTML = `
        <div class="inputQtd">
          <label for="${nomeClienteId}" class="inputLabel">Digite o valor do pagamento:</label>
          <div class="boxInput pagamento-input">
            <input
              type="text"
              class="input maskMoney"
              id="${nomeClienteId}"
              autocomplete="off"
              maxlength="15"
            />
          </div>
        </div>
        <div class="inputQtd">
          <label for="${medidaProdutoId}" class="inputLabel">Escolha a forma de pagamento:</label>
          <div class="select-container pagamento-input">
            <select class="select-box pagamento" id="${medidaProdutoId}">
              <option value=""></option>
              <option value="Pix">Pix</option>
              <option value="Debito">Cartão de Débito</option>
              <option value="Credito">Cartão de Crédito</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </div>
        </div>`;

      inputsPagamento.appendChild(pagamentoBox);
      valorSugerido()
      maskMoney();
    }
  }

  //Função associada ao pagamento: 
  function Pagar() {

    const pagamentoOpcao = document.querySelector('input[name="pagamentoOpcao"]:checked').id;
    const valorTotalComanda = parseFloat(document.getElementById("valorTotal").textContent);

    const dataCriacao = new Date().toISOString();

    const urlParams = new URLSearchParams(window.location.search);
    const id_comanda = urlParams.get("id");

    console.log("Valor total da comanda: " + valorTotalComanda);

    if (pagamentoOpcao == "opcaoSolo") {
      const valorPago = parseFloat(document.getElementById("ValorPago").value.replace('R$', '').replace(',', '.').trim()); 
      const metodoPagamento = document.getElementById("metodoPagamento").value;

      if (!metodoPagamento) {
        alertCriadoRed("Escolha uma forma de pagamento!");
        return; 
      }

      if (valorPago >= valorTotalComanda) {
        lancarPagamentoSolo(valorTotalComanda, metodoPagamento, dataCriacao, id_comanda);
      }
      else {
        alertCriadoRed(msgValorInsuficienteDigite);
        return;
      }

    }
    if (pagamentoOpcao == "dividirPagamento") {
      const valorPorPessoa = document.querySelectorAll(".input.maskMoney");
      const qtdPessoas = valorPorPessoa.length;
      const metodosPagamentos = document.getElementsByClassName("select-box pagamento");
      let valueOfMetodos = [];

      for (let i = 0; i < metodosPagamentos.length; i++) {
        valueOfMetodos.push(metodosPagamentos[i].value);
        if (!valueOfMetodos[i]) {
          alertCriadoRed("Escolha uma forma de pagamento!");
          return; 
        }
      }

      let somaTotal = 0.0;
      let valores = [];

      for (let i = 0; i < qtdPessoas; i++) {
        let valorIndividual = parseFloat(valorPorPessoa[i].value.replace('R$', '').replace(',', '.').trim());
        valores.push(valorIndividual);
        somaTotal += valorIndividual;
      }

      if (somaTotal >= valorTotalComanda) {
        lancarPagamentoGrupo(valores, valueOfMetodos, dataCriacao, id_comanda, qtdPessoas);
      }
      else {
        alertCriadoRed(msgValorInsuficiente);
        return;
      }

    }
    fecharComanda(); 
    window.location.href = "tela-pagamento.html"; 
  }

  async function fecharComanda() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_comanda = urlParams.get("id");
    try {
      const response = await fetch(`http://localhost:8080/comanda/${id_comanda}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "fechada"
        }),
      });
      if (response.ok) {
        console.log("Comanda fechada com sucesso!"); 
      }
      else {
        const errorData = await response.json();
        console.error("Erro ao fehcar a comanda:", errorData);
      }
    }
    catch(e) {
      console.error("Erro ao comunicar com o servidor: "+e); 
    }
  }

  async function lancarPagamentoGrupo(valor, metodo, data, id, qtdPessoas) {

    for (let i = 0; i < qtdPessoas; i++) {
      let pagamentoData = {
        metodoPagamento: metodo[i],
        dataPagamento: data,
        valor: valor[i],
        comanda: {
          id_comanda: id,
        },
      };
      console.log("Dados enviados para o backend:", pagamentoData);

      try {
        const response = await fetch("http://localhost:8080/pagamento", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pagamentoData),
        });

        if (response.ok) {
          console.log("Pagamento realizado com sucesso!");
          alertCriado(msgPagamento);
        } else {
          const errorData = await response.json();
          console.error("Erro ao processar pagamento:", errorData);
          alert(`Erro no pagamento: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Erro ao realizar o pagamento:", error);
        alert("Erro ao se comunicar com o servidor.");
      }
    }
  }





  window.Pagar = Pagar;


  async function lancarPagamentoSolo(valor, metodo, data, id) {
    const pagamentoData = {
      metodoPagamento: metodo,
      dataPagamento: data,
      valor: valor,
      comanda: {
        id_comanda: id,
      },
    };

    console.log("Dados enviados para o backend:", pagamentoData);

    try {
      const response = await fetch("http://localhost:8080/pagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pagamentoData),
      });

      if (response.ok) {
        console.log("Pagamento realizado com sucesso!");
        alertCriado(msgPagamento);
      } else {
        const errorData = await response.json();
        console.error("Erro ao processar pagamento:", errorData);
        alert(`Erro no pagamento: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao realizar o pagamento:", error);
      alert("Erro ao se comunicar com o servidor.");
    }
  }

  window.Pagar = Pagar;

  let divMessage = document.getElementById("modal1");

  function alertCriado(msg) {
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerText = msg;
    divMessage.appendChild(message);

    setTimeout(() => {
      message.style.display = "none";
    }, 3000);
  }


});

async function maskMoney() {
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
  DividirValorConta();
}

function valorSugerido() {
  // Seleciona os elementos necessários
  const dividirPagamento = document.getElementById("dividirPagamento");
  const inputQtdPessoasDividir = document.getElementById("inputQtdPessoasDividir");
  const valorPagamentoSugerido = document.getElementById("valorPagamentoSugerido");
  const totalComandaElement = document.getElementById("total-comanda");
  const taxaServicoSim = document.getElementById("taxaServicoSim").checked;

  // Verifica se os elementos necessários existem
  if (!dividirPagamento || !inputQtdPessoasDividir || !valorPagamentoSugerido || !totalComandaElement) {
    console.error("Erro: Elementos essenciais para cálculo não encontrados.");
    return;
  }

  // Obtém o total base da comanda
  const totalBase = parseFloat(totalComandaElement.getAttribute("data-total-base"));

  if (isNaN(totalBase)) {
    console.error("Erro: Total base da comanda inválido.");
    return;
  }

  // Obtém a quantidade de pessoas para divisão
  const qtdPessoas = parseInt(inputQtdPessoasDividir.value.trim(), 10);

  if (isNaN(qtdPessoas) || qtdPessoas <= 0) {
    alertCriadoRed(msgPessoasDividir);
    return;
  }

  // Calcula a taxa de serviço
  const taxaServico = totalBase * 0.10;

  // Determina o valor final a ser dividido
  const valorFinal = taxaServicoSim ? totalBase : totalBase + taxaServico;

  // Calcula o valor sugerido por pessoa
  const valorPorPessoa = valorFinal / qtdPessoas;

  // Atualiza a interface com o valor sugerido
  valorPagamentoSugerido.innerHTML = `Valor sugerido por pessoa: R$ ${valorPorPessoa.toFixed(2)}`;
}

function DividirValorConta() {
  const valorPorPesssoas = valorPagamentoElement / inputQtdPessoasDividir;
  console.log(valorPorPesssoas);
}


//Lista Comanda 

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
    valorPagamentoElement.innerHTML = `Valor a ser pago: R$ <span id="valorTotal">${(totalComanda + taxaServico).toFixed(2)}</span>`;

  } catch (error) {
    // Exibe erros no console para facilitar o debug
    console.error("Erro ao carregar os itens:", error);

    // Exibe uma mensagem de erro na interface
    listaComanda.innerHTML = `<p style="text-align: center;" class="erro">Comanda Vazia</p>`;
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
    valorPagamentoElement.innerHTML = `Valor a ser pago: R$ <span id="valorTotal">${totalBase.toFixed(2)}</span>`;
    console.log(totalBase);
  } else {
    // Remove a taxa de serviço
    valorPagamentoElement.innerHTML = `Valor a ser pago: R$ <span id="valorTotal">${(totalBase + taxaServico).toFixed(2)}</span>`;
    console.log(totalBase + taxaServico);
  }

  if (dividirPagamento && dividirPagamento.checked) {
    valorSugerido(); // Chama a função que calcula o valor sugerido por pessoa
  }

  // Atualiza a exibição da taxa de serviço
  servico10Element.innerHTML = `R$: ${taxaServico.toFixed(2)}`;
}


// Adiciona um evento para executar a função quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  exibirComanda();
});


const msgNPessoas = "Por favor, insira um número válido de pessoas.";
const msg10Pessoas = "Por favor, insira um número menor ou igual a 10.";
const msgValorInsuficiente = "Valor insuficente.";
const msgValorInsuficienteDigite = "Valor digitado é insuficiente! Favor insira um valor valido."
const msgPagamento = "Pagamento salvo com sucesso!";
const msgPessoasDividir = "Por favor, insira um número válido de pessoas para dividir.";


function alertCriadoRed(msg) {
  let divMessage = document.getElementById("modal1");
  const message = document.createElement("div");
  message.classList.add("messageRed");
  message.innerText = msg;
  divMessage.appendChild(message);

  setTimeout(() => {
    message.style.display = "none";
  }, 3000);
}