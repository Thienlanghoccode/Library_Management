package com.haui.librarymanagement.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReturnSlipRequest {

    @NotNull(message = "Không được bỏ trống mã mượn")
    private int borrowingFormId;

    @NotEmpty(message = "Không được bỏ trống")
    private String statusReturn;


}
