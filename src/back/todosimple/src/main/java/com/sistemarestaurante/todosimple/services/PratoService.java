package com.sistemarestaurante.todosimple.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import com.sistemarestaurante.todosimple.repositories.AlimentoRepository;
import com.sistemarestaurante.todosimple.repositories.PratoIngredienteRepository;
import com.sistemarestaurante.todosimple.repositories.PratoRepository;
import com.sistemarestaurante.todosimple.models.Alimento;
import com.sistemarestaurante.todosimple.models.Prato;
import com.sistemarestaurante.todosimple.models.PratoIngrediente;

import java.util.List;

import javax.persistence.EntityNotFoundException;

@Service
public class PratoService {

    @Autowired
    private PratoRepository pratoRepository;

    @Autowired
    private AlimentoRepository alimentoRepository;
    
    @Autowired
    private PratoIngredienteRepository pratoIngredienteRepository;
    
    public Prato findById(Long id_prato) {
        return pratoRepository.findById(id_prato)
                .orElseThrow(() -> new EntityNotFoundException("Prato não encontrado com ID: " + id_prato));
    }

    @GetMapping
    public ResponseEntity<List<Prato>> getAllPratos() {
        List<Prato> pratos = pratoRepository.findAll();
        return ResponseEntity.ok(pratos);
    }

    @Transactional
    public Prato create(Prato prato) {

        if (pratoRepository.existsByNome(prato.getNome())) {
            throw new IllegalArgumentException("Já existe um prato com este nome: " + prato.getNome());
        }
        
        for (PratoIngrediente ingrediente : prato.getIngredientes()) {
            Alimento alimento = alimentoRepository.findByNome(ingrediente.getAlimento().getNome())
                    .orElseThrow(() -> new EntityNotFoundException("Alimento não encontrado"));

            // Configura o alimento existente no ingrediente
            ingrediente.setAlimento(alimento);

            // Configura o prato no ingrediente para garantir a relação bidirecional
            ingrediente.setPrato(prato);
        }
        return pratoRepository.save(prato);    
    }
    
    @Transactional
    public Prato update(String nome, Prato pratoAtualizado) {
        Prato pratoExistente = pratoRepository.findByNome(nome)
                .orElseThrow(() -> new EntityNotFoundException("Prato não encontrado com o nome: " + nome));

        pratoExistente.setNome(pratoAtualizado.getNome());
        pratoExistente.setStatus(pratoAtualizado.getStatus());
        pratoExistente.setPreco(pratoAtualizado.getPreco());
    
        for (PratoIngrediente ingredienteAtualizado : pratoAtualizado.getIngredientes()) {
            boolean ingredienteExistenteEncontrado = false;
    
            // Procura o ingrediente correspondente no prato existente
            for (PratoIngrediente ingredienteExistente : pratoExistente.getIngredientes()) {
                if (ingredienteExistente.getAlimento().getNome().equals(ingredienteAtualizado.getAlimento().getNome())) {
                   
                    ingredienteExistente.setQuantidade(ingredienteAtualizado.getQuantidade());
                    ingredienteExistenteEncontrado = true;
                    break;
                }
            }
            if (!ingredienteExistenteEncontrado) {
                Alimento alimento = alimentoRepository.findByNome(ingredienteAtualizado.getAlimento().getNome())
                        .orElseThrow(() -> new EntityNotFoundException("Alimento não encontrado: " + ingredienteAtualizado.getAlimento().getNome()));
                
                PratoIngrediente novoIngrediente = new PratoIngrediente();
                novoIngrediente.setAlimento(alimento);
                novoIngrediente.setQuantidade(ingredienteAtualizado.getQuantidade());
                novoIngrediente.setPrato(pratoExistente);
    
                pratoExistente.getIngredientes().add(novoIngrediente);
            }
        }
        // Remove ingredientes que não estão na lista atualizada
        pratoExistente.getIngredientes().removeIf(ingredienteExistente -> 
    pratoAtualizado.getIngredientes().stream().noneMatch(ingredienteAtualizado -> 
        ingredienteAtualizado.getAlimento().getNome().equals(ingredienteExistente.getAlimento().getNome()))
        );
    
        return pratoRepository.save(pratoExistente);
    }
    

    @Transactional
public void delete(String nome) {
    Prato prato = pratoRepository.findByNome(nome)
            .orElseThrow(() -> new EntityNotFoundException("Prato não encontrado com o nome: " + nome));

        for (PratoIngrediente ingrediente : prato.getIngredientes()) {
            ingrediente.setPrato(null); 
            pratoIngredienteRepository.delete(ingrediente); 
        }

    try {
        pratoRepository.delete(prato);
    } catch (Exception e) {
        throw new RuntimeException("Não é possível excluir o prato: " + e.getMessage());
    }
    
}
public List<Prato> getAll() {
    return pratoRepository.findAll();
}

@Transactional
public Prato updatePreco(String nome, Double preco) {
    Prato prato = pratoRepository.findByNome(nome)
            .orElseThrow(() -> new EntityNotFoundException("Alimento não encontrado com o nome: " + nome));
    prato.setPreco(preco);
    
    return pratoRepository.save(prato);
} 

}
