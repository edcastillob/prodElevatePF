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
import Reviews from "../../Reviews/Review";
import axios from "axios";
import { ENDPOINT } from "../../endpoint/ENDPOINT";
export const CardProduct = ({ product }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const { id, name, images, salePrice, brand, condition, categoryId } = product;
  const selectedCategory = useSelector((state) => state.category);
  const category =
    selectedCategory.find((cat) => cat.id === categoryId)?.name || "Unknown Category";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites);

  const [productReviews, setProductReviews] = useState([]);

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
        console.log(userEmail);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  useEffect(() => {
    // Fetch reviews for the current product using Axios
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${ENDPOINT}reviews/product/${id}`);
        const data = response.data;
        setProductReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  console.log("Product ID:", id); // Agregamos esta línea para verificar el valor de id

  const productWithUser = {
    ...product,
    user: currentUser ? currentUser.email : null,
  };
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
          <div>
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
        <NavLink
          title="Detail Product"
          to={`/productid/${id}`}
          style={{ textDecoration: "none" }}
          // className={styles.link}
        >
          <h6 className={styles.title}>{name}</h6>
        </NavLink>
        <h6 className={styles.category}> {category}</h6>
        <span className={styles.priceLabel}>Brand</span>
        <h6 className={styles.price}>{brand}</h6>
        <span className={styles.priceLabel}>Condition</span>
        <h6 className={styles.price}>{condition}</h6>
        <span className={styles.priceLabel}>Price</span>
        <h6 className={styles.price}>${salePrice}</h6>
          <Reviews reviews={productReviews} />
        <button
          className={styles.buttonCart}
          onClick={() => handledAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
 