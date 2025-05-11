package com.myprojects.onlinebookstore.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.myprojects.onlinebookstore.model.User;
import com.myprojects.onlinebookstore.repository.UserRepository;
import com.myprojects.onlinebookstore.service.UserService;

@ExtendWith(MockitoExtension.class)
public class UserControllerMockitoTest {

	@Mock
	private UserRepository userRepository;

	@Mock
	private UserService userService;

	@InjectMocks
	private UserController userController;

	// Test for GET /users: retrieves all users.
	@Test
	public void testGetAllUsers() {
		// Arrange: Create sample users.
		User user1 = new User();
		user1.setId(1L);
		user1.setName("Alice");
		user1.setUsername("alice123");

		User user2 = new User();
		user2.setId(2L);
		user2.setName("Bob");
		user2.setUsername("bob456");

		List<User> users = Arrays.asList(user1, user2);

		// When findAll() is called, return our sample list.
		when(userRepository.findAll()).thenReturn(users);

		// Act: Invoke getAllUsers()
		List<User> result = userController.getAllUsers();

		// Assert: Verify that the right number of users is returned and properties
		// match.
		assertEquals(2, result.size());
		assertEquals("Alice", result.get(0).getName());
		assertEquals("Bob", result.get(1).getName());
		verify(userRepository, times(1)).findAll();
	}

	// Test for POST /users to add a new user (registration successful).
	@Test
	public void testAddUserRegistrationSuccessful() {
		// Arrange: Create a new user to register.
		User newUser = new User();
		newUser.setId(1L);
		newUser.setName("Charlie");
		newUser.setUsername("charlie123");

		// Simulate that no user exists with the provided username.
		when(userRepository.findByUsername(newUser.getUsername())).thenReturn(null);
		// Simulate a successful save.
		when(userRepository.save(newUser)).thenReturn(newUser);

		// Act: Call addUser() method.
		ResponseEntity<String> response = userController.addUser(newUser);

		// Assert: Verify that a 201 CREATED status is returned with the appropriate
		// message.
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals("User Registration successful", response.getBody());
		verify(userRepository, times(1)).findByUsername(newUser.getUsername());
		verify(userRepository, times(1)).save(newUser);
	}

	// Test for POST /users to add a new user (registration conflict when username
	// exists).
	@Test
	public void testAddUserConflict() {
		// Arrange: Create a new user object that conflicts with an existing user.
		User existingUser = new User();
		existingUser.setId(1L);
		existingUser.setName("David");
		existingUser.setUsername("david123");

		User newUser = new User();
		newUser.setName("David");
		newUser.setUsername("david123");

		// Simulate that a user already exists with the given username.
		when(userRepository.findByUsername(newUser.getUsername())).thenReturn(existingUser);

		// Act: Call addUser()
		ResponseEntity<String> response = userController.addUser(newUser);

		// Assert: Verify that a 409 CONFLICT status is returned with the proper error
		// message.
		assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
		assertEquals("Username is already taken. Please try with a different one", response.getBody());
		verify(userRepository, times(1)).findByUsername(newUser.getUsername());
		verify(userRepository, never()).save(any(User.class));
	}

}