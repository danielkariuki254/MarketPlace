// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
// import AddProduct from "../routes/AddProduct";
// import { BsSearch } from "react-icons/bs";
// import soko from "../Assets/soko3.png";
// import { FaUser } from "react-icons/fa";
// import { BsCart4 } from "react-icons/bs";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import { FaSignInAlt } from "react-icons/fa";
// import { FaUserPlus } from "react-icons/fa";
// import { FaProductHunt } from "react-icons/fa";

// const TopNav = ({ setSearchQuery, searchQuery }) => {
//   const [showSearch, setShowSearch] = useState(false);
//   const [showAccountDropdown, setShowAccountDropdown] = useState(false);
//   const searchRef = useRef(null);
//   const searchIconRef = useRef(null);
//   const accountDropdownRef = useRef(null);
//   const [showModal, setShowModal] = useState(false); // State variable for showing modal
//   const handleCloseModal = () => {
//     setShowModal(false); // Close modal
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target) &&
//         !searchIconRef.current.contains(event.target) &&
//         !accountDropdownRef.current.contains(event.target)
//       ) {
//         setShowSearch(false);
//         setShowAccountDropdown(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const handleSearchIcon = () => {
//     setShowSearch(!showSearch);
//     setShowAccountDropdown(false); // Close account dropdown when opening search
//   };

//   const handleSearch = async () => {
//     try {
//       // Send a GET request to your backend API with the search query
//       const response = await axios.get(
//         `http://localhost:8000/search?query=${searchQuery}`
//       );
//       // Set the search results based on the response from the backend

//       setSearchQuery(response.data);
//     } catch (error) {
//       console.error("Error searching:", error);
//     }
//   };

//   const toggleAccountDropdown = () => {
//     setShowAccountDropdown(!showAccountDropdown);
//     setShowSearch(false); // Close search when opening account dropdown
//   };

//   const handleDropdownItemClick = (option) => {
//     alert("Clicked on:", option);
//     // Perform further actions here such as navigation
//   };

//   return (
//     <>
//       <div className="container-fluid fixed-top bg-white">
//         <div className="row shadow p-3 ">
//           <div className="col d-flex align-items-center position-relative ">
//             <div>
//               <Navbar />
//             </div>
//             <div className="ms-3">
//               <img
//                 className=""
//                 src={soko}
//                 alt="uoe"
//                 style={{
//                   width: "60px",
//                   height: "30px",
//                 }}
//               />
//             </div>
//             <div
//               ref={searchIconRef}
//               className="input-group-text search-icon text-warning bg-white border-0  ms-1Ss"
//               onClick={handleSearchIcon}
//             >
//               <BsSearch className="fs-3" />
//             </div>
//             <div className="flex-grow-1"></div> {/* Flex grow spacer */}
//             <div className="dropdown" ref={accountDropdownRef}>
//               {/* Display both icon and text on large screens */}
//               <button
//                 className="btn btn-white dropdown-toggle border-0 d-none d-sm-inline-block"
//                 type="button"
//                 onClick={toggleAccountDropdown}
//               >
//                 <FaUser className="fs-5 me-1 text-warning" />
//                 Account
//               </button>
//               {/* Display only icon on small screens */}
//               <button
//                 className="btn btn-white dropdown-toggle border-0 d-inline-block d-sm-none"
//                 type="button"
//                 onClick={toggleAccountDropdown}
//               >
//                 <FaUser className="fs-5 text-warning" />
//               </button>

//               {showAccountDropdown && (
//                 <ul className="dropdown-menu show">
//                   <li>
//                     <button
//                       className="dropdown-item"
//                       onClick={() => handleDropdownItemClick("Login")}
//                     >
//                       <FaSignInAlt className="fs-5 text-warning me-2" />
//                       Login
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       className="dropdown-item"
//                       onClick={() => handleDropdownItemClick("Signup")}
//                     >
//                       <FaUserPlus className="fs-5 text-warning me-2" />
//                       Signup
//                     </button>
//                   </li>
//                   <li>
//                     <Link to="/myproducts" className="dropdown-item">
//                       <FaProductHunt className="fs-5 text-warning me-2" />
//                       My Products
//                     </Link>
//                   </li>
//                   <li>
//                     <button
//                       className="dropdown-item"
//                       onClick={() => setShowModal(true)}
//                     >
//                       <AiOutlinePlusCircle className="fs-5 text-warning me-2" />
//                       Add Product
//                     </button>
//                     <AddProduct
//                       showModal={showModal}
//                       handleCloseModal={handleCloseModal}
//                     />
//                   </li>
//                 </ul>
//               )}
//             </div>
//             <div className="d-flex flex-row justify-content-end ms-2 me-3 ">
//               {/* Display both icon and text on large screens */}
//               <div className="d-none d-sm-inline-block">
//                 <BsCart4 className="fs-5 me-1 text-warning" />
//                 Cart
//               </div>
//               {/* Display only icon on small screens */}
//               <div className="d-inline-block d-sm-none">
//                 <BsCart4 className="fs-5 text-warning" />
//               </div>
//             </div>
//           </div>
//           {showSearch && (
//             <div
//               className="position-absolute  col-lg-6 col-md-6 col-sm-10 col-10"
//               ref={searchRef}
//               style={{ marginTop: "30px" }}
//             >
//               <div className="input-group mt-4">
//                 <input
//                   className="form-control  text-muted fs-5"
//                   type="text"
//                   placeholder="Search Product, Brand and Category"
//                   style={{
//                     backgroundColor: "#f5f0ff",
//                     border: "2px solid black",
//                   }}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />

