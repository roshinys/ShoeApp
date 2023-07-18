import React, { useState, useEffect, useReducer, useContext } from "react";
import cartContext from "./cart-context";
import { createCart, getCart, updatecart, removeCart } from "./cart-api";
import ShoeContext from "./shoe-context";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "GET_CART":
      console.log(action.payload.cartList);
      return {
        cartList: action.payload.cartList,
        cartItemsCount: action.payload.cartList.length,
      };
    case "ADD_ITEM":
      return {
        ...state,
        cartList: [
          ...state.cartList,
          {
            id: action.payload.cart.id,
            shoeName: action.payload.cart.shoeName,
            price: action.payload.cart.price,
            smallQuantity: action.payload.cart.smallQuantity,
            mediumQuantity: action.payload.cart.mediumQuantity,
            largeQuantity: action.payload.cart.largeQuantity,
          },
        ],
        cartItemsCount: state.cartItemsCount + 1,
      };
    case "UPDATE_ITEM":
      const updatedCartList = state.cartList.map((cart) => {
        if (cart.id === action.payload.cart.id) {
          return { ...action.payload.cart };
        }
        return cart;
      });
      return {
        ...state,
        cartList: updatedCartList,
        cartItemsCount: updatedCartList.length,
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        cartList: state.cartList.filter(
          (cart) => cart.id !== action.payload.id
        ),
        cartItemsCount: state.cartItemsCount - 1,
      };
    default:
      return state;
  }
};

function CartContextProvider(props) {
  const shoeCtx = useContext(ShoeContext);
  const [cart, setCart] = useState(false);
  const cartOpenHander = () => {
    setCart(true);
  };
  const cartCloseHander = () => {
    setCart(false);
  };
  const initialState = {
    cartList: [],
    cartItemsCount: 0,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const setCartList = async () => {
      const cartList = await getCart();
      console.log("useEffect");
      console.log(cartList);
      dispatch({ type: "GET_CART", payload: { cartList: cartList } });
    };
    setCartList();
  }, []);

  const addCartItemHandler = async (shoe, name) => {
    let existingCart = state.cartList.find((cart) => {
      console.log(cart);
      console.log(shoe);
      console.log(cart.shoeId === shoe.id);
      return cart.shoeId === shoe.id;
    });
    if (existingCart) {
      let updatedCart = { ...existingCart };
      if (name === "smallQuantity") {
        updatedCart.smallQuantity += 1;
      } else if (name === "mediumQuantity") {
        updatedCart.mediumQuantity += 1;
      } else {
        updatedCart.largeQuantity += 1;
      }
      await updatecart(updatedCart);
      shoeCtx.updateQuantity(shoe, name);
      dispatch({ type: "UPDATE_ITEM", payload: { cart: updatedCart } });
      return;
    }
    let cart = {
      shoeName: shoe.shoeName,
      price: parseInt(shoe.price),
      smallQuantity: 0,
      mediumQuantity: 0,
      largeQuantity: 0,
      shoeId: shoe.id,
    };
    if (name === "smallQuantity") {
      cart.smallQuantity = 1;
    } else if (name === "mediumQuantity") {
      cart.mediumQuantity = 1;
    } else {
      cart.largeQuantity = 1;
    }
    const data = await createCart(cart);
    cart = { ...cart, id: data.name };
    shoeCtx.updateQuantity(shoe, name);
    dispatch({ type: "ADD_ITEM", payload: { cart: cart } });
  };

  const removeCartItemHandler = async (id) => {
    await removeCart(id);
    dispatch({ type: "REMOVE_ITEM", payload: { id: id } });
  };

  return (
    <cartContext.Provider
      value={{
        isCart: cart,
        cartItems: state.cartList,
        cartItemsCount: state.cartItemsCount,
        addCartItem: addCartItemHandler,
        removeCartItem: removeCartItemHandler,
        openCart: cartOpenHander,
        closeCart: cartCloseHander,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

export default CartContextProvider;
