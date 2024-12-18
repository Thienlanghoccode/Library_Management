package com.haui.librarymanagement.service;


import com.haui.librarymanagement.dto.request.BorrowingFormRequest;
import com.haui.librarymanagement.dto.response.BorrowingResponse;

import java.util.List;

public interface BorrowingFormService {
    Boolean checkBookAvailable(int bookId);

    Object createBorrowingForm(BorrowingFormRequest request);

    List<BorrowingResponse> getAllBorrowingForms();

    List<BorrowingResponse> getBorrowingByKey(String key);

    List<BorrowingResponse> getBorrowingById(int id);

    Integer findCountBorrowingFormByUserAccountName(String userAccountName);
}
