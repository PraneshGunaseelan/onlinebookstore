// src/components/HomePage.jsx
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = ({ books, addToCart }) => {
  return (
    <div className="container mt-4 mb-4 border border-dark p-3 rounded">
      <h4>Available Books</h4>
      <hr />
      {books.length === 0 ? (
        <p>Unfortunately we don't have any books in the store at the moment. Please revisit later!</p>
      ) : (
        <>
          <div className="row">
            {books.map(book => (
              <div key={book.id} className="col-md-3 mb-4">
                <div className="card">
                  <img
                    src="https://wallpapers.com/images/hd/aesthetic-book-pictures-2000-x-1280-wvpys3rxsj7tptie.jpg"
                    alt={book.title}
                    className="card-img-top"

                  />
                  <div className="card-body bg-light d-flex flex-column">
                    <h5 className="card-title">{book.title}</h5>
                    <hr />
                    <div className="card-text"><strong>Author:</strong> {book.author}</div>
                    <div className="card-text mb-4"><strong>Price:</strong> €{book.price}</div>
                    <button
                      className="btn btn-info mt-auto"
                      onClick={() => addToCart(book)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;