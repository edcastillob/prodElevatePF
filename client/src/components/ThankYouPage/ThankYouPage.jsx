import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ThankYouPage.module.css";

const ThankYouPage = () => {
  const cartItems = useSelector((state) => state.cartItems);
  return (
    <>
      <div className={styles.cartContainer}>
        <h2 style={{ fontFamily: "Poppins" }}>Thank You for Your Purchase!</h2>
        <p style={{ fontFamily: "Poppins" }}>
          We are thrilled that you chose to shop with us.
        </p>
        <p style={{ fontFamily: "Poppins" }}>
          Your order has been successfully processed.
        </p>
        <div className={styles.cartItems}>
          {cartItems?.map((cartItem) => (
            <div className={styles.cartItem} key={cartItem.id}>
              <div className={styles.cartProduct}>
                <img src={cartItem.images} alt={cartItem.name} />
                <div>
                  <h3 style={{ fontFamily: "Poppins" }}>{cartItem.name}</h3>
                  {/* <div
                    className={styles.descriptionItem}
                    dangerouslySetInnerHTML={{ __html: cartItem.description }}
                  ></div> */}
                </div>
              </div>
              <div className={styles.cartProductPrice}>
                {cartItem.salePrice}
              </div>
              <div className={styles.cartProductQuantity}>
                <div className={styles.count}>{cartItem.cartQuantity}</div>
              </div>

              <div className={styles.cartProductTotalPrice}>
                ${cartItem.salePrice * cartItem.cartQuantity}
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "Poppins" }}>
          You will receive an email with your order details shortly.
        </p>
        <p style={{ fontFamily: "Poppins" }}>
          Thank you again for your business!
        </p>
      </div>

      <Link to={"/home"}>
        <button className={styles.create}>Continue</button>
      </Link>
    </>
  );
};

export default ThankYouPage;
