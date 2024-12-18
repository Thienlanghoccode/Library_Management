package com.haui.librarymanagement.service;

import com.haui.librarymanagement.dto.request.BookRequest;
import com.haui.librarymanagement.dto.response.BookResponse;
import com.haui.librarymanagement.dto.response.BooksResponse;
import com.haui.librarymanagement.dto.response.ExcelMetadataDTO;
import com.haui.librarymanagement.dto.response.ResourceDTO;

import java.util.List;
import java.util.Map;


public interface BookService {

    BooksResponse getAllBooks(int pageNo, int pageSize, String sortBy, String sortDir);

    BookResponse getBookById(int id);

    void createBook(BookRequest bookRequest);

    void deleteBook(int id);

    BookResponse updateBook(BookRequest bookRequest, int id);

    BooksResponse filterBooks(Map<String, String> filters);

    List<BookResponse> getThreeBookRelease();

    BooksResponse getBooksByAuthorId(int id, int pageNo, int pageSize, String sortBy, String sortDir);

    List<BookResponse> getAllBooksNoPages();


    ExcelMetadataDTO prepareExcelData();

    ResourceDTO exportExcel();

    BooksResponse searchAndPages(int pageNo, int pageSize, String sortBy, String sortDir, String search);
}
