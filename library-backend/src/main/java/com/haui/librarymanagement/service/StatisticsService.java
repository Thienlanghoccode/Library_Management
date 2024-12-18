package com.haui.librarymanagement.service;

import java.math.BigDecimal;
import java.util.List;

public interface StatisticsService {
    BigDecimal getTotalRevenueByMonthAndYear(int month, int year);

    List<Object[]> getUserCountByRegion();

    List<Object[]> getMostBorrowedBooksByMonth(int month, int year);

    long countLateReturns();

    List<Object[]> getTotalRevenueByAuthor();

    List<Object[]> countBooksByStatus();
}
