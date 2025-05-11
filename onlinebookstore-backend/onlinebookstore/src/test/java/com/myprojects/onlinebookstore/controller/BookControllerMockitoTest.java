package com.myprojects.onlinebookstore.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.myprojects.onlinebookstore.model.Book;
import com.myprojects.onlinebookstore.repository.BookRepository;

@ExtendWith(MockitoExtension.class)
public class BookControllerMockitoTest {

	@Mock
	private BookRepository bookRepository;

	@InjectMocks
	private BookController bookController;

	// Test for GET /books to fetch all books
	@Test
	public void testGetAllBooks() {
		// Arrange
		Book book1 = new Book();
		book1.setId(1L);
		book1.setTitle("Title 1");

		Book book2 = new Book();
		book2.setId(2L);
		book2.setTitle("Title 2");

		List<Book> books = Arrays.asList(book1, book2);

		// When bookRepository.findAll() is called, return the list of books
		when(bookRepository.findAll()).thenReturn(books);

		// Act
		List<Book> result = bookController.getAllBooks();

		// Assert
		assertEquals(2, result.size());
		assertEquals("Title 1", result.get(0).getTitle());
		assertEquals("Title 2", result.get(1).getTitle());
		verify(bookRepository, times(1)).findAll();
	}

	// Test for POST /books to add a new book
	@Test
	public void testAddBook() {
		// Arrange
		Book book = new Book();
		book.setId(1L);
		book.setTitle("New Book");

		// When bookRepository.save() is called, return the same book (simulate
		// successful save)
		when(bookRepository.save(any(Book.class))).thenReturn(book);

		// Act
		Book savedBook = bookController.addBook(book);

		// Assert
		assertEquals("New Book", savedBook.getTitle());
		verify(bookRepository, times(1)).save(book);
	}

}