import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import swal from "sweetalert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import "react-toastify/dist/ReactToastify.css";
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
import { useTranslation } from 'react-i18next';

// import { ToastContainer } from "react-toastify";

const Cart = ({ currentLanguage }) => {
  const cartItems = useSelector((state) => state.cartItems);
  const cartTotalAmount = useSelector((state) => state.cartTotalAmount);
  const { t } = useTranslation('global');

  const dispatch = useDispatch();
  console.log(cartItems);
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handledRemoveFromCart = (cartItem) => {
    dispatch(removeToCart(cartItem))
    ;
  };

  const handledDecrement = (cartItem) => {
    dispatch(decrementToCart(cartItem));
  };

  const handledIncrement = (cartItem) => {
    dispatch(addToCart(cartItem));
    toast.success(`${product.name} add to cart`);
  };

  const handledClear = () => {
    event.preventDefault();
    swal({
      title: t("shopping-cart.atention", { lng: currentLanguage }),
      text: t("shopping-cart.are-you-sure", { lng: currentLanguage }),
      icon: "warning",
      buttons: ["No", t("shopping-cart.yes", { lng: currentLanguage })],
    }).then((res) => {
      if (res) {
        dispatch(clearCart());
        swal({
          text: t("shopping-cart.is-empty", { lng: currentLanguage }),
          icon: "success",
        });
      }
    });

  };

 

  return (
    <div className={styles.cartContainer}>
      <h3>{t("shopping-cart.shopping", { lng: currentLanguage })}</h3>
      {cartItems.length === 0 ? (
        <div className={styles.cartEmpty}>
          <p>{t("shopping-cart.is-empty", { lng: currentLanguage })}</p>
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
              <span>{t("shopping-cart.start-shopping", { lng: currentLanguage })}</span>
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
              <span>{t("shopping-cart.continue-shopping", { lng: currentLanguage })}</span>
            </Link>
          </div>
          <div className={styles.titles}>
            <h4 className={styles.productTitle}>{t("shopping-cart.product", { lng: currentLanguage })}</h4>
            <h4 className={styles.price}>{t("shopping-cart.price", { lng: currentLanguage })}</h4>
            <h4 className={styles.quantity}>{t("shopping-cart.quantity", { lng: currentLanguage })}</h4>
            <h4 className={styles.total}>Total</h4>
          </div>
          <div className={styles.cartItems}>
            {cartItems?.map((cartItem) => (
              <div className={styles.cartItem} key={cartItem.id}>
                <div className={styles.cartProduct}>
                  <img src={cartItem.images} alt={cartItem.name} />
                  <div>
                    <h4>{cartItem.name}</h4>
                    <div
                      className={styles.descriptionItem}
                      dangerouslySetInnerHTML={{ __html: cartItem.description }}
                    ></div>
                    <button onClick={() => handledRemoveFromCart(cartItem)}>
                    <h3 className={styles.delete}><ion-icon name="trash"></ion-icon></h3>
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
            <button className={styles.clearCart} onClick={handledClear}>
            {t("shopping-cart.clear-cart", { lng: currentLanguage })}
            </button>
            <div className={styles.cartCheckout}>
              <div className={styles.subtotal}>
                <span>Subtotal</span>
                <span className={styles.amount}>${cartTotalAmount}</span>
              </div>
              <p>{t("shopping-cart.taxes", { lng: currentLanguage })}</p>
              <StripeButton cartItems={cartItems} className={styles.create} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
