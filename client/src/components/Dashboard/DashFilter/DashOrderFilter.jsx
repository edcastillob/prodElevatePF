import styles from "./DashOrderFilter.module.css";

const DashOrderFilter = ({
  handleActiveProducts,
  handleSortName,
  handleInactiveProducts,
}) => {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.orderTitle}>Order</h2>
        <div className={styles.orderFlex}>
          <button className={styles.btns} onClick={handleSortName}>
            Name
          </button>
          <button className={styles.btns} onClick={handleActiveProducts}>
            Active
          </button>
          <button className={styles.btns} onClick={handleInactiveProducts}>
            Inactive
          </button>
        </div>
      </div>
    </>
  );
};

export default DashOrderFilter;
