package com.erickfy.andesrider.mapper;

import com.erickfy.andesrider.dto.products.ProductRequest;
import com.erickfy.andesrider.dto.products.ProductResponse;
import com.erickfy.andesrider.models.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;



@Mapper(componentModel = "spring")
public interface ProductMapper {

    // De Entidad a Response (Salida)
    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "category.id", target = "categoryId")
    ProductResponse toResponse(ProductEntity product);

    // De Request a Entidad (Entrada)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", ignore = true) // Lo manejamos en el servicio o controlador temporalmente
    @Mapping(source = "categoryId", target = "category.id")
    ProductEntity toEntity(ProductRequest request);

    // Actualizar Entidad existente
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(source = "categoryId", target = "category.id")
    void updateEntityFromRequest(ProductRequest request, @MappingTarget ProductEntity product);
}