package com.sistemarestaurante.todosimple.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sistemarestaurante.todosimple.models.Comanda;
import com.sistemarestaurante.todosimple.services.ComandaService;

@RestController
@RequestMapping("/comanda")
public class ComandaController {

    @Autowired
    private ComandaService comandaService;

    @GetMapping("/{id}")
    public ResponseEntity<Comanda> findById(@PathVariable Long id) {
        Comanda comanda = this.comandaService.findById(id);
        return ResponseEntity.ok().body(comanda);
    }

    @PostMapping
@Validated(Comanda.CreateComanda.class)
public ResponseEntity<Comanda> createComanda(@Valid @RequestBody Comanda comanda) {
    Comanda novaComanda = comandaService.createComanda(comanda);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}").buildAndExpand(novaComanda.getId_comanda()).toUri();

    // Retorne a comanda criada para que o cliente possa ler os dados
    return ResponseEntity.created(uri).body(novaComanda);
}
     @GetMapping("/todos")
    public ResponseEntity<List<Comanda>> getAll() {
        List<Comanda> comanda = comandaService.getAll();
        return ResponseEntity.ok(comanda);
    }
    
    @PutMapping("/{id}")
    @Validated(Comanda.UpdateComanda.class)
    public ResponseEntity<Void> update(@PathVariable Long id, @Valid @RequestBody Comanda comanda) {
        Comanda comandaAtualizada = this.comandaService.update(id, comanda);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(comandaAtualizada.getId_comanda()).toUri();
        return ResponseEntity.created(uri).build();
    }
  

}