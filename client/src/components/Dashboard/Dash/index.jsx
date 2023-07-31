import { useState } from "react";
import styles from "../Dashboard.module.css";
import logo from "../../../assets/logo.png";

import { BsPeople } from "react-icons/bs";
import { MdSearch, MdMenu } from "react-icons/md";
import { AiOutlineComment, AiOutlineShoppingCart } from "react-icons/ai";

import { dataSales, dataProducts } from "../data";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

ChartJS.register(Tooltip, Legend, ArcElement);

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const Panel = ({ toggleActive }) => {
  return (
    <>
      {/* <-- main --> */}
      {/* <div> */}
      <div className={styles.topbar}>
        <div className={styles.toggle} onClick={toggleActive}>
          <MdMenu />
        </div>
        {/* search */}
        {/* <div className={styles.search}>
            <label>
              <input type="text" placeholder="Search here..." />
              <MdSearch size="2em" className={styles.icon} />
            </label>
          </div> */}
        {/* userImg */}
        {/* <div className={styles.user}>
          <img src={logo} />
        </div> */}
      </div>

      {/* cards */}
      <div className={styles.cardBox}>
        <div className={styles.card}>
          <div>
            <div className={styles.numbers}>1,290</div>
            <div className={styles.cardName}>Sales</div>
          </div>
          <div className={styles.iconBx}>
            <AiOutlineShoppingCart />
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <div className={styles.numbers}>250</div>
            <div className={styles.cardName}>Customers</div>
          </div>
          <div className={styles.iconBx}>
            <BsPeople />
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <div className={styles.numbers}>200</div>
            <div className={styles.cardName}>Reviews</div>
          </div>
          <div className={styles.iconBx}>
            <AiOutlineComment />
          </div>
        </div>
      </div>

      {/* Add Charts */}
      <div className={styles.graphBox}>
        <div className={styles.box}>
          <span>monthly sales</span>
          <Bar
            style={{ padding: "20px", width: "80%" }}
            data={dataSales}
            options={options}
          />
        </div>
        <div className={styles.box}>
          <span>Most selled products</span>
          <Pie options={options} data={dataProducts} />
        </div>
      </div>

      <div className={styles.details}>
        {/* order details list */}
        <div className={styles.recentOrders}>
          <div className={styles.cardHeader}>
            <h2>Recent Orders</h2>
            <a href="#" className={styles.btn}>
              View All
            </a>
          </div>
          <table>
            <thead>
              <tr>
                <td>Product</td>
                <td>Price</td>
                <td>Payment</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PC Gamer</td>
                <td>$2500</td>
                <td>Credit Card</td>
              </tr>
              <tr>
                <td>Apple Watch</td>
                <td>$1200</td>
                <td>Credit Card</td>
              </tr>
              <tr>
                <td>HP Laptop</td>
                <td>$1000</td>
                <td>Credit Card</td>
              </tr>
              <tr>
                <td>Mouse Gamer</td>
                <td>$500</td>
                <td>Debit Card</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* customers */}
        <div className={styles.recentCustomers}>
          <div className={styles.cardHeader}>
            <h2>Recent Customers</h2>
          </div>
          <table>
            <tr>
              <td width="60px">
                <div className={styles.imgBx}>
                  <img src={logo} />
                </div>
              </td>
              <td>
                <h4>Veralucia</h4>
                <span>Peru</span>
              </td>
            </tr>
            <tr>
              <td width="60px">
                <div className={styles.imgBx}>
                  <img src={logo} />
                </div>
              </td>
              <td>
                <h4>Leo</h4>
                <span>Peru</span>
              </td>
            </tr>
            <tr>
              <td width="60px">
                <div className={styles.imgBx}>
                  <img src={logo} />
                </div>
              </td>
              <td>
                <h4>Yhamira</h4>
                <span>Peru</span>
              </td>
            </tr>
            <tr>
              <td width="60px">
                <div className={styles.imgBx}>
                  <img src={logo} />
                </div>
              </td>
              <td>
                <h4>Cristian</h4>
                <span>Peru</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Panel;
