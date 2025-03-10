import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProfileSidebar from "./components/ProfileSidebar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";

// import productsData from "./data/products";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <Navbar setSearchQuery={setSearchQuery} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <ProfileSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
