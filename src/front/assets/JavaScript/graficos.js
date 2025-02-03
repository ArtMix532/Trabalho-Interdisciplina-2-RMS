document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('graficos1');
  const form = document.querySelector('#filtros form');
  const dataInicialInput = document.getElementById('data1');
  const dataFinalInput = document.getElementById('data2');

  // Função para buscar dados do banco de dados com intervalo de datas
  async function buscarDados(endpoint, dataInicial, dataFinal) {
      try {
          const url = `${endpoint}?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`Erro ao buscar dados de ${url}`);
          }
          return await response.json();
      } catch (error) {
          console.error(error);
          alert("Erro ao buscar dados. Verifique o console.");
          return [];
      }
  }

  // Função para processar dados e calcular a média de tempo por dia
  async function calcularMediaPorDia(dataInicial, dataFinal) {
      const comandas = await buscarDados("http://localhost:8080/comanda/todos", dataInicial, dataFinal);
      const pagamentos = await buscarDados("http://localhost:8080/pagamento/todos", dataInicial, dataFinal);

      const mediasPorDia = {}; // Armazena tempos médios por dia

      comandas.forEach(comanda => {
          const pagamentoRelacionado = pagamentos.find(pag => pag.comanda.id_comanda === comanda.id_comanda);

          if (pagamentoRelacionado) {
              const dataAbertura = new Date(comanda.data);
              const dataPagamento = new Date(pagamentoRelacionado.dataPagamento);

              // Calcula a diferença em minutos
              const diferencaMinutos = (dataPagamento - dataAbertura) / 60000;

              // Obtém o dia no formato 'AAAA-MM-DD'
              const dia = dataAbertura.toISOString().split("T")[0];

              // Agrupa por dia
              if (!mediasPorDia[dia]) {
                  mediasPorDia[dia] = [];
              }
              mediasPorDia[dia].push(diferencaMinutos);
          }
      });

      // Calcula a média por dia
      const labels = Object.keys(mediasPorDia);
      const medias = labels.map(dia => {
          const tempos = mediasPorDia[dia];
          const soma = tempos.reduce((acc, val) => acc + val, 0);
          return soma / tempos.length;
      });

      return { labels, medias };
  }

  // Configuração inicial do gráfico
  const chart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [], // Inicialmente vazio
          datasets: [{
              label: 'Tempo Médio de Atendimento (minutos)',
              data: [], // Inicialmente vazio
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  title: {
                      display: true,
                      text: 'Minutos'
                  }
              },
              x: {
                  title: {
                      display: true,
                      text: 'Data'
                  }
              }
          }
      }
  });

  // Função para atualizar o gráfico com dados baseados no intervalo de datas
  async function atualizarGraficoComDados(dataInicial, dataFinal) {
      const { labels, medias } = await calcularMediaPorDia(dataInicial, dataFinal);

      // Atualiza o gráfico com os novos dados
      chart.data.labels = labels;
      chart.data.datasets[0].data = medias;
      chart.update();
  }

  // Event listener para o formulário de filtro
  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const dataInicial = dataInicialInput.value;
      const dataFinal = dataFinalInput.value;

      if (!dataInicial || !dataFinal) {
          alert("Por favor, selecione um intervalo de datas válido.");
          return;
      }

      // Atualiza o gráfico com os dados do intervalo de datas selecionado
      await atualizarGraficoComDados(dataInicial, dataFinal);
  });
});

document.querySelector('form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Impede o envio do formulário

  const data1 = document.getElementById('data1').value;
  const data2 = document.getElementById('data2').value;

  // Requisições para obter dados
  const receitas = await fetch(`http://localhost:8080/pagamento/todos`);
  const despesas = await fetch(`http://localhost:8080/despesa`);
  const funcionarios = await fetch(`http://localhost:8080/funcionario/todos`);

  const receitasData = await receitas.json();
  const despesasData = await despesas.json();
  const funcionariosData = await funcionarios.json();

  // Calcular faturamento diário
  const faturamentoDiario = {};
  receitasData.forEach(receita => {
      const data = new Date(receita.dataPagamento).toISOString().split('T')[0];
      if (!faturamentoDiario[data]) {
          faturamentoDiario[data] = 0;
      }
      faturamentoDiario[data] += receita.valor;
  });

  // Calcular despesas diárias
  const despesasDiarias = {};
  despesasData.forEach(despesa => {
      const data = despesa.data;
      if (!despesasDiarias[data]) {
          despesasDiarias[data] = 0;
      }
      despesasDiarias[data] += despesa.valor;
  });

  // Calcular folha de pagamento diária
  let folhaTotal = 0;
  funcionariosData.forEach(funcionario => {
      folhaTotal += funcionario.salario * funcionario.quantidade;
  });
  const folhaDiaria = folhaTotal / 30;

  // Calcular percentual de lucro diário
  const percentualLucroDiario = [];
  const datas = Object.keys(faturamentoDiario);
  datas.forEach(data => {
      const receita = faturamentoDiario[data];
      const despesa = despesasDiarias[data] || 0;
      const lucro = receita - (despesa + folhaDiaria);
      const percentual = (lucro / receita) * 100 || 0; // Evitar divisão por zero
      percentualLucroDiario.push({ data, percentual });
  });

  // Gerar gráfico
  const ctx = document.getElementById('graficos2').getContext('2d');
  const labels = percentualLucroDiario.map(item => item.data);
  const data = percentualLucroDiario.map(item => item.percentual);

  new Chart(ctx, {
      type: 'line', // ou 'bar', dependendo do que você preferir
      data: {
          labels: labels,
          datasets: [{
              label: 'Percentual de Lucro Diário (%)',
              data: data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
});

  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'],
      datasets: [{
        label: 'persentual de disperdico diario',
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