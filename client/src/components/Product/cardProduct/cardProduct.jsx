import { Link, useNavigate } from "react-router-dom";
import styles from "./cardProduct.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/actions";

export const CardProduct = ({ product }) => {
  const { id, name, category, images, salePrice } = product;
  // <NavLink title="Detail Product" to={`/productid/${id}`}></NavLink>

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handledAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  return (
    <div className={styles.cardContainer}>
      <Link
        title="Detail Product"
        to={`/productid/${id}`}
        className={styles.link}
      >
        <div className={styles.divImg}>
          {/* <NavLink title="Detail Country" to={`/detail/20`}>           */}
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
        <Link
        title="Edit Product"
        to={`/productidedit/${id}`}        
        >
        Edit
        </Link>
      </div>
    </div>
  );
};