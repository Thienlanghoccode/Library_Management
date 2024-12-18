package com.haui.librarymanagement.repository;

import com.haui.librarymanagement.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    Page<Book> findByPublisherId(int id, Pageable pageable);
    Page<Book> findByCategoryId(int id,Pageable pageable);
    Page<Book> findByAuthorId(int id,Pageable pageable);

    @Query(value = "SELECT b FROM Book b ORDER BY b.createdAt DESC LIMIT 3")
    List<Book> findTop3NewestBooks();

    @Query(
            value = "SELECT b FROM Book b WHERE b.name like %:search% " +
            "OR b.author.name like %:search% " +
            "OR b.category.name like %:search% " +
            "OR b.publisher.name like %:search%")
    Page<Book> searchAndPages(String search, Pageable pageable);

    @Query("SELECT SUM(b.price) FROM Book b WHERE DATE_FORMAT(b.createdAt, '%Y-%m') = :yearMonth")
    BigDecimal getTotalRevenueByMonthAndYear(String yearMonth);

    @Query("SELECT b.book, COUNT(b) AS borrow_count FROM BorrowingForm b WHERE DATE_FORMAT(b.borrowingFormDate, '%Y-%m') = :yearMonth GROUP BY b.book ORDER BY borrow_count DESC")
    List<Object[]> getMostBorrowedBooksByMonth(String yearMonth);

    @Query("SELECT b.author.name, SUM(b.price) AS total_revenue FROM Book b GROUP BY b.author.name ORDER BY total_revenue DESC")
    List<Object[]> getTotalRevenueByAuthor();

    @Query("SELECT b.status, COUNT(b) AS status_count FROM Book b GROUP BY b.status")
    List<Object[]> countBooksByStatus();
}
