import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";
import TopNav from "./components/topnav";
import Home from "./routes/Home";
import Furniture from "./routes/Furniture";
import Food from "./routes/Food";
import Electricals from "./routes/Electricals";
import Phones from "./routes/Phones";
import Supermarket from "./routes/Supermarket";
import Fashion from "./routes/Fashion";
import Motors from "./routes/Motors";
import Computing from "./routes/Computing";
import MyProducts from "./routes/MyProducts";
import AddProduct from "./routes/AddProduct";
import EditProduct from "./routes/EditProduct";
import Cart from "./routes/Cart";
import TopDeals from "./routes/TopDeals";
import ProductDetails from "./routes/ProductDetails";
import AxiosInstance from "./routes/AxiosInstance";
import axiosInstance from "./routes/AxiosInstance";
import Footer from "./routes/Footer";

import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

function App({ location }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartIttems] = useState([]);
  const [products, setProducts] = useState([]);

  // Function to update searchQuery state
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const fetchProducts = async () => {
    try {
      let response;
      if (searchQuery) {
        response = await axiosInstance.get(`/search?query=${searchQuery}`);
      } else {
        response = await axiosInstance.get("/cart");
      }

      const cartItems = response.data;
      setCartIttems(response.data);

      setCartItemCount(cartItems.length); // Update cart item count

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to update cart state and add product to backend
  const addToCart = async (product) => {
    try {
      // Get userId from sessionStorage
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

      // Create an object with the product details and userId
      const data = {
        ...product,
        userId: userId,
      };

      // Send a POST request to add the product to the cart
      await axiosInstance.post("/cart", data);

      // Fetch the updated cart items from the backend
      fetchProducts();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Function to remove cart item from the backend
  const removeCartItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/cart/${productId}`);
      // Fetch the updated cart items count from the backend
      const response = await axiosInstance.get("/cart");
      const cartItems = response.data;
      setProducts(cartItems);
      setCartItemCount(cartItems.length);
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  // Fetch cart items on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to check if the current route is login or signup

  const isAuthPage = () => {
    return location.pathname === "/login" || location.pathname === "/signup";
  };

  return (
    <BrowserRouter>
      {/* Render the TopNav component only if not on login or signup pages */}
      {!isAuthPage() && (
        <>
          <TopNav
            searchQuery={searchQuery}
            setSearchQuery={updateSearchQuery}
            addToCart={addToCart}
            cartItemCount={cartItemCount}
            isAuthPage={isAuthPage}
          />
          <br />
          <br />
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={<Home searchQuery={searchQuery} addToCart={addToCart} />}
        />
        <Route
          path="/electricals"
          element={
            <Electricals searchQuery={searchQuery} addToCart={addToCart} />
          }
        />
        <Route
          path="/fashion"
          element={<Fashion searchQuery={searchQuery} addToCart={addToCart} />}
        />
        <Route
          path="/food"
          element={<Food searchQuery={searchQuery} addToCart={addToCart} />}
        />
        <Route
          path="/furniture"
          element={
            <Furniture searchQuery={searchQuery} addToCart={addToCart} />
          }
        />
        <Route
          path="/phones"
          element={<Phones searchQuery={searchQuery} addToCart={addToCart} />}
        />
        <Route
          path="/supermarket"
          element={
            <Supermarket searchQuery={searchQuery} addToCart={addToCart} />
          }
        />
        <Route
          path="/motors"
          element={<Motors searchQuery={searchQuery} addToCart={addToCart} />}
        />
        <Route
          path="/computing"
          element={
            <Computing searchQuery={searchQuery} addToCart={addToCart} />
          }
        />
        <Route
          path="/myproducts"
          element={<MyProducts searchQuery={searchQuery} />}
        />
        <Route
          path="/addproduct"
          element={<AddProduct searchQuery={searchQuery} />}
        />
        <Route
          path="/editproduct/:productId"
          element={<EditProduct searchQuery={searchQuery} />}
        />
        {/* Pass the cart state and addToCart function as props to the Cart component */}
        <Route
          path="/cart"
          element={
            <Cart
              searchQuery={searchQuery}
              addToCart={addToCart}
              removeCartItem={removeCartItem}
              products={products}
              cartItems={cartItems}
            />
          }
        />
        <Route
          path="/topdeals"
          element={
            <TopDeals
              searchQuery={searchQuery}
              addToCart={addToCart}
              products={products}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={
            <ProductDetails
              searchQuery={searchQuery}
              addToCart={addToCart}
              products={products}
            />
          }
        />
        <Route
          path="/axiosInstance"
          element={
            <AxiosInstance
              searchQuery={searchQuery}
              addToCart={addToCart}
              products={products}
            />
          }
        />
        <Route path="/footer" element={<Footer />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
