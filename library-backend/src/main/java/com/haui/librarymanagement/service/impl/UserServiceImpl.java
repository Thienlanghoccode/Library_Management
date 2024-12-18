package com.haui.librarymanagement.service.impl;

import com.haui.librarymanagement.dto.request.UserCreateRequest;
import com.haui.librarymanagement.dto.response.UserResponse;
import com.haui.librarymanagement.entity.User;
import com.haui.librarymanagement.exception.AppException;
import com.haui.librarymanagement.exception.ErrorCode;
import com.haui.librarymanagement.mapper.UserMapper;
import com.haui.librarymanagement.repository.UserRepository;
import com.haui.librarymanagement.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {

    UserRepository userRepository;

    UserMapper userMapper;


    @Override
    public User findUserByUserAccountNameOrUserCode(String userAccountName) {
        return userRepository.findUserByUserAccountNameOrUserCode(userAccountName, userAccountName).get();
    }

    @Override
    public List<UserResponse> getAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .filter(User::isUserActive)
                .map(user ->
                new UserResponse(
                        user.getUserId(),
                        user.getUsername(),
                        user.getUserImage(),
                        user.getUserPhoneNumber(),
                        user.getUserAddress(),
                        user.getUserAccountName(),
                        user.getUserRole(),
                        user.getUserCode(),
                        user.getUserMoney())).collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserById(int id) {
        return userMapper.toUserResponse(userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

    @Override
    @Transactional
    public void addUser(UserCreateRequest request) {
        User user = userMapper.toUser(request);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateUser(int id, UserCreateRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user.setUserAccountName(request.getUserAccountName());
        user.setUserName(request.getUserName());
        user.setUserRole(request.getUserRole());
        user.setUserCode(request.getUserCode());
        user.setUserAddress(request.getUserAddress());
        user.setUserAccountPassword(request.getUserAccountPassword());
        user.setUserImage(request.getUserImage());
        user.setUserActive(request.isUserActive());
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user.setUserActive(false);
        userRepository.save(user);
    }
}











