// src/components/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const CheckoutPage = ({ cartItems, checkout, updateCartQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  // Open the modal when "Place Order" is clicked.
  const handlePlaceOrder = () => {
    setShowModal(true);
  };

  // Confirm the order, call checkout, then navigate back to home.
  const handleConfirmOrder = () => {
    checkout();
    setShowModal(false);
    navigate("/home");
  };

  // Close the modal.
  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-4 mb-4 border border-dark p-3 rounded">
      <h4>Checkout</h4>
      <hr />
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th style={{ width: '150px' }}>Quantity</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>€{item.price.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="form-control"
                        onChange={(e) =>
                          updateCartQuantity(item.id, parseInt(e.target.value, 10) || 1)
                        }
                      />
                    </td>
                    <td>€{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <h5>Total Items: {totalItems}</h5>
            </div>
            <div className="col-md-6 text-end">
              <h5>Total Cost: €{totalCost}</h5>
            </div>
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-success" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}

      {/* Modal Component */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Order</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <p><strong>Total Items:</strong> {totalItems}</p>
                <p><strong>Total Cost:</strong> €{totalCost}</p>
                <p>Do you want to confirm your order?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                <button className="btn btn-info" onClick={handleConfirmOrder}>
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CheckoutPage;