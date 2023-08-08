import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart,calculateTotals, } from "../../redux/actions/actions";
import { useEffect } from "react";
import styles from "./PostCompra.module.css";
export const PostCompra = () => {
  const { cartItems, cartTotalAmount } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={styles.card}>
      <h2>Thank you for your purchase!</h2>
      <h3>Total Amount: ${cartTotalAmount}</h3>
      <h4>Items Purchased:</h4>
      {cartItems.map((item) => (
        <div key={item.id} className={styles.itemCard}>
          <div className={styles.itemDetails}>
            <img src={item.images} alt={item.name} className={styles.itemImage} />
            <div>
              <h3>{item.name}</h3>
              <p>Price: ${item.salePrice}</p>
              <p>Quantity: {item.cartQuantity}</p>
              <p>Total: ${item.salePrice * item.cartQuantity}</p>
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};


export default PostCompra;