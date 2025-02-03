    package com.sistemarestaurante.todosimple.models;

    import javax.persistence.*;
    import javax.validation.constraints.NotBlank;
    import javax.validation.constraints.NotEmpty;
    import javax.validation.constraints.NotNull;
    import javax.validation.constraints.Size;

    import com.fasterxml.jackson.annotation.JsonManagedReference;

    import java.util.ArrayList;
    import java.util.List;

    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    @Entity
    @Table(name = Prato.TABLE_NAME)
    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public class Prato {

        public interface CreatePrato {
        }
        public interface UpdatePrato {
        }

        public static final String TABLE_NAME = "prato";

        @Id
        @Column(name = "id_prato", unique = true)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id_prato;

        @Column(name = "nome", length = 100, nullable = false)
        @Size(min = 1, max = 100, groups = CreatePrato.class)
        @NotNull(groups = CreatePrato.class)
        @NotEmpty(groups = CreatePrato.class)
        @NotBlank(groups = CreatePrato.class)
        private String nome;

        @Column(name = "status", nullable = false)
        @NotNull(groups = CreatePrato.class)
        @NotEmpty(groups = CreatePrato.class)
        @NotBlank(groups = CreatePrato.class)
        private String status;

        @Column(name = "preco", nullable = false)
        @NotNull(groups = CreatePrato.class)
        private Double preco;
        @OneToMany(mappedBy = "prato", cascade = CascadeType.ALL, fetch = FetchType.LAZY,orphanRemoval = true)
        @JsonManagedReference 
        private List<PratoIngrediente> ingredientes = new ArrayList<>();

        public Long getId_prato() {
            return this.id_prato;
        }

        public void setId_prato(Long id_prato) {
            this.id_prato = id_prato;
        }

        public String getNome() {
            return this.nome;
        }

        public void setNome(String nome) {
            this.nome = nome;
        }

        public String getStatus() {
            return this.status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Double getPreco() {
            return this.preco;
        }

        public void setPreco(Double preco) {
            this.preco = preco;
        }

        public List<PratoIngrediente> getIngredientes() {
            return this.ingredientes;
        }

        public void setIngredientes(List<PratoIngrediente> ingredientes) {
            this.ingredientes = ingredientes;
        }

    
    }