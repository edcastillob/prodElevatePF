import { Link, useNavigate } from "react-router-dom";
import styles from "./cardProduct.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/actions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const CardProduct = ({ product }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { id, name, category, images, salePrice } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handledAddToCart = (product) => {
    dispatch(addToCart(product)); 
    navigate("/cart");
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <div className={styles.cardContainer}>
      <Link
        title="Detail Product"
        to={`/productid/${id}`}
        className={styles.link}
      >
        <div className={styles.divImg}>
          <img className={styles.img} src={images} alt="product" />
        </div>
      </Link>
      <div className={styles.description}>
        <h6 className={styles.title}>{name}</h6>
        <h5 className={styles.category}> {category}</h5>
        <span className={styles.priceLabel}>Price</span>
        <h6 className={styles.price}>${salePrice}</h6>
        <button
          className={styles.buttonCart}
          onClick={() => handledAddToCart(product)}
        >
          Add to Cart
        </button>

        {currentUser && (
          <Link title="Edit Product" to={`/productidedit/${id}`}>
            <button className={styles.editProduct}>
              <ion-icon name="create"></ion-icon>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
