import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Check if same product with same size & color exists
    const existing = cart.find(
      (item) =>
        item.name === product.name &&
        item.size === product.size &&
        item.color === product.color
    );

    if (existing) {
      setCart(cart.map(item =>
        item.name === product.name &&
        item.size === product.size &&
        item.color === product.color
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      ));
    } else {
      setCart([...cart, product]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
