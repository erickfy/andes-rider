package com.erickfy.andesrider.mapper;

import com.erickfy.andesrider.dto.contacts.ContactRequest;
import com.erickfy.andesrider.dto.contacts.ContactResponse;
import com.erickfy.andesrider.models.ContactEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface ContactMapper {

    ContactResponse toResponse(ContactEntity entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    ContactEntity toEntity(ContactRequest request);
}