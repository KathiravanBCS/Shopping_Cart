import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar"; // Import Navbar
import "../Style/ShoppingCart.css";

export const ShoppingCart = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Bread 100% Whole Wheat", image: "bread.jpg", category: "Bakery", price: 35 },
    { id: 2, name: "Carrot-Local", image: "carrot.jpg", category: "Vegetables", price: 20 },
    { id: 3, name: "Onion-Medium/Vengayam", image: "onion.jpg", category: "Vegetables", price: 25 },
    { id: 4, name: "Apple", image: "apple.jpg", category: "Fruits", price: 50 },
    { id: 5, name: "Dessert", image: "dessert.jpg", category: "Desserts", price: 60 },
    { id: 6, name: "Flakes", image: "flakes.jpg", category: "Breakfast", price: 40 },
  ];

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCart) => {
      return prevCart
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);
    });
  };

  const handleCategoryChange = (category) => {
    if (category === "All Categories") {
      // If "All Categories" is checked, clear all other selections
      setSelectedCategories([]);
    } else {
      // If any other category is checked, ensure "All Categories" is unchecked
      setSelectedCategories((prev) => {
        const updatedCategories = prev.includes(category)
          ? prev.filter((c) => c !== category) // Uncheck the category if already checked
          : [...prev, category]; // Check the category if not already checked
        return updatedCategories;
      });
    }
  };

  const handleLogout = () => navigate("/");
  const handleCheckout = () => {
    navigate("/CheckOut", {
      state: { cartItems, totalPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) },
    });
  };

  // Filter products based on selected categories
  const filteredProducts = selectedCategories.length
    ? products.filter((product) => selectedCategories.includes(product.category))
    : products;

  return (
    <>
      <Navbar cartItems={cartItems} handleCheckout={handleCheckout} handleLogout={handleLogout} />
      <div className="Content">
        <aside>
          <ul>
            <li key="All Categories">
              <label className="all">All Categories</label>
              <input
                type="checkbox"
                checked={selectedCategories.length === 0}
                onChange={() => handleCategoryChange("All Categories")}
              />
            </li>
            {[...new Set(products.map((product) => product.category))].map((category) => (
              <li key={category}>
                <label className="Items">{category}</label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              </li>
            ))}
          </ul>
        </aside>

        <div className="main">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const cartItem = cartItems.find((item) => item.id === product.id);
              return (
                <div className="Product-Card" key={product.id}>
                  <p>{product.name}</p>
                  <img src={product.image} alt={product.name} />
                  <p>{product.category}</p>
                  <p>${product.price}</p>
                  {cartItem ? (
                    <div className="Add-Cart">
                      <button onClick={() => removeFromCart(product.id)}>-</button>
                      <div className="Quentity">{cartItem.quantity}</div>
                      <button onClick={() => addToCart(product)}>+</button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(product)}>ADD TO CART</button>
                  )}
                </div>
              );
            })
          ) : (
            <p>No products found in the selected categories.</p>
          )}
        </div>
      </div>
    </>
  );
};