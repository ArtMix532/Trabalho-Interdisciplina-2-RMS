// Função para carregar todas as comandas com status "aberto" do backend
async function carregarComandasAbertas() {
  try {
    const response = await fetch("http://localhost:8080/comanda/todos");
    if (!response.ok) {
      throw new Error("Erro ao carregar as comandas.");
    }

    const comandas = await response.json();
    const comandasContainer = document.getElementById("comandas-container");
    comandasContainer.innerHTML = ""; // Limpa o container para atualizar as comandas

    // Filtra e exibe apenas as comandas com status "aberta"
    comandas
      .filter((comanda) => comanda.status === "aberta")
      .forEach((comanda) => {
        const comandaDiv = document.createElement("div");
        comandaDiv.className = "comanda";

        // Define o status e data conforme os dados do banco de dados
        const status = comanda.status;

        comandaDiv.innerHTML = `
          <a href="./comanda.html?id=${comanda.id_comanda}">
            <h1>${String(comanda.id_comanda).padStart(2, "0")}</h1> Comanda
          </a>
          <div class="status-comanda ${status}">
            
            <h1>${comanda.nome}</h1>
          </div>
        `;

        comandasContainer.appendChild(comandaDiv);
      });
  } catch (error) {
    console.error(error);
    alertCriado(msgErroAbrir);
  }
}

// Adiciona uma nova comanda ao abrir
async function handleAbrirComanda() {
  const nomeCliente = document.getElementById("nomeCliente").value;

  // Abre a comanda e obtém o ID e a data de criação
  const result = await abrirComanda(nomeCliente);

  if (result && result.comandaId) {
    carregarComandasAbertas(); // Atualiza a lista de comandas exibidas
    document.querySelector(".modal").style.display = "none"; // Fecha o modal
  }
}

// Função para abrir a comanda e retornar o ID e a data de criação
async function abrirComanda(nomeCliente) {
  try {
    const dataCriacao = new Date().toISOString();

    const response = await fetch("http://localhost:8080/comanda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: dataCriacao,
        status: "aberta",
        nome: nomeCliente,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao abrir comanda: ${errorText}`);
    }

    const responseText = await response.text();
    console.log("Resposta do servidor:", responseText);

    if (responseText) {
      // Apenas parseia como JSON se houver conteúdo na resposta
      const comanda = JSON.parse(responseText);
      alertCriado(msgCreate);
      document.getElementById("nomeCliente").value = "";
      return {
        comandaId: comanda.id_comanda,
        dataCriacao: dataCriacao,
      };
    } else {
      throw new Error("Resposta vazia do servidor.");
    }
  } catch (error) {
    console.error(error);
    alertCriado(msgErroCreate);
  }
}

const divMessage = document.querySelector("main");

const msgErroCreate = "Erro ao abrir a comanda.";
const msgCreate = "Comanda criada com sucesso!";
const msgErroAbrir = "Erro ao carregar as comandas.";

function alertCriado(msg) {
  const message = document.createElement("div");
  message.classList.add("message");
  message.innerText = msg;
  divMessage.appendChild(message);

  setTimeout(() => {
    message.style.display = "none";
  }, 3000);
}

// Carrega todas as comandas abertas ao carregar a página
window.addEventListener("load", carregarComandasAbertas);
