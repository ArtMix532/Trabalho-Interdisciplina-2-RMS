package com.sistemarestaurante.todosimple.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.sistemarestaurante.todosimple.models.Pagamento;


@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    boolean existsById(Long id_pagamento);
}
