import React, { useState, useEffect } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

import {
  RingLoader,
  CircleLoader,
  SyncLoader,
  PuffLoader,
} from "react-spinners";
import axiosInstance from "../routes/AxiosInstance";

const Fashion = ({ searchQuery, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const containerHeight = products.length > 4 ? "auto" : "100vh";
  const [loading, setLoading] = useState(true);
  // Function to fetch products from the backend
  const fetchProducts = async () => {
    try {
      let response;
      if (searchQuery) {
        // If there's a search query, fetch filtered products
        response = await axiosInstance.get(`/search?query=${searchQuery}`);
      } else {
        // If no search query, fetch all products
        response = await axiosInstance.get("/products/fashion");
      }
      // Set the fetched products in the state
      setProducts(response.data);
      setLoading(false);
      // Check if there are no search results
      setNoResults(response.data.length === 0 && !!searchQuery);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // useEffect hook to fetch products when the component mounts or when searchQuery changes
  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  if (loading) {
    // Render loading indicator while fetching data
    return (
      <div
        className="bg-warning"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f0ff",
          height: "100vh",
        }}
      >
        <PuffLoader color="black" />

        {/* <div class="spinner-border spinner-border-lg text-light"></div> */}
      </div>
    );
  }

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
            <div className="text-warning h1">
              Oops! {searchQuery} was not found
            </div>
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
            {products.map((product) => (
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
  }

  // Render all products if there's no search query
  return (
    <div style={{ backgroundColor: "#f5f0ff", height: containerHeight }}>
      <div className="bg-warning mb-3">
        <h1 className="mt-5 text-center text-muted fw-bold p-3">Fashion</h1>
      </div>
      <div className="container" style={{ backgroundColor: "white" }}>
        <div className="row">
          {products.map((product) => (
            <div
              key={product._id}
              className="col-lg-3 col-md-6 col-sm-6 col-6 mb-4"
            >
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
                      <div className="h4">Ksh{product.priceAfterDiscount}</div>
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
};

export default Fashion;
