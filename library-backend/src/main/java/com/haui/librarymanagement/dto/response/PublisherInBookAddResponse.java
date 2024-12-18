package com.haui.librarymanagement.dto.response;

import lombok.*;

import java.io.Serializable;

@Setter
@Getter
@AllArgsConstructor
public class PublisherInBookAddResponse implements Serializable {
    private int id;
    private String name;
    private String phoneNumber;
    private String address;
}
