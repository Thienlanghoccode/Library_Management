package com.haui.librarymanagement.controller;

import com.haui.librarymanagement.dto.response.ResourceDTO;
import com.haui.librarymanagement.service.BookService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class ExportController {

    BookService bookService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/export")
    public ResponseEntity<Resource> exportProducts() {
        ResourceDTO resourceDTO = bookService.exportExcel();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition",
                "attachment; filename=" + resourceDTO.getFileName() + ".xlsx");

        return ResponseEntity.ok().contentType(resourceDTO.getMediaType())
                .headers(httpHeaders).body(resourceDTO.getResource());
    }
}
