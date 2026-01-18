package com.erickfy.andesrider.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erickfy.andesrider.models.ProductEntity;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    // Método personalizado automático: Buscar por categoría
    List<ProductEntity> findByCategory(String category);

    // Método personalizado automático: Buscar por texto en el nombre
    List<ProductEntity> findByNameContainingIgnoreCase(String name);
}