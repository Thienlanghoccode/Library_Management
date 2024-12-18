package com.haui.librarymanagement.service.impl;

import com.haui.librarymanagement.dto.request.PublisherRequest;
import com.haui.librarymanagement.dto.response.PublisherInBookAddResponse;
import com.haui.librarymanagement.entity.Publisher;
import com.haui.librarymanagement.mapper.PublisherMapper;
import com.haui.librarymanagement.repository.PublisherRepository;
import com.haui.librarymanagement.service.PublisherService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PublisherServiceImpl implements PublisherService {

    PublisherRepository publisherRepository;

    PublisherMapper publisherMapper;


    @Override
    public List<PublisherInBookAddResponse> getAllPublisherInBooks() {
        return publisherRepository.getAllPublishers();
    }

    @Override
    public PublisherInBookAddResponse getPublisherInBookById(int id) {
        return publisherRepository.getPublisherByById(id);
    }

    @Override
    @Transactional
    public void createPublisher(PublisherRequest request) {
        Publisher  publisher = publisherMapper.toPublisher(request);
        publisherRepository.save(publisher);
    }


    @Override
    @Transactional
    public void updatePublisher(Integer id, PublisherRequest request) {
        Publisher publisher = publisherMapper.toPublisher(publisherRepository.getPublisherByById(id));
        publisher.setName(request.getName());
        publisher.setAddress(request.getAddress());
        publisher.setPhoneNumber(request.getPhoneNumber());
        publisherRepository.save(publisher);
    }

    @Override
    @Transactional
    public void deletePublisher(Integer id) {
        publisherRepository.deleteById(id);
    }
}
















