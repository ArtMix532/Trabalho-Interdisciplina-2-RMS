package com.sistemarestaurante.todosimple.repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sistemarestaurante.todosimple.models.Alimento;

@Repository
public interface AlimentoRepository extends JpaRepository<Alimento, Integer> {
    Optional<Alimento> findByNome(String nome);
    Optional<Alimento> deleteByNome(String nome);
    boolean existsByNome(String nome);
}
