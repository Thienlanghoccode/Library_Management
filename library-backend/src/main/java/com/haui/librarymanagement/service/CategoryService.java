package com.haui.librarymanagement.service;

import com.haui.librarymanagement.dto.request.CategoryCreateRequest;
import com.haui.librarymanagement.dto.response.BooksResponse;
import com.haui.librarymanagement.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService{

    BooksResponse getBooksByCategory(int id, int pageNo, int pageSize, String sortBy, String sortDir);


    List<CategoryResponse> getAllCategories();


    CategoryResponse createCategory(CategoryCreateRequest request);

    void removeCategory(int categoryId);

    CategoryResponse updateCategory(Integer id, CategoryCreateRequest request);
}


















