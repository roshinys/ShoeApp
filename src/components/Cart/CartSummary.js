import React, { useContext } from "react";
import styles from "./CartSummary.module.css";
import CartContext from "../../store/cart-context";

function CartSummary() {
  const ctx = useContext(CartContext);

  const cartCloseHandler = () => {
    ctx.closeCart();
  };

  const totalPrice = ctx.cartItems
    .reduce((accumulator, item) => {
      const itemPrice =
        parseInt(
          item.smallQuantity + item.mediumQuantity + item.largeQuantity
        ) * parseFloat(item.price);
      return accumulator + itemPrice;
    }, 0)
    .toFixed(2);

  return (
    <>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalPrice}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.closeCart} onClick={cartCloseHandler}>
          Close
        </button>
        <button className={styles.orderCart}>Order</button>
      </div>
    </>
  );
}

export default CartSummary;
