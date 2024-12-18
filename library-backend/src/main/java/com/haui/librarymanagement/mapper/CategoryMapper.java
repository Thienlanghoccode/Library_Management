package com.haui.librarymanagement.mapper;

import com.haui.librarymanagement.dto.request.CategoryCreateRequest;
import com.haui.librarymanagement.dto.response.CategoryResponse;
import com.haui.librarymanagement.entity.Category;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toCategoryResponse(Category category);

    Category toCategory(CategoryCreateRequest request);
}
