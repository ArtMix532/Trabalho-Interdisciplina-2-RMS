package com.sistemarestaurante.todosimple.services;

import com.sistemarestaurante.todosimple.models.Desperdicio;
import com.sistemarestaurante.todosimple.models.Alimento;
import com.sistemarestaurante.todosimple.repositories.DesperdicioRepository;
import com.sistemarestaurante.todosimple.repositories.AlimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class DesperdicioService {

    @Autowired
    private DesperdicioRepository desperdicioRepository;

    @Autowired
    private AlimentoRepository alimentoRepository;

    public List<Desperdicio> findAll() {
        return desperdicioRepository.findAll();
    }

    public Desperdicio findById(Long id) {
        return desperdicioRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Desperdicio não encontrado com id: " + id));
    }

    public List<Desperdicio> findByNomeAlimento(String nomeAlimento) {
        return desperdicioRepository.findByNomeAlimento(nomeAlimento);
    }

    @Transactional
public Desperdicio create(Desperdicio desperdicio) {
    
    Alimento alimento = alimentoRepository.findByNome(desperdicio.getAlimento().getNome())
            .orElseThrow(() -> new IllegalArgumentException("Alimento não encontrado."));
    
    if (alimento.getQuantidade() < desperdicio.getQuantidade()) {
        throw new IllegalArgumentException(
                "Quantidade insuficiente no estoque para o alimento: " + alimento.getNome());
    }

    alimento.setQuantidade(alimento.getQuantidade() - desperdicio.getQuantidade());
    
    alimentoRepository.save(alimento);
    
    desperdicio.setAlimento(alimento);
    
    return desperdicioRepository.save(desperdicio);
}

    @Transactional
    public Desperdicio update(Long id, String novoMotivo, Double novaQuantidade) {
        Desperdicio desperdicio = desperdicioRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Desperdicio não encontrado com id: " + id));

        desperdicio.setMotivo(novoMotivo);
        desperdicio.setQuantidade(novaQuantidade);

        return desperdicioRepository.save(desperdicio);
    }

    @Transactional
    public void deleteById(Long id) {
        Desperdicio desperdicio = findById(id);
        desperdicioRepository.delete(desperdicio);
    }
}
