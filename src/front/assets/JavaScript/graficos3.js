const ctx3 = document.getElementById('graficos3');
new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'],
    datasets: [{
      label: 'percentual de desperdício diário',
      data: [62, 52, 60, 50, 35, 30],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const alimentoInput = document.getElementById("alimentoInput");
  const options = document.getElementById("options");
  const resultadoDiv = document.getElementById("produto-alterado-box");
  let items = []; // Lista completa de alimentos
  let alimentoSelecionado = null;

  async  function limparTela() {
    if (resultadoDiv) {
      resultadoDiv.innerHTML = "";
      document.getElementById("alimentoInput") = "";
    }
    alimentoSelecionado = null; // Limpa a seleção
  }

  async function buscarProduto() {
    if (!alimentoInput) return;

    const query = alimentoInput.value.toLowerCase();

    try {
      const response = await fetch("http://localhost:8080/alimento/todos", {
        method: "GET",
      });
      const data = await response.json();
      items = data;

      const filteredItems = items.filter((item) =>
        item.nome.toLowerCase().includes(query)
      );
      mostrarOpcoes(filteredItems);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  function mostrarOpcoes(filteredItems) {
    if (!options) return;

    options.innerHTML = "";
    if (filteredItems.length > 0) {
      filteredItems.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.nome;
        li.onclick = () => selecionarAlimento(item);
        options.appendChild(li);
      });
      options.style.display = "block"; // Mostra a lista de opções
    } else {
      options.style.display = "none"; // Esconde a lista se não houver itens
    }
  }

  async function selecionarAlimento(alimento) {
    if (!alimentoInput || !options || !resultadoDiv) return;

    alimentoInput.value = alimento.nome;
    options.style.display = "none";
    alimentoSelecionado = alimento; // Armazena o alimento selecionado
    mostrarProduto(alimentoSelecionado);
    await buscarDesperdicio(alimentoSelecionado); // Chama a função para buscar desperdício
  }

  function mostrarProduto(alimento) {
    if (!resultadoDiv) return;


    resultadoDiv.innerHTML = `
      <div class="produto-alterado" ; data-id="${alimento.id_ingrediente}">
        <li class="item-prato" id="desperdicioBox">
          <div class="x">
            <i class="bi bi-x" onclick="limparTela()"></i>
          </div>
          <p>${alimento.nome} - Medida: ${alimento.medida}</p>
        </li>
      </div>`;
  }

  async function buscarDesperdicio(alimento) {
    try {
      const response = await fetch(`http://localhost:8080/desperdicio/filtrar?nomeAlimento=${alimento.nome}`);
      const desperdicios = await response.json();
      const desperdicioBox = document.getElementById("desperdicioBox");
      // Soma a quantidade de desperdício
      const totalDesperdicio = desperdicios.reduce((acc, item) => acc + item.quantidade, 0);
      const quantidadeTotal = alimento.quantidade; // Supondo que a quantidade total do alimento está disponível

      // Calcula o percentual de desperdício
      const percentualDesperdicio = (totalDesperdicio / quantidadeTotal) * 100;

      // Exibe o resultado para o usuário
      desperdicioBox.innerHTML += `
        
          <p>Total de desperdício: ${totalDesperdicio} ${alimento.medida}</p>
          <p>Percentual de desperdício: ${percentualDesperdicio.toFixed(2)}%</p>`;
    } catch (error) {
      console.error("Erro ao buscar desperdício:", error);
    }
  }



  if (alimentoInput) {
    alimentoInput.addEventListener("input", buscarProduto);
  }
});