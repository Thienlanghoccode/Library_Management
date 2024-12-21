package com.haui.librarymanagement.service.impl;

import com.haui.librarymanagement.dto.request.ReturnSlipRequest;
import com.haui.librarymanagement.dto.response.ReturnBookResponse;
import com.haui.librarymanagement.dto.response.common.BookInReturnBookResponse;
import com.haui.librarymanagement.entity.Book;
import com.haui.librarymanagement.entity.BorrowingForm;
import com.haui.librarymanagement.entity.ReturnSlip;
import com.haui.librarymanagement.entity.User;
import com.haui.librarymanagement.exception.AppException;
import com.haui.librarymanagement.exception.ErrorCode;
import com.haui.librarymanagement.mapper.ReturnBookMapper;
import com.haui.librarymanagement.repository.BorrowingFormRepository;
import com.haui.librarymanagement.repository.ReturnSlipRepository;
import com.haui.librarymanagement.repository.UserRepository;
import com.haui.librarymanagement.service.ReturnSlipService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ReturnSlipServiceImpl implements ReturnSlipService {

    BorrowingFormRepository borrowingFormRepository;

    ReturnSlipRepository returnSlipRepository;

    ReturnBookMapper returnBookMapper;

    UserRepository userRepository;

    @Override
    public Object returnBook(ReturnSlipRequest request) {
        BorrowingForm borrowingForm = borrowingFormRepository.findById(request.getBorrowingFormId()).orElseThrow(() ->
                new AppException(ErrorCode.BORROWING_FORM_NOT_FOUND)
                );

        BigDecimal money = borrowingForm.getBook().getPrice();

        ReturnSlip returnSlip = new ReturnSlip();
        returnSlip.setBook(borrowingForm.getBook());
        returnSlip.setUser(borrowingForm.getUser());

        returnSlip.setStatusReturn(request.getStatusReturn());

        java.util.Date dateReturn = Date.valueOf(LocalDate.now());
        java.util.Date dateBorrow = borrowingForm.getBorrowingFormDate();

        boolean isLate =  dateReturn.compareTo(borrowingForm.getBorrowingFormDueDate()) > 0;

        returnSlip.setReturnSlipRefund(isLate ? BigDecimal.valueOf(0.0) : money);
        returnSlip.setReturnSlipLateFee(isLate ? money : BigDecimal.valueOf(0.00));

        returnSlip.setBorrowDate( dateBorrow );
        returnSlip.setReturnSlipDate(dateReturn);
        returnSlip.setLate(isLate);

        User user = userRepository.findById(borrowingForm.getUser().getUserId()).get();
        user.setUserMoney(isLate ? borrowingForm.getUser().getUserMoney().add(money) : borrowingForm.getUser().getUserMoney());
        userRepository.save(user);

        ReturnSlip returnSlipResponse = returnSlipRepository.save(returnSlip);
        Book book = borrowingForm.getBook();
        book.setInventoryNumber(book.getInventoryNumber() + 1);

        borrowingFormRepository.deleteById(borrowingForm.getBorrowingFormId());

        ReturnBookResponse response = returnBookMapper.toReturnBookResponse(returnSlipResponse);
        response.setBook(returnBookMapper.toBookInReturnBookResponse(returnSlipResponse.getBook()));
        response.setUser(returnBookMapper.toUserInReturnBookResponse(returnSlipResponse.getUser()));
        return response;
    }

    @Override
    public List<ReturnBookResponse> getAllReturnSlip() {
        List<ReturnSlip> returnSlips = returnSlipRepository.findAll();
        List<ReturnBookResponse> returnBookResponses = new ArrayList<>();
        returnSlips.forEach(item -> {
            ReturnBookResponse response = new ReturnBookResponse();
            response.setReturnSlipId(item.getReturnSlipId());
            response.setReturnSlipDate(item.getReturnSlipDate());
            response.setReturnSlipRefund(item.getReturnSlipRefund());
            response.setLate(item.isLate());
            BookInReturnBookResponse book = new BookInReturnBookResponse(item.getBook().getId(), item.getBook().getName());
            response.setBook(book);
            response.setBorrowDate(item.getBorrowDate());
            response.setStatusReturn(item.getStatusReturn());
            returnBookResponses.add(response);
        });
        return returnBookResponses;
    }

    @Override
    public ReturnBookResponse getReturnSlipByID(int id) {
        ReturnSlip item = returnSlipRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.RETURN_SLIP_NOT_FOUND));
        ReturnBookResponse response = new ReturnBookResponse();
        response.setReturnSlipId(item.getReturnSlipId());
        response.setReturnSlipDate(item.getReturnSlipDate());
        response.setReturnSlipRefund(item.getReturnSlipRefund());
        response.setReturnSlipLateFee(item.getReturnSlipLateFee());
        response.setLate(item.isLate());
        BookInReturnBookResponse book = new BookInReturnBookResponse(item.getBook().getId(), item.getBook().getName());
        response.setBook(book);
        response.setBorrowDate(item.getBorrowDate());
        response.setStatusReturn(item.getStatusReturn());
        return response;
    }
}













