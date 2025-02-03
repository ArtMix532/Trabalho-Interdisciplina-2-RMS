const updateProduto = async () => {
  const nomeAlterado = document.getElementById("alterarNomeProduto").value;
  const medidaAlterado = document.getElementById("alterarMedidaProduto").value;
  const qtdAlterado = 0;
  const alimento = document.getElementById("alimentoInput").value;

  try {
    const response = await fetch(
      `http://localhost:8080/alimento/${encodeURIComponent(alimento)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeAlterado,
          medida: medidaAlterado,
          quantidade: qtdAlterado,
        }),
      }
    );

    if (response.ok) {
      alertCriado(msgUpdate); // Exibe a mensagem de sucesso
      // Opcional: chame uma função para atualizar a exibição após a atualização
    } else {
      throw new Error("Falha ao atualizar o produto.");
    }
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
  }
};

// Função para limpar a exibição do produto (chamada após a exclusão)
function clearProdutoDisplay() {
  const produtoAlteradoBox = document.getElementById("produto-alterado-box");
  if (produtoAlteradoBox) produtoAlteradoBox.innerHTML = "";
}

// CRUD-- READ
async function fetchProdutoById(id) {
  try {
    const response = await fetch(`http://localhost:8080/alimento/${id}`);
    if (!response.ok) throw new Error("Produto não encontrado.");
    const data = await response.json();
    renderProduto(data);
  } catch (error) {
    console.error("Erro ao ler produto:", error);
  }
}

// Função para renderizar um produto específico na tela
function renderProduto(produto) {
  const produtoAlteradoBox = document.getElementById("produto-alterado-box");
  if (!produtoAlteradoBox) return;

  produtoAlteradoBox.innerHTML = ""; // Limpa antes de exibir o produto

  const produtoItem = document.createElement("div");
  produtoItem.className = "produto-alterado";
  produtoItem.innerHTML = `
    <li class="item-prato">
      <p>${produto.nome} - ${produto.medida} - Quantidade: ${produto.quantidade}</p>
    </li>
  `;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Excluir";
  deleteBtn.onclick = () => deleteProduto(produto.id);

  const updateBtn = document.createElement("button");
  updateBtn.innerText = "Atualizar";
  updateBtn.onclick = () => {
    const nomeAlterada =
      document.getElementById("alterarNomeProduto").value || produto.nome;
    const medidaAlterada =
      document.getElementById("alterarMedidaProduto").value || produto.medida;
    const qtdAlterada =
      parseInt(document.getElementById("alterarQuantidadeProduto").value, 10) ||
      produto.quantidade;

    const novoProduto = {
      nome: nomeAlterada,
      medida: medidaAlterada,
      quantidade: qtdAlterada,
    };
    updateProduto(produto.nome, novoProduto);
  };

  produtoItem.appendChild(deleteBtn);
  produtoItem.appendChild(updateBtn);
  produtoAlteradoBox.appendChild(produtoItem);
}

// Função para limpar a exibição do produto
function clearProdutoDisplay() {
  const produtoAlteradoBox = document.getElementById("produto-alterado-box");
  if (produtoAlteradoBox) produtoAlteradoBox.innerHTML = "";
}

// CRUD-- CREATE
async function criarProduto() {
  const nome = document.getElementById("nomeProduto").value;
  const medida = document.getElementById("medidaProduto").value;
  const qtd = 0;
  const categoria = document.getElementById("categoriaProduto").value;
  try {
    const response = await fetch("http://localhost:8080/alimento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        medida: medida,
        quantidade: qtd,
        categoria: categoria,
      }),
    });

    alertCriado(msgCreate);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
  }
  limparTelaCriarProduto();
}

function limparTelaCriarProduto() {
  document.getElementById("medidaProduto").value = "";
  document.getElementById("nomeProduto").value = "";
  document.getElementById("categoriaProduto").value = "";
}

const btn = document.querySelector("#criarBtn");
const divMessage = document.querySelector(".container");

const msgCreate = "Produto criado com sucesso!";
const msgDelete = "Produto deletado com sucesso!";
const msgUpdate = "Produto alterado com sucesso!";

function alertCriado(msg) {
  const message = document.createElement("div");
  message.classList.add("message");
  message.innerText = msg;
  divMessage.appendChild(message);

  setTimeout(() => {
    message.style.display = "none";
  }, 3000);
}

btn.addEventListener("click", criarProduto);

const btnSalvar = document.getElementById("btnSalvar");
btnSalvar.addEventListener("click", () => updateProduto(data.id));

const btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", () => deleteProduto(data.id));
