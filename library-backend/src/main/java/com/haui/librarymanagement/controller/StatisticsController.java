package com.haui.librarymanagement.controller;

import com.haui.librarymanagement.service.StatisticsService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/total-revenue")
    public BigDecimal getTotalRevenueByMonthAndYear(@RequestParam int month, @RequestParam int year) {
        return statisticsService.getTotalRevenueByMonthAndYear(month, year);
    }

    @GetMapping("/user-count-by-region")
    public List<Object[]> getUserCountByRegion() {
        return statisticsService.getUserCountByRegion();
    }

    @GetMapping("/most-borrowed-books")
    public List<Object[]> getMostBorrowedBooksByMonth(@RequestParam int month, @RequestParam int year) {
        return statisticsService.getMostBorrowedBooksByMonth(month, year);
    }

    @GetMapping("/late-returns")
    public long countLateReturns() {
        return statisticsService.countLateReturns();
    }

    @GetMapping("/total-revenue-by-author")
    public List<Object[]> getTotalRevenueByAuthor() {
        return statisticsService.getTotalRevenueByAuthor();
    }

    @GetMapping("/books-by-status")
    public List<Object[]> countBooksByStatus() {
        return statisticsService.countBooksByStatus();
    }
}
