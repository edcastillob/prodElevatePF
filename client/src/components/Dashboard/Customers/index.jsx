import styles from "../Dashboard.module.css";
import { MdSearch, MdMenu } from "react-icons/md";

const Customers = ({ toggleActive }) => {
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
            <div className={styles.customersHeader} >
              <h2>Customers</h2>
            </div>
            <table>
              <thead>
                <tr>
                  <td>NAME</td>
                  <td>IDENTIFICATION</td>
                  <td>EMAIL</td>
                  <td>PHONE</td>
                  <td>ADDRESS</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Veralucia Mendoza</td>
                  <td>48185051</td>
                  <td>mendozaveralucia@gmail.com</td>
                  <td>986824328</td>
                  <td>Prolg. Arenales 746 - Miraflores</td>
                </tr>
                <tr>
                  <td>Leonardo Palomino</td>
                  <td>9391696</td>
                  <td>leo@gmail.com</td>
                  <td>989898989</td>
                  <td>Calle 123 - Miraflores</td>
                </tr>
                <tr>
                  <td>Yhamira Ramirez</td>
                  <td>12345678</td>
                  <td>yhamira@gmail.com</td>
                  <td>999999999</td>
                  <td>Av. San Luis 345 - Carabayllo</td>
                </tr>
                <tr>
                  <td>Ines Mejia</td>
                  <td>78904567</td>
                  <td>imes@gmail.com</td>
                  <td>678904521</td>
                  <td>Jr. Ayacucho 234 - Independencia</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
};

export default Customers;
