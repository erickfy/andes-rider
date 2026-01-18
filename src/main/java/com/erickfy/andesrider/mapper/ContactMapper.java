package com.erickfy.andesrider.mapper;

import com.erickfy.andesrider.dto.contacts.ContactRequest;
import com.erickfy.andesrider.dto.contacts.ContactResponse;
import com.erickfy.andesrider.models.ContactEntity;
import org.springframework.stereotype.Component;

@Component
public class ContactMapper {

    public ContactResponse toResponse(ContactEntity entity) {
        if (entity == null) return null;
        
        ContactResponse response = new ContactResponse();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setEmail(entity.getEmail());
        response.setReason(entity.getReason());
        response.setMessage(entity.getMessage());
        response.setCreatedAt(entity.getCreatedAt());
        return response;
    }

    public ContactEntity toEntity(ContactRequest request) {
        if (request == null) return null;
        
        ContactEntity entity = new ContactEntity();
        entity.setName(request.getName());
        entity.setEmail(request.getEmail());
        entity.setPhone(request.getPhone());
        entity.setReason(request.getReason());
        entity.setMessage(request.getMessage());
        return entity;
    }
}