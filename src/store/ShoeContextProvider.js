import React, { useState, useEffect } from "react";
import ShoeContext from "./shoe-context";
import { getShoeList, updateShoe } from "../api/shoe-api";

function ShoeContextProvider(props) {
  const [shoes, setShoes] = useState([]);
  useEffect(() => {
    const setShoeList = async () => {
      const shoeList = await getShoeList();
      setShoes(shoeList);
    };
    setShoeList();
  }, []);

  const updateQuantityHandler = async (shoe, name) => {
    let upShoe = { ...shoe };
    if (name === "smallQuantity" && upShoe.smallQuantity !== 0) {
      upShoe.smallQuantity -= 1;
    } else if (name === "mediumQuantity" && upShoe.mediumQuantity !== 0) {
      upShoe.mediumQuantity -= 1;
    } else if (name === "largeQuantity" && upShoe.largeQuantity !== 0) {
      upShoe.largeQuantity -= 1;
    } else {
      alert("Out Of Stock");
      return;
    }
    const updateSuccess = await updateShoe(upShoe);
    if (!updateSuccess) {
      alert("Failed to update Quantity");
      return;
    }
    setShoes((prevState) => {
      const updatedState = prevState.map((shoe) => {
        if (upShoe.id === shoe.id) {
          return upShoe;
        }
        return shoe;
      });
      return updatedState;
    });
  };

  return (
    <ShoeContext.Provider
      value={{
        shoes: shoes,
        updateQuantity: updateQuantityHandler,
      }}
    >
      {props.children}
    </ShoeContext.Provider>
  );
}

export default ShoeContextProvider;
