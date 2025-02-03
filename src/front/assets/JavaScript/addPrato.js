async function criarPrato() {
  const nomePrato = document.getElementById("nomePrato").value;
  const precoPrato =  parseFloat(document.getElementById("precoPrato").value.slice(3)); // Remove "R$"
  const statusPrato = "Disponível"; // Define o status conforme necessário

  // Mapear os ingredientes selecionados no formato esperado
  const ingredientesPrato = selectedIngredients.map((ingrediente) => ({
    alimento: { nome: ingrediente.nome },
    quantidade: ingrediente.quantidade,
  }));

  try {
    const pratoResponse = await fetch("http://localhost:8080/prato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nomePrato,
        status: statusPrato,
        preco: precoPrato,
        ingredientes: ingredientesPrato, // Adiciona os ingredientes
      }),
    });

    if (!pratoResponse.ok) {
      const errorText = await pratoResponse.text(); // Captura o texto do erro, se houver
      throw new Error(`Erro ao criar o prato: ${errorText}`);
    }

    alertCriado(msgCreate);
    selectedIngredients = []; // Limpar ingredientes selecionados após a criação
    atualizarListaIngredientes(); // Atualizar a exibição da UI
  } catch (error) {
    console.error(error);
    alertCriadoRed(erroCreate);
  }
  limparTelaCriar();
}

const erroUpdateSelecionar = "Por favor, selecione um prato para alterar.";
const erroUpdate = "Erro ao alterar o prato.";

async function alterarPrato() {
  const pratoNome = document.getElementById("pratoInput").value; // Usar o campo correto
  const novoPreco = parseFloat(
    document.getElementById("alterarPrecoPrato").value.slice(3)
  );

  if (!pratoNome) {
    alertCriadoRed(erroUpdateSelecionar);
    return;
  }

  try {
    const updatePratoResponse = await fetch(
      `http://localhost:8080/prato/preco/${pratoNome}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preco: novoPreco }),
      }
    );

    if (!updatePratoResponse.ok) {
      const errorText = await updatePratoResponse.text();
      throw new Error(`Erro ao alterar o prato: ${errorText}`);
    }

    alertCriado(msgUpdate);
  } catch (error) {
    alertCriadoRed(erroUpdatePrato);
  }
}
let selectedIngredients = []; // Store selected ingredients with quantities

const erroUpdatePrato = "Erro ao alterar o prato.";
const erroDelete = "Erro ao excluir o prato";
const erroDeleteSelecione = "Por favor, selecione um prato para excluir.";

async function excluirPrato() {
  const pratoNome = document.getElementById("pratoInput").value; // Usar o campo correto

  if (!pratoNome) {
    alertCriadoRed(erroDeleteSelecione);
    return;
  }

  try {
    const deletePratoResponse = await fetch(
      `http://localhost:8080/prato/${pratoNome}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!deletePratoResponse.ok) {
      const errorText = await deletePratoResponse.text();
      throw new Error(`Erro ao excluir o prato: ${errorText}`);
    }

    alertCriado(msgDelete);
    document.getElementById("resultadoPrato").innerHTML = ""; // Limpa o resultado após a exclusão
  } catch (error) {
    console.error(error);
    alertCriadoRed(erroDelete);
  }
}

