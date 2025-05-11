package com.myprojects.onlinebookstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myprojects.onlinebookstore.model.User;
import com.myprojects.onlinebookstore.repository.UserRepository;
import com.myprojects.onlinebookstore.service.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@GetMapping
	public List<User> getAllUsers() {
		System.out.println("Inside getAllUsers() of UserController");
		return userRepository.findAll();
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addUser(@RequestBody User user) {
		System.out.println("Inside addUser() of UserController for: " + user.getName());

		// Look up the user by username
		User foundUser = userRepository.findByUsername(user.getUsername());

		if (foundUser == null) {
			// Save the new user
			userRepository.save(user);
			return new ResponseEntity<>("User Registration successful", HttpStatus.CREATED);
		} else {
			// User already exists, so return a conflict response.
			return new ResponseEntity<>("Username is already taken. Please try with a different one",
					HttpStatus.CONFLICT);
		}
	}

	@PostMapping(value = "/authenticate", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> authenticate(@RequestBody User user) {
		System.out.println("Inside authenticate of UserController for: " + user.getUsername());
		return userService.authenticateUser(user);
	}

}
