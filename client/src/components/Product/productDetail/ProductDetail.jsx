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
import CrearComentario from "../../Comment/CrearComentario"; 
import MostrarComentarios from "../../Comment/MostrarComentarios"; 
import { Card, styled, Button } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Box, Grid } from "@mui/material";
import axios from "axios";
export const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  const usuario = useSelector((state) => state.user); 
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;
  const productDetail = useSelector((state) => state.productDetail);
  const selectedCategory = useSelector((state) => state.category);
  const productReviews = useSelector((state) => state.productReviews);
  const [userRoleLocal, setUserRoleLocal] = useState(null);

  useEffect(() => {
    dispatch(getProductDetail(id)) 
      .then(() => {
       
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

        
        axios
          .get("http://localhost:3001/useremail/" + user.email)
          .then((response) => {
            const data = response.data.rol;
            setUserRoleLocal(data); 
          })
          .catch((error) => {
            console.error("Error fetching user role:", error);
          });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  const { images, categoryId, salePrice, description, name } = productDetail;

  const handledAddToCart = () => {
    dispatch(addToCart(productDetail));
    navigate("/cart");
  };

  const category =
    selectedCategory.find((cat) => cat.id === categoryId)?.name || "Unknown Category";

  const StyledCard = styled(Card)({
    width: "600px",
    margin: "auto",
    padding: "5rem",
  });

  return (
    
      <div style={{ padding: "4rem" }}>
        <Box bgcolor="#f1f1f1" p={2} borderRadius={8} boxShadow={3}>
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
              <button
                className={styles.buttonCart}
                onClick={() => handledAddToCart(productDetail)}
              >
                Add to Cart
              </button>
              <Reviews reviews={productReviews} />
            </div>
          </div>
        )}
        
        {currentUser && (
          <CrearComentario
            productId={id}
            userEmail={currentUser.email}
            userRole={userRoleLocal} 
          />
        )}

        
        <MostrarComentarios
          productId={id}
          userEmail={currentUser?.email}
          userRole={userRoleLocal} 
        />
        </Box>
      </div>
    
  );
};
