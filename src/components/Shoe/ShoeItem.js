import React, { useContext } from "react";
import CartContext from "../../store/cart-context";

function ShoeItem(props) {
  const cartCtx = useContext(CartContext);
  const buttonClickHandler = (e) => {
    const quantityName = e.target.name;
    cartCtx.addCartItem(props.shoe, quantityName);
  };

  return (
    <li>
      <h2>{props.shoe.shoeName}</h2>
      <p>{props.shoe.description}</p>
      <span>{props.shoe.price}</span>
      <button name="smallQuantity" onClick={buttonClickHandler}>
        Small-{props.shoe.smallQuantity}
      </button>
      <button name="mediumQuantity" onClick={buttonClickHandler}>
        Medium-{props.shoe.mediumQuantity}
      </button>
      <button name="largeQuantity" onClick={buttonClickHandler}>
        Large-{props.shoe.largeQuantity}
      </button>
    </li>
  );
}

export default ShoeItem;
