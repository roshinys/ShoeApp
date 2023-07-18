import React, { useRef } from "react";
import Input from "../../UI/Input";

const ShoeForm = () => {
  const shoeNameRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");
  const smallQuantityRef = useRef("");
  const mediumQuantityRef = useRef("");
  const largeQuantityRef = useRef("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const shoeDetail = {
      shoeName: shoeNameRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      smallQuantity: smallQuantityRef.current.value,
      mediumQuantity: mediumQuantityRef.current.value,
      largeQuantity: largeQuantityRef.current.value,
    };

    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_URL}/shoes.json`,
      {
        method: "POST",
        body: JSON.stringify(shoeDetail),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      alert("Something went wrong dude");
      return;
    }
    console.log("added Product");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="shoeName" type="text" title="Shoe Name" ref={shoeNameRef} />
      <Input
        name="description"
        type="text"
        title="Description"
        ref={descriptionRef}
      />
      <Input name="price" type="number" title="Price" ref={priceRef} />
      <Input
        name="smallQuantity"
        type="number"
        title="Small Quantity"
        ref={smallQuantityRef}
      />

      <Input
        name="mediumQuantity"
        type="number"
        title="Medium Quantity"
        ref={mediumQuantityRef}
      />
      <Input
        name="largeQuantity"
        type="number"
        title="Large Quantity"
        ref={largeQuantityRef}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ShoeForm;
