package com.haui.librarymanagement.controller;

import com.haui.librarymanagement.dto.request.AuthorRequest;
import com.haui.librarymanagement.dto.response.ApiResponse;
import com.haui.librarymanagement.dto.response.AuthorResponse;
import com.haui.librarymanagement.dto.response.BooksResponse;
import com.haui.librarymanagement.service.AuthorService;
import com.haui.librarymanagement.service.BookService;
import com.haui.librarymanagement.utils.AppConstants;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/authors")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AuthorController {
    AuthorService authorService;
    BookService bookService;

    @GetMapping
    public ApiResponse<List<AuthorResponse>> getAllAuthors(){
        return ApiResponse.<List<AuthorResponse>>builder()
                .result(authorService.getAllAuthors())
                .build();
    };

    @GetMapping("/{id}/books")
    public ApiResponse<BooksResponse> getBookByAuthorId(
            @PathVariable int id,
            @RequestParam(value = "pageNo",defaultValue = AppConstants.DEFAULT_PAGE_NUMBER,required = false) int pageNo,
            @RequestParam(value = "pageSize",defaultValue = AppConstants.DEFAULT_PAGE_SIZE,required = false) int pageSize,
            @RequestParam(value = "sortBy",defaultValue = AppConstants.DEFAULT_SORT_BY,required = false) String sortBy,
            @RequestParam(value = "sortDir",defaultValue = AppConstants.DEFAULT_SORT_DIRECTION,required = false) String sortDir
            ){

        return ApiResponse.<BooksResponse>builder()
                .result(bookService.getBooksByAuthorId(id,pageNo,pageSize, sortBy, sortDir))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<AuthorResponse> getAuthorById(@PathVariable(value = "id") int id){
        return ApiResponse.<AuthorResponse>builder()
                .result(authorService.getAuthorById(id))
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ApiResponse<String> createAuthor(@RequestBody AuthorRequest bookRequest){
        authorService.createAuthor(bookRequest);
        return ApiResponse.<String>builder()
                .result("Tạo nhà xuất bản thành công!")
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteAuthor(@PathVariable("id") int id){
        authorService.removeAuthor(id);
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Delete Successful!")
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ApiResponse<String> updateCategory(@PathVariable(value = "id") Integer id, @Valid @RequestBody AuthorRequest request){
        authorService.updateAuthor(id, request);
        return ApiResponse.<String>builder()
                .code(1000)
                .result("Update Author Successful!")
                .build();
    }
}
