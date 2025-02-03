async function criarDespesas() {
    const motivo = document.getElementById("motivoGasto").value;
    const valor = parseFloat(document.getElementById("valorDogasto").value);
    const dataAtual = new Date().toISOString().split("T")[0]; // Gera data no formato 'YYYY-MM-DD'

    if (!motivo || isNaN(valor)) {
        alertCriadoRed(erroDespesaPreencher);
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/despesa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: dataAtual,
                motivo: motivo,
                valor: valor,
            }),
        });

        if (response.ok) {
            alertCriado(msgLancada);
            document.getElementById("motivoGasto").value = "";
           document.getElementById("valorDogasto").value = "";
        } else {
            alertCriadoRed(erroDespesa);
        }
    } catch (error) {
        console.error("Erro ao lançar despesa:", error);
    }
}

document.getElementById("bntcriarDespesas").addEventListener("click", criarDespesas);

const msgLancada = "Despesa lançada com sucesso!";
const erroDespesa = "Erro ao lançar despesa.";
const erroDespesaPreencher = "Por favor, preencha todos os campos corretamente.";

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