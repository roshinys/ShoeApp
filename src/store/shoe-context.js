import React from "react";

const ShoeContext = React.createContext({
  shoes: [],
  updateQuantity: () => {},
});

export default ShoeContext;
