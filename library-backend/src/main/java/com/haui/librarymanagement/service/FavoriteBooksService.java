package com.haui.librarymanagement.service;

import com.haui.librarymanagement.dto.response.FavoriteBookResponse;

import java.util.List;


public interface FavoriteBooksService {
    List<FavoriteBookResponse> getAllFavoriteBookByUserId(int userId);
}
