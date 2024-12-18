package com.haui.librarymanagement.service;

import com.haui.librarymanagement.dto.request.AuthorRequest;
import com.haui.librarymanagement.dto.response.AuthorResponse;
import com.haui.librarymanagement.dto.response.CategoryResponse;

import java.util.List;

public interface AuthorService {
    List<AuthorResponse> getAllAuthors();

    AuthorResponse getAuthorById(int id);

    void createAuthor(AuthorRequest authorRequest);

    void removeAuthor(int id);

    void updateAuthor(Integer id,AuthorRequest request);
}