async function buscarPratos() {
  const input = document.getElementById("alimentoInput").value.toLowerCase();
  const options = document.getElementById("patos");

  try {
    const response = await fetch("http://localhost:8080/prato/todos", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar pratos: " + response.statusText);
    }

    const pratos = await response.json();
    const resultados = pratos.filter((prato) =>
      prato.nome.toLowerCase().includes(input)
    );

    // Atualiza a lista de opções
    options.innerHTML = "";
    if (resultados.length === 0) {
      options.style.display = "none"; // Oculta a lista se não houver resultados
    } else {
      options.style.display = "block"; // Mostra a lista se houver resultados
      resultados.forEach((prato) => {
        const li = document.createElement("li");
        li.textContent = prato.nome;
        li.onclick = () => selecionarPrato(prato);
        options.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Erro ao buscar pratos:", error);
  }
}

function selecionarPrato(prato) {
  const resultado = document.getElementById("resultadoPrato");
  resultado.innerHTML = `
      <h3>${prato.nome}</h3>
      <p><strong>Preço:</strong> R$ ${prato.preco.toFixed(2)}</p>
      <p><strong>Status:</strong> ${prato.status}</p>
      <h4>Ingredientes:</h4>
      <ul>
        ${prato.ingredientes
          .map(
            (ingrediente) => `
          <li>${ingrediente.alimento.nome}: ${ingrediente.quantidade} ${ingrediente.alimento.medida}</li>
        `
          )
          .join("")}
      </ul>
    `;
  document.getElementById("alimentoInput").value = prato.nome;
  document.getElementById("patos").style.display = "none";
  document.getElementById("alimentoInput").value = "";
}


async function buscarProduto() {
  const query = document.getElementById("alimentoInput").value;
  const options = document.getElementById("options");

  try {
    const response = await fetch("http://localhost:8080/alimento/todos");
    const items = await response.json();

    options.style.display = "visibility";

    options.innerHTML = ""; // Limpa opções
    items
      .filter((item) => item.nome.toLowerCase().includes(query.toLowerCase()))
      .forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.nome;
        li.onclick = () => selecionarAlimento(item);
        options.appendChild(li);
      });

    options.style.display = items.length ? "block" : "none";
  } catch (error) {
    console.error("Erro:", error);
  }
}

function selecionarAlimento(alimento) {
  document.getElementById("quantidadeBox").style.display = "block"; // Exibe campo de quantidade
  document.getElementById("quantidadeProduto").value = ""; // Limpa o campo de quantidade
  document.getElementById("quantidadeProduto").focus();
  document
    .getElementById("quantidadeProduto")
    .setAttribute("data-alimento-nome", alimento.nome); // Armazena o nome do alimento no atributo
}

function adicionarIngrediente() {
  const quantidade = parseFloat(
    document.getElementById("quantidadeProduto").value
  );
  const alimentoNome = document
    .getElementById("quantidadeProduto")
    .getAttribute("data-alimento-nome");

  if (!isNaN(quantidade) && alimentoNome) {
    selectedIngredients.push({ nome: alimentoNome, quantidade });
    atualizarListaIngredientes();
    document.getElementById("quantidadeBox").style.display = "none"; // Esconde o campo de quantidade
  } else {
    alertCriadoRed(erroInsiraQtd);
  }
}

const erroInsiraQtd = "Por favor, insira uma quantidade válida.";

function atualizarListaIngredientes() {
  const ingredienteDiv = document.getElementById("produto-alterado-box");
  ingredienteDiv.innerHTML = ""; // Limpa a lista de ingredientes

  selectedIngredients.forEach((ingrediente) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="produto-alterado">
                <li class="item-prato">
                  <p>${ingrediente.nome} | Quantidade: ${ingrediente.quantidade}</p>
                  <i class="bi bi-trash3" onclick="limparTela()"></i>
                </li>
              </div>
      `;
    ingredienteDiv.appendChild(div);
  });
}

function limparTela() {
  document.getElementById("produto-alterado-box").innerHTML = "";
}
function limparTelaCriar() {
  document.getElementById("produto-alterado-box").innerHTML = "";
  options.style.display = "none";
  document.getElementById("alimentoInput").value = "";
  document.getElementById("precoPrato").value = "";
  document.getElementById("nomePrato").value = "";
}

document
  .getElementById("alimentoInput")
  .addEventListener("input", buscarProduto);

const msgCreate = "Prato criado com sucesso!";
const msgDelete = "Prato deletado com sucesso!";
const msgUpdate = "Prato alterado com sucesso!";
const erroCreate = "Erro ao Criar o Prato";

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
function alertCriadoRed(msg) {
  const message = document.createElement("div");
  message.classList.add("messageRed");
  message.innerText = msg;
  divMessage.appendChild(message);

  setTimeout(() => {
    message.style.display = "none";
  }, 3000);
}
