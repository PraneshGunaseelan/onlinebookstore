// src/components/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = ({ checkout }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        // Create JSON payload from the form data
        const payload = {
            username: formData.username,
            password: formData.password,
        };

        // console.log("Payload to send for authentication:", payload);
        try {
            // Post the JSON payload to your backend URL
            const response = await axios.post("http://localhost:8081/users/authenticate", payload);

            // If the response is 200 OK, authentication is successful.
            if (response.status === 200) {
                // Optionally, process response.data (e.g., save user info or token)
                sessionStorage.setItem("currentUser", JSON.stringify(response.data.name));
                sessionStorage.setItem("userRole", JSON.stringify(response.data.role));
                checkout();
                navigate("/home");
            }
        } catch (error) {
            console.error(error);

            // Check if the response is available on the error
            if (error.response) {
                // Handle specific HTTP error status codes
                if (error.response.status === 404) {
                    setErrorMessage("User doesn't exist. Please register.");
                } else if (error.response.status === 401) {
                    setErrorMessage("Authentication failed. Please check your credentials.");
                } else {
                    setErrorMessage("An error occurred. Please try again.");
                }
            } else {
                // Fallback for network errors or unexpected errors
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/"><strong>Online Bookstore</strong></Link>
                </div>
            </nav>
            <div className="container mt-4 mb-4 border border-dark p-3 rounded">
                <h4>Login</h4>
                <hr />
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register" className="btn btn-link">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );

};

export default LoginPage;