// src/components/NavigationBar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = ({ cartItemCount }) => {
  // Read the user from session storage and parse it as JSON.
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const userRole = JSON.parse(sessionStorage.getItem("userRole"));
  // console.log("currentUser :" + currentUser);
  // console.log("userRole :" + userRole);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/"><strong>Online Bookstore</strong> </Link>
        {currentUser && (
          <span className="align-left text-white">
            Welcome, {currentUser}!
          </span>
        )}
        <div className="d-flex ">
          <ul className="navbar-nav flex-row me-3">
            <li className="nav-item me-3">
              <NavLink className="nav-link" to="/home">Books</NavLink>
            </li>
            {userRole === "admin" ? <li className="nav-item me-3">
              <NavLink className="nav-link" to="/users">Users</NavLink>
            </li> : <li className="nav-item me-3">
              <NavLink className="nav-link" to="/checkout">Checkout</NavLink>
            </li>}
            <li className="nav-item me-3">
              <NavLink className="nav-link" to="/">Logout</NavLink>
            </li>
          </ul>
          <Link to="/checkout" className="btn btn-outline-light position-relative">
            Cart
            <span className="badge bg-danger ms-2">{cartItemCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;