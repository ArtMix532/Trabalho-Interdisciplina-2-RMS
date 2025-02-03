package com.sistemarestaurante.todosimple.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sistemarestaurante.todosimple.repositories.AlimentoRepository;
import com.sistemarestaurante.todosimple.repositories.PratoIngredienteRepository;
import com.sistemarestaurante.todosimple.models.Alimento;
import com.sistemarestaurante.todosimple.models.PratoIngrediente;

@Service
public class AlimentoService {

    @Autowired
    private AlimentoRepository alimentoRepository;

    @Autowired
    private PratoIngredienteRepository pratoIngredienteRepository;

    public Alimento findById(Integer id_ingrediente) {
        return alimentoRepository.findById(id_ingrediente).orElse(null); 
    }
    public Optional<Alimento> findByNome(String nome) {
        return alimentoRepository.findByNome(nome);
    }

    @Transactional
    public Alimento create(Alimento obj) {
        if (alimentoRepository.existsByNome(obj.getNome())) {
            throw new IllegalArgumentException("Já existe um prato com este nome: " + obj.getNome());
        }
        obj.setId_ingrediente(null);
        return this.alimentoRepository.save(obj);
    }

    @Transactional
public Alimento update(Alimento obj, String nome) {
    Alimento newAlimento = alimentoRepository.findByNome(nome)
            .orElseThrow(() -> new EntityNotFoundException("Alimento não encontrado com o nome: " + nome));
    newAlimento.setNome(obj.getNome()); 
    newAlimento.setMedida(obj.getMedida());
    newAlimento.setCategoria(obj.getCategoria());
    newAlimento.setQuantidade(obj.getQuantidade());
    
    return this.alimentoRepository.save(newAlimento);
}


@Transactional
public Alimento updateQuantidade(String nome, int quantidade) {
    Alimento alimento = alimentoRepository.findByNome(nome)
            .orElseThrow(() -> new EntityNotFoundException("Alimento não encontrado com o nome: " + nome));
    alimento.setQuantidade(quantidade);
    
    return alimentoRepository.save(alimento);
} 

     @Transactional
    public void delete(String nome) {
        Alimento alimento = alimentoRepository.findByNome(nome)
                .orElseThrow(() -> new EntityNotFoundException("Alimento não encontrado: " + nome));

        List<PratoIngrediente> ingredientes = pratoIngredienteRepository.findByAlimento(alimento);
        for (PratoIngrediente ingrediente : ingredientes) {
            pratoIngredienteRepository.delete(ingrediente);
        }

        alimentoRepository.delete(alimento);
    }
    
     public List<Alimento> getAll() {
        return alimentoRepository.findAll();
    }
    
}
