# Online Bookstore

This application is an example of an online bookstore that features a Spring Boot back end and a React front end. 
The back end exposes RESTful API endpoints for handling books and user operations, while the front end consumes these endpoints using axios.

## Project Structure

onlinebookstore/ 
├── backend/             
# Spring Boot project (Java) 
│   ├── src/main/java/com/myprojects/onlinebookstore/ 
│       ├── controller/ 
│       │   ├── BookController.java 
│       │   └── UserController.java 
│       ├── model/ 
│       │   ├── Book.java 
│       │   └── User.java 
│       ├── repository/ 
│       │   ├── BookRepository.java 
│       │   └── UserRepository.java 
│       └── service/ 
│           └── UserService.java 
│   └── src/test/java/com/myprojects/onlinebookstore/ 
│       └── controller/ 
│           ├── BookControllerMockitoTest.java 
│           └── UserControllerMockitoTest.java 
├── frontend/            
# React project 
│   ├── public/ 
│   └── src/ 
│       ├── components/ 
│       │   ├── CheckoutPage.jsx 
│       │   ├── HomePage.jsx 
│       │   ├── LoginPage.jsx 
│       │   ├── NavigationBar.jsx 
│       │   ├── RegistrationPage.jsx 
│       │   └── UsersPage.jsx 
│       ├── App.js 
│       └── index.js
│   ├── package-lock.json
│   └── package.json
└── README.md



## Prerequisites
### Backend (Spring Boot)
- Java JDK: Version 8 or higher  
- Maven: For building the application  
- An IDE (e.g., IntelliJ IDEA, Eclipse) is recommended for development.

### Frontend (React)
- Node.js: Version 14 or later  
- npm: For dependency management

## Getting Started
### 1. Running the Backend
1. Navigate to the `backend` directory:
   cd onlinebookstore
2. Build the project using Maven:
   mvn clean install
3. Run the Spring Boot application:
   mvn spring-boot:run
   The back end will start on http://localhost:8081 unless configured otherwise.

### 2. Running the Frontend
1.  Navigate to the frontend directory:
    cd onlinebookstore-frontend
2. Install the dependencies:
   npm install
3. Start the development server:
   npm start
   The React app will open in your default browser at http://localhost:3000


## API Endpoints
Books
	- GET /books
	Retrieves all books.
	- POST /books
	Adds a new book.
	- DELETE /books/{id}
	Deletes a book by its ID.
Users
	- GET /users
	Retrieves all users.
	- POST /users
	Adds a new user.
	- POST /users/authenticate
	Authenticates a user.
	
