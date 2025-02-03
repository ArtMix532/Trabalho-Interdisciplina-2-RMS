async function criarCargo() {
  const nome = document.getElementById("nomeCargo").value;
  const salario = document.getElementById("salarioCargo").value;
  const quantidade = 0;
  try {
    const response = await fetch("http://localhost:8080/funcionario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cargo: nome,
        salario: salario,
        quantidade: quantidade,
      }),
    });

    if (response.ok) {
      alertCriado(msgCreate);
      document.getElementById("nomeCargo").value = "";
      document.getElementById("salarioCargo").value = "";
    } else {
      alertCriadoRed(erroCreate);
    }
  } catch (error) {
    console.error("Erro ao criar cargo:", error);
  }
}

document.getElementById("btnCriarCargo").addEventListener("click", criarCargo);
async function atualizarQuantidade() {
  const cargo = document.getElementById("alimentoInput").value;
  const quantidade = document.getElementById("qtdProduto").value;
  try {
    const response = await fetch(
      `http://localhost:8080/funcionario/cargo/${cargo}/quantidade?quantidade=${quantidade}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      alertCriado(msgUpdate);
      document.getElementById("alimentoInput").value = "";
      document.getElementById("qtdProduto").value = "";
      document.getElementById("produto-alterado-box").innerHTML = "";
    } else {
      alertCriadoRed(erroUpdater);
    }
  } catch (error) {
    console.error("Erro ao atualizar quantidade:", error);
  }
}

document.getElementById("btnCriarCargo").addEventListener("click", criarCargo);
document
  .getElementById("btnAtualizar")
  .addEventListener("click", atualizarQuantidade);

async function buscarFuncionariosAPI() {
  const input = document.getElementById("alimentoInput").value.toLowerCase();
  const options = document.getElementById("options");

  try {
    const response = await fetch("http://localhost:8080/funcionario/todos", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar funcionários: " + response.statusText);
    }

    const funcionarios = await response.json();

    // Filtra resultados com base no cargo
    const resultados = funcionarios.filter(
      (funcionario) =>
        funcionario &&
        typeof funcionario.cargo === "string" &&
        funcionario.cargo.toLowerCase().includes(input)
    );

    // Atualiza a lista de opções
    options.innerHTML = "";
    if (resultados.length === 0) {
      options.style.display = "none"; // Oculta a lista se não houver resultados
    } else {
      options.style.display = "block"; // Mostra a lista se houver resultados
      resultados.forEach((funcionario) => {
        const li = document.createElement("li");
        li.textContent = `${
          funcionario.cargo
        } - Salário: R$ ${funcionario.salario.toFixed(2)}`;
        li.onclick = () => selecionarFuncionario(funcionario);
        options.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
  }
}

function selecionarFuncionario(funcionario) {
  const resultado = document.getElementById("produto-alterado-box");
  resultado.innerHTML = `
        <h3>Cargo: ${funcionario.cargo}</h3>
        <p><strong>ID:</strong> ${funcionario.id_fun}</p>
        <p><strong>Salário:</strong> R$ ${funcionario.salario.toFixed(2)}</p>
        <p><strong>Quantidade:</strong> ${funcionario.quantidade}</p>
    `;
  document.getElementById("alimentoInput").value = funcionario.cargo; // Preenche o campo de entrada com o cargo do funcionário selecionado
  document.getElementById("options").style.display = "none"; // Oculta a lista de opções
}

const msgCreate = "Cargo criado com sucesso!";
const msgUpdate = "Quantidade atualizada com sucesso!";
const erroCreate = "Erro ao criar cargo.";
const erroUpdater = "Erro ao atualizar quantidade.";

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
