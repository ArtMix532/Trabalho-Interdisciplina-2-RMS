### 3.3.1 Processo 2 – Gestao de Vendas

O processo de Gestão de Vendas, representado através do BPMN, visa otimizar o tempo e automatizar o processo de vendas do restaurante. O processo é dividido em duas etapas principais: Abrir comanda ou selecionar a comanda e adicionar pratos.

![ Modelo BPMN do PROCESSO 1](images/gestãodevendasDiagrama-3.png
)


**Abrir Comanda**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Comanda         | Número           | ID's únicos    |        0           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Gerar comanda        | Abrir comanda                   |                   |


**Visualizar cardápio**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Itens           | Texto           | ---            |                   |
| Preço           | Número           | ---            |  0.00             |
| Quantidade      | Número           | Qtd. no estoque|  0                |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Ver cardápio         | Visualizar cardápio            |                   |

**Adicionar/remover produto**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Produto         | Seleção múltipla          | Selecionar apenas produtos disponíveis |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Adicionar            | Adicionar produto              |                   |
| Remover              | Remover produto                |                   |

**Contabilizar produtos**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Qtd. por unidade| Número           | ---            | 0                 |
| Qtd. por kg     | Número           | Pratos à la carte  | 0                 |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Registrar quantidade | Contabilizar produtos          |                   |

**Efetuar pedido**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Efetuar pedido  | Seleção única    | ---            | ---                |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Pedido efetuado      | Efetuar pedido                 |                   |

**Atualizar estoque**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|  Dar baixa no estoque | Seleção única    | ---            | ---                |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Pedido efetuado      | Efetuar pedido                 |                   |
