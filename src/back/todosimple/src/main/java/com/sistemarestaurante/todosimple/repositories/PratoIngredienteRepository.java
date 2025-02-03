package com.sistemarestaurante.todosimple.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import com.sistemarestaurante.todosimple.models.Alimento;
import com.sistemarestaurante.todosimple.models.PratoIngrediente;

@Repository
public interface PratoIngredienteRepository extends JpaRepository<PratoIngrediente, Long> {
     Optional<PratoIngrediente> findById(Long id);
     List<PratoIngrediente> findByAlimento(Alimento alimento);
}