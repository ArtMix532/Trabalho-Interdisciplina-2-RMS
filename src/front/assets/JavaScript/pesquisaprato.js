let pratos = [];

async function buscarPratos() {
  const input = document.getElementById("alimentoInput").value.toLowerCase();
  const options = document.getElementById("options");

  try {

    const response = await fetch('http://localhost:8080/prato/todos', {
      method: "GET",
    });
    
    if (!response.ok) {
      throw new Error("Erro ao buscar pratos: " + response.statusText);
    }
    
    pratos = await response.json();
    const resultados = pratos.filter(prato => prato.nome.toLowerCase().includes(input));

    options.innerHTML = "";

    if (resultados.length === 0) {
      options.style.display = "none";
    } else {
      options.style.display = "block";
      resultados.forEach(prato => {
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
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <h3>${prato.nome}</h3>
    <p><strong>Preço:</strong> R$ ${prato.preco.toFixed(2)}</p>
    <p><strong>Status:</strong> ${prato.status}</p>
    <h4>Ingredientes:</h4>
    <ul>
      ${prato.ingredientes.map(ingrediente => `
        <li>${ingrediente.alimento.nome}: ${ingrediente.quantidade} ${ingrediente.alimento.medida}</li>
      `).join('')}
    </ul>
  `;
  document.getElementById("alimentoInput").value = prato.nome; 
  document.getElementById("options").style.display = "none"; 
}
