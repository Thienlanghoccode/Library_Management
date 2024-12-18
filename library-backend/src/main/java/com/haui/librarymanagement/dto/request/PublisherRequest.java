package com.haui.librarymanagement.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class PublisherRequest {

    @NotBlank(message = "publisher's name must not be blank")
    private String name;

    @NotBlank(message = "publisher's phone numbers must not be blank")
    private String phoneNumber;

    @NotBlank(message = "publisher's address must not be blank")
    private String address;
}
