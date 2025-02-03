package com.sistemarestaurante.todosimple.services;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;


import com.sistemarestaurante.todosimple.repositories.ComandaRepository;

import com.sistemarestaurante.todosimple.repositories.PratoRepository;
import com.sistemarestaurante.todosimple.models.Comanda;
import com.sistemarestaurante.todosimple.models.ItemPedido;
import com.sistemarestaurante.todosimple.models.Prato;


@Service
public class ComandaService {
    @Autowired
    private ComandaRepository comandaRepository;



    @Autowired
    private PratoRepository pratoRepository; 


    public Comanda findById(Long id_comanda) {
        return comandaRepository.findById(id_comanda)
                .orElseThrow(() -> new EntityNotFoundException("comanda não encontrado com ID: " + id_comanda));
    }

    @Transactional
public Comanda createComanda(@RequestBody Comanda comanda) {
    if (comanda == null) {
        throw new IllegalArgumentException("Comanda não pode ser null.");
    }

    for (ItemPedido item : comanda.getItensPedido()) {
        if (item.getPrato() != null && item.getPrato().getNome() != null) {
            Prato prato = pratoRepository.findByNome(item.getPrato().getNome())
                    .orElseThrow(() -> new EntityNotFoundException("Prato não encontrado: " + item.getPrato().getNome()));
            
            item.setPrato(prato);
            item.setComanda(comanda);  // Garantindo que a Comanda é associada.
        }
    }

    return comandaRepository.save(comanda);
}

    @Transactional
public Comanda update(Long id, Comanda comandaAtualizada) {
    Comanda comandaExistente = comandaRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Comanda não encontrada com ID: " + id));
    comandaExistente.setStatus(comandaAtualizada.getStatus());

    for (ItemPedido itemAtualizado : comandaAtualizada.getItensPedido()) {
        if (itemAtualizado.getPrato() != null && itemAtualizado.getPrato().getId_prato() != null) {
            Prato prato = pratoRepository.findById(itemAtualizado.getPrato().getId_prato())
                    .orElseThrow(() -> new EntityNotFoundException("Prato não encontrado com ID: " + itemAtualizado.getPrato().getId_prato()));

            ItemPedido itemExistente = comandaExistente.getItensPedido().stream()
                    .filter(item -> item.getPrato().getId_prato().equals(prato.getId_prato()))
                    .findFirst()
                    .orElse(null);

            if (itemExistente != null) {
                itemExistente.setStatus(itemAtualizado.getStatus() != null ? itemAtualizado.getStatus() : itemExistente.getStatus());
            } else {
                ItemPedido novoItem = new ItemPedido();
                novoItem.setStatus(itemAtualizado.getStatus() != null ? itemAtualizado.getStatus() : "Pendente"); 
                novoItem.setComanda(comandaExistente);

                comandaExistente.getItensPedido().add(novoItem); 
            }
        } else {
            throw new IllegalArgumentException("ItemPedido deve ter um prato com ID definido.");
        }
    }

    comandaExistente.getItensPedido().removeIf(itemExistente ->
            comandaAtualizada.getItensPedido().stream()
                    .noneMatch(itemAtualizado -> itemAtualizado.getPrato() != null &&
                                                  itemAtualizado.getPrato().getId_prato() != null &&
                                                  itemAtualizado.getPrato().getId_prato().equals(itemExistente.getPrato().getId_prato()))
    );

    return comandaRepository.save(comandaExistente);
}
public List<Comanda> getAll() {
    return comandaRepository.findAll();
}


}
