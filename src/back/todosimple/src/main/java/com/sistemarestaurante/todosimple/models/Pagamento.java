package com.sistemarestaurante.todosimple.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = Pagamento.TABLE_NAME)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Pagamento {

    public interface CreatePagamento {}
    public interface UpdatePagamento {}

    public static final String TABLE_NAME = "pagamento";

    @Id
    @Column(name = "id_pagamento", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_pagamento;  
    
    @ManyToOne
    @JoinColumn(name = "id_comanda", nullable = false)
    @NotNull(groups = CreatePagamento.class)
    private Comanda comanda;

    @Column(name = "valor", nullable = false)
    @NotNull(groups = CreatePagamento.class)
    private Double valor;

    @Column(name = "metodo_pagamento", nullable = false)
    @NotNull(groups = CreatePagamento.class)
    private String metodoPagamento;

    @Column(name = "data_pagamento", nullable = false)
    @NotNull(groups = CreatePagamento.class)
    private Date dataPagamento;
    
        public Long getId_pagamento() {
            return this.id_pagamento;
        }
    
        public void setId_pagamento(Long id_pagamento) {
            this.id_pagamento = id_pagamento;
        }
    
    
        public Comanda getComanda() {
            return this.comanda;
        }
    
        public void setComanda(Comanda comanda) {
            this.comanda = comanda;
        }
    
        public Double getValor() {
            return this.valor;
        }
    
        public void setValor(Double valor) {
            this.valor = valor;
        }
    
        public String getMetodoPagamento() {
            return this.metodoPagamento;
        }
    
        public void setMetodoPagamento(String metodoPagamento) {
            this.metodoPagamento = metodoPagamento;
        }
    
        public Date getDataPagamento() {
            return this.dataPagamento;
        }
    
        public void setDataPagamento(Date dataPagamento) {
            this.dataPagamento = dataPagamento;
        }
    }

    
