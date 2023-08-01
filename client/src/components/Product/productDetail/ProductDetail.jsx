// ProductDetail.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail, getProductReviews } from "../../../redux/actions/actions";
import loadingImg from "../../../assets/loading.png";
import { getCategory } from "../../../redux/actions/actions";
import styles from "./ProductDetail.module.css";
import { addToCart } from "../../../redux/actions/actions";
import { Link } from "react-router-dom";
import Reviews from "../../Reviews/Review";
import AddReviewForm from "../../Reviews/addReview";
import CommentSection from "../../Comment/CommentSection";
import { Card, CardContent, Typography, styled, Button } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Box, Grid } from "@mui/material";

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;
  const productReviews = useSelector((state) => state.productReviews);
  const productDetail = useSelector((state) => state.productDetail);
  const selectedCategory = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getProductDetail(id)) // Cargar los detalles del producto
      .then(() => {
        // Después de cargar los detalles, cargar las reseñas del producto
        dispatch(getProductReviews(id));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, id]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const { images, categoryId, salePrice, description, name } = productDetail;

  const handledAddToCart = (product) => {
    dispatch(addToCart(productDetail));
    navigate("/cart");
  };

  const category =
    selectedCategory.find((cat) => cat.id === categoryId)?.name || "Unknown Category";

  const StyledCard = styled(Card)({
    width: "600px", // Modifica el ancho a 800px
    margin: "auto",
    padding: "1rem",
  });

  const StyledButton = styled(Button)({
    backgroundColor: "#000924",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#000a30",
    },
  });
  return (
    <div style={{ padding: "1rem" }}>
      {loading ? (
        <div>
          <img src={loadingImg} alt="Loading" />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.back}>
            <Link to="/home">
              <div className={styles.backButton}>
                <p>
                  <ion-icon name="arrow-round-back"></ion-icon>
                  <ion-icon name="home"></ion-icon>
                </p>
              </div>
            </Link>
          </div>
          <div className={styles.divImg}>
            <img src={images} alt={name} />
          </div>
          <div className={styles.description}>
            <h4 style={{ fontFamily: "Poppins" }}>{name}</h4>
            <div
              className={styles.descriptionItem}
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            <h6>Category: {category} </h6>
            <h4>Price ${salePrice} </h4>
            <Reviews/>
            <button
              className={styles.buttonCart}
              onClick={() => handledAddToCart(productDetail)}
            >
              Add to Cart
            </button>
            
            <CommentSection productId={id} userEmail={currentUser?.email} />
          </div>
        </div>
      )}
          <AddReviewForm productId={id} />
    </div>
  );
};