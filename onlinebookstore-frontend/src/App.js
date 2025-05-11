// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import CheckoutPage from "./components/CheckoutPage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import UsersPage from "./components/UsersPage";

const App = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch the list of books from the backend.
  useEffect(() => {
    axios
      .get("http://localhost:8081/books")
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  // Add a book to the cart (or update its quantity) and show a toast.
  const addToCart = (book) => {
    const existingItem = cart.find(item => item.id === book.id);
    if (existingItem) {
      setCart(
        cart.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
    // Show toast message for 3 seconds.
    setToastMessage("Item successfully added to cart");
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Update the quantity for a cart item.
  const updateCartQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map(item =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove an item from the cart.
  const removeFromCart = (bookId) => {
    setCart(cart.filter(item => item.id !== bookId));
  };

  // Checkout process: Clear the cart.
  const checkout = () => {
    setCart([]);
  };

  // Calculate total number of items in the cart.
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      {/* Toast message (global) */}
      {toastMessage && (
        <div
          className="toast show position-fixed top-0 end-0 m-3"
          style={{ zIndex: 9999, minWidth: "250px" }}
        >
          <div className="toast-header bg-success text-white">
            <strong className="me-auto">Success</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setToastMessage(null)}
            ></button>
          </div>
          <div className="toast-body">
            {toastMessage}
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<LoginPage checkout={checkout} />} />
        <Route path="/login" element={<LoginPage checkout={checkout} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/users" element={
          <>
            <NavigationBar cartItemCount={cartItemCount} />
            <UsersPage />
          </>
        } />
        <Route
          path="/home"
          element={
            <>
              <NavigationBar cartItemCount={cartItemCount} />
              <div className="container mt-4">
                <HomePage books={books} addToCart={addToCart} />
              </div>
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <NavigationBar cartItemCount={cartItemCount} />
              <CheckoutPage
                cartItems={cart}
                checkout={checkout}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
              />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;