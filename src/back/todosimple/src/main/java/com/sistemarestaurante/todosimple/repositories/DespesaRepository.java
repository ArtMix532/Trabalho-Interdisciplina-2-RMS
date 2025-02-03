package com.sistemarestaurante.todosimple.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


import org.springframework.stereotype.Repository;

import com.sistemarestaurante.todosimple.models.Despesa;

@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {
    Optional<Despesa> findById(Long id_despesa);
}
