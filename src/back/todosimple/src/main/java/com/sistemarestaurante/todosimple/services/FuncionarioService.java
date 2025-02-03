package com.sistemarestaurante.todosimple.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sistemarestaurante.todosimple.models.Funcionario;
import com.sistemarestaurante.todosimple.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public Optional<Funcionario> findByCargo(String cargo) {
        Optional<Funcionario> funcionarios = funcionarioRepository.findByCargo(cargo);
        if (funcionarios.isEmpty()) {
            throw new EntityNotFoundException("Nenhum funcionário encontrado com o cargo: " + cargo);
        }
        return funcionarios;
    }

    @Transactional
    public Funcionario create(Funcionario funcionario) {
        Optional<Funcionario> existingFuncionario = funcionarioRepository.findByCargo(funcionario.getCargo());
        if (existingFuncionario.isPresent()) {
            throw new IllegalArgumentException("Já existe um funcionário com o cargo: " + funcionario.getCargo());
        }
        return funcionarioRepository.save(funcionario);
    }

    @Transactional
    public Funcionario update(Funcionario funcionario, String cargo) {
        Funcionario existingFuncionario = funcionarioRepository.findByCargo(cargo)
                .orElseThrow(() -> new EntityNotFoundException("Nenhum funcionário encontrado com o cargo: " + cargo));

        existingFuncionario.setId_fun(funcionario.getId_fun());
        existingFuncionario.setSalario(funcionario.getSalario());

        return funcionarioRepository.save(existingFuncionario);
    }

    @Transactional
    public void updateQuantidade(String cargo, int quantidade) {
        Funcionario existingFuncionario = funcionarioRepository.findByCargo(cargo)
                .orElseThrow(() -> new EntityNotFoundException("Nenhum funcionário encontrado com o cargo: " + cargo));
        existingFuncionario.setQuantidade(quantidade);
        funcionarioRepository.save(existingFuncionario);
    }

    @Transactional
    public void delete(String cargo) {
        Optional<Funcionario> funcionarios = findByCargo(cargo);
        funcionarioRepository.delete(funcionarios.get());
    }

    public List<Funcionario> getAll() {
        return funcionarioRepository.findAll();
    }
}