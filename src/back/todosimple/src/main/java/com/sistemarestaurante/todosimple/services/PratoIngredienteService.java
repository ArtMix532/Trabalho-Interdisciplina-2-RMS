package com.sistemarestaurante.todosimple.services;

import com.sistemarestaurante.todosimple.models.PratoIngrediente;
import com.sistemarestaurante.todosimple.repositories.PratoIngredienteRepository;
import com.sistemarestaurante.todosimple.models.Prato;
import com.sistemarestaurante.todosimple.models.Alimento;
import com.sistemarestaurante.todosimple.repositories.PratoRepository;
import com.sistemarestaurante.todosimple.repositories.AlimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import javax.persistence.EntityNotFoundException;

@Service
public class PratoIngredienteService {

    @Autowired
    private PratoIngredienteRepository pratoIngredienteRepository;

    @Autowired
    private PratoRepository pratoRepository;

    @Autowired
    private AlimentoRepository alimentoRepository;

    public List<PratoIngrediente> findAll() {
        return pratoIngredienteRepository.findAll();
    }

    public PratoIngrediente findById(Long id) {
        return pratoIngredienteRepository.findById(id)
            .orElseThrow(null);
    }

    @Transactional
    public PratoIngrediente create(Long pratoId, String nomeIngrediente, Double quantidade) {
        Prato prato = pratoRepository.findById(pratoId)
            .orElseThrow(null);
        Alimento alimento = alimentoRepository.findByNome(nomeIngrediente)
            .orElseThrow(null);

        PratoIngrediente pratoIngrediente = new PratoIngrediente();
        pratoIngrediente.setPrato(prato);
        pratoIngrediente.setAlimento(alimento);
        pratoIngrediente.setQuantidade(quantidade);

        return pratoIngredienteRepository.save(pratoIngrediente);
    }

   @Transactional
public PratoIngrediente update(long id, Double novaQuantidade) {
    // Busca o PratoIngrediente pelo nome
    PratoIngrediente pratoIngrediente = pratoIngredienteRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("PratoIngrediente não encontrado com nome: " + id));
    
    pratoIngrediente.setQuantidade(novaQuantidade);
  
    return pratoIngredienteRepository.save(pratoIngrediente);
}

    @Transactional
    public void deleteById(Long id) {
        PratoIngrediente pratoIngrediente = findById(id);
            pratoIngredienteRepository.delete(pratoIngrediente);
    }
}