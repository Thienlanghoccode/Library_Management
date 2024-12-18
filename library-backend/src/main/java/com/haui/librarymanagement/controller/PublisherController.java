package com.haui.librarymanagement.controller;

import com.haui.librarymanagement.dto.request.PublisherRequest;
import com.haui.librarymanagement.dto.response.ApiResponse;
import com.haui.librarymanagement.dto.response.PublisherInBookAddResponse;
import com.haui.librarymanagement.service.PublisherService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publishers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PublisherController {

    PublisherService publisherService;

    @GetMapping
    public ApiResponse<List<PublisherInBookAddResponse>> getAllPublishers() {

        return ApiResponse.<List<PublisherInBookAddResponse>>builder()
                .result(publisherService.getAllPublisherInBooks())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<PublisherInBookAddResponse> getPublisherById(@PathVariable("id") String id) {
        return ApiResponse.<PublisherInBookAddResponse>builder()
                .result(publisherService.getPublisherInBookById(Integer.parseInt(id)))
                .build();
    }

    @PostMapping
    public ApiResponse<?> create(@Valid @RequestBody PublisherRequest request) {
        publisherService.createPublisher(request);
        return ApiResponse.builder()
                .result("Publisher created successfully")
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<?> update(@PathVariable(value = "id") Integer id,@Valid @RequestBody PublisherRequest request) {
        publisherService.updatePublisher(id,request);
        return ApiResponse.builder()
                .result("Publisher updated successfully")
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable(value = "id") Integer id) {
        publisherService.deletePublisher(id);
        return ApiResponse.builder()
                .result("Publisher deleted successfully")
                .build();
    }
}
