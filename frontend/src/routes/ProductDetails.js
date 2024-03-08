import React, { useState, useEffect } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  RingLoader,
  CircleLoader,
  SyncLoader,
  PuffLoader,
} from "react-spinners";
import axiosInstance from "./AxiosInstance";

const ProductDetails = ({ addToCart, searchQuery }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const containerHeight = products.length > 4 ? "auto" : "100vh";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response;
        if (searchQuery) {
          // If there's a search query, fetch filtered products
          response = await axiosInstance.get(`/search?query=${searchQuery}`);
        } else {
          // If no search query, fetch the product
          const response = await axiosInstance.get(`/product/${productId}`);
          setProduct(response.data);
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

    fetchProduct();
  }, [productId, searchQuery]);

  // Function to construct WhatsApp link
  const whatsappLink = (product) => {
    if (product && product.userId && product.userId.whatsapp) {
      const whatsappNumber = product.userId.whatsapp;
      console.log("waNo", whatsappNumber);
      return `https://wa.me/+${whatsappNumber}`;
    } else {
      return "WhatsApp number not found";
    }
  };

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

  // Render other content based on search results or product details
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
                        onClick={() => addToCart(product)}
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
    <div className="" style={{ backgroundColor: "#f5f0ff", height: "100vh" }}>
      {product && (
        <div>
          <div className="bg-warning mb-3">
            <h4 className="mt-5 text-center text-muted fw-bold p-3">
              {product.productName} Description
            </h4>
          </div>
          <div className="container  " style={{ backgroundColor: "white" }}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                <h5 className=" pt-3 text-secondary text-center">
                  {product.productName}
                </h5>
                <div className=" card p-1 border-0 shadow d-flex flex-row">
                  <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                    <div
                      className="image-wrapper"
                      style={{
                        width: "150px", // adjust as needed
                        height: "150px", // adjust as needed
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
                      onClick={() => addToCart(product)}
                      className="btn btn-white border-0 text-warning mt-3"
                    >
                      <FaPlus className="me-2" />
                      AddToCart
                    </button>
                  </div>
                  <div
                    className="card-body d-flex flex-column justify-content-center"
                    style={{ maxWidth: "100%", overflow: "hidden" }}
                  >
                    <h5
                      className="card-title mb-2"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "calc(100% )",
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

                    <span>
                      <a
                        href={whatsappLink(product)}
                        className="btn btn-success"
                      >
                        App Seller
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mt-1">
                <h5 className="text-secondary text-center  pt-3">
                  Product Details
                </h5>
                <div className=" card px-3 border-0 ">
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
