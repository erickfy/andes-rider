package com.erickfy.andesrider.repo;

import com.erickfy.andesrider.models.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
}
