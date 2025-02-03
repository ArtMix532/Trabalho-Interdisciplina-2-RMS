
async function buscarPratos() {
  const input = document.getElementById("pratoInput").value.toLowerCase();
  const options = document.getElementById("patos");

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
        li.textContent = prato.nome;
        li.onclick = () => selecionarPrato(prato);
        options.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Erro ao buscar pratos:", error);
  }
}

// Adiciona um novo prato na comanda específica
async function addPratoComanda(comandaId) {
  const pratos = selectedPratos.map((prato) => ({
    alimento: { nome: prato.nome },
    quantidade: prato.quantidade,
  }));

  try {
    const pratoResponse = await fetch(`http://localhost:8080/comanda/${comandaId}/prato`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pratos }),
    });

    if (!pratoResponse.ok) {
      const errorText = await pratoResponse.text();
      throw new Error(`Erro ao adicionar o prato na comanda: ${errorText}`);
    }

    alert("Prato adicionado com sucesso na comanda!");
    selectedPratos = []; // Limpar lista de pratos após adicionar
    atualizarListaPratos(); // Atualizar a exibição da UI
  } catch (error) {
    console.error(error);
    alert("Erro ao adicionar o prato na comanda: " + error.message);
  }
}

async function adicionarProdutoNaComanda(comandaId) {
  const produtoNome = document.getElementById("produtoNome").value;
  const quantidade = parseInt(document.getElementById("quantidadeProduto").value);

  try {
    const response = await fetch(
      `http://localhost:8080/comanda/${comandaId}/produto`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: produtoNome, quantidade: quantidade }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao adicionar produto na comanda: ${errorText}`);
    }

    alert("Produto adicionado com sucesso na comanda!");
  } catch (error) {
    console.error(error);
    alert("Erro ao adicionar o produto na comanda: " + error.message);
  }
}
