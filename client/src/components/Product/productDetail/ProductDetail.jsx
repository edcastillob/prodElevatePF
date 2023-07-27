import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../../../redux/actions/actions";
import loadingImg from "../../../assets/loading.png";
import { getCategory } from "../../../redux/actions/actions";
import styles from "./ProductDetail.module.css";

import { addToCart } from "../../../redux/actions/actions";
import { Link } from "react-router-dom";
// import { addToCart } from "../../../redux/actions/actions";
export const ProductDetail = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  const productDetail = useSelector((state) => state.productDetail);
  const selectedCategory = useSelector((state) => state.category);

  useEffect(() => {
    Promise.all([dispatch(getProductDetail(id))])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [dispatch, id]);

  const { images, categoryId, salePrice, description, name } = productDetail;

  const handledAddToCart = (product) => {
    dispatch(addToCart(productDetail));
    navigate("/cart");
  };

  // Buscar la categoría correspondiente al categoryId
  const category =
    selectedCategory.find((cat) => cat.id === categoryId)?.name ||
    "Unknown Category";

  return (
    <div style={{padding:'1rem'}}>
      {loading ? (
        <div>
          <img src={loadingImg} alt="Loading" />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.back}>
            <Link to='/home'>
              <div className={styles.backButton}>
                <p><ion-icon name="arrow-round-back"></ion-icon><ion-icon name="home"></ion-icon></p>
              </div>
            </Link>
          </div>
          <div className={styles.divImg}>
            <img src={images} alt={name} />
          </div>
          <div className={styles.description}>
            <h4 style={{fontFamily:'Poppins'}}>{name}</h4>
            {/* Utilizamos dangerouslySetInnerHTML para renderizar el HTML */}
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
          </div>
        </div>
      )}
    </div>
  );
};
