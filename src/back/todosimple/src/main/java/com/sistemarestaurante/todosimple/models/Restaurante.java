package com.sistemarestaurante.todosimple.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = Restaurante.TABLE_NAME)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Restaurante {
    public static final String TABLE_NAME = "restaurante";

    @Id
    @Column(name = "id_restaurante", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_restaurante;

    @Column(name = "nome_restaurante", length = 100, nullable = false)
    @Size(min = 1, max = 100)
    @NotBlank
    private String nomeRestaurante;

    @Column(name = "telefone", length = 15, nullable = false) 
    @NotBlank
    private String telefone; 

 
}
