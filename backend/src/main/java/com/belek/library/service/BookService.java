package com.belek.library.service;

import com.belek.library.model.Book;
import com.belek.library.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book addBook(Book book) {
        if (book.getIsbn() != null && bookRepository.existsByIsbn(book.getIsbn())) {
            throw new RuntimeException("Book with this ISBN already exists");
        }

        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public Book updateBook(Long id, Book updatedBook) {
        Book book = getBookById(id);

        book.setIsbn(updatedBook.getIsbn());
        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setPublisher(updatedBook.getPublisher());
        book.setYearPublished(updatedBook.getYearPublished());
        book.setAvailableCopies(updatedBook.getAvailableCopies());

        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        Book book = getBookById(id);
        bookRepository.delete(book);
    }
}