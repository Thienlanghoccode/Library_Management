package com.haui.librarymanagement.dto.response;

import com.haui.librarymanagement.entity.Author;
import com.haui.librarymanagement.entity.Category;
import com.haui.librarymanagement.entity.Image;
import com.haui.librarymanagement.entity.Publisher;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookResponse {
    private int id;
    private String name;
    private int publishingYear;
    private String description;
    private BigDecimal price;
    private int inventoryNumber;
    private int pageNumber;
    private String status;
    private String language;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private float weight;
    private String size;
    private float ratingsStar;
    private Author author;
    private Category category;
    private Publisher publisher;
    private List<Image> images;
}
