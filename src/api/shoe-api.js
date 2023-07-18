export const getShoeList = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_URL}/shoes.json`
  );
  if (!response.ok) {
    alert("Something went wrong");
    return;
  }
  const data = await response.json();
  const loadedShoes = [];
  for (const key in data) {
    const shoeDetail = {
      id: key,
      shoeName: data[key].shoeName,
      description: data[key].description,
      price: parseInt(data[key].price),
      smallQuantity: parseInt(data[key].smallQuantity),
      mediumQuantity: parseInt(data[key].mediumQuantity),
      largeQuantity: parseInt(data[key].largeQuantity),
    };
    loadedShoes.push(shoeDetail);
  }
  return loadedShoes;
};

export const updateShoe = async (shoe) => {
  const response = await fetch(
    `${process.env.REACT_APP_FIREBASE_URL}/shoes/${shoe.id}.json`,
    {
      method: "PUT",
      body: JSON.stringify(shoe),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    alert("Something went wrong");
    return false;
  }
  return true;
};
