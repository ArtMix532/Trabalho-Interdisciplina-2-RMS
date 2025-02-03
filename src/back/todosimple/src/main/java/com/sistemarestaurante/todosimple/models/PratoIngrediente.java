package com.sistemarestaurante.todosimple.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "Prato_Ingrediente")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PratoIngrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prato_id", nullable = false)
    @JsonBackReference 
    private Prato prato;

    @ManyToOne
    @JoinColumn(name = "alimento_id", nullable = false)
    private Alimento alimento;
    
    @Column(name = "quantidade", nullable = false)
    @NotNull
    private Double quantidade;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Prato getPrato() {
        return this.prato;
    }

    public void setPrato(Prato prato) {
        this.prato = prato;
    }

    public Alimento getAlimento() {
        return this.alimento;
    }

    public void setAlimento(Alimento alimento) {
        this.alimento = alimento;
    }

    public Double getQuantidade() {
        return this.quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

}