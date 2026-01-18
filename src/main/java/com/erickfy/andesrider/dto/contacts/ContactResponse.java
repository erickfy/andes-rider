package com.erickfy.andesrider.dto.contacts;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ContactResponse {
    private Long id;
    private String name;
    private String email;
    private String reason;
    private String message;
    private LocalDateTime createdAt;
}