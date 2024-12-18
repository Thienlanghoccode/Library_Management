package com.haui.librarymanagement.repository;

import com.haui.librarymanagement.entity.BookFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookFileRepository extends JpaRepository<BookFile,Integer> {
    BookFile findByFileName(String fileName);
}

