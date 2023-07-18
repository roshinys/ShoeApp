import { useContext } from "react";
import ShoeForm from "./components/Shoe/ShoeForm";
import ShoeList from "./components/Shoe/ShoeList";
import CartContext from "./store/cart-context";
import Cart from "./components/Cart/Cart";

function App() {
  const cartCtx = useContext(CartContext);
  const cartClickHandler = (e) => {
    cartCtx.openCart();
  };
  return (
    <div>
      {cartCtx.isCart && <Cart />}
      <h1>Shoe App</h1>
      <div>
        <ShoeForm />
        <button onClick={cartClickHandler}>Cart</button>
      </div>
      <ShoeList />
    </div>
  );
}

export default App;
