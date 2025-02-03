package com.sistemarestaurante.todosimple.models;

import java.util.List;

import javax.persistence.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = Alimento.TABLE_NAME)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Alimento {

    public interface CreateAlimento {
    }

    public interface UpdateAlimento {
    }

    public static final String TABLE_NAME = "alimento";

    @Id
    @Column(name = "id_ingrediente", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_ingrediente;

    @Column(name = "nome", length = 100, nullable = false, unique = true)
    @Size(min = 1, max = 100)
    @NotNull(groups = CreateAlimento.class)
    @NotEmpty(groups = CreateAlimento.class)
    private String nome;

    @Column(name = "categoria", length = 100, nullable = false)
    @Size(min = 1, max = 100)
    @NotNull(groups = CreateAlimento.class)
    @NotEmpty(groups = CreateAlimento.class)
    private String categoria;


    @Column(name = "medida", length = 50, nullable = false)
    @Size(min = 1, max = 50)
    @NotNull(groups = CreateAlimento.class)
    @NotEmpty(groups = CreateAlimento.class)
    private String medida;

    @Column(name = "quantidade", nullable = false)
    private double quantidade;

    @OneToMany(mappedBy = "alimento")
    @JsonIgnore
    private List<PratoIngrediente> pratos;


    public Integer getId_ingrediente() {
        return this.id_ingrediente;
    }
    public void setId_ingrediente(Integer id_ingrediente) {
        this.id_ingrediente = id_ingrediente;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getMedida() {
        return this.medida;
    }

    public void setMedida(String medida) {
        this.medida = medida;
    }

    public double getQuantidade() {
        return this.quantidade;
    }

    public void setQuantidade(double quantidade) {
        this.quantidade = quantidade;
    }


    public String getCategoria() {
        return this.categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public List<PratoIngrediente> getPratos() {
        return this.pratos;
    }

    public void setPratos(List<PratoIngrediente> pratos) {
        this.pratos = pratos;
    }



}
