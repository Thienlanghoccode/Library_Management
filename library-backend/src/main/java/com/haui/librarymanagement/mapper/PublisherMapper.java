package com.haui.librarymanagement.mapper;

import com.haui.librarymanagement.dto.request.PublisherRequest;
import com.haui.librarymanagement.dto.response.PublisherInBookAddResponse;
import com.haui.librarymanagement.entity.Publisher;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PublisherMapper {

    Publisher toPublisher(PublisherRequest publisher);

    Publisher toPublisher(PublisherInBookAddResponse publisher);
}
