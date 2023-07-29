import styles from "../Dashboard.module.css";
import { MdSearch, MdMenu } from "react-icons/md";

const Products = ({ toggleActive }) => {
  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.toggle} onClick={toggleActive}>
          <MdMenu />
        </div>
        {/* search */}
        <div className={styles.search}>
          <label>
            <input type="text" placeholder="Search here..." />
            <MdSearch size="2em" className={styles.icon} />
          </label>
        </div>
      </div>

      <div className={styles.customers}>
        <div className={styles.wrapper}>
          <div className={styles.customersHeader}>
            <h2>Products</h2>
          </div>
          <table>
            <thead>
              <tr>
                <td>NAME</td>
                <td>DESCRIPTION</td>
                <td>PRICE</td>
                <td>STOCK</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Airpods</td>
                <td>Accesorios</td>
                <td>$500</td>
                <td>20</td>
              </tr>
              <tr>
                <td>Apple watch</td>
                <td>Accesorios</td>
                <td>$800</td>
                <td>14</td>
              </tr>
              <tr>
                <td>MacBook Air</td>
                <td>Computador</td>
                <td>$1000</td>
                <td>9</td>
              </tr>
              <tr>
                <td>Laptop HP</td>
                <td>Computador</td>
                <td>$900</td>
                <td>18</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
