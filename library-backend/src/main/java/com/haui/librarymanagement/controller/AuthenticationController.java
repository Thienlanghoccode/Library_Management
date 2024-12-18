package com.haui.librarymanagement.controller;

import com.haui.librarymanagement.dto.request.SignInRequest;
import com.haui.librarymanagement.dto.response.ApiResponse;
import com.haui.librarymanagement.dto.response.TokenResponse;
import com.haui.librarymanagement.service.UserService;
import com.haui.librarymanagement.service.impl.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {

    AuthenticationService authenticationService;

    @PostMapping("/access")
    public ApiResponse<TokenResponse> login(@RequestBody SignInRequest request) {
        return ApiResponse.<TokenResponse>builder()
                .result(authenticationService.authenticate(request))
                .build();
    }
}








