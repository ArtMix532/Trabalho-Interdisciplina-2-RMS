# RMS (Restaurant Management System)


**Arthur Henrique Teixeira e Silva Bacelete, arthurbt2005@gmail.com**

**Davi Benjamim Guimarães, davibg2005@gmail.com**

**Gabriel Reis Lebron de Oliveira, reislebron@gmail.com**

**João Pedro Tavares e Amorim, joaotavareseamorim@gmail.com**

**Lucas José Lopes Ferreira, lucasjlopesferreira@gmail.com**

**Luís Othávio Rangel, rpluisrangel1@gmail.com**

**Mateus Rodrigues Costa, mateuscosta@nacasa.com.br**

---

Professores:

** Prof. Michelle Hanne Soares de Andrade **

** Prof. Danilo Boechat Seufitelli **

** Prof. Alexandre Marques **

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

Este trabalho apresenta o desenvolvimento de um sistema de gerenciamento para restaurantes, com o objetivo de otimizar operações e promover maior eficiência. O sistema aborda desafios comuns enfrentados por restaurantes, como falhas na comunicação interna, desperdício de recursos e controle financeiro inadequado. A proposta inclui funcionalidades como gestão de estoque em tempo real, comunicação integrada entre equipes, e automação de processos financeiros e de atendimento. Ao integrar soluções tecnológicas modernas, o software busca reduzir erros, melhorar a experiência do cliente e aumentar a sustentabilidade do negócio. Os resultados esperados incluem maior controle operacional, redução de desperdícios e aumento na fidelização de clientes, posicionando os restaurantes em um mercado cada vez mais competitivo.

---


## 1. Introdução

O nosso projeto se trata de um sistema de gerenciamento de restaurante.

### 1.1 Contextualização

Nosso projeto propõe o desenvolvimento de um software de gestão de recursos específico para restaurantes, com o principal objetivo de melhorar a eficiência operacional. O sistema proporcionará um controle mais assertivo das atividades diárias, reduzindo desperdícios desnecessários, diminuindo o tempo de espera dos clientes, e minimizando erros na entrega de pedidos. Isso resultará em maior eficiência nas operações e uma gestão mais eficaz dos estoques.

Com a implementação deste sistema nos restaurantes parceiros, esperamos uma melhoria significativa na performance, sustentabilidade e competitividade no mercado atual. Inicialmente, nosso software incluirá funcionalidades como a Gestão de Estoque em tempo real, permitindo que os restaurantes comprem ingredientes conforme a demanda, e a Comunicação entre Garçons e a Equipe de Cozinha, agilizando o processo de pedidos e reduzindo o tempo de espera, entre outras funcionalidades.

### 1.2 Problema

_Muitos restaurantes utilizam métodos tradicionais de operação. No entanto, existem vários obstáculos que presisam ser superados para uma melhor eficencia no controle dos pedidos, inventário e gestão financeira. A uma falha na cominicação com o cliente gerando erros em seus pedidos, alem de falhas no faturamento e manutenção de estoque. A falta de comunicação entre os setores resulta em insatisfações para o cliente e um impacito negativo nos seretados finacieros da empresa. O restaurante que nao posusa uma gestaão eficiente de todos so seu porceçõs, não será capaz de operar de forma eficiente e competir no mercado._

### 1.3 Objetivo geral
Nosso projeto tem o obijetivo de melhorar a gestão operacional de restaurantes a lacarte, atraves de uma plataforma unificada para os principais procesos de gestao como: gestão fincaceira, gestão de estoque, e prceficação de produtos.

#### 1.3.1 Objetivos específicos

Otimizar o Processo de Atendimento e Entrega de Pedidos: Implementar funcionalidades que permitam que os garçons e a equipe da cozinha se comuniquem de maneira mais eficaz, reduzam o tempo de espera dos clientes e garantam que os pedidos sejam entregues corretamente. Isso pode incluir o uso de dispositivos móveis para registrar pedidos em tempo real e a integração direta com a cozinha, onde os chefs podem visualizar e organizar os pedidos em ordem de prioridade.

