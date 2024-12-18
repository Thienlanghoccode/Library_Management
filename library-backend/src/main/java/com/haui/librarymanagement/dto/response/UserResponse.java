package com.haui.librarymanagement.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    private int id;
    private String userName;
    private String userImage;
    private String userPhoneNumber;
    private String userAddress;
    private String userAccountName;
    private String userRole;
    private String userCode;
    private BigDecimal userMoney;
}
