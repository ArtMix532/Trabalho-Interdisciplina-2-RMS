package com.sistemarestaurante.todosimple.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = Funcionario.TABLE_NAME)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Funcionario {
    public static final String TABLE_NAME = "funcionario";

    public interface CreateFuncionario {
    }

    public interface UpdateFuncionario {
    }

    @Id
    @Column(name = "id_fun", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_fun;

    @Column(name = "cargo", length = 50, nullable = false)
    @Size(min = 1, max = 50)
    @NotNull(groups = CreateFuncionario.class)
    @NotEmpty(groups = CreateFuncionario.class)
    private String cargo;

    @Column(name = "salario", nullable = false)
    @NotNull
    private Double salario;

    @Column(name = "quantidade", nullable = false)
    @NotNull
    private double quantidade;

    public Long getId_fun() {
        return this.id_fun;
    }

    public void setId_fun(Long id_fun) {
        this.id_fun = id_fun;
    }

    public String getCargo() {
        return this.cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Double getSalario() {
        return this.salario;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }

    public Integer getQuantidade() {
        return (int) this.quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}