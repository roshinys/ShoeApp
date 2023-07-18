import React, { useContext } from "react";
import ShoeItem from "./ShoeItem";
import ShoeContext from "../../store/shoe-context";

function ShoeList() {
  const shoeCtx = useContext(ShoeContext);
  return (
    <ul>
      {shoeCtx.shoes.map((shoe) => {
        return <ShoeItem shoe={shoe} key={shoe.id} />;
      })}
    </ul>
  );
}

export default ShoeList;
