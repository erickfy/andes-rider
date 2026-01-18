package com.erickfy.andesrider.controllers;

import com.erickfy.andesrider.dto.contacts.ContactRequest;
import com.erickfy.andesrider.dto.contacts.ContactResponse;
import com.erickfy.andesrider.mapper.ContactMapper;
import com.erickfy.andesrider.models.ContactEntity;
import com.erickfy.andesrider.repo.ContactRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ContactController {

    private final ContactRepository contactRepository;
    private final ContactMapper contactMapper;

    // Guardar nuevo contacto (Formulario Web)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactResponse create(@Valid @RequestBody ContactRequest request) {
        ContactEntity entity = contactMapper.toEntity(request);
        ContactEntity saved = contactRepository.save(entity);
        return contactMapper.toResponse(saved);
    }

    // Listar contactos (Para panel de admin)
    @GetMapping
    public List<ContactResponse> getAll() {
        return contactRepository.findAll().stream()
                .map(contactMapper::toResponse)
                .collect(Collectors.toList());
    }
}