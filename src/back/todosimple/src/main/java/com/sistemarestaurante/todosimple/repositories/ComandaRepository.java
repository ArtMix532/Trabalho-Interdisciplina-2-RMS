package com.sistemarestaurante.todosimple.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


import org.springframework.stereotype.Repository;

import com.sistemarestaurante.todosimple.models.Comanda;

@Repository
public interface ComandaRepository extends JpaRepository<Comanda, Long> {
    Optional<Comanda> findById(Long id_comanda);
}
