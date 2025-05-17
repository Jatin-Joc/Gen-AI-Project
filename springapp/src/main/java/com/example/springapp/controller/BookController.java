package com.example.springapp.controller;

import com.example.springapp.model.Book;
import com.example.springapp.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/featured")
    public List<Book> getFeaturedBooks() {
        return bookService.getFeaturedBooks();
    }

    @GetMapping("/bestsellers")
    public List<Book> getBestsellers() {
        return bookService.getBestsellers();
    }

    @GetMapping("/category/{category}")
    public List<Book> getBooksByCategory(@PathVariable String category) {
        return bookService.getBooksByCategory(category);
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookService.getBook(id);
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String term) {
        return bookService.searchBooks(term);
    }
}
