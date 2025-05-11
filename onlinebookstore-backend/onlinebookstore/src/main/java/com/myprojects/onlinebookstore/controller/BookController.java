package com.myprojects.onlinebookstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myprojects.onlinebookstore.model.Book;
import com.myprojects.onlinebookstore.repository.BookRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/books")
public class BookController {

	@Autowired
	private BookRepository bookRepository;

	@GetMapping
	public List<Book> getAllBooks() {
		return bookRepository.findAll();
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public Book addBook(@RequestBody Book book) {
		System.out.println("Inside addBook() of BookController for: " + book.getTitle());
		return bookRepository.save(book);
	}

}
