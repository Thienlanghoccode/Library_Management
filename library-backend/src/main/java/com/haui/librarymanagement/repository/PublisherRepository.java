package com.haui.librarymanagement.repository;

import com.haui.librarymanagement.dto.response.PublisherInBookAddResponse;
import com.haui.librarymanagement.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Integer> {
    @Query(value = "SELECT new com.haui.librarymanagement.dto.response.PublisherInBookAddResponse(p.id, p.name, p.phoneNumber, p.address) FROM Publisher p")
    List<PublisherInBookAddResponse> getAllPublishers();

    @Query(value = "SELECT new com.haui.librarymanagement.dto.response.PublisherInBookAddResponse(p.id, p.name, p.phoneNumber, p.address) FROM Publisher p WHERE p.id = :id")
    PublisherInBookAddResponse getPublisherByById(@Param("id") Integer id);

}
