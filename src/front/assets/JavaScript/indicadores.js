// Função para carregar os pagamentos e calcular o valor total
async function carregarPagamentos() {
    const url = "http://localhost:8080/pagamento/todos";
    let valorTotal = 0;

    try {
        // Fazendo a requisição para obter os pagamentos
        const response = await fetch(url);
        
        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        // Convertendo a resposta para JSON
        const pagamentos = await response.json();

        // Somando os valores dos pagamentos
        valorTotal = pagamentos.reduce((total, pagamento) => total + pagamento.valor, 0);

        // Atualizando o conteúdo do span com a classe info_total_faturado
        const spanTotalFaturado = document.querySelector(".info_total_faturado");
        if (spanTotalFaturado) {
            spanTotalFaturado.textContent = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        }
    } catch (error) {
        console.error("Erro ao carregar os pagamentos:", error);
    }
}

// Chama a função quando a página carrega
document.addEventListener("DOMContentLoaded", carregarPagamentos);
// Função para carregar as despesas e calcular o valor total
async function carregarDespesas() {
    const url = "http://localhost:8080/despesa";
    let valorTotal = 0;

    try {
        // Fazendo a requisição para obter as despesas
        const response = await fetch(url);
        
        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        // Convertendo a resposta para JSON
        const despesas = await response.json();

        // Somando os valores das despesas
        valorTotal = despesas.reduce((total, despesa) => total + despesa.valor, 0);

        // Atualizando o conteúdo do span com a classe info_total_gastos
        const spanTotalGastos = document.querySelector(".info_total_gastos");
        if (spanTotalGastos) {
            spanTotalGastos.textContent = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        }
    } catch (error) {
        console.error("Erro ao carregar as despesas:", error);
    }
}
async function carregarFuncionarios() {
    const url = "http://localhost:8080/funcionario/todos";
    let valorTotal = 0;

    try {
        // Fazendo a requisição para obter os dados dos funcionários
        const response = await fetch(url);
        
        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        // Convertendo a resposta para JSON
        const funcionarios = await response.json();

        // Calculando o valor total
        valorTotal = funcionarios.reduce((total, func) => total + (func.salario * func.quantidade), 0);

        // Atualizando o conteúdo do span com a classe info_total_folha
        const spanTotalFolha = document.querySelector(".info_total_folha");
        if (spanTotalFolha) {
            spanTotalFolha.textContent = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        }
    } catch (error) {
        console.error("Erro ao carregar os funcionários:", error);
    }
}

// Chama a função quando a página carrega
document.addEventListener("DOMContentLoaded", carregarFuncionarios);
async function calcularLucro() {
    const spanTotalFaturado = document.querySelector(".info_total_faturado");
    const spanTotalGastos = document.querySelector(".info_total_gastos");
    const spanTotalFolha = document.querySelector(".info_total_folha");
    const spanTotalLucro = document.querySelector(".info_total_lucro");

    try {
        // Obtendo os valores do DOM
        const totalFaturado = parseFloat(
            spanTotalFaturado.textContent.replace("R$", "").replace(".", "").replace(",", ".")
        );
        const totalGastos = parseFloat(
            spanTotalGastos.textContent.replace("R$", "").replace(".", "").replace(",", ".")
        );
        const totalFolha = parseFloat(
            spanTotalFolha.textContent.replace("R$", "").replace(".", "").replace(",", ".")
        );

        // Calculando o lucro
        const lucro = totalFaturado - totalGastos - totalFolha;

        // Atualizando o conteúdo do span com a classe info_total_lucro
        if (spanTotalLucro) {
            spanTotalLucro.textContent = `R$ ${lucro.toFixed(2).replace(".", ",")}`;
        }
    } catch (error) {
        console.error("Erro ao calcular o lucro:", error);
    }
}

// Aguardar que todas as funções sejam executadas antes de calcular o lucro
document.addEventListener("DOMContentLoaded", () => {
    // Aguardar carregamento dos valores
    Promise.all([
        carregarPagamentos(),
        carregarDespesas(),
        carregarFuncionarios(),
    ]).then(() => calcularLucro());
});
// Chama a função quando a página carrega
document.addEventListener("DOMContentLoaded", carregarDespesas);

const data1 = document.getElementById('data1');
            const data2 = document.getElementById('data2');
        
            data1.addEventListener('change', () => {
                // Atualiza a data mínima de data2
                const selectedDate = data1.value;
                data2.min = selectedDate;
                // Opcional: limpa o valor de data2 se não for válido
                if (data2.value && data2.value < selectedDate) {
                    data2.value = '';
                }
            });


            
            