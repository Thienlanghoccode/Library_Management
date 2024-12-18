package com.haui.librarymanagement.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {
    @NotEmpty
    private String userName;

    private String userImage;

    @NotBlank(message = "User code must not be bank !")
    private String userCode;

    @Email(message = "Invalid email")
    private String userAccountName;

    @Size(max = 20, message = "password least than 20 character")
    @Size(min = 8, message = "password at lest 8 character")
    @Pattern(regexp = "\\S+", message = "Password must not be have space")
    private String userAccountPassword;

    private String userAddress;

    private String userRole;

    private boolean userActive;
}
