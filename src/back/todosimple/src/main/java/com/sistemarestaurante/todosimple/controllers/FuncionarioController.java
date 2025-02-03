package com.sistemarestaurante.todosimple.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sistemarestaurante.todosimple.models.Funcionario;
import com.sistemarestaurante.todosimple.services.FuncionarioService;

@RestController
@RequestMapping("/funcionario")
@Validated
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping("/cargo/{cargo}")
    public ResponseEntity<Optional<Funcionario>> findByCargo(@PathVariable String cargo) {
        Optional<Funcionario> funcionarios = this.funcionarioService.findByCargo(cargo);
        return ResponseEntity.ok().body(funcionarios);
    }

    @PostMapping
    @Validated(Funcionario.CreateFuncionario.class)
    public ResponseEntity<Void> create(@Valid @RequestBody Funcionario funcionario) {
        this.funcionarioService.create(funcionario);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(funcionario.getId_fun()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/cargo/{cargo}")
    @Validated(Funcionario.UpdateFuncionario.class)
    public ResponseEntity<Void> update(@Valid @RequestBody Funcionario funcionario, @PathVariable String cargo) {
        this.funcionarioService.update(funcionario, cargo);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/cargo/{cargo}/quantidade")
    public ResponseEntity<Void> updateQuantidade(@PathVariable String cargo, @RequestParam int quantidade) {
        this.funcionarioService.updateQuantidade(cargo, quantidade);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/cargo/{cargo}")
    public ResponseEntity<Void> delete(@PathVariable String cargo) {
        this.funcionarioService.delete(cargo);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/varios")
    @Validated(Funcionario.CreateFuncionario.class)
    public ResponseEntity<Void> createMultiple(@Valid @RequestBody List<Funcionario> funcionarios) {
        for (Funcionario funcionario : funcionarios) {
            this.funcionarioService.create(funcionario);
        }
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Funcionario>> getAll() {
        List<Funcionario> funcionarios = funcionarioService.getAll();
        return ResponseEntity.ok(funcionarios);
    }
}