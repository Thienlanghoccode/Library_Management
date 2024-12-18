package com.haui.librarymanagement.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class AuthorRequest implements Serializable {

    @NotNull(message = "Name is required")
    private String name;

    private String dateOfBirth;

    private String description;

    private String image;

    @NotNull(message = "Total books is required")
    private Integer totalBook;
}
