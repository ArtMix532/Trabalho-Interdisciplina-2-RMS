package com.sistemarestaurante.todosimple.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.sistemarestaurante.todosimple.models.Restaurante;


@Repository
public interface RestauranteRepository extends JpaRepository<Restaurante, Long> {
    Optional<Restaurante> findByNomeRestaurante(String nomeRestaurante);
}