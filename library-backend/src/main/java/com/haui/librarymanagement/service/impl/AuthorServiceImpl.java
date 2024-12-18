package com.haui.librarymanagement.service.impl;

import com.haui.librarymanagement.dto.request.AuthorRequest;
import com.haui.librarymanagement.dto.response.AuthorResponse;
import com.haui.librarymanagement.entity.Author;
import com.haui.librarymanagement.exception.AppException;
import com.haui.librarymanagement.exception.ErrorCode;
import com.haui.librarymanagement.mapper.AuthorMapper;
import com.haui.librarymanagement.repository.AuthorRepository;
import com.haui.librarymanagement.service.AuthorService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AuthorServiceImpl implements AuthorService {
    AuthorRepository authorRepository;
    AuthorMapper authorMapper;

    @Override
    public List<AuthorResponse> getAllAuthors() {
        List<Author> authors = authorRepository.findAll();
        return authors.stream().map(authorMapper::toAuthorResponse).toList();
    }

    @Override
    public AuthorResponse getAuthorById(int id) {
        Author author = authorRepository.findById(id).orElseThrow(() ->
                new AppException(ErrorCode.AUTHOR_NOT_EXISTED)
        );

        return authorMapper.toAuthorResponse(author);
    }

    @Override
    @Transactional
    public void createAuthor(AuthorRequest authorRequest) {
        Author author = authorMapper.toAuthor(authorRequest);
        authorRepository.save(author);
    }

    @Override
    @Transactional
    public void removeAuthor(int id) {
        if (!authorRepository.existsById(id)) {
            throw new AppException(ErrorCode.AUTHOR_NOT_EXISTED);
        }
        authorRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void updateAuthor(Integer id, AuthorRequest request) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.AUTHOR_NOT_EXISTED));
        author.setName(request.getName());
        author.setTotalBook(request.getTotalBook());
        author.setDescription(request.getDescription());
        author.setImage(request.getImage());
        author.setDateOfBirth(LocalDate.parse(request.getDateOfBirth()));
        authorRepository.save(author);
    }
}












