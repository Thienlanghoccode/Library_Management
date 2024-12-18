package com.haui.librarymanagement.service.impl;

import com.haui.librarymanagement.dto.request.CategoryCreateRequest;
import com.haui.librarymanagement.dto.response.BookResponse;
import com.haui.librarymanagement.dto.response.BooksResponse;
import com.haui.librarymanagement.dto.response.CategoryResponse;
import com.haui.librarymanagement.entity.Book;
import com.haui.librarymanagement.entity.Category;
import com.haui.librarymanagement.exception.AppException;
import com.haui.librarymanagement.exception.ErrorCode;
import com.haui.librarymanagement.mapper.BookMapper;
import com.haui.librarymanagement.mapper.CategoryMapper;
import com.haui.librarymanagement.repository.BookRepository;
import com.haui.librarymanagement.repository.CategoryRepository;
import com.haui.librarymanagement.service.CategoryService;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CategoryServiceImpl implements CategoryService {

    CategoryRepository categoryRepository;

    BookRepository bookRepository;

    CategoryMapper categoryMapper;

    BookMapper bookMapper;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, BookRepository bookRepository,
                               CategoryMapper categoryMapper, BookMapper bookMapper) {
        this.categoryRepository = categoryRepository;
        this.bookRepository = bookRepository;
        this.categoryMapper = categoryMapper;
        this.bookMapper = bookMapper;
    }

    @Override
    public BooksResponse getBooksByCategory(int id, int pageNo, int pageSize, String sortBy, String sortDir) {
        if (!categoryRepository.existsById(id)) {
            throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
        }
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<Book> books = bookRepository.findByCategoryId(id, pageable);

        List<BookResponse> bookResponses = books.getContent().stream()
                .map(bookMapper::toBookResponse).collect(Collectors.toList());
        BooksResponse booksResponse = new BooksResponse();
        booksResponse.setContent(bookResponses);
        booksResponse.setPageNo(books.getNumber());
        booksResponse.setPageSize(books.getSize());
        booksResponse.setTotalPages(books.getTotalPages());
        booksResponse.setTotalElements(books.getTotalElements());
        booksResponse.setLast(books.isLast());

        return booksResponse;
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream().map(categoryMapper::toCategoryResponse).toList();
    }

    @Override
    @Transactional
    public CategoryResponse createCategory(CategoryCreateRequest request) {
        Category category = categoryMapper.toCategory(request);
        category.setCreatedAt(LocalDateTime.now());
        category.setUpdatedAt(LocalDateTime.now());
        category.setTotalBooks(0);
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public void removeCategory(int categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isEmpty()) {
            throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
        }
        if (category.get().getTotalBooks() != 0) {
            throw new AppException(ErrorCode.CAN_NOT_REMOVE_CATEGORY);
        }
        categoryRepository.deleteById(categoryId);

    }

    @Override
    @Transactional
    public CategoryResponse updateCategory(Integer id, CategoryCreateRequest request) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));

        category.setUpdatedAt(LocalDateTime.now());
        category.setName(request.getName());

        categoryRepository.save(category);

        return categoryMapper.toCategoryResponse(category);
    }
}














