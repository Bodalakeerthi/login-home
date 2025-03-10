import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSignOutAlt, FaMapMarkerAlt, FaShoppingBag, FaPlus, FaLocationArrow } from "react-icons/fa";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
    });

    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      // Fetch orders and addresses from localStorage
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const storedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
      setOrders(storedOrders);
      setAddresses(storedAddresses);
    }, []);

    const handleEdit = () => setIsEditing(!isEditing);

    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Add a new address manually
    const handleAddAddress = () => {
      if (!newAddress.trim()) return;
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
      setNewAddress("");
    };

    // Edit an existing address
    const handleEditAddress = (index) => {
      setNewAddress(addresses[index]);
      setEditIndex(index);
    };

    // Save edited address
    const handleSaveAddress = () => {
      if (!newAddress.trim()) return;
      const updatedAddresses = [...addresses];
      updatedAddresses[editIndex] = newAddress;
      setAddresses(updatedAddresses);
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
      setNewAddress("");
      setEditIndex(null);
    };

    // Delete an address
    const handleDeleteAddress = (index) => {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      setAddresses(updatedAddresses);
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    };

    // Get Current Location Address
    const handleGetCurrentLocation = () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }
    
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
    
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const currentAddress = data.display_name;
    
            if (currentAddress) {
              setNewAddress(currentAddress); // Set address in the input box
            } else {
              alert("Could not fetch address. Please try again.");
            }
          } catch (error) {
            alert("Error fetching address.");
          } finally {
            setLoading(false);
          }
        },
        () => {
          alert("Unable to retrieve location.");
          setLoading(false);
        }
      );
    };
    

    return (
      <div className="profile-container">
        <h1>My Profile</h1>

        {/* Profile Information */}
        <div className="profile-section">
          <h2>Personal Information</h2>
          {isEditing ? (
            <div className="edit-form">
              <input type="text" name="name" value={user.name} onChange={handleChange} />
              <input type="email" name="email" value={user.email} onChange={handleChange} />
              <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
              <button onClick={handleEdit}>Save</button>
            </div>
          ) : (
            <div className="profile-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <button onClick={handleEdit} className="edit-btn">
                <FaEdit /> Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Order History */}
        <div className="profile-section">
          <h2><FaShoppingBag /> Order History</h2>
          {orders.length === 0 ? (
            <p>No orders placed yet.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order.id}>
                  {order.item} - {order.date} - {order.price} (Qty: {order.quantity})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Address Management */}
        <div className="profile-section">
          <h2><FaMapMarkerAlt /> Saved Addresses</h2>
          
          <div className="address-input">
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter new address"
            />
            {editIndex !== null ? (
              <button onClick={handleSaveAddress} className="save-btn">Save</button>
            ) : (
              <button onClick={handleAddAddress} className="add-btn"><FaPlus /> Add Address</button>
            )}
          </div>

          <button onClick={handleGetCurrentLocation} className="location-btn" disabled={loading}>
            <FaLocationArrow /> {loading ? "Getting Location..." : "Use Current Location"}
          </button>

          <ul>
            {addresses.length === 0 ? (
              <p>No saved addresses.</p>
            ) : (
              addresses.map((address, index) => (
                <li key={index} className="address-item">
                  {address}
                  <div className="address-buttons">
                    <button onClick={() => handleEditAddress(index)} className="edit-btn">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteAddress(index)} className="delete-btn">
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Logout Button */}
        <button className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    );
};

export default Profile;
