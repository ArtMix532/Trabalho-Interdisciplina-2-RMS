package com.sistemarestaurante.todosimple.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sistemarestaurante.todosimple.models.Desperdicio;
import java.util.List; 

@Repository
public interface DesperdicioRepository extends JpaRepository<Desperdicio, Long> {
    @Query("SELECT d FROM Desperdicio d WHERE LOWER(d.alimento.nome) LIKE LOWER(CONCAT('%', :nomeAlimento, '%'))")
    List<Desperdicio> findByNomeAlimento(@Param("nomeAlimento") String nomeAlimento);
}