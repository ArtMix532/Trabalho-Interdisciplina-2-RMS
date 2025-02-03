package com.sistemarestaurante.todosimple.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import com.sistemarestaurante.todosimple.services.RestauranteService;
import com.sistemarestaurante.todosimple.models.Restaurante;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/restaurante")
@Validated
public class RestauranteController {

    @Autowired
    private RestauranteService restauranteService;

    @GetMapping("/id/{id_restaurante}")
    public ResponseEntity<Restaurante> findById(@PathVariable Long id_restaurante) {
        Restaurante restaurante = this.restauranteService.findById(id_restaurante);
        return ResponseEntity.ok().body(restaurante);
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<Restaurante> findByNome(@PathVariable String nome) {
        Optional<Restaurante> restaurante = restauranteService.findByNome(nome);
        return restaurante.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody Restaurante restaurante) {
        this.restauranteService.create(restaurante);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(restaurante.getId_restaurante()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{nome}")
    public ResponseEntity<Void> update(@Valid @RequestBody Restaurante restaurante, @PathVariable String nome) {
        restaurante.setNomeRestaurante(nome);
        this.restauranteService.updateByNome(restaurante, nome);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{nome}")
    public ResponseEntity<Void> delete(@PathVariable String nome) {
        this.restauranteService.deleteByNome(nome);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Restaurante>> getAll() {
        List<Restaurante> restaurantes = restauranteService.getAll();
        return ResponseEntity.ok(restaurantes);
    }
}
