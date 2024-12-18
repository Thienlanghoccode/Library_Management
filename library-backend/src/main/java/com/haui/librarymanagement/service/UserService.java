package com.haui.librarymanagement.service;

import com.haui.librarymanagement.dto.request.UserCreateRequest;
import com.haui.librarymanagement.dto.response.UserResponse;
import com.haui.librarymanagement.entity.User;

import java.util.List;

public interface UserService {

    User findUserByUserAccountNameOrUserCode(String userAccountName);

    List<UserResponse> getAll();

    UserResponse getUserById(int id);

    void addUser(UserCreateRequest request);

    void updateUser(int id, UserCreateRequest request);

    void deleteUser(int id);

}
