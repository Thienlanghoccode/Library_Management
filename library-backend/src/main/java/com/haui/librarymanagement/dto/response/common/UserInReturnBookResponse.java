package com.haui.librarymanagement.dto.response.common;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInReturnBookResponse {
    private String userName;
    private String userAccountName;
}