//                 <button className="btn btn-secondary" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TopNav;

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProductModal from "../routes/AddProduct"; // Assuming you have a modal component for adding a product
import { BsSearch } from "react-icons/bs";
import soko from "../Assets/soko3.png";
import { FaUser } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import axiosInstance from "../routes/AxiosInstance";

const TopNav = ({ setSearchQuery, cartItemCount }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);
  const searchIconRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !searchIconRef.current.contains(event.target) &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setShowAccountDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchIcon = () => {
    setShowSearch(!showSearch);
    setShowAccountDropdown(false);
  };

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`/search?query=${searchValue}`);
      setSearchQuery(searchValue);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setSearchValue("");
    }
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
    setShowSearch(false);
  };

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null; // If on login or signup pages, don't render TopNav
  }

  // Function to check if the user is logged in
  const isLoggedIn = () => {
    return !!sessionStorage.getItem("token");
  };

  const toggleAddProductModal = () => {
    if (isLoggedIn()) {
      setShowModal(!showModal);
    } else {
      // Redirect the user to the login page
      navigate("/login");
    }
  };

  return (
    <div className="container-fluid fixed-top bg-white">
      <div className="row shadow p-3 ">
        <div className="col d-flex align-items-center position-relative ">
          <div>
            <Navbar />
          </div>
          <Link to={`/`} className="text-decoration-none">
            <div className="ms-3">
              <img
                className=""
                src={soko}
                alt="uoe"
                style={{
                  width: "60px",
                  height: "30px",
                }}
              />
            </div>
          </Link>
          <div
            ref={searchIconRef}
            className="input-group-text search-icon text-warning bg-white border-0  ms-1Ss"
            onClick={handleSearchIcon}
          >
            <BsSearch className="fs-3" />
          </div>
          <div className="flex-grow-1"></div>
          <div className="dropdown" ref={accountDropdownRef}>
            <button
              className="btn btn-white dropdown-toggle border-0 d-none d-sm-inline-block"
              type="button"
              onClick={toggleAccountDropdown}
            >
              <FaUser className="fs-5 me-1 text-warning" />
              Account
            </button>
            <button
              className="btn btn-white dropdown-toggle border-0 d-inline-block d-sm-none"
              type="button"
              onClick={toggleAccountDropdown}
            >
              <FaUser className="fs-5 text-warning" />
            </button>
            {showAccountDropdown && (
              <ul className="dropdown-menu show">
                <li>
                  <Link
                    to={`/login`}
                    className="dropdown-item text-decoration-none"
                  >
                    <FaSignInAlt className="fs-5 text-warning me-2" />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/signup`}
                    className="dropdown-item text-decoration-none"
                  >
                    <FaUserPlus className="fs-5 text-warning me-2" />
                    Signup
                  </Link>
                </li>
                <li>
                  <Link to="/myproducts" className="dropdown-item">
                    <FaProductHunt className="fs-5 text-warning me-2" />
                    My Products
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={toggleAddProductModal}
                  >
                    <AiOutlinePlusCircle className="fs-5 text-warning me-2" />
                    Add Product
                  </button>
                </li>
              </ul>
            )}
          </div>
          <div className="d-flex flex-row justify-content-end ms-2 me-3 ">
            <Link
              to="/cart"
              className="btn btn-white border-0 d-none d-sm-inline-block"
              style={{ position: "relative" }}
            >
              <BsCart4 className="fs-5 me-1 text-warning" />
              <sup
                style={{
                  borderRadius: "50%",
                  backgroundColor: "red",
                  color: "white",
                  padding: "1px",
                  fontSize: "small",
                  width: "17px",
                  height: "17px",
                  textAlign: "center",
                  display: "inline-block",
                  position: "absolute",
                  top: "2px",
                  right: "44px",
                  lineHeight: "15px",
                }}
              >
                {cartItemCount}
              </sup>
              Cart
            </Link>
            <Link
              to="/cart"
              className="btn btn-white border-0 d-inline-block d-sm-none"
            >
              <BsCart4 className="fs-5 text-warning" />
              <sup
                style={{
                  borderRadius: "50%",
                  backgroundColor: "red",
                  color: "white",
                  padding: "1px",
                  fontSize: "small",
                  width: "17px",
                  height: "17px",
                  textAlign: "center",
                  display: "inline-block",
                  position: "absolute",
                  top: "2px",
                  right: "35px",
                  lineHeight: "15px",
                }}
              >
                {cartItemCount}
              </sup>
            </Link>
          </div>
        </div>
        {showSearch && (
          <div
            className="position-absolute  col-lg-6 col-md-6 col-sm-11 col-11"
            ref={searchRef}
            style={{ marginTop: "30px" }}
          >
            <div className="input-group mt-4">
              <input
                className="form-control  text-muted fs-5"
                type="text"
                placeholder="Search Product, Category and Brand "
                style={{
                  backgroundColor: "#f5f0ff",
                  border: "2px solid black",
                }}
                value={searchValue}
                onChange={handleInputChange}
              />
              <button className="btn btn-secondary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        )}
      </div>
      <AddProductModal
        showModal={showModal}
        handleCloseModal={() => setShowModal(false)}
      />
    </div>
  );
};

export default TopNav;
