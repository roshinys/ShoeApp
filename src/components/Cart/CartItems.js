import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartSingleItem from "./CartSingleItem";

function CartItems() {
  const ctx = useContext(CartContext);

  return (
    <ul>
      <h1>Cart</h1>
      {ctx.cartItems.map((cart) => {
        return <CartSingleItem cart={cart} key={cart.id} />;
      })}
    </ul>
  );
}

export default CartItems;
