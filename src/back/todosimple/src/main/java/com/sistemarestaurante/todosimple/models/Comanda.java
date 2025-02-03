package com.sistemarestaurante.todosimple.models;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Entity
@Table(name = Comanda.TABLE_NAME)
@NoArgsConstructor
@AllArgsConstructor
public class Comanda {

    public interface CreateComanda {
    }
    public interface UpdateComanda {
    }

    public static final String TABLE_NAME = "comanda";

    @Id
    @Column(name = "id_comanda", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_comanda;

    @Column(name = "data", nullable = false)
    @NotNull(groups = CreateComanda.class)
    private String data;

    @Column(name = "nome", nullable = false)
    @NotBlank(groups = CreateComanda.class)
    private String nome;

    @Column(name = "status", nullable = false)
    @NotBlank(groups = CreateComanda.class)
    private String status;

    @OneToMany(mappedBy = "comanda", cascade = CascadeType.ALL, fetch = FetchType.LAZY,orphanRemoval = true)
    @JsonManagedReference
    private List<ItemPedido> itensPedido = new ArrayList<>();

    public Long getId_comanda() {
        return this.id_comanda;
    }

    public void setId_comanda(Long id_comanda) {
        this.id_comanda = id_comanda;
    }

    public String getData() {
        return this.data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ItemPedido> getItensPedido() {
        return this.itensPedido;
    }

    public void setItensPedido(List<ItemPedido> itensPedido) {
        this.itensPedido = itensPedido;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }


}