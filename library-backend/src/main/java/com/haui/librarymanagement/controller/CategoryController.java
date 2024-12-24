package com.haui.librarymanagement.controller;

import com.haui.librarymanagement.dto.request.CategoryCreateRequest;
import com.haui.librarymanagement.dto.response.ApiResponse;
import com.haui.librarymanagement.dto.response.BooksResponse;
import com.haui.librarymanagement.dto.response.CategoryResponse;
import com.haui.librarymanagement.service.CategoryService;
import com.haui.librarymanagement.utils.AppConstants;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    CategoryService categoryService;

    @GetMapping
    public ApiResponse<List<CategoryResponse>> getAllCategories(){

        return ApiResponse.<List<CategoryResponse>>builder()
                .result(categoryService.getAllCategories())
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ApiResponse<CategoryResponse> createCategories(@Valid @RequestBody CategoryCreateRequest request){
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.createCategory(request))
                .build();
    }

    @GetMapping("/{id}/books")
    public ApiResponse<BooksResponse> getBooksByCategory(@PathVariable("id") int id,
                                                         @RequestParam(value = "pageNo",defaultValue = AppConstants.DEFAULT_PAGE_NUMBER,required = false) int pageNo,
                                                         @RequestParam(value = "pageSize",defaultValue = AppConstants.DEFAULT_PAGE_SIZE,required = false) int pageSize,
                                                         @RequestParam(value = "sortBy",defaultValue = AppConstants.DEFAULT_SORT_BY,required = false) String sortBy,
                                                         @RequestParam(value = "sortDir",defaultValue = AppConstants.DEFAULT_SORT_DIRECTION,required = false) String sortDir
    ){
        return ApiResponse.<BooksResponse>builder().result(categoryService.getBooksByCategory(id, pageNo, pageSize, sortBy, sortDir)).build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteCategory(@PathVariable("id") int id){
        categoryService.removeCategory(id);
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Delete Successful!")
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ApiResponse<CategoryResponse> updateCategory(@PathVariable(value = "id") Integer id, @Valid @RequestBody CategoryCreateRequest request){

        return ApiResponse.<CategoryResponse>builder()
                .code(1000)
                .result(categoryService.updateCategory(id, request))
                .build();
    }


}













