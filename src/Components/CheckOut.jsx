import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar"; // Import Navbar
import "../Style/CheckOut.css";

export const CheckOut = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [], totalPrice = 0 } = location.state || {};

  const handleBackToProducts = () => navigate("/ShoppingCart", { state: { cartItems, totalPrice } });
  const handleClearCart = () => navigate("/CheckOut", { state: { cartItems: [], totalPrice: 0 } });
  const handleCheckout = () => navigate("/OrderSummary", { state: { cartItems, totalPrice } });
  const handleLogout = () => navigate("/");

  const removeFromCart = (productId) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      )
      .filter((item) => item.quantity > 0);
    const updatedTotalPrice = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    navigate("/CheckOut", { state: { cartItems: updatedCart, totalPrice: updatedTotalPrice } });
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    const updatedCart = existingItem
      ? cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      : [...cartItems, { ...product, quantity: 1 }];
    const updatedTotalPrice = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    navigate("/CheckOut", { state: { cartItems: updatedCart, totalPrice: updatedTotalPrice } });
  };

  return (
    <>
      <Navbar cartItems={cartItems} handleCheckout={handleCheckout} handleLogout={handleLogout} />
      <div className="CheckOut">
        <button onClick={handleBackToProducts}>BACK TO PRODUCTS</button>
        <h3>Shopping Cart</h3>
        <div className="Cart-Header">
          <p>You Have {cartItems.length} Items in Your Cart</p>
          <button onClick={handleClearCart}>CLEAR SHOPPING CART</button>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Products</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.name} />
                </td>
                <td>
                  <p>{product.name}</p>
                </td>
                <td>
                  <div className="Quantity-Controls">
                    <button onClick={() => removeFromCart(product.id)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => addToCart(product)}>+</button>
                  </div>
                </td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="Total-Price">
            <tr>
              <td>Total Price</td>
              <td></td>
              <td></td>
              <td>${totalPrice.toFixed(2)}</td>
            </tr>  
          </tfoot>
        </table>
        <div className="Check-Out">
        <button onClick={handleCheckout} >CHECKOUT</button>
        </div>
      </div>
    </>
  );
};