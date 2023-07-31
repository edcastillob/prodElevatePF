import styles from "./OrderFilter.module.css";

const OrderFilter = ({
  handlePriceHigher,
  handlePriceLower,
  handleSortName,
  handleAllProdutcs,
}) => {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.orderTitle}>Order</h2>
        <div className={styles.orderFlex}>
          <button className={styles.btns} onClick={handleAllProdutcs}>
            All Products
          </button>
          <button className={styles.btns} onClick={handleSortName}>
            Name
          </button>
          <button className={styles.btns} onClick={handlePriceHigher}>
            Highest Price
          </button>
          <button className={styles.btns} onClick={handlePriceLower}>
            Lowest Price
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderFilter;
