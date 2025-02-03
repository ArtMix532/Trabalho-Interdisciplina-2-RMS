package com.sistemarestaurante.todosimple.controllers;

import com.sistemarestaurante.todosimple.models.Desperdicio;
import com.sistemarestaurante.todosimple.models.Funcionario;
import com.sistemarestaurante.todosimple.services.DesperdicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

@RestController
@RequestMapping("/desperdicio")
public class DesperdicioController {

    @Autowired
    private DesperdicioService desperdicioService;

    @GetMapping
    public ResponseEntity<List<Desperdicio>> listarTodos() {
        List<Desperdicio> desperdicios = desperdicioService.findAll();
        return ResponseEntity.ok().body(desperdicios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Desperdicio> findById(@PathVariable Long id) {
        Desperdicio desperdicio = desperdicioService.findById(id);
        return ResponseEntity.ok().body(desperdicio);
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<Desperdicio>> filtrarPorNomeAlimento(@RequestParam String nomeAlimento) {
        List<Desperdicio> desperdicios = desperdicioService.findByNomeAlimento(nomeAlimento);
        return ResponseEntity.ok().body(desperdicios);
    }

    @PostMapping
    public ResponseEntity<Desperdicio> create(@Valid @RequestBody Desperdicio desperdicio) {
    
        Desperdicio novoDesperdicio = desperdicioService.create(desperdicio);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(novoDesperdicio.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Desperdicio> update(
            @PathVariable Long id, 
            @RequestParam String novoMotivo, 
            @RequestParam Double novaQuantidade) {

        Desperdicio desperdicio = desperdicioService.update(id, novoMotivo, novaQuantidade);
        return ResponseEntity.ok().body(desperdicio);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarDesperdicio(@PathVariable Long id) {
     
        desperdicioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
     @PostMapping("/varios")
public ResponseEntity<?> createMultiple(@Valid @RequestBody List<Desperdicio> desperdicios) {
    List<Desperdicio> novosDesperdicios = new ArrayList<>();
    List<String> erros = new ArrayList<>();

    // Processa cada desperdício da lista
    for (Desperdicio desperdicio : desperdicios) {
        try {
            // Cria o desperdício
            Desperdicio novoDesperdicio = desperdicioService.create(desperdicio);
            novosDesperdicios.add(novoDesperdicio);
        } catch (Exception e) {
            // Se ocorrer um erro ao criar o desperdício, registra o erro
            erros.add("Erro no desperdício com alimento: " + desperdicio.getAlimento().getNome() + " - " + e.getMessage());
        }
    }

    // Se houver erros, retorna uma resposta de erro com a lista de erros
    if (!erros.isEmpty()) {
        return ResponseEntity.badRequest().body(erros);
    }

    // Caso contrário, retorna os desperdícios criados com status 201 (Created)
    List<URI> uris = novosDesperdicios.stream()
            .map(desperdicio -> ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(desperdicio.getId())
                    .toUri())
            .collect(Collectors.toList());

    return ResponseEntity.created(uris.get(0))  // Utiliza a URI do primeiro item como referência
            .body(novosDesperdicios);
}
}
