package com.haui.librarymanagement.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.haui.librarymanagement.dto.response.common.BookInBorrowingResponse;
import com.haui.librarymanagement.dto.response.common.UserInBorrowingResponse;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BorrowingResponse {

    private int borrowingFormId;

    private Date borrowingFormDate;

    private String borrowingFormType;

    private BigDecimal borrowingFormDeposit;

    private Date borrowingFormDueDate;

    private UserInBorrowingResponse user;

    private BookInBorrowingResponse book;
}








