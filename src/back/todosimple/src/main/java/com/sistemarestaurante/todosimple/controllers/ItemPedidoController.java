package com.sistemarestaurante.todosimple.controllers;
import com.sistemarestaurante.todosimple.models.ItemPedido;
import com.sistemarestaurante.todosimple.services.ItemPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/item_pedido")
@Validated
public class ItemPedidoController {
    @Autowired
    private ItemPedidoService itemPedidoService; 

   @PostMapping 
   @Validated(ItemPedido.CreateItemPedido.class)
   public ResponseEntity<Void> create(@Valid @RequestBody ItemPedido itemPedido) {
        ItemPedido novoItem = itemPedidoService.create(itemPedido); 

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(novoItem.getId_pedido()).toUri();
        return ResponseEntity.created(uri).build();
   }

   @GetMapping
public ResponseEntity<List<ItemPedido>> findAll() {
    List<ItemPedido> itens = itemPedidoService.findAll();
    return ResponseEntity.ok(itens);
}
@PostMapping("/varios")
@Validated(ItemPedido.CreateItemPedido.class)
public ResponseEntity<?> createMultiple(@Valid @RequestBody List<ItemPedido> itensPedido) {
    List<String> errors = new ArrayList<>();

    for (ItemPedido itemPedido : itensPedido) {
        try {
            this.itemPedidoService.create(itemPedido);
        } catch (Exception e) {
            errors.add("Erro no ItemPedido com prato ID: " + 
                        itemPedido.getPrato().getId_prato() + 
                        " - " + e.getMessage());
        }
    }

    if (!errors.isEmpty()) {
        return ResponseEntity.badRequest().body(errors);
    }

    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
    return ResponseEntity.created(uri).build();
}

}
