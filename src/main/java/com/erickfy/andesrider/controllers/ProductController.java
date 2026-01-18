package com.erickfy.andesrider.controllers;

import com.erickfy.andesrider.dto.products.ProductRequest;
import com.erickfy.andesrider.dto.products.ProductResponse;
import com.erickfy.andesrider.mapper.ProductMapper;
import com.erickfy.andesrider.models.ProductEntity;
import com.erickfy.andesrider.repo.CategoryRepository;
import com.erickfy.andesrider.repo.ProductRepository;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;


    @GetMapping
    public List<ProductResponse> getAll() {
        return productRepository.findAll().stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ProductResponse getById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(productMapper::toResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse create(@Valid @RequestBody ProductRequest request) {
        ProductEntity entity = productMapper.toEntity(request);
        
        // Buscamos la categoría completa para que el Response tenga el nombre
        if (request.getCategoryId() != null) {
            entity.setCategory(categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Categoría no encontrada")));
        }
        
        ProductEntity saved = productRepository.save(entity);
        return productMapper.toResponse(saved);
    }

    @PutMapping("/{id}")
    public ProductResponse update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return productRepository.findById(id)
                .map(existing -> {
                    productMapper.updateEntityFromRequest(request, existing);
                    
                    // Asegurar que la categoría esté bien cargada
                    if (request.getCategoryId() != null) {
                        existing.setCategory(categoryRepository.findById(request.getCategoryId())
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Categoría no encontrada")));
                    }
                    
                    return productRepository.save(existing);
                })
                .map(productMapper::toResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
        }
        productRepository.deleteById(id);
    }
}