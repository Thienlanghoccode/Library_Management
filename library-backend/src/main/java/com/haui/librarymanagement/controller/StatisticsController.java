package com.haui.librarymanagement.controller;

import com.haui.librarymanagement.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("api/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/total-revenue")
    public BigDecimal getTotalRevenueByMonthAndYear(@RequestParam int month, @RequestParam int year) {
        return statisticsService.getTotalRevenueByMonthAndYear(month, year);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/user-count-by-region")
    public List<Object[]> getUserCountByRegion() {
        return statisticsService.getUserCountByRegion();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/most-borrowed-books")
    public List<Object[]> getMostBorrowedBooksByMonth(@RequestParam int month, @RequestParam int year) {
        return statisticsService.getMostBorrowedBooksByMonth(month, year);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/late-returns")
    public long countLateReturns() {
        return statisticsService.countLateReturns();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/total-revenue-by-author")
    public List<Object[]> getTotalRevenueByAuthor() {
        return statisticsService.getTotalRevenueByAuthor();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/books-by-status")
    public List<Object[]> countBooksByStatus() {
        return statisticsService.countBooksByStatus();
    }
}
