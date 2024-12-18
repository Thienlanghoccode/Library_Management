package com.haui.librarymanagement.service;

import com.haui.librarymanagement.dto.response.ExcelMetadataDTO;
import com.haui.librarymanagement.dto.response.ResourceDTO;

public interface ExcelService {
    ResourceDTO exportExcel(ExcelMetadataDTO excelMetadataDTO);
}
