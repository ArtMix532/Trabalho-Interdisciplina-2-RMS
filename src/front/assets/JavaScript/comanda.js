function carregaComanda() {
  const urlParams = new URLSearchParams(window.location.search);
  const id_comanda = urlParams.get("id");

  localStorage.clear(); //Limpa todo o localStorage toda vez que recarrega a pagina.

  if (id_comanda) {
    const spanIdComanda = document.getElementById("id_comanda");
    spanIdComanda.innerText = String(id_comanda).padStart(2, "0");
  } else {
    console.error("ID da comanda não foi encontrado");
  }
}

async function buscarPratos() {
  const input = document.getElementById("pratoInput").value.toLowerCase();
  const options = document.getElementById("options");
  let pratos = [];

  try {
    const response = await fetch("http://localhost:8080/prato/todos", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar pratos: " + response.statusText);
    }

    pratos = await response.json();
    const resultados = pratos.filter((prato) =>
      prato.nome.toLowerCase().includes(input)
    );

    options.innerHTML = "";

    if (resultados.length === 0) {
      options.style.display = "none";
    } else {
      options.style.display = "block";
      resultados.forEach((prato) => {
        const li = document.createElement("li");
        li.textContent = `${prato.nome} - R$${prato.preco}`;
        li.id = "pratoBuscado";
        li.onclick = () => selecionarPrato(prato);
        options.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Erro ao buscar pratos:", error);
  }
}

let pratoSelecionado = null;

function selecionarPrato(prato) {
  pratoSelecionado = prato;
  document.getElementById("pratoBuscado").style.backgroundColor = "lightgray";
  document.getElementById("pratoInput").value = prato.nome;
  document.getElementById("addPrato").style.display = "block";
  document.getElementById("quantidadePrato").value = "";
  document.getElementById("quantidadePrato").focus();
}

let pratos = JSON.parse(localStorage.getItem("pratos")) || [];

let contadorId = 0; // Inicializa o contador de IDs.

function adicionarPrato() {
  const nomePrato = document.getElementById("pratoInput").value;
  const produtosQueVaoSerAdd = document.getElementById(
    "produtos-que-vao-ser-add"
  );

  // Limpa o input e remove o prato buscado
  document.getElementById("pratoInput").value = "";
  const pratoBuscado = document.getElementById("pratoBuscado");
  if (pratoBuscado) pratoBuscado.remove();

  // Verifica se um prato foi selecionado
  if (!pratoSelecionado) {
    console.error("Nenhum prato foi selecionado.");
    return;
  }

  const pratoExistente = pratos.find(
    (prato) => prato.nome === pratoSelecionado.nome
  );

  if (pratoExistente) {
    // Se o prato já existir, incrementa a quantidade
    pratoExistente.quantidade += 1;

    const itemPrato = [...document.querySelectorAll(".item-prato")].find(
      (item) =>
        item.querySelector(".nome-prato").textContent === pratoSelecionado.nome
    );
    if (itemPrato) {
      const quantidadeSpan = itemPrato.querySelector(".quantidade-prato");
      quantidadeSpan.textContent = `${pratoExistente.quantidade}`;
    }
  } else {
    // Se for um novo prato, cria um novo ID único para ele.
    const prato = {
      id: pratoSelecionado.id_prato,
      nome: nomePrato,
      preco: pratoSelecionado.preco,
      status: "pendente",
      contadorId: contadorId, // Associando o contadorId ao prato
    };

    pratos.push(prato);
    localStorage.setItem("pratos", JSON.stringify(pratos));

    // Cria o prato na tela
    criarPratoNaTela(prato);
    contadorId++; // Incrementa o contador para o próximo prato
  }
}

function criarPratoNaTela(prato) {
  const produtosQueVaoSerAdd = document.getElementById(
    "produtos-que-vao-ser-add"
  );

  const uniqueId = `inputContador-${prato.contadorId}`; // Gera um ID único para o input de quantidade.

  const div = document.createElement("div");
  div.className = "prato-item-add";

  div.innerHTML = `
    <div class="contador">
      <div class="bolota">
        <button onclick="document.querySelector('#${uniqueId}').value = Number(document.querySelector('#${uniqueId}').value) + 1;">
          <span>+</span>
        </button>
      </div>
      <input type="number" value="1" min="0" id="${uniqueId}" />
      <div class="bolota">
        <button class="menos" onclick="document.querySelector('#${uniqueId}').value = Number(document.querySelector('#${uniqueId}').value) - 1;">
          <span>-</span>
        </button>
      </div>
    </div>
    <li class="item-prato">
      <p>
        <span class="nome-prato">${prato.nome}</span>
        <span class="quantidade-prato"><i></span>
        <span class="preco-prato">R$${prato.preco.toFixed(2)}</span>
      </p>
    </li>
  `;

  produtosQueVaoSerAdd.appendChild(div);
}

const divMessage = document.querySelector(".container");

function alertCriado(msg) {
  const message = document.createElement("div");
  message.classList.add("message");
  message.innerText = msg;
  divMessage.appendChild(message);

  setTimeout(() => {
    message.style.display = "none";
  }, 3000);
}

async function salvarComanda() {
  let pratos = JSON.parse(localStorage.getItem("pratos")) || [];
  const id_comanda = new URLSearchParams(window.location.search).get("id");

  // Itera pelos pratos e busca o input de quantidade associado a cada um
  for (let prato of pratos) {
    try {
      const uniqueId = `inputContador-${prato.contadorId}`; // ID único do input de quantidade
      const inputContador = document.getElementById(uniqueId); // Busca pelo input de quantidade

      if (inputContador) {
        const quantidade = inputContador.value; // Pega o valor do input
        console.log(
          `Procurando input de quantidade para o prato: ${prato.nome}`
        );
        console.log("ID do input de quantidade:", uniqueId);
        console.log("Quantidade:", quantidade);

        const precoTotal = prato.preco * quantidade; // Calcula o preço total baseado na quantidade

        // Envia a requisição para salvar o prato no banco de dados
        const itemPedidoResponse = await fetch(
          "http://localhost:8080/item_pedido",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              preco: precoTotal,
              quantidade: quantidade,
              status: prato.status,
              comanda: { id_comanda: parseInt(id_comanda) },
              prato: { id_prato: prato.id },
            }),
          }
        );

        if (!itemPedidoResponse.ok) {
          throw new Error(
            `Erro ao salvar prato: ${itemPedidoResponse.statusText}`
          );
        }

        console.log("Itens salvos no Banco de Dados com sucesso!");
        alertCriado("Itens salvos no banco de dados!");
      } else {
        console.error(
          `Input de contador não encontrado para o prato ${prato.nome}`
        );
      }
    } catch (e) {
      console.log("Erro ao fazer a requisição", e);
    }
  }

  exibirComanda();
  deletarComanda();
}

function deletarComanda() {
  // Limpa o localStorage.
  localStorage.clear();

  // Reinicializa o array de pratos.
  pratos = [];

  // Seleciona o contêiner dos produtos.
  const produtosQueVaoSerAdd = document.getElementById(
    "produtos-que-vao-ser-add"
  );

  // Remove apenas os elementos com a classe 'prato-item-add'.
  const itensPrato = produtosQueVaoSerAdd.querySelectorAll(".prato-item-add");
  itensPrato.forEach((item) => item.remove());
}

window.addEventListener("load", carregaComanda);
