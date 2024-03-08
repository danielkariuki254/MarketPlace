import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";
import soko from "../Assets/soko3.png";
import {
  FaHome,
  FaShoppingCart,
  FaTshirt,
  FaCouch,
  FaUser,
  FaLaptop,
} from "react-icons/fa";

import {
  MdRestaurant,
  MdPhoneIphone,
  MdDevices,
  MdDirectionsCar,
} from "react-icons/md";

// import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineAppstore } from "react-icons/ai";

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div>
      <div className="hamburger-container">
        {!sidebarOpen ? (
          <button
            className=" hamburger-icon text-muted"
            onClick={handleSidebarToggle}
          >
            <FaBars className="bg-white " />
          </button>
        ) : null}
      </div>
      <div
        className={`overlay-container ${sidebarOpen ? "open" : ""}`}
        onClick={handleSidebarToggle}
      ></div>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header ms-0 ">
          <NavLink to="/" className="nav-link " onClick={handleSidebarClose}>
            <div className="   shadow p-4 ">
              <img
                className=" ms-2"
                src={soko}
                alt="uoe"
                style={{
                  width: "100px",
                  height: "50px",
                }}
              />
            </div>
          </NavLink>
        </div>

        <ul className="sidebar-nav text-muted">
          <span className="text-primary fw-bolder">Categories</span>
          <li className="links">
            <NavLink to="/" className="nav-link " onClick={handleSidebarClose}>
              <FaHome />
              Home
            </NavLink>
          </li>
          <li className="links">
            <NavLink
              to="/supermarket"
              className="nav-link "
              onClick={handleSidebarClose}
            >
              <FaShoppingCart />
              Supermarket
            </NavLink>
          </li>
          <li className="links">
            <NavLink
              to="/food"
              className="nav-link "
              onClick={handleSidebarClose}
            >
              <MdRestaurant />
              Food
            </NavLink>
          </li>
          <li className="links">
            <NavLink
              to="/fashion"
              className="nav-link "
              onClick={handleSidebarClose}
            >
              <FaTshirt /> Fashion
            </NavLink>
          </li>
          <li className="links">
            <NavLink
              to="/phones"
              className="nav-link "
              onClick={handleSidebarClose}
            >
              <MdPhoneIphone /> Phones
            </NavLink>
          </li>
          <li className="links">
            <NavLink
              to="/computing"
              className="nav-link "
              onClick={handleSidebarClose}
            >
              <FaLaptop /> Computing
            </NavLink>
          </li>

          <li className="links">
            <NavLink
              to="/electricals"
              className="nav-link "
              onClick={handleSidebarClose}
            >
              <MdDevices /> Electricals
            </NavLink>
          </li>

          <li className="links">
            <NavLink
              to="/furniture"
              className="nav-link "
              onClick={handleSidebarClose}
            >
              <FaCouch />
              Furniture
            </NavLink>
          </li>
          <li className="links">
            <NavLink
              to="/motors"
              className="nav-link "
              onClick={handleSidebarClose}
            >
              <MdDirectionsCar />
              Motors
            </NavLink>
          </li>

          <span className="text-primary fw-bolder">Account</span>
          <li className="links">
            <NavLink
              to="/account"
              className="nav-link "
              onClick={handleSidebarClose}
            >
              <FaUser />
              Account
            </NavLink>
          </li>
          <li className="links">
            <NavLink
              to="/myproducts"
              className="nav-link "
              onClick={handleSidebarClose}
            >
              <AiOutlineAppstore />
              MyProducts
            </NavLink>
          </li>
        </ul>

        <div className="close-sidebar">
          <button
            className="sidebar-toggle border-0 rounded-5 text-muted fs-6"
            onClick={handleSidebarClose}
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
