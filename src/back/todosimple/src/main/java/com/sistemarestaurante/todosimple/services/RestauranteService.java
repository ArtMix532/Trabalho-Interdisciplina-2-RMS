package com.sistemarestaurante.todosimple.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sistemarestaurante.todosimple.repositories.RestauranteRepository;
import com.sistemarestaurante.todosimple.models.Restaurante;

@Service
public class RestauranteService {

    @Autowired
    private RestauranteRepository restauranteRepository;

    public Restaurante findById(long id_restaurante) {
        return restauranteRepository.findById(id_restaurante).orElse(null);
    }

    public Optional<Restaurante> findByNome(String nome) {
        return restauranteRepository.findByNomeRestaurante(nome);
    }

    @Transactional
    public Restaurante create(Restaurante obj) {
        obj.setId_restaurante(null);
        return this.restauranteRepository.save(obj);
    }

    @Transactional
    public Restaurante updateByNome(Restaurante obj, String nome) {
        Restaurante existingRestaurante = restauranteRepository.findByNomeRestaurante(nome)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Restaurante não encontrado com o nome: " + nome));

        existingRestaurante.setNomeRestaurante(obj.getNomeRestaurante());
        existingRestaurante.setTelefone(obj.getTelefone());
        // Atualize outros atributos do Restaurante conforme necessário

        return restauranteRepository.save(existingRestaurante);
    }

    @Transactional
    public void deleteByNome(String nome) {
        Restaurante restaurante = findByNome(nome)
                .orElseThrow(() -> new RuntimeException("Restaurante não encontrado com o nome: " + nome));
        restauranteRepository.delete(restaurante);
    }

    public List<Restaurante> getAll() {
        return restauranteRepository.findAll();
    }
}