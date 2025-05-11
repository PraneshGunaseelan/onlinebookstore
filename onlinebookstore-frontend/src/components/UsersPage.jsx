// src/components/Users.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // GET request to fetch all users.
                const response = await axios.get("http://localhost:8081/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                setErrorMessage("Error fetching users. Please try again.");
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container mt-4 mb-4 border border-dark p-3 rounded">
            <h4>Users</h4>
            <hr />
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <table className="table table-striped">
                <thead>
                    <tr>
                        {/* Adjust table headers as needed */}
                        <th>Name</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No users available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;