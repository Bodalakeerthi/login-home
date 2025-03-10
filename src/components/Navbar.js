import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from '../asserts/logo.png';

const Navbar = ({ setSearchQuery, toggleSidebar }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="text-xl" ><img src={logo}  alt="WayMart"/></Link>
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="navbar-icons">
        <Link to="/cart">
          <FaShoppingCart className="navbar-icon" />
        </Link>
        <FaUser className="navbar-icon" onClick={toggleSidebar} />
      </div>
    </nav>
  );
};

export default Navbar;