Melhorar a Gestão de Estoque e Reduzir Desperdícios:  Desenvolver e implementar um módulo que rastreie o uso de ingredientes em tempo real, permitindo que os restaurantes ajustem as compras com base na demanda. A pesquisa poderia se concentrar em como integrar sensores IoT para monitorar automaticamente o estoque e alertar os gerentes quando determinados ingredientes estão baixos, bem como gerar relatórios para otimizar o uso de recursos e reduzir o desperdício de alimentos.

### 1.4 Justificativas

A escolha de desenvolver um software de controle de restaurante é justificada pela necessidade eficiente de um modelo de gestão para um setor altamente competitivo. Deste modo, um sistema que integra o controle e a comunicação interna pode transformar a operação do restaurante. Assim, o trabalho ira contribuir para uma melhor experiemcia para o cliente e ao funcionario. 

## 2. Participantes do Processo
Os principais usuários do nosso sistema são:


### 1. Gerente do Salão
Idade: 30 anos
Gênero: Feminino.  
Escolaridade: Pós-graduação.  
Perfil de Usuário: Análise e controle de todos os aspectos do sistema, incluindo operações, finanças e estratégia.  
### 2. Gestora Financeira
Idade: 30 anos.  
Gênero: Feminino.  
Escolaridade: Pós-graduada.  
Perfil de Usuário: Controle de contas a pagar e receber, entrada e saída de notas fiscais, e análise financeira do restaurante.
### 3. Cozinheiro Chef
Idade: 35 anos.  
Gênero: Masculino.  
Escolaridade: Pós-graduado.  
Perfil de Usuário: Gestão de pedidos na cozinha e controle de estoque de ingredientes, garantindo a qualidade e a eficiência na preparação dos pratos.  
### 4. Garçom
Idade: 25 anos  
Gênero: Masculino  
Escolaridade: Ensino Médio completo  
Perfil de Usuário: Responsável pelo atendimento aos clientes, anotação de pedidos, organização das mesas e processamento de pagamentos.  


## 3. Modelagem do processo de negócio
Apresentação da análise básica da situação atual e propostas de soluções para os restaurantes à la carte.

### 3.1. Análise da situação atual

Atualmente, muitos restaurantes ainda utilizam processos manuais ou sistemas básicos para gerenciar suas operações diárias. A gestão de estoque, vendas e finanças, entre outras funções, é frequentemente realizada por meio de planilhas, o que pode levar a problemas devido à falta de atualizações em tempo real e à possibilidade de erros humanos. Isso gera uma série de dificuldades no dia a dia dos estabelecimentos, como a falta de ingredientes essenciais para a preparação dos pratos, atrasos nos pedidos dos clientes, erros no controle de pedidos e pagamentos, além de falhas na gestão do caixa.

Essas falhas pontuais, ao longo do tempo, podem se transformar em uma grande "bola de neve", resultando em consequências sérias, como a perda de clientes fiéis, dificuldade em atrair novos clientes, um ambiente de trabalho conflituoso e uma gestão financeira ineficiente, que pode até mesmo levar à falência do estabelecimento.
### 3.2. Descrição geral da proposta de solução

O desenvolvimento de um software para gestão de restaurantes visa automatizar e otimizar os principais processos operacionais essenciais, como gestão financeira, Conteole estoque, mesas, vendas e pagamentos. Com o desenvolvimento desse sistema buscamos como principal objetivo aumentar a eficiência e controle das diversas áreas do negócio, alinhando-se às estratégias de crescimento sustentável do restaurante.

Com a automatização da gestão de estoque e finanças, o software proporcionará uma visão mais precisa e geral dos recursos, facilitando decisões acertivas. Além disso, a gestão eficiente de mesas e vendas, junto com opções de pagamento mais ágeis, promete melhorar a experiência do cliente, aumentando a satisfação e a fidelidade com o restaurante.

Embora o projeto enfrente alguns desafios como a complexidade da integração de diversas e distintas funcionalidades, a necessidade de adaptação da equipe, com treinamentos para a utilização do software, e os custos iniciais, esses obstáculos podem ser superados com um planejamento cuidadoso. A modularidade e escalabilidade do sistema permitirão seu crescimento e integração com outras funcionalidadese sistemas, ampliando suas atividades e melhorando a operação do restaurante em diversos mercados.

