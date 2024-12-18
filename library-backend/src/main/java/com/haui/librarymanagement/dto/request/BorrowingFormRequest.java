package com.haui.librarymanagement.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Date;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BorrowingFormRequest {

    @NotNull
    private Date date;

    @NotNull
    private Date dueDate;

    @NotNull
    @Email(message = "Email không đúng!")
    private String userAccountName;

    @NotNull
    private String userAccountPassword;

    @NotNull
    private int bookId;
}












