package com.haui.librarymanagement.mapper;

import com.haui.librarymanagement.dto.request.BookRequest;
import com.haui.librarymanagement.dto.request.ImageRequest;
import com.haui.librarymanagement.dto.response.BookResponse;
import com.haui.librarymanagement.entity.Book;
import com.haui.librarymanagement.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface BookMapper {
    @Mapping(source = "ratingsStar", target = "ratingsStar")
    @Mapping(source = "author", target = "author")
    BookResponse toBookResponse(Book book);

    @Mapping(target = "author", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "publisher", ignore = true)
    @Mapping(target = "images", source = "images", qualifiedByName = "toImage")
    Book toBook(BookRequest bookRequest);

    @Named(value = "toImage")
    Image toImage(ImageRequest imageRequest);

}
