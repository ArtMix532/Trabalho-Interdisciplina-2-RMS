package com.sistemarestaurante.todosimple.controllers;
import com.sistemarestaurante.todosimple.models.Prato;
import com.sistemarestaurante.todosimple.services.PratoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/prato")
@Validated
public class PratoController {

    @Autowired
    private PratoService pratoService;

    @GetMapping("/{id}")
    public ResponseEntity<Prato> findById(@PathVariable Long id) {
        Prato prato = this.pratoService.findById(id);
        return ResponseEntity.ok().body(prato);
    }

    @PostMapping
    @Validated(Prato.CreatePrato.class)
    public ResponseEntity<Void> create(@Valid @RequestBody Prato prato) {
        this.pratoService.create(prato);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(prato.getId_prato()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{nome}")
    @Validated(Prato.UpdatePrato.class)
    public ResponseEntity<Void> update(@PathVariable String nome, @Valid @RequestBody Prato prato) {
        Prato pratoAtualizado = this.pratoService.update(nome, prato);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(pratoAtualizado.getId_prato()).toUri();
        return ResponseEntity.created(uri).build();
    }
    

  
    @DeleteMapping("/{nome}")
    public ResponseEntity<Void> delete(@PathVariable String nome) {
        this.pratoService.delete(nome);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/todos")
    public ResponseEntity<List<Prato>> getAll() {
        List<Prato> pratos = pratoService.getAll();
        return ResponseEntity.ok(pratos);
    }

        @PutMapping("/preco/{nome}")
public ResponseEntity<Void> update(@RequestBody Map<String, Double> precoMap, @PathVariable String nome) {
    Double preco = precoMap.get("preco");
    pratoService.updatePreco(nome, preco);
    return ResponseEntity.noContent().build();
}

    @PostMapping("/varios")
    @Validated(Prato.CreatePrato.class)
    public ResponseEntity<Void> createMultiple(@Valid @RequestBody List<Prato> pratos) {
        for (Prato prato : pratos) {
            this.pratoService.create(prato);
        }
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
        return ResponseEntity.created(uri).build();
    }
    }
