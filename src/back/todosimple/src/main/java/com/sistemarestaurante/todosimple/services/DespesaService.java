package com.sistemarestaurante.todosimple.services;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;


import com.sistemarestaurante.todosimple.repositories.DespesaRepository;
import com.sistemarestaurante.todosimple.models.Desperdicio;
import com.sistemarestaurante.todosimple.models.Despesa;


@Service
public class DespesaService {
    @Autowired
    private DespesaRepository despesaRepository;

    public Despesa findById(Long id_despesa) {
        return despesaRepository.findById(id_despesa)
                .orElseThrow(() -> new EntityNotFoundException("Despesa não encontrado com ID: " + id_despesa));
    }

    // Método para listar todas as despesas
    @Transactional(readOnly = true)
    public List<Despesa> findAll() {
        return despesaRepository.findAll();
    } 

    // Método para criar uma nova despesa
    @Transactional
    public Despesa createDespesa(Despesa despesa) {
        return despesaRepository.save(despesa);
    }

    public List<Despesa> getAllDespesas() {
        return despesaRepository.findAll();
    }

    // Método para atualizar uma despesa existente
    @Transactional
    public Despesa update(Long id_despesa, Despesa novaDespesa) {
        Despesa despesaExistente = findById(id_despesa);

        // Atualiza os campos permitidos
        despesaExistente.setData(novaDespesa.getData());
        despesaExistente.setMotivo(novaDespesa.getMotivo());
        despesaExistente.setValor(novaDespesa.getValor());

        return despesaRepository.save(despesaExistente);
    }

    @Transactional
public void deleteById(Long id) {
    if (!despesaRepository.existsById(id)) {
        throw new EntityNotFoundException("Despesa não encontrada com ID: " + id);
    }
    despesaRepository.deleteById(id);
}

}

