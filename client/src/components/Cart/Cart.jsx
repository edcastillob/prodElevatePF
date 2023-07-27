import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
//import StripeButton from "../StripeCart/StripeButton";

import styles from "./Cart.module.css";
import {
  addToCart,
  calculateTotals,
  clearCart,
  decrementToCart,
  removeToCart,
} from "../../redux/actions/actions";
import StripeButton from "../StripeButton/StripeButton";

import { ToastContainer } from "react-toastify";

const Cart = () => {
  const { cartItems, cartTotalAmount } = useSelector((state) => state);

  const dispatch = useDispatch();
  console.log(cartItems);
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handledRemoveFromCart = (cartItem) => {
    dispatch(removeToCart(cartItem));
  };

  const handledDecrement = (cartItem) => {
    dispatch(decrementToCart(cartItem));
  };

  const handledIncrement = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handledClear = () => {
    dispatch(clearCart());
  };

  return (
    <div className={styles.cartContainer}>
      <h2>Shoping Cart</h2>
      {cartItems.length === 0 ? (
        <div className={styles.cartEmpty}>
          <p>Your Cart esta vacio</p>
          <div className={styles.startShoping}>
            <Link to="/home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shoping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.continueShoping}>
            <Link to="/home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Continue Shoping</span>
            </Link>
          </div>
          <div className={styles.titles}>
            <h3 className={styles.productTitle}>Product</h3>
            <h3 className={styles.price}>Price</h3>
            <h3 className={styles.quantity}>Quantity</h3>
            <h3 className={styles.total}>Total</h3>
          </div>
          <div className={styles.cartItems}>
            {cartItems?.map((cartItem) => (
              <div className={styles.cartItem} key={cartItem.id}>
                <div className={styles.cartProduct}>
                  <img src={cartItem.images} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <div
                      className={styles.descriptionItem}
                      dangerouslySetInnerHTML={{ __html: cartItem.description }}
                    ></div>
                    <button onClick={() => handledRemoveFromCart(cartItem)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className={styles.cartProductPrice}>
                  {cartItem.salePrice}
                </div>
                <div className={styles.cartProductQuantity}>
                  <button onClick={() => handledDecrement(cartItem)}>-</button>
                  <div className={styles.count}>{cartItem.cartQuantity}</div>
                  <button onClick={() => handledIncrement(cartItem)}>+</button>
                </div>

                <div className={styles.cartProductTotalPrice}>
                  ${cartItem.salePrice * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartSummary}>
            <button className={styles.clearCart} onClick={() => handledClear()}>
              Clear Cart
            </button>
            <div className={styles.cartCheckout}>
              <div className={styles.subtotal}>
                <span>Subtotal</span>
                <span className={styles.amount}>${cartTotalAmount}</span>
              </div>
              <p>Taxes and Shiping</p>
              <StripeButton cartItems={cartItems} />
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Cart;
