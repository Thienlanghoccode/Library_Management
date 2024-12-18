package com.haui.librarymanagement.mapper;

import com.haui.librarymanagement.dto.response.BorrowingResponse;
import com.haui.librarymanagement.dto.response.common.BookInBorrowingResponse;
import com.haui.librarymanagement.dto.response.common.UserInBorrowingResponse;
import com.haui.librarymanagement.entity.Book;
import com.haui.librarymanagement.entity.BorrowingForm;
import com.haui.librarymanagement.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface BorrowingFormMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "book", ignore = true)
    BorrowingResponse toBorrowingResponse(BorrowingForm borrowingForm);


    BookInBorrowingResponse toBookInBorrowingResponse(Book book);

    @Mapping(target = "userAccountName", source = "userAccountName")
    UserInBorrowingResponse toUserInBorrowingResponse(User user);
}
