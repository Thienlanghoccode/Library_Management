package com.haui.librarymanagement.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.haui.librarymanagement.dto.response.common.BookInReturnBookResponse;
import com.haui.librarymanagement.dto.response.common.UserInReturnBookResponse;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReturnBookResponse {

    private int returnSlipId;

    private Date returnSlipDate;

    private BigDecimal returnSlipRefund;

    private BigDecimal returnSlipLateFee;

    private UserInReturnBookResponse user;

    private BookInReturnBookResponse book;

    private Date borrowDate;

    private boolean isLate;

    private String statusReturn;
}
