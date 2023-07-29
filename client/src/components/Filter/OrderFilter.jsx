import styles from "./OrderFilter.module.css";

const OrderFilter = () => {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.orderTitle}>Order</h2>
        <div className={styles.orderFlex}>
          <button className={styles.btns}>All Products</button>
          <button className={styles.btns}>Nombre A-Z</button>
          <button className={styles.btns}>Nombre Z-A</button>
        </div>
      </div>
    </>
  );
};

export default OrderFilter;
