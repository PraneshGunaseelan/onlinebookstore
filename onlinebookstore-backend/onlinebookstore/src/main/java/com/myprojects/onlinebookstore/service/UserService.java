package com.myprojects.onlinebookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.myprojects.onlinebookstore.model.User;
import com.myprojects.onlinebookstore.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public ResponseEntity<?> authenticateUser(User user) {
		try {
			System.out.println("Inside authenticate of UserService for: " + user.getUsername());

			// Look up the user by username
			User foundUser = userRepository.findByUsername(user.getUsername());

			// If the user is not found, return a 404 Not Found
			if (foundUser == null) {
				System.out.println("User: " + user.getUsername() + " doesn't exist in our system.");
				return new ResponseEntity<>("User doesn't exist in our system. Please register to continue",
						HttpStatus.NOT_FOUND);
			}

			// If the password does not match, return a 401 Unauthorized
			if (!foundUser.getPassword().equals(user.getPassword())) {
				System.out.println("Authentication failed for the user: " + user.getUsername());
				return new ResponseEntity<>("Authentication failed. Please check your credentials.",
						HttpStatus.UNAUTHORIZED);
			}

			// If both username and password are correct, return 200 OK
			System.out.println("Authentication successful for the user: " + user.getUsername());
			foundUser.setPassword(null);
			return new ResponseEntity<>(foundUser, HttpStatus.OK);

		} catch (DataAccessException dae) {
			System.out.println("Database error during authentication: " + dae.getMessage());
			return new ResponseEntity<>("A server error occurred. Please try again later.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (NullPointerException npe) {
			System.out.println("Null value encountered: " + npe.getMessage());
			return new ResponseEntity<>("Incomplete user data provided.", HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			System.out.println("An unexpected error occurred: " + e.getMessage());
			return new ResponseEntity<>("An unexpected error occurred. Please try again.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
