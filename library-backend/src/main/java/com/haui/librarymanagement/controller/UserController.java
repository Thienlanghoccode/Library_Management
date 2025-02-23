package com.haui.librarymanagement.controller;

import com.haui.librarymanagement.dto.request.UserCreateRequest;
import com.haui.librarymanagement.dto.response.ApiResponse;
import com.haui.librarymanagement.dto.response.UserResponse;
import com.haui.librarymanagement.entity.User;
import com.haui.librarymanagement.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;

    @GetMapping
    public User getUserByAccountName(@RequestParam String userAccountName){

        return userService.findUserByUserAccountNameOrUserCode(userAccountName);
    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserById(@PathVariable(value = "id") int userId){
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUserById(userId))
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public List<UserResponse> getAllUsers(){
        return userService.getAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ApiResponse<String> addUser(@Valid @RequestBody UserCreateRequest request){
        userService.addUser(request);
        return ApiResponse.<String>builder()
                .result("add user success")
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ApiResponse<String> updateUser(@PathVariable int id,@Valid @RequestBody UserCreateRequest request) {
        userService.updateUser(id, request);
        return ApiResponse.<String>builder()
                .result("update user success")
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteUser(@PathVariable int id){
        userService.deleteUser(id);
        return ApiResponse.<String>builder()
                .result("delete user success")
                .build();
    }
}













