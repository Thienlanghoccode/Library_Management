package com.haui.librarymanagement.repository;

import com.haui.librarymanagement.dto.response.FavoriteBookResponse;
import com.haui.librarymanagement.entity.FavoriteBooks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteBooksRepository extends JpaRepository<FavoriteBooks, Integer> {

    @Query("SELECT new com.haui.librarymanagement.dto.response.FavoriteBookResponse(b.id, b.name, i.link) " +
            "FROM FavoriteBooks fb " +
            "JOIN Book b ON fb.bookId = b.id " +
            "JOIN Image i ON i.book.id = b.id " +
            "WHERE fb.userId = :userId")
    List<FavoriteBookResponse> findFavoriteBooksByUserId(Integer userId);
}
