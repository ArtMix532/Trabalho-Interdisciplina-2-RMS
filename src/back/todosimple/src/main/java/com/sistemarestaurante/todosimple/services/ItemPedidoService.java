package com.sistemarestaurante.todosimple.services;

import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.transaction.annotation.Transactional;

import com.sistemarestaurante.todosimple.repositories.ItemPedidoRepository;
import com.sistemarestaurante.todosimple.repositories.PratoRepository;
import com.sistemarestaurante.todosimple.repositories.AlimentoRepository;
import com.sistemarestaurante.todosimple.repositories.ComandaRepository;
import com.sistemarestaurante.todosimple.models.Alimento;
import com.sistemarestaurante.todosimple.models.Comanda;
import com.sistemarestaurante.todosimple.models.ItemPedido;
import com.sistemarestaurante.todosimple.models.Prato;

@Service
public class ItemPedidoService {
    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private PratoRepository pratoRepository;

    @Autowired
    private ComandaRepository comandaRepository;

     @Autowired
    private AlimentoRepository alimentoRepository;

    @Transactional
public ItemPedido create(ItemPedido itemPedido) {
    if (itemPedido.getComanda() == null || itemPedido.getComanda().getId_comanda() == null) {
        throw new IllegalArgumentException("O ItemPedido precisa ter uma comanda associada.");
    }

    Prato prato = pratoRepository.findById(itemPedido.getPrato().getId_prato())
            .orElseThrow(() -> new EntityNotFoundException(
                    "Prato não encontrado com ID: " + itemPedido.getPrato().getId_prato()));

    itemPedido.setPrato(prato);

    Comanda comanda = comandaRepository.findById(itemPedido.getComanda().getId_comanda())
            .orElseThrow(() -> new EntityNotFoundException(
                    "Comanda não encontrada com ID: " + itemPedido.getComanda().getId_comanda()));

    itemPedido.setComanda(comanda);

    double precoTotal = itemPedido.getQuantidade() * prato.getPreco();
    itemPedido.setPreco(precoTotal);

    
    prato.getIngredientes().forEach(ingrediente -> {
        Alimento alimento = ingrediente.getAlimento();
        double quantidadeNecessaria = ingrediente.getQuantidade() * itemPedido.getQuantidade();

        if (alimento.getQuantidade() < quantidadeNecessaria) {
            throw new IllegalArgumentException(
                    "Estoque insuficiente para o alimento: " + alimento.getNome() +
                    " no prato: " + prato.getNome());
        }

        alimento.setQuantidade(alimento.getQuantidade() - quantidadeNecessaria);
        alimentoRepository.save(alimento);  
    });

    return itemPedidoRepository.save(itemPedido);
}

    

    @Transactional
    public ItemPedido update(long id_prato, Integer novaQuantidade) {
        ItemPedido itemPedido = itemPedidoRepository.findById(id_prato)
                .orElseThrow(() -> new EntityNotFoundException("itemPedido não encontrado com nome: " + id_prato));

        itemPedido.setQuantidade(novaQuantidade);

        return itemPedidoRepository.save(itemPedido);
    }

    public ItemPedido findById(Long id_pedido) {
        return itemPedidoRepository.findById(id_pedido)
                .orElseThrow(() -> new EntityNotFoundException("Item Pedido não encontrado: " + id_pedido));
    }
    
    @Transactional(readOnly = true)
public List<ItemPedido> findAll() {
    return itemPedidoRepository.findAll();
}
}
