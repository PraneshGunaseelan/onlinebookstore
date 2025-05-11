package com.myprojects.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myprojects.onlinebookstore.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
