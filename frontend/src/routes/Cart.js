import React, { useState, useEffect } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInstance from "../routes/AxiosInstance";

const Cart = ({
  searchQuery,
  removeCartItem,
  products,

  addToCart,
  cartItems,
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const containerHeight = products.length > 4 ? "auto" : "100vh";

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        if (searchQuery) {
          const response = await axiosInstance.get(
            `/search?query=${searchQuery}`
          );
          setFilteredProducts(response.data);
          setNoResults(response.data.length === 0 && !!searchQuery);
        } else {
          setFilteredProducts(products);
        }
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchFilteredProducts();
  }, [searchQuery, products]);

  if (searchQuery && noResults) {
    // Render error message if no products found for search query
    return (
      <div style={{ backgroundColor: "#f5f0ff", height: containerHeight }}>
        <div className="bg-warning mb-3">
          <h1 className="mt-5 text-center text-muted fw-bold p-3">
            Search Results for "{searchQuery}"
          </h1>
        </div>
        <div className="container" style={{ backgroundColor: "white" }}>
          <div className="text-center text-danger mt-5 p-5">
            <AiOutlineCloseCircle className="mb-2" size={100} />
            <div className="text-warning h1">Oops! No item was found</div>
          </div>
        </div>
      </div>
    );
  } else if (searchQuery) {
    // Render search results for the query
    return (
      <div style={{ backgroundColor: "#f5f0ff", height: containerHeight }}>
        <div className="bg-warning mb-3">
          <h1 className="mt-5 text-center text-muted fw-bold p-3">
            Search Results for "{searchQuery}"
          </h1>
        </div>
        <div className="container" style={{ backgroundColor: "white" }}>
          <div className="row">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="col-lg-3 col-md-6 col-sm-6 col-6 mb-4"
              >
                {/* Render individual search result items */}
                <Link
                  to={`/product/${product._id}`}
                  className="text-decoration-none"
                >
                  <div className="product-card card p-1 border-0 shadow">
                    <div
                      className="image-wrapper"
                      style={{ height: "200px", overflow: "hidden" }}
                    >
                      <img
                        src={`${axiosInstance.defaults.baseURL}/${product.picture}`}
                        className="card-img-top"
                        alt={product.productName}
                        style={{ objectFit: "cover", height: "100%" }}
                      />
                    </div>
                    <div className="card-body">
                      <h6
                        className="card-title"
                        style={{
                          maxWidth: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.productName}
                      </h6>
                      <p className="card-text">
                        <div
                          className="discount-price text-muted"
                          style={{ textDecoration: "line-through" }}
                        >
                          Ksh{product.priceBeforeDiscount}
                        </div>
                        <div className="h4">
                          Ksh{product.priceAfterDiscount}
                        </div>
                      </p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        className="btn btn-warning me-1"
                      >
                        AddToCart
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    // Fetch and display data from the cart
    return (
      <div style={{ backgroundColor: "#f5f0ff", height: containerHeight }}>
        <div className="mt-2">
          <div className="bg-warning mb-3">
            <h1 className="mt-5 text-center text-muted fw-bold p-3">
              Cart Items
            </h1>
          </div>
          <div className="container " style={{ backgroundColor: "white" }}>
            <div className="row">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3 "
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="text-decoration-none"
                  >
                    <div className="product-card card p-1 border-0 shadow d-flex flex-row">
                      <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                        <div
                          className="image-wrapper"
                          style={{
                            width: "150px",
                            height: "150px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={`${axiosInstance.defaults.baseURL}/${product.picture}`}
                            className="card-img-top"
                            alt={product.productName}
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            removeCartItem(product._id);
                          }}
                          className="btn btn-white border-0 text-danger mt-3"
                        >
                          <FaTrash className="me-2" />
                          Remove
                        </button>
                      </div>
                      <div
                        className="card-body d-flex flex-column justify-content-center"
                        style={{ maxWidth: "100%", overflow: "hidden" }}
                      >
                        <h5
                          className="card-title mb-2"
                          style={{
                            maxWidth: "calc(100% )",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {product.productName}
                        </h5>
                        <p className="card-text mb-2">
                          <span className="h4 me-2 fw-bold">
                            Ksh{product.priceAfterDiscount}
                          </span>
                          <span
                            className="discount-price text-muted"
                            style={{ textDecoration: "line-through" }}
                          >
                            Ksh{product.priceBeforeDiscount}
                          </span>
                        </p>
                        <div className="mb-2">
                          <span className="fw-bold me-2">Category:</span>
                          {product.category}
                        </div>

                        <div className="mb-2 text-warning">
                          {product.quantity} Items Available
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;
