// src/components/RegistrationPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
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

        const payload = {
            name: formData.name,
            username: formData.username,
            password: formData.password,
            role: "user"
        };

        console.log("Payload to send:", payload);

        try {
            // Perform the POST call and capture the response
            const response = await axios.post("http://localhost:8081/users", payload);

            // Registration successful if receiving a 201 Created
            if (response.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error during registration:", error);

            // Check if the error response exists and has a status code
            if (error.response) {
                if (error.response.status === 409) {
                    setErrorMessage("Username is already taken. Please try with a different one.");
                } else {
                    setErrorMessage("Registration failed. Please try again.");
                }
            } else {
                setErrorMessage("Registration failed. Please try again.");
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
                <h4>Register</h4>
                <hr />
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
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
                        Register
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="btn btn-link">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;