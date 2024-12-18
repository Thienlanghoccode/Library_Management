package com.haui.librarymanagement.mapper;

import com.haui.librarymanagement.dto.response.ReturnBookResponse;
import com.haui.librarymanagement.dto.response.common.BookInReturnBookResponse;
import com.haui.librarymanagement.dto.response.common.UserInReturnBookResponse;
import com.haui.librarymanagement.entity.Book;
import com.haui.librarymanagement.entity.ReturnSlip;
import com.haui.librarymanagement.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ReturnBookMapper {
    BookInReturnBookResponse toBookInReturnBookResponse(Book book);
    UserInReturnBookResponse toUserInReturnBookResponse(User user);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "book", ignore = true)
    ReturnBookResponse toReturnBookResponse(ReturnSlip returnSlip);
}
