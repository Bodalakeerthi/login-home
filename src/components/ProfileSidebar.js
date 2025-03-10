import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";

const ProfileSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay to close sidebar when clicked */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <div className={`sidebar ${isOpen ? "open" : ""}`} role="navigation" aria-hidden={!isOpen}>
        <ul>
          <li>
            <Link to="/profile" onClick={toggleSidebar}>Profile</Link>
          </li>
          <li>
            <Link to="/orders" onClick={toggleSidebar}>Orders</Link>
          </li>
          <li>
            <Link to="/settings" onClick={toggleSidebar}>Settings</Link>
          </li>
          <li>
            <Link to="/logout" onClick={toggleSidebar}>Logout</Link>
          </li>
        </ul>
        <div className="sidebar-footer">
        <h1>Get in Touch</h1>
        <p>Have a question or need assistance? Contact us today and we'll be happy to help!</p>
        <p>📞 123-456-7890</p>
        <p>✉️ waymart@gmail.com</p>
        <div className="social-icons">
          <FaFacebook className="social-icon" />
          <FaTwitter className="social-icon" />
          <FaInstagram className="social-icon" />
        </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
