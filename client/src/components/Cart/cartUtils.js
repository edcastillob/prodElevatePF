
export const getStoredCart = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  };
  
  export const updateStoredCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };