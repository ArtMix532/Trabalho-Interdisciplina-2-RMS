package com.sistemarestaurante.todosimple.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.sistemarestaurante.todosimple.models.Funcionario;


@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    Optional<Funcionario> findByCargo(String cargo);
    Optional<Funcionario> findById(Long id_fun);
}