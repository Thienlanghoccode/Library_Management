package com.haui.librarymanagement.service.impl;

import com.haui.librarymanagement.entity.BookFile;
import com.haui.librarymanagement.repository.BookFileRepository;
import com.haui.librarymanagement.service.BookFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BookFileServiceImpl implements BookFileService {
    private final BookFileRepository bookFileRepository;
    private final Path root= Paths.get("uploads");

    @Override
    public void init() {
        try{
            Files.createDirectories(root);
        }
        catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }

    }

    @Override
    public void save(MultipartFile file, Long bookId) {
        try {
            Files.copy(file.getInputStream(), root.resolve(Objects.requireNonNull(file.getOriginalFilename())));
            BookFile bookFile = new BookFile();
            bookFile.setBookId(bookId);
            bookFile.setFileName(file.getOriginalFilename());
            bookFile.setUploadDate(LocalDateTime.now());


            bookFileRepository.save(bookFile);

        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public Resource load(String fileName) {
        return null;
    }

    @Override
    public BookFile findByFileName(String fileName) {
        return bookFileRepository.findByFileName(fileName);
    }

}
