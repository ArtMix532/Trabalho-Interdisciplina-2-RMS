package com.sistemarestaurante.todosimple.services;
import java.util.List;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sistemarestaurante.todosimple.models.Pagamento;
import com.sistemarestaurante.todosimple.repositories.PagamentoRepository;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    public Pagamento findById(Long id_pagamento) {
        return pagamentoRepository.findById(id_pagamento)
                .orElseThrow(() -> new EntityNotFoundException("Pagamento com ID " + id_pagamento + " não encontrado."));
    }

    @Transactional
    public Pagamento create(Pagamento pagamento) {
        pagamento.setId_pagamento(null);
        return pagamentoRepository.save(pagamento);
    }

    @Transactional
public Pagamento updateById(Pagamento pagamento, Long id_pagamento) {
    Pagamento existingPagamento = pagamentoRepository.findById(id_pagamento)
            .orElseThrow(() -> new EntityNotFoundException("Pagamento com ID " + id_pagamento + " não encontrado."));

    existingPagamento.setComanda(pagamento.getComanda());
    existingPagamento.setValor(pagamento.getValor());
    existingPagamento.setMetodoPagamento(pagamento.getMetodoPagamento());
    existingPagamento.setDataPagamento(pagamento.getDataPagamento());

    return pagamentoRepository.save(existingPagamento);
}

    @Transactional
    public void deleteById(Long id_pagamento) {
        if (!pagamentoRepository.existsById(id_pagamento)) {
            throw new EntityNotFoundException("Pagamento com ID " + id_pagamento + " não encontrado.");
        }
        pagamentoRepository.deleteById(id_pagamento);
    }

    public List<Pagamento> getAll() {
        return pagamentoRepository.findAll();
    }
}