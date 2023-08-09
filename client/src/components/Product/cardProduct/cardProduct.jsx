import { Link, useNavigate, NavLink } from "react-router-dom";
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
import { useTranslation } from "react-i18next";

export const CardProduct = ({
  product,
  user,
  userLocal,
  handleSignIn,
  currentLanguage,
}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const { id, name, images, salePrice, brand, condition, categoryId } = product;
  const selectedCategory = useSelector((state) => state.category);
  const { t } = useTranslation("global");
  const category =
    selectedCategory.find((cat) => cat.id === categoryId)?.name || "";

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

  const userActive = useSelector((state) => state.userLog);

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
        const userEmail = user.email;
        // console.log("desde useEffect: ",userEmail);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  const productWithUser = {
    ...product,
    user: userActive.email,
  };
  // console.log('userActive', userActive.email)
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
        {userActive.isActive === true ? (
          <div className={styles.divFav}>
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
          </div>
        ) : null}
          <div className={styles.divName}>
        <NavLink
          title="Detail Product"
          to={`/productid/${id}`}
          style={{ textDecoration: "none" }}
          // className={styles.link}
        > 
          <h6 className={styles.title}>{name}</h6>

        </NavLink>
        </div>
        <div className={styles.info}>
          <h6 className={styles.category}> {category}</h6>
          <span className={styles.priceLabel}>
          {t("cardProduct.brand", { lng: currentLanguage })}
          </span>
          <h6 className={styles.price}>{brand}</h6>
          <span className={styles.priceLabel}>
          {t("cardProduct.condition", { lng: currentLanguage })}
          </span>
          <h6 className={styles.price}>{condition}</h6>
          <span className={styles.priceLabel}>
          {t("cardProduct.price", { lng: currentLanguage })}
          </span>
          <h6 className={styles.price}>${salePrice}</h6>
        </div>
        <div className={styles.divBtn}>
          <button
            className={styles.buttonCart}
            onClick={() => handledAddToCart(product)}
          >
            {t("cardProduct.add-to-cart", { lng: currentLanguage })}
          </button>
        </div>
      </div>
    </div>
  );
};
