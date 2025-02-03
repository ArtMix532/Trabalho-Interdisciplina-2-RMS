package com.sistemarestaurante.todosimple.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sistemarestaurante.todosimple.models.ItemPedido;

import antlr.collections.List;

@Repository
public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {
}