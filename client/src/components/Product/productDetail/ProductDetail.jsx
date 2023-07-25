// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { getProductDetail } from "../../../redux/actions/actions";
// import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
// import loadingImg from "../../../assets/loading.png";
// import { getCategory } from "../../../redux/actions/actions";
// import styles from "./ProductDetail.module.css";
// import { addToCart } from "../../../redux/actions/actions";


// export const ProductDetail = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   useEffect(() => {
//     dispatch(getCategory());
//   }, []);
//   const [loading, setLoading] = useState(true);
//   const params = useParams();
//   const { id } = params;

//   const productDetail = useSelector((state) => state.productDetail);
//   const selectedCategory = useSelector((state) => state.category);

//   useEffect(() => {
//     Promise.all([dispatch(getProductDetail(id))])
//       .then(() => {
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, [dispatch, id]);

//   const { images, categoryId, salePrice, description, name } = productDetail;
//   console.log(selectedCategory);
//   console.log(productDetail);
//   // Buscar la categoría correspondiente al categoryId
//   const category =
//     selectedCategory.find((cat) => cat.id === categoryId)?.name ||
//     "Unknown Category";


//   return (
//     <div style={{padding:'1rem'}}>
//       {loading ? (
//         <div>
//           <img src={loadingImg} alt="Loading" />
//         </div>
//       ) : (
//         <div className={styles.container}>
//           <div className={styles.divImg}>
//             <img src={images} alt={name} />
//           </div>
//           <div className={styles.description}>
//             <h4>{name}</h4>
//             <p className={styles.descriptionItem}>{description} </p>
//             <h6>Category: {category} </h6>
//             <h4>Price ${salePrice} </h4>
//             {/* <button
//               className={styles.buttonCart}
//               onClick={() => handledAddToCart(product)}
//             >
//               Add to Cart
//             </button> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../../../redux/actions/actions";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import loadingImg from "../../../assets/loading.png";
import { getCategory } from "../../../redux/actions/actions";
import styles from "./ProductDetail.module.css";
import { addToCart } from "../../../redux/actions/actions";

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

  // Buscar la categoría correspondiente al categoryId
  const category =
    selectedCategory.find((cat) => cat.id === categoryId)?.name ||
    "Unknown Category";

  return (
    <div style={{ padding: "1rem" }}>
      {loading ? (
        <div>
          <img src={loadingImg} alt="Loading" />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.divImg}>
            <img src={images} alt={name} />
          </div>
          <div className={styles.description}>
            <h4>{name}</h4>
            {/* Utilizamos dangerouslySetInnerHTML para renderizar el HTML */}
            <div
              className={styles.descriptionItem}
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            <h6>Category: {category} </h6>
            <h4>Price ${salePrice} </h4>
            {/* <button
              className={styles.buttonCart}
              onClick={() => handledAddToCart(product)}
            >
              Add to Cart
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};
