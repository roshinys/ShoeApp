import React from "react";

const CartContext = React.createContext({
  isCart: false,
  cartItemsCount: 0,
  cartItems: [],
  addCartItem: (product) => {},
  removeCartItem: (id) => {},
  openCart: () => {},
  closeCart: () => {},
});

export default CartContext;
