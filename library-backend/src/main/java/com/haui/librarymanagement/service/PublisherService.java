package com.haui.librarymanagement.service;

import com.haui.librarymanagement.dto.request.PublisherRequest;
import com.haui.librarymanagement.dto.response.PublisherInBookAddResponse;

import java.util.List;

public interface PublisherService {
    List<PublisherInBookAddResponse> getAllPublisherInBooks();

    PublisherInBookAddResponse getPublisherInBookById(int id);

    void createPublisher(PublisherRequest publisher);

    void updatePublisher(Integer id, PublisherRequest publisher);

    void deletePublisher(Integer id);
}
