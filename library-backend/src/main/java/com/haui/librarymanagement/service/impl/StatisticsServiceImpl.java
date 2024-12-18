package com.haui.librarymanagement.service.impl;

import com.haui.librarymanagement.repository.BookRepository;
import com.haui.librarymanagement.repository.ReturnSlipRepository;
import com.haui.librarymanagement.repository.UserRepository;
import com.haui.librarymanagement.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final BookRepository bookRepository;

    private final UserRepository userRepository;

    private final ReturnSlipRepository returnSlipRepository;

    @Override
    public BigDecimal getTotalRevenueByMonthAndYear(int month, int year) {
        String yearMonth = String.format("%d-%02d", year, month);
        return bookRepository.getTotalRevenueByMonthAndYear(yearMonth);
    }

    @Override
    public List<Object[]> getUserCountByRegion() {
        return userRepository.getUserCountByRegion();
    }

    @Override
    public List<Object[]> getMostBorrowedBooksByMonth(int month, int year) {
        String yearMonth = String.format("%d-%02d", year, month);
        return bookRepository.getMostBorrowedBooksByMonth(yearMonth);
    }

    @Override
    public long countLateReturns() {
        return returnSlipRepository.countLateReturns();
    }

    @Override
    public List<Object[]> getTotalRevenueByAuthor() {
        return bookRepository.getTotalRevenueByAuthor();
    }

    @Override
    public List<Object[]> countBooksByStatus() {
        return bookRepository.countBooksByStatus();
    }
}
