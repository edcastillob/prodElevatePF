import { Link, useNavigate } from "react-router-dom";
import styles from "./cardProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addFav, addToCart, removeFav } from "../../../redux/actions/actions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const CardProduct = ({ product }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const { id, name, category, images, salePrice } = product;
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handledAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const handleFavorite = (event) => {
    if (isFav) {
      setIsFav(false);
      dispatch(removeFav(id));
    } else {
      setIsFav(true);
      dispatch(addFav(productWithUser));
    }
  };

  useEffect(() => {
    favorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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

  const productWithUser = {
    ...product,
    user: currentUser
      ? currentUser.uid
      : "6807268a-db8a-4201-82b8-1d325edb7709",
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.favContainer}>
        {isFav ? (
          <button onClick={handleFavorite}>❤️</button>
        ) : (
          <button onClick={handleFavorite}>🤍</button>
        )}
      </div>
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
