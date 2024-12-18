package com.haui.librarymanagement.mapper;

import com.haui.librarymanagement.dto.request.UserCreateRequest;
import com.haui.librarymanagement.dto.response.UserResponse;
import com.haui.librarymanagement.entity.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreateRequest request);
    UserResponse toUserResponse(User user);
}
