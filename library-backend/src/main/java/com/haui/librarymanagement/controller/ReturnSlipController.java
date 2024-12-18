package com.haui.librarymanagement.controller;

import com.haui.librarymanagement.dto.request.ReturnSlipRequest;
import com.haui.librarymanagement.dto.response.ApiResponse;
import com.haui.librarymanagement.dto.response.ReturnBookResponse;
import com.haui.librarymanagement.service.ReturnSlipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/returnBook")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ReturnSlipController {

    private final ReturnSlipService returnSlipService;

    @PostMapping
    public ApiResponse<Object> returnBook(@Valid @RequestBody ReturnSlipRequest request){

        return ApiResponse.builder()
                .result(returnSlipService.returnBook(request))
                .build();
    }

    @GetMapping
    public ApiResponse<List<ReturnBookResponse>> getAllReturnSlip(){
        return ApiResponse.<List<ReturnBookResponse>>builder()
                .result(returnSlipService.getAllReturnSlip())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ReturnBookResponse> returnBookById(@PathVariable int id){
        return ApiResponse.<ReturnBookResponse>builder()
                .result(returnSlipService.getReturnSlipByID(id))
                .build();
    }
}
