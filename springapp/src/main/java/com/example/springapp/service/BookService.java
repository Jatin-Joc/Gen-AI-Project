package com.example.springapp.service;

import com.example.springapp.model.Book;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService {
    public List<Book> getAllBooks() { return List.of(); }
    public List<Book> getFeaturedBooks() { return List.of(); }
    public List<Book> getBestsellers() { return List.of(); }
    public List<Book> getBooksByCategory(String category) { return List.of(); }
    public Book getBook(Long id) { return null; }
    public List<Book> searchBooks(String term) { return List.of(); }
}
