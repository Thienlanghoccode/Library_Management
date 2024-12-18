package com.haui.librarymanagement.service.impl;

import com.haui.librarymanagement.entity.Book;
import com.haui.librarymanagement.entity.Image;
import com.haui.librarymanagement.exception.AppException;
import com.haui.librarymanagement.exception.ErrorCode;
import com.haui.librarymanagement.mapper.BookMapper;
import com.haui.librarymanagement.repository.BookRepository;
import com.haui.librarymanagement.repository.ImageRepository;
import com.haui.librarymanagement.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final ImageRepository imageRepository;

    @Modifying
    @Override
    public Image createImageInBook(int bookId, Image request) {
        Book book = bookRepository.findById(bookId).orElseThrow(() ->
            new AppException(ErrorCode.BOOK_NOT_EXISTED)
        );

        request.setBook(book);
        return imageRepository.save(request);
    }
}
