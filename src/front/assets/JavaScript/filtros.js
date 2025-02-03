// Função para buscar todos os pratos
async function buscarTodosPratos() {
  const options = document.getElementById("optionsPratos");

  try {
    const response = await fetch("http://localhost:8080/prato/todos");
    if (!response.ok) {
      throw new Error("Erro ao buscar pratos: " + response.statusText);
    }

    const pratos = await response.json();
    // Ordenar pratos alfabeticamente
    pratos.sort((a, b) => a.nome.localeCompare(b.nome));

    // Atualizar lista de opções
    options.innerHTML = "";
    pratos.forEach((prato) => {
      const li = document.createElement("li");
      li.textContent = prato.nome;
      li.onclick = () => selecionarPrato(prato);
      options.appendChild(li);
    });
    options.style.display = pratos.length ? "block" : "none";
  } catch (error) {
    console.error("Erro ao buscar pratos:", error);
  }
}

// Função para buscar alimentos por categoria
async function buscarAlimentosPorCategoria(categoria) {
  const options = document.getElementById("optionsProdutos");

  try {
    const response = await fetch(
      `http://localhost:8080/alimento/categoria/${categoria}`
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar alimentos: " + response.statusText);
    }

    const alimentos = await response.json();
    // Ordenar alimentos alfabeticamente
    alimentos.sort((a, b) => a.nome.localeCompare(b.nome));

    // Atualizar lista de opções
    options.innerHTML = "";
    alimentos.forEach((alimento) => {
      const li = document.createElement("li");
      li.textContent = alimento.nome;
      li.onclick = () => selecionarAlimento(alimento);
      options.appendChild(li);
    });
    options.style.display = alimentos.length ? "block" : "none";
  } catch (error) {
    console.error("Erro ao buscar alimentos por categoria:", error);
  }
}

// Função para lidar com mudanças nos selects
document.getElementById("filtroPratos").addEventListener("change", (event) => {
  const categoria = event.target.value;
  if (categoria === "Pratos") {
    buscarTodosPratos();
  } else if (categoria === "Bebidas") {
    buscarAlimentosPorCategoria("Bebidas");
  }
});

document
  .getElementById("filtroProdutos")
  .addEventListener("change", (event) => {
    const categoria = event.target.value;
    if (categoria) {
      buscarAlimentosPorCategoria(categoria);
    }
  });
