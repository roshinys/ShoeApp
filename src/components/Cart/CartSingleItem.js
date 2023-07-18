import { useContext } from "react";
import styles from "./CartSingleItem.module.css";
import CartContext from "../../store/cart-context";

function CartSingleItem(props) {
  const cartCtx = useContext(CartContext);
  const removeCartHandler = () => {
    cartCtx.removeCartItem(props.cart.id);
  };
  return (
    <>
      <li id={props.cart.id} className={styles.listcart}>
        <div className={styles.title}>
          <h3>{props.cart.shoeName}</h3>
          <p>${props.cart.price}</p>
          <span>Small - {props.cart.smallQuantity}</span>
          <span>Medium - {props.cart.mediumQuantity}</span>
          <span>Large - {props.cart.largeQuantity}</span>
        </div>
        <button onClick={removeCartHandler}>remove</button>
      </li>
    </>
  );
}

export default CartSingleItem;
