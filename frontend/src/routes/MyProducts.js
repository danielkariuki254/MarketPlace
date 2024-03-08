import React, { useState, useEffect } from "react";

import { FaTrash, FaEdit } from "react-icons/fa";
import EditProduct from "./EditProduct";
import { Modal, Button } from "react-bootstrap";
import {
  RingLoader,
  CircleLoader,
  SyncLoader,
  PuffLoader,
} from "react-spinners";
import axiosInstance from "../routes/AxiosInstance";

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerHeight = products.length > 4 ? "auto" : "100vh";

  // Function to fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products/myproducts");
      // Set the fetched products in the state
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // Function to delete a product
  const deleteProduct = async () => {
    try {
      await axiosInstance.delete(`/products/${selectedProductId}`);
      // Fetch products again after deletion
      fetchProducts();

      setShowDeleteModal(false);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // useEffect hook to fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle edit icon click
  const handleEditIconClick = (productId) => {
    setSelectedProductId(productId);
    setShowEditModal(true);
    setLoading(false);
  };

  // Function to handle delete icon click
  const handleDeleteIconClick = (productId) => {
    setSelectedProductId(productId);
    setShowDeleteModal(true);
    setLoading(false);
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

  return (
    <div style={{ backgroundColor: "#f5f0ff", height: containerHeight }}>
      <div className="bg-warning mb-3">
        <h1 className="mt-5 text-center text-muted fw-bold p-3">My Products</h1>
      </div>
      <div className="container" style={{ backgroundColor: "white" }}>
        <div className="row">
          {products.map((product) => (
            <div
              key={product._id}
              className="col-lg-3 col-md-6 col-sm-6 col-6 my-1"
            >
              <div className="card p-1 border-0 shadow">
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

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-white border-0"
                      onClick={() => handleEditIconClick(product._id)}
                    >
                      <FaEdit className="text-secondary" />
                    </button>
                    <button
                      className="btn btn-white border-0"
                      onClick={() => handleDeleteIconClick(product._id)}
                    >
                      <FaTrash className="text-danger " />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header
          closeButton
          className="border-0"
          style={{ textAlign: "center" }}
        ></Modal.Header>
        <Modal.Title className="text-center text-danger ">
          <h3>Confirm Delete</h3>
        </Modal.Title>
        <Modal.Body className="border-0 text-center">
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={deleteProduct}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Render the EditProduct modal */}
      {showEditModal && (
        <EditProduct
          showModal={showEditModal}
          handleCloseModal={() => setShowEditModal(false)}
          productId={selectedProductId} // Pass selectedProductId to the modal
        />
      )}
    </div>
  );
};

export default MyProducts;
