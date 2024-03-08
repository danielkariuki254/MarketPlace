import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import axiosInstance from "../routes/AxiosInstance";

const AddProduct = ({ showModal, handleCloseModal }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [formError, setFormError] = useState(""); // State to manage form error

  // Define dropdown options for categories
  const categoryOptions = [
    "Supermarket",
    "Food",
    "Fashion",
    "Phones",
    "Electricals",
    "Computing",
    "Furnitures",
    "Motors",
  ];

  const handleAddProduct = async () => {
    try {
      // Check if any required field is empty
      if (
        !productName ||
        !category ||
        !quantity ||
        !priceBeforeDiscount ||
        !priceAfterDiscount ||
        !description ||
        !picture
      ) {
        setFormError("Please fill out all required fields.");
        return;
      }

      const token = sessionStorage.getItem("token");

      if (!token) {
        console.error("Token not found in session storage.");
        return;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      if (!decodedToken || !decodedToken.userId) {
        console.error("User id not found in token.");
        return;
      }

      const userId = decodedToken.userId;

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("productName", productName);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("priceBeforeDiscount", priceBeforeDiscount);
      formData.append("priceAfterDiscount", priceAfterDiscount);
      formData.append("description", description);
      formData.append("picture", picture);

      // Make a POST request to your backend API to add the product
      const response = await axiosInstance.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); // Log the response from the backend

      // Optionally, you can reset the form fields after successful submission
      setProductName("");
      setCategory("");
      setQuantity("");
      setPriceBeforeDiscount("");
      setPriceAfterDiscount("");
      setDescription("");
      setPicture(null);
      setFormError("");
      handleCloseModal(); // Close modal after successful submission
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header className="border-0" closeButton></Modal.Header>
      <Modal.Title className="text-center">Add Product</Modal.Title>
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
            required // Add the required attribute
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
            required // Add the required attribute
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
          <label htmlFor="Quantity">
            Quantity <span className="text-danger">*</span>
          </label>
          <input
            id="Quantity"
            className="form-control text-muted"
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required // Add the required attribute
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
            required // Add the required attribute
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
            required // Add the required attribute
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
            required // Add the required attribute
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="picture">
            Picture <span className="text-danger">*</span>
          </label>
          <input
            id="picture"
            className="form-control text-muted mt-2"
            type="file"
            accept="image/*"
            onChange={(e) => setPicture(e.target.files[0])}
            required // Add the required attribute
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="warning" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProduct;
