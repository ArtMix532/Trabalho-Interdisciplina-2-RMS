document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper"),
    selectBtn = wrapper ? wrapper.querySelector(".select-btn") : null,
    searchInp = wrapper ? wrapper.querySelector("input") : null,
    options = document.getElementById("options");

  let items = []; // Armazena os itens carregados
  let alimentoSelecionado = null; // Variável para armazenar o alimento selecionado

  async function buscarProduto() {
    const input = document.getElementById("alimentoInput");
    const query = input.value;

    try {
      const response = await fetch("http://localhost:8080/alimento/todos", {
        method: "GET",
      });
      const data = await response.json();
      items = data;

      const filteredItems = items.filter((item) =>
        item.nome.toLowerCase().includes(query.toLowerCase())
      );
      mostrarOpcoes(filteredItems);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  function mostrarOpcoes(filteredItems) {
    options.innerHTML = "";
    if (filteredItems.length > 0) {
      filteredItems.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.nome;
        li.onclick = () => selecionarAlimento(item);
        options.appendChild(li);
      });
      options.style.display = "block";
    } else {
      options.style.display = "none";
    }
  }

  async function atualizarQuantidade() {
    if (!alimentoSelecionado) {
      alertCriadoRed(selecioneAlimento);
      return;
    }

    const qtdAdicionar = parseInt(
      document.getElementById("qtdProduto").value,
      10
    );
    const novaQuantidade = alimentoSelecionado.quantidade + qtdAdicionar;

    try {
      const response = await fetch(
        `http://localhost:8080/alimento/quantidade/${encodeURIComponent(
          alimentoSelecionado.nome
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantidade: novaQuantidade,
          }),
        }
      );

      if (response.ok) {
        alertCriado(QTDcomSucesso); // Exibe a mensagem de sucesso
        // Opcional: chame uma função para atualizar a exibição após a atualização
      } else {
        throw new Error("Falha ao atualizar o produto.");
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
    limparTela();
  }
  async function deleteProduto() {
    if (!alimentoSelecionado) {
      alertCriadoRed(SlecionePrimeiro);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/alimento/${encodeURIComponent(
          alimentoSelecionado.nome
        )}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alertCriado(msgDelete); // Exibe a mensagem de sucesso
        clearProdutoDisplay(); // Limpa a exibição após a exclusão
      } else {
        throw new Error("Falha ao deletar o produto.");
      }
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
    limparTela();
  }
  // Adiciona o evento de clique ao botão
  document
    .getElementById("btnAtualizar")
    .addEventListener("click", atualizarQuantidade);
  document
    .getElementById("btnExcluir")
    .addEventListener("click", deleteProduto);

  function selecionarAlimento(alimento) {
    const input = document.getElementById("alimentoInput");
    input.value = alimento.nome;
    options.style.display = "none";
    alimentoSelecionado = alimento; // Armazena o alimento selecionado
    mostrarProduto(alimento);
  }

  function mostrarProduto(alimento) {
    const resultadoDiv = document.getElementById("produto-alterado-box");
    resultadoDiv.innerHTML = `
          <div class="produto-alterado" data-id="${alimento.id_ingrediente}">
            <li class="item-prato">
              <p>${alimento.nome} - Medida: ${alimento.medida}</p>
              <i class="bi bi-trash3" onclick="limparTela()"></i>
            </li>
          </div>
        `;
  }

  function limparTela() {
    document.getElementById("produto-alterado-box").innerHTML = "";
    alimentoSelecionado = null; // Limpa a seleção de alimento
  }

  document
    .getElementById("alimentoInput")
    .addEventListener("input", buscarProduto);

  selectBtn &&
    selectBtn.addEventListener("click", () => {
      wrapper.classList.toggle("active");
    });

  fetch("http://localhost:8080/alimento/todos")
    .then((response) => response.json())
    .then((data) => {
      items = data;
      addAlimentos();
    })
    .catch((error) => console.error("Erro ao carregar os alimentos:", error));
});
document.addEventListener("DOMContentLoaded", () => {
  const perdaOptions = document.getElementById("perdaOptions");
  let alimentoSelecionadoPerda = null;

  async function buscarPerdaProduto() {
    const input = document.getElementById("perdaInput");
    const query = input.value;

    try {
      const response = await fetch("http://localhost:8080/alimento/todos", {
        method: "GET",
      });
      const data = await response.json();
      const filteredItems = data.filter((item) =>
        item.nome.toLowerCase().includes(query.toLowerCase())
      );
      mostrarPerdaOpcoes(filteredItems);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  function mostrarPerdaOpcoes(filteredItems) {
    perdaOptions.innerHTML = "";
    if (filteredItems.length > 0) {
      filteredItems.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.nome;
        li.onclick = () => selecionarAlimentoPerda(item);
        perdaOptions.appendChild(li);
      });
      perdaOptions.style.display = "block";
    } else {
      perdaOptions.style.display = "none";
    }
  }

  function selecionarAlimentoPerda(alimento) {
    const input = document.getElementById("perdaInput");
    input.value = alimento.nome;
    perdaOptions.style.display = "none";
    alimentoSelecionadoPerda = alimento;
    mostrarProdutoPerda(alimento);
  }

  function mostrarProdutoPerda(alimento) {
    const perdaBox = document.getElementById("produto-perda-box");
    perdaBox.innerHTML = `
      <div class="produto-alterado" data-id="${alimento.id_ingrediente}">
        <li class="item-prato">
          <p>${alimento.nome} - Medida: ${alimento.medida}</p>
          <i class="bi bi-trash3" onclick="limparPerdaTela()"></i>
        </li>
      </div>
    `;
  }

  async function lancarPerda() {
    if (!alimentoSelecionadoPerda) {
      alertCriadoRed(SlecionePrimeiro);
      return;
    }
  
    const qtdPerda = parseInt(document.getElementById("qtdPerda").value, 10);
    const motivo = document.getElementById("motivoPerda").value;
  
    if (!qtdPerda || !motivo) {
      alertCriadoRed(PreencharTd);
      return;
    }
  
    const desperdicioData = {
      alimento: {
        nome: alimentoSelecionadoPerda.nome, // Nome do alimento selecionado
      },
      motivo: motivo, // Motivo do desperdício
      quantidade: qtdPerda, // Quantidade descartada
    };
  
    try {
      const response = await fetch("http://localhost:8080/desperdicio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(desperdicioData),
      });
  
      if (response.ok) {
        alertCriado(msgCreateperda);
        limparPerdaTela();
      } else {
        throw new Error("Erro ao lançar a perda.");
      }
    } catch (error) {
      console.error("Erro ao lançar a perda:", error);
    }
  }

  function limparPerdaTela() {
    document.getElementById("produto-perda-box").innerHTML = "";
    alimentoSelecionadoPerda = null;
  }

  document.getElementById("perdaInput").addEventListener("input", buscarPerdaProduto);
  document.getElementById("btnLancarPerda").addEventListener("click", lancarPerda);
});

const selecioneAlimento = "Selecione um alimento primeiro.";
const QTDcomSucesso = "Quantidade atualizada com sucesso!";
const SlecionePrimeiro = "Selecione um alimento primeiro.";
const PreencharTd = "Preencha todos os campos obrigatórios.";
const msgCreateperda = "Perda lançada com sucesso!";



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