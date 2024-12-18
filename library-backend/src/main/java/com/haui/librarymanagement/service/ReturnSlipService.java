package com.haui.librarymanagement.service;

import com.haui.librarymanagement.dto.request.ReturnSlipRequest;
import com.haui.librarymanagement.dto.response.ReturnBookResponse;

import java.util.List;

public interface ReturnSlipService {

    Object returnBook(ReturnSlipRequest request);

    List<ReturnBookResponse> getAllReturnSlip();

    ReturnBookResponse getReturnSlipByID(int id);
}
