package com.sistemarestaurante.todosimple.models;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Entity
@Table(name = Despesa.TABLE_NAME)
@NoArgsConstructor
@AllArgsConstructor
public class Despesa {

    public interface CreateDespesa {
    }
    public interface UpdateDespesa {
    }

    public static final String TABLE_NAME = "despesa";

    @Id
    @Column(name = "id_despesa", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_despesa;

    @Column(name = "data", nullable = false)
    @NotNull(groups = CreateDespesa.class)
    private String data;

    @Column(name = "motivo", nullable = false)
    @NotBlank(groups = CreateDespesa.class)
    private String motivo;

    @Column(name = "valor", nullable = false)
    @NotBlank(groups = CreateDespesa.class)
    private Long valor;

    public Long getId_despesa() {
        return this.id_despesa;
    }

    public void setId_despesa(Long id_despesa) {
        this.id_despesa = id_despesa;
    }

    public String getData() {
        return this.data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getMotivo() {
        return this.motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public Long getValor() {
        return this.valor;
    }

    public void setValor(Long valor) {
        this.valor = valor;
    }

}