package com.sistemarestaurante.todosimple.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = ItemPedido.TABLE_NAME)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ItemPedido {

    public interface CreateItemPedido {}
    public interface UpdateItemPedido {}

    public static final String TABLE_NAME = "item_pedido";

    @Id
    @Column(name="id_pedido", unique=true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_pedido;

    @Column(name = "status", nullable = false)
    @NotBlank
    @NotNull
    private String status;

    @Column(name = "quantidade", nullable = false)
    @NotNull
    private Integer quantidade; 

    @Column(name = "preco", nullable = false)
    @NotNull 
    @JsonIgnore
    private double preco;

    @ManyToOne
    @JoinColumn(name="id_prato", nullable = false) 
    private Prato prato;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="id_comanda", nullable = false)
    private Comanda comanda; 

    public Long getId_pedido() {
        return this.id_pedido;
    }

    public void setId_pedido(Long id_pedido) {
        this.id_pedido = id_pedido;
    }

    public String getStatus() {
        return this.status;
    }

    public double calcularPreco() {
        return this.quantidade * this.prato.getPreco();
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getQuantidade() {
        return this.quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public void setPreco(double preco) {
        this.preco = preco; 
    }

    public Prato getPrato() {
        return this.prato;
    }

    public void setPrato(Prato prato) {
        this.prato = prato;
    }

    public Comanda getComanda() {
        return this.comanda;
    }

    public void setComanda(Comanda comanda) {
        this.comanda = comanda;
    }

}
