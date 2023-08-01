import { Link, useNavigate } from "react-router-dom";
import styles from "./cardProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addFav,
  addToCart,
  getCategory,
  removeFav,
} from "../../../redux/actions/actions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const CardProduct = ({ product }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const { id, name, images, salePrice, brand, condition, categoryId } = product;
  const selectedCategory = useSelector((state) => state.category);
  const category =
    selectedCategory.find((cat) => cat.id === categoryId)?.name ||
    "Unknown Category";

  useEffect(() => {
    dispatch(getCategory());
  }, []);
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
        console.log(user)
      } else {
        console.log(user)
        setCurrentUser(null);
      }
    });
  }, []);

  const productWithUser = {
    ...product,
    user: currentUser
      ? currentUser.uid
      : "6a9fb616-ee00-4d42-bb0e-c320673a2b50",
  };

  return (
    <div className={styles.cardContainer}>
      <Link
        title="Detail Product"
        to={`/productid/${id}`}
        className={styles.link}
      >
        {/* {isFav ? (
          <button className={styles.favButton} onClick={handleFavorite}>
            <h3 style={{ color: "#000924" }}>
              <ion-icon name="heart"></ion-icon>
            </h3>
          </button>
        ) : (
          <button className={styles.favButton} onClick={handleFavorite}>
            <h3>
              <ion-icon name="heart-empty"></ion-icon>
            </h3>
          </button>
        )} */}
        <div className={styles.divImg}>
          <img className={styles.img} src={images} alt="product" />
        </div>
      </Link>
      <div className={styles.description}>
      {isFav ? (
          <button className={styles.favButton} onClick={handleFavorite}>
            <h3 style={{ color: "#000924" }}>
              <ion-icon name="heart"></ion-icon>
            </h3>
          </button>
        ) : (
          <button className={styles.favButton} onClick={handleFavorite}>
            <h3>
              <ion-icon name="heart-empty"></ion-icon>
            </h3>
          </button>
        )}
        <h6 className={styles.title}>{name}</h6>
        <h6 className={styles.category}> {category}</h6>
        <span className={styles.priceLabel}>Brand</span>
        <h6 className={styles.price}>{brand}</h6>
        <span className={styles.priceLabel}>Condition</span>
        <h6 className={styles.price}>{condition}</h6>
        <span className={styles.priceLabel}>Price</span>
        <h6 className={styles.price}>${salePrice}</h6>
        <button
          className={styles.buttonCart}
          onClick={() => handledAddToCart(product)}
        >
          Add to Cart
        </button>

        {/* {currentUser && (
          <Link title="Edit Product" to={`/productidedit/${id}`}>
            <button className={styles.editProduct}>
              <ion-icon name="create"></ion-icon>
            </button>
          </Link>
        )} */}
      </div>
    </div>
  );
};