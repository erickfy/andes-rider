package com.erickfy.andesrider.dto.products;

import lombok.Data;

@Data
public class ProductResponse {
    private Long id;
    private String name;
    private String categoryName;
    private Long categoryId;
    private String status;
    private double price;
    private int stock;
    private String desc;
}