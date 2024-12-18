package com.haui.librarymanagement.mapper;

import com.haui.librarymanagement.dto.request.AuthorRequest;
import com.haui.librarymanagement.dto.response.AuthorResponse;
import com.haui.librarymanagement.entity.Author;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface AuthorMapper {

    @Mapping(source = "description", target = "description")
    AuthorResponse toAuthorResponse(Author author);

    Author toAuthor(AuthorRequest request);

}
