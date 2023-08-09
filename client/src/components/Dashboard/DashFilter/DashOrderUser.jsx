import styles from "./DashOrderUser.module.css";

const DashOrderUser = ({
  handleUsersByName,
  handleUsersInactive,
  handleActiveUsers,
}) => {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.orderTitle}>Order</h2>
        <div className={styles.orderFlex}>
          <button className={styles.btns} onClick={handleUsersByName}>
            Name
          </button>
          <button className={styles.btns} onClick={handleActiveUsers}>
            Active
          </button>
          <button className={styles.btns} onClick={handleUsersInactive}>
            Inactive
          </button>
        </div>
      </div>
    </>
  );
};

export default DashOrderUser;
