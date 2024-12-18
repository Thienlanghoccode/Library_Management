package com.haui.librarymanagement.dto.response.common;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookInReturnBookResponse {
    private int id;
    private String name;
}
