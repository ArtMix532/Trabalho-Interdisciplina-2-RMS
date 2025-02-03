package com.sistemarestaurante.todosimple.controllers;

import com.sistemarestaurante.todosimple.models.PratoIngrediente;
import com.sistemarestaurante.todosimple.services.PratoIngredienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pratoingredientes")
public class PratoIngredienteController {

    @Autowired
    private PratoIngredienteService pratoIngredienteService;

    @GetMapping
    public ResponseEntity<List<PratoIngrediente>> listarTodos() {
        List<PratoIngrediente> pratoIngredientes = pratoIngredienteService.findAll();
        return ResponseEntity.ok().body(pratoIngredientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PratoIngrediente> findById(@PathVariable Long id) {
        PratoIngrediente pratoIngrediente = pratoIngredienteService.findById(id);
        return ResponseEntity.ok().body(pratoIngrediente);
    }

    @PostMapping
    public ResponseEntity<PratoIngrediente> create(
            @RequestParam Long pratoId, 
            @RequestParam String nomeIngrediente, 
            @RequestParam Double quantidade) {

        PratoIngrediente pratoIngrediente = pratoIngredienteService.create(pratoId, nomeIngrediente, quantidade);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(pratoIngrediente.getId()).toUri();

        return ResponseEntity.created(uri).body(pratoIngrediente);
    }

    @PutMapping("/{id}")
public ResponseEntity<PratoIngrediente> update(
        @PathVariable long id, 
        @RequestParam Double novaQuantidade) {

    PratoIngrediente pratoIngrediente = pratoIngredienteService.update(id, novaQuantidade);
    return ResponseEntity.ok().body(pratoIngrediente);
}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPratoIngrediente(@PathVariable Long id) {
        pratoIngredienteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
