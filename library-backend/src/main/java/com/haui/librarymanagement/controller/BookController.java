package com.haui.librarymanagement.controller;

import com.haui.librarymanagement.dto.request.BookRequest;
import com.haui.librarymanagement.dto.response.ApiResponse;
import com.haui.librarymanagement.dto.response.BookResponse;
import com.haui.librarymanagement.dto.response.BooksResponse;
import com.haui.librarymanagement.entity.Image;
import com.haui.librarymanagement.service.BookService;
import com.haui.librarymanagement.service.ImageService;
import com.haui.librarymanagement.utils.AppConstants;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookController {

    BookService bookService;

    ImageService imageService;

    @GetMapping
    public ApiResponse<BooksResponse> getAllBooks(
            @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ){
        return ApiResponse.<BooksResponse>builder()
                .code(1000)
                .result(bookService.getAllBooks(pageNo, pageSize, sortBy, sortDir))
                .build();
    }

    @GetMapping("/getAllBooks")
    public ApiResponse<List<BookResponse>> getAllBooksNoPages(){
        return  ApiResponse.<List<BookResponse>>builder()
                .result(bookService.getAllBooksNoPages())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<BookResponse> getBookById(@PathVariable(value = "id") int id){
        return ApiResponse.<BookResponse>builder()
                .result(bookService.getBookById(id))
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ApiResponse<String> createBook(@Valid @RequestBody BookRequest bookRequest){
        bookService.createBook(bookRequest);
        return ApiResponse.<String>builder()
                .result("Tạo sách thành công!")
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ApiResponse<BookResponse> updateBook(@Valid @RequestBody BookRequest bookRequest,
                                                @PathVariable(value = "id") int id){

        return ApiResponse.<BookResponse>builder()
                .result(bookService.updateBook(bookRequest, id))
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ApiResponse deleteBook(@PathVariable(value = "id") int id){
        bookService.deleteBook(id);
        return ApiResponse.<Void>builder()
                .message("Remove book successfully!")
                .build();
    }

    @GetMapping("/getthreebookrelease")
    public ApiResponse<List<BookResponse>> getThreeBookRelease(){
        return ApiResponse.<List<BookResponse>>builder()
                .result(bookService.getThreeBookRelease())
                .build();
    }

    @GetMapping("/search")
    public ApiResponse<BooksResponse> searchBooks(
            @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir,
            @RequestParam(value = "search" , required = false) String search
    ){
        return ApiResponse.<BooksResponse>builder()
                .result(bookService.searchAndPages(pageNo, pageSize, sortBy, sortDir, search))
                .build();
    }

    @PostMapping("/{id}/images")
    public ApiResponse<Image> createImageInBook(@PathVariable(value = "id") int id,@Valid @RequestBody Image imageRequest){

        return ApiResponse.<Image>builder()
                .result(imageService.createImageInBook(id, imageRequest))
                .build();
    }

}













