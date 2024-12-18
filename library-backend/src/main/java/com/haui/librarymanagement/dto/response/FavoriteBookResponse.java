package com.haui.librarymanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteBookResponse {
    private Integer bookId;
    private String bookName;
    private String bookImage;

}
