package com.sistemarestaurante.todosimple.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.sistemarestaurante.todosimple.models.Prato;


@Repository
public interface PratoRepository extends JpaRepository<Prato, Long> {
    Optional<Prato> findByNome(String nome);
    void deleteByNome(String nome);
    boolean existsByNome(String nome);
}