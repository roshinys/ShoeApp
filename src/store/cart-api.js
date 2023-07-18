export const createCart = async (cart) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/carts.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to Add Product To Cart");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    alert(err);
  }
};

export const getCart = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/carts.json`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Cart");
    }
    const data = await response.json();
    console.log("data");
    console.log(data);
    const cartItems = [];
    for (const key in data) {
      const cart = {
        id: key,
        shoeName: data[key].shoeName,
        price: parseInt(data[key].price),
        smallQuantity: data[key].smallQuantity,
        mediumQuantity: data[key].mediumQuantity,
        largeQuantity: data[key].largeQuantity,
        shoeId: data[key].shoeId,
      };
      cartItems.push(cart);
    }
    console.log("cartItems====>");
    console.log(cartItems);
    return cartItems;
  } catch (err) {
    alert(err);
  }
};

export const updatecart = async (updatedCart) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/carts/${updatedCart.id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCart),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update cart");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    alert(err);
  }
};

export const removeCart = async (cartId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/carts/${cartId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove cart item");
    }
    return;
  } catch (err) {
    alert(err);
  }
};
