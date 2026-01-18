package com.erickfy.andesrider.mapper;

import com.erickfy.andesrider.dto.products.ProductRequest;
import com.erickfy.andesrider.dto.products.ProductResponse;
import com.erickfy.andesrider.models.CategoryEntity;
import com.erickfy.andesrider.models.ProductEntity;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductResponse toResponse(ProductEntity product) {
        if (product == null) return null;

        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setStatus(product.getStatus());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setDesc(product.getDesc());

        if (product.getCategory() != null) {
            response.setCategoryId(product.getCategory().getId());
            response.setCategoryName(product.getCategory().getName());
        }

        return response;
    }

    public ProductEntity toEntity(ProductRequest request) {
        if (request == null) return null;

        ProductEntity entity = new ProductEntity();
        updateEntityFromRequest(request, entity);
        return entity;
    }

    public void updateEntityFromRequest(ProductRequest request, ProductEntity entity) {
        if (request == null || entity == null) return;

        entity.setName(request.getName());
        entity.setStatus(request.getStatus());
        entity.setPrice(request.getPrice());
        entity.setStock(request.getStock());
        entity.setDesc(request.getDesc());

        if (request.getCategoryId() != null) {
            if (entity.getCategory() == null) {
                entity.setCategory(new CategoryEntity());
            }
            entity.getCategory().setId(request.getCategoryId());
        }
    }
}