### 3.3. Modelagem dos processos

[PROCESSO 1 - Gestão de Estoque](processo-1-gestão-de-estoque.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Gestão de Venda](processo-2-gestao-de-vendas.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Pagamento](processo-3-gestão-de-pagamento.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Gestão Financeira](processo-4-gestão-financeira.md "Detalhamento do Processo 4.")


## 4. Projeto da solução

_O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas duas seções que descrevem, respectivamente: modelo relacional e tecnologias._

[Projeto da solução](solution-design.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")


## 5. Indicadores de desempenho

_O documento a seguir apresenta os indicadores de desempenho dos processos._

[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema

_A sessão a seguir apresenta a descrição do produto de software desenvolvido._ 

[Documentação da interface do sistema](interface.md)

## 7. Conclusão

### Conclusão

O desenvolvimento do **Restaurant Management System (RMS)** apresentou-se como uma solução inovadora e eficiente para os desafios enfrentados pelos restaurantes no mercado atual. Ao longo do trabalho, conseguimos implementar funcionalidades capazes de otimizar o controle de estoque, melhorar a comunicação interna entre as equipes e automatizar processos financeiros. Essas funcionalidades não apenas proporcionam maior eficiência operacional, mas também contribuem para uma experiência mais satisfatória aos clientes, promovendo a fidelização e a sustentabilidade do negócio.

Os resultados obtidos com a modelagem e a implementação inicial do sistema demonstraram que o **RMS** é capaz de resolver problemas críticos, como desperdícios, erros em pedidos e falhas na gestão financeira. Esses avanços foram alcançados através do uso de tecnologias modernas e de uma compreensão profunda das necessidades dos usuários, representados pelos perfis definidos no projeto.

Além disso, o trabalho em equipe foi fundamental para o sucesso do projeto. Cada integrante do grupo contribuiu de forma significativa para o alcance dos objetivos. **Arthur Henrique Teixeira e Silva Bacelete**, **Davi Benjamim Guimarães**, **Gabriel Reis Lebron de Oliveira**, **João Pedro Tavares e Amorim**, **Lucas José Lopes Ferreira** e **Mateus Rodrigues Costa** desempenharam papéis essenciais no planejamento, execução e validação das soluções propostas. A orientação e apoio dos professores **Michelle Hanne Soares de Andrade**, **Danilo Boechat Seufitelli** e **Alexandre Marques** também foram cruciais para o desenvolvimento do projeto.

Como reflexão final, destacamos que, apesar dos resultados positivos, o projeto oferece diversas possibilidades de expansão e aperfeiçoamento. Algumas sugestões para futuras linhas de estudo incluem:

1. **Integração com tecnologias IoT** para um controle ainda mais preciso do estoque e automação de processos de manutenção preventiva de equipamentos.

2. **Expansão para um ecossistema completo de gestão**, incluindo integração com plataformas de delivery e soluções para gestão de marketing.

Assim, acreditamos que o RMS pode continuar evoluindo e se consolidar como uma ferramenta indispensável para restaurantes que buscam excelência e competitividade em um mercado cada vez mais dinâmico.



# REFERÊNCIAS

_Como um projeto de software não requer revisão bibliográfica, a inclusão das referências não é obrigatória. No entanto, caso você deseje incluir referências relacionadas às tecnologias, padrões, ou metodologias que serão usadas no seu trabalho, relacione-as de acordo com a ABNT._

_Verifique no link abaixo como devem ser as referências no padrão ABNT:_

http://portal.pucminas.br/imagedb/documento/DOC_DSC_NOME_ARQUI20160217102425.pdf

**[1.1]** - _ELMASRI, Ramez; NAVATHE, Sham. **Sistemas de banco de dados**. 7. ed. São Paulo: Pearson, c2019. E-book. ISBN 9788543025001._

**[1.2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[1.3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._



# APÊNDICES


_Atualizar os links e adicionar novos links para que a estrutura do código esteja corretamente documentada._


## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/)


[Vídeo da apresentação final](video/)






