document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper"),
    selectBtn = wrapper.querySelector(".select-btn"),
    searchInp = wrapper.querySelector("input"),
    options = wrapper.querySelector(".options");

  let items = []; // Armazena os itens carregados

  // Função para buscar e exibir alimentos com base na entrada
  async function buscarProduto() {
    const input = document.getElementById("alimentoInput");
    const query = input.value;

    try {
      const response = await fetch("http://localhost:8080/alimento/todos", {
        method: "GET",
      });
      const data = await response.json();
      items = data; // Armazena todos os alimentos

      // Filtra alimentos com base na pesquisa
      const filteredItems = items.filter((item) =>
        item.nome.toLowerCase().includes(query.toLowerCase())
      );
      mostrarOpcoes(filteredItems);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  // Função para mostrar as opções filtradas
  function mostrarOpcoes(filteredItems) {
    const optionsList = document.getElementById("options");
    optionsList.innerHTML = ""; // Limpa a lista anterior

    if (filteredItems.length > 0) {
      filteredItems.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.nome; // Nome do alimento
        li.onclick = () => selecionarAlimento(item); // Seleciona o alimento ao clicar
        optionsList.appendChild(li);
      });
      optionsList.style.display = "block"; // Exibe a lista
    } else {
      optionsList.style.display = "none"; // Esconde se não houver resultados
    }
  }

  // Função para lidar com a seleção de um alimento
  function selecionarAlimento(alimento) {
    const input = document.getElementById("alimentoInput");
    input.value = alimento.nome; // Atualiza o campo de entrada com o nome do alimento
    const optionsList = document.getElementById("options");
    optionsList.style.display = "none"; // Esconde a lista
    mostrarProduto(alimento); // Chama a função para mostrar o produto
  }

  // Função para mostrar os detalhes do alimento selecionado
  function mostrarProduto(alimento) {
    const resultadoDiv = document.getElementById("produto-alterado-box");
    resultadoDiv.innerHTML = `
          <div class="produto-alterado" data-id="${alimento.id_ingrediente}">
              <li class="item-prato">
                  <p>${alimento.nome} - Medida: ${alimento.medida}</p>
                  <i class="bi bi-trash3" onClick="limparTela()"></i>
              </li>
          </div>
      `;
  }

  function limparTela() {
    const resultadoDiv = document.getElementById("produto-alterado-box");
    resultadoDiv.innerHTML = ""; // Limpa resultados anteriores
  }

  // Adiciona um evento de input para buscar enquanto digita
  document
    .getElementById("alimentoInput")
    .addEventListener("input", buscarProduto);

  // Função para adicionar alimentos à lista de opções
  function addAlimentos(selectedAlimento) {
    options.innerHTML = ""; // Limpa as opções atuais
    items.forEach((item) => {
      let isSelected = item.nome === selectedAlimento ? "selected" : "";
      let li = `<li onclick="updateName(this)" class="${isSelected}">${item.nome}</li>`;
      options.insertAdjacentHTML("beforeend", li); // Adiciona o alimento como uma opção
    });
  }

  // Atualiza o nome selecionado
  function updateName(selectedLi) {
    searchInp.value = ""; // Limpa a caixa de pesquisa
    addAlimentos(selectedLi.innerText); // Atualiza a lista de alimentos
    wrapper.classList.remove("active"); // Fecha a lista de opções
  }

  // Filtro na lista com base na entrada do usuário
  searchInp.addEventListener("keyup", () => {
    let searchWord = searchInp.value.toLowerCase(); // Captura a entrada do usuário
    let arr = items
      .filter((data) => data.nome.toLowerCase().includes(searchWord)) // Filtra os alimentos com base na entrada
      .map((data) => {
        let isSelected = data.nome === searchInp.value ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data.nome}</li>`; // Cria um item para a lista
      })
      .join("");

    options.innerHTML =
      arr.length > 0
        ? arr
        : `<p style="margin-top: 10px;">Oops! Alimento não encontrado</p>`; // Exibe mensagem se nenhum alimento for encontrado
  });

  // Alterna a exibição da lista de alimentos
  selectBtn.addEventListener("click", () => {
    wrapper.classList.toggle("active");
  });

  // Carrega todos os alimentos ao iniciar a página
  fetch("http://localhost:8080/alimento/todos")
    .then((response) => response.json())
    .then((data) => {
      // Assume que os dados retornados têm uma estrutura como [{ "nome": "Arroz", ... }, { "nome": "Feijão", ... }]
      items = data; // Armazena todos os alimentos
      addAlimentos(); // Adiciona todos os alimentos à lista de opções
    })
    .catch((error) => {
      console.error("Erro ao carregar os alimentos:", error);
    });
});
