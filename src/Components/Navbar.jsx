import React from "react";
import { FaCartShopping } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
import "../Style/Navbar.css"

export const Navbar = ({ cartItems, handleCheckout, handleLogout }) => {
//   const navigate = useNavigate();

  return (
    <nav>
      <div className="Nav-title">
        <p>Welcome To React E-Commerce Shopping Mart</p>
      </div>
      <div className="Nav-Logout">
        <p onClick={handleLogout}>LOGOUT</p>
        <div onClick={handleCheckout} style={{ cursor: "pointer" }}>
          <FaCartShopping />
          <div className="Items-added">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        </div>
      </div>
    </nav>
  );
};