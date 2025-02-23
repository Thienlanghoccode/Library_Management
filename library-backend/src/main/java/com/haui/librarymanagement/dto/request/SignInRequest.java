package com.haui.librarymanagement.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class SignInRequest {

    @NotBlank(message = "Tên tài khoản không được bỏ trống")
    private String userAccountName;

    @NotBlank(message = "Mật khẩu không được bỏ trống")
    private String password;
}
