package com.sistemarestaurante.todosimple.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sistemarestaurante.todosimple.models.Pagamento;
import com.sistemarestaurante.todosimple.services.PagamentoService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;



@RestController
@RequestMapping("/pagamento")
@Validated
public class PagamentoController {

    @Autowired
    private PagamentoService pagamentoService;

    @GetMapping("/id/{id_pagamento}")
    public ResponseEntity<Pagamento> findById(@PathVariable Long id_pagamento) {
        Pagamento pagamento = this.pagamentoService.findById(id_pagamento);
        return ResponseEntity.ok().body(pagamento);
    }

    @PostMapping
    @Validated(Pagamento.CreatePagamento.class)
    public ResponseEntity<Void> create(@Valid @RequestBody Pagamento pagamento) {
        this.pagamentoService.create(pagamento);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(pagamento.getId_pagamento()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/id/{id_pagamento}")
    @Validated(Pagamento.UpdatePagamento.class)
    public ResponseEntity<Void> update(@Valid @RequestBody Pagamento pagamento, @PathVariable Long id_pagamento) {
        this.pagamentoService.updateById(pagamento, id_pagamento);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/id/{id_pagamento}")
    public ResponseEntity<Void> delete(@PathVariable Long id_pagamento) {
        this.pagamentoService.deleteById(id_pagamento);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/varios")
    @Validated(Pagamento.CreatePagamento.class)
    public ResponseEntity<Void> createMultiple(@Valid @RequestBody List<Pagamento> pagamentos) {
        for (Pagamento pagamento : pagamentos) {
            this.pagamentoService.create(pagamento);
        }
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Pagamento>> getAll() {
        List<Pagamento> pagamentos = pagamentoService.getAll();
        return ResponseEntity.ok(pagamentos);
    }
}
