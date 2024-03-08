import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import axiosInstance from "../routes/AxiosInstance";

const EditProduct = ({ showModal, handleCloseModal, productId }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [formError, setFormError] = useState("");

  // Define dropdown options for categories
  const categoryOptions = [
    "Supermarket",
    "Food",
    "Fashion",
    "Phones",
    "Electricals",
    "Computing",
    "Furniture",
    "Motors",
  ];

  useEffect(() => {
    // Fetch product data based on productId
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}`);
        const productData = response.data;
        setProductName(productData.productName);
        setCategory(productData.category);
        setQuantity(productData.quantity);
        setPriceBeforeDiscount(productData.priceBeforeDiscount);
        setPriceAfterDiscount(productData.priceAfterDiscount);
        setDescription(productData.description);
        setPicturePreview(productData.picture); // Set picture preview if available
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleEditProduct = async () => {
    try {
      // Check if any required field is empty
      if (
        !productName ||
        !category ||
        !quantity ||
        !priceBeforeDiscount ||
        !priceAfterDiscount ||
        !description
      ) {
        setFormError("Please fill out all required fields.");
        return;
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("priceBeforeDiscount", priceBeforeDiscount);
      formData.append("priceAfterDiscount", priceAfterDiscount);
      formData.append("description", description);
      if (picture) {
        formData.append("picture", picture);
      }

      // Make a PUT request to update the product
      const response = await axiosInstance.put(
        `/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);

      setFormError("");
      handleCloseModal();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  // Function to handle file input change
  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
    setPicturePreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header className="border-0" closeButton></Modal.Header>
      <Modal.Title className="text-center">Edit Product</Modal.Title>
      <Modal.Body>
        {formError && <p className="text-danger">{formError}</p>}
        <div className="form-group">
          <label htmlFor="productName">
            Product Name <span className="text-danger">*</span>
          </label>
          <input
            id="productName"
            className="form-control text-muted"
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">
            Category <span className="text-danger">*</span>
          </label>
          <select
            id="category"
            className="form-control text-muted mt-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled className="fw-bold text-dark">
              Select Category
            </option>
            {categoryOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">
            Quantity <span className="text-danger">*</span>
          </label>
          <input
            id="quantity"
            className="form-control text-muted"
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priceBeforeDiscount">
            Price Before Discount <span className="text-danger">*</span>
          </label>
          <input
            id="priceBeforeDiscount"
            className="form-control text-muted mt-2"
            type="number"
            placeholder="Price Before Discount"
            value={priceBeforeDiscount}
            onChange={(e) => setPriceBeforeDiscount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priceAfterDiscount">
            Price After Discount <span className="text-danger">*</span>
          </label>
          <input
            id="priceAfterDiscount"
            className="form-control text-muted mt-2"
            type="number"
            placeholder="Price After Discount"
            value={priceAfterDiscount}
            onChange={(e) => setPriceAfterDiscount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">
            Description <span className="text-danger">*</span>
          </label>
          <textarea
            id="description"
            className="form-control text-muted mt-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="picture">Picture</label>
          <input
            id="picture"
            className="form-control text-muted mt-2"
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
          />
          {picturePreview && (
            <img
              src={picturePreview}
              alt="Product Preview"
              className="img-fluid mt-2"
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="warning" onClick={handleEditProduct}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProduct;
