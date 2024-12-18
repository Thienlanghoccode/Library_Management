package com.haui.librarymanagement.service;

import com.haui.librarymanagement.entity.Image;

public interface ImageService {
    Image createImageInBook(int bookId, Image request);
}
