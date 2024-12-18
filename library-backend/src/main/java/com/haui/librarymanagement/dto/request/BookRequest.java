package com.haui.librarymanagement.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookRequest {

    @NotEmpty(message = "Tên sách không được bỏ trống")
    private String name;

    private int publishingYear;
    private String description;
    private BigDecimal price;
    private int inventoryNumber;
    private int pageNumber;
    private String status;
    private String language;
    private float weight;
    private String size;

    private int author;
    private int category;
    private int publisher;
    private List<ImageRequest> images;

}
