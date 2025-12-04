import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (dish) => {
    setCart(prev => [
      ...prev,
      { ...dish, _cartId: Date.now().toString() }  // ← IMPORTANT
    ]);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item._cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

