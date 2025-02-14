import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar"; // Import Navbar
import "../Style/OrderSummery.css";

export const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalPrice = 0 } = location.state || {};
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const handleLogout = () => navigate("/");
  const handleBackToProducts = () => navigate("/ShoppingCart", { state: { cartItems, totalPrice } });

  // Handle "PLACE ORDER" button click
  const handlePlaceOrder = () => {
    setShowPopup(true); // Show the popup
  };

  // Handle "OKEY" button click in the popup
  const handlePopupOk = () => {
    setShowPopup(false); // Hide the popup
    navigate("/ShoppingCart", { state: { cartItems: [], totalPrice: 0 } }); // Navigate to ShoppingCart with empty cart
  };

  return (
    <>
      <Navbar cartItems={cartItems} handleCheckout={() => { }} handleLogout={handleLogout} />
      <button onClick={handleBackToProducts} className="BackButton">
        BACK TO CART
      </button>
      <div className="OrderSummary">
        <div className="Order-Details">
        <h4>Order Summary</h4>
          <p>You have {cartItems.length} Items In Your Shopping Cart</p>
          <table>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.quantity} * {item.name}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total Price</td>
                <td>${totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <button onClick={handlePlaceOrder} className="PlaceOrderButton">
            PLACE ORDER
          </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="PopupOverlay">
          <div className="Popup">
            <h3>Thank You For Placing the Order!</h3>
            <p onClick={handlePopupOk}>OKAY</p>
          </div>
        </div>
      )}
    </>
  );
};