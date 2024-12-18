package com.haui.librarymanagement.repository;

import com.haui.librarymanagement.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO tblimage (book_id, image_link, image_avatar, data)" +
            " VALUES (:bookId, :link , :avatar, :data )", nativeQuery = true)
    Integer saveImage(@Param(value = "bookId") int bookId,
                      @Param(value = "link") String link,
                      @Param(value = "avatar") boolean avatar,
                      @Param(value = "data") String data);

}

