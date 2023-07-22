import { Link } from "react-router-dom";
import styles from "./cardProduct.module.css";

export const CardProduct = ({ id, name, category, image, salePrice }) => {
  // <NavLink title="Detail Product" to={`/productid/${id}`}></NavLink>
  return (
    <div className={styles.cardContainer}>
      <Link
        title="Detail Product"
        to={`/productid/${id}`}
        className={styles.link}
      >
        <div className={styles.divImg}>
          {/* <NavLink title="Detail Country" to={`/detail/20`}>           */}
          <img className={styles.img} src={image} alt="product" />
        </div>
      </Link>
      <div className={styles.description}>
        <h6 className={styles.title}>{name}</h6>
        <h5 className={styles.category}> {category}</h5>
        <span className={styles.priceLabel}>Price</span>
        <h6 className={styles.price}>${salePrice}</h6>
        <button className={styles.buttonCart}>Add to Cart</button>
      </div>
    </div>
  );
};
