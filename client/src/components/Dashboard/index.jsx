import styles from "./Dashboard.module.css";
import logo from "../../assets/logo.png";
import { VscHome } from "react-icons/vsc";
import { BsPeople } from "react-icons/bs";
import { MdOutlineReviews } from "react-icons/md";
import { TbTruckDelivery, TbReportMoney } from "react-icons/tb";
import { AiOutlineSetting, AiOutlineShoppingCart } from "react-icons/ai";

import { useState } from "react";
import Customers from "./Customers";
import Reviews from "./Reviews";
import Dash from "./Dash";
import Products from "./Products";
import Providers from "./Providers";
import Orders from "./Orders";
import { Configuration } from "../Configuration/Configuration";

const Panel = () => {
  const [isActive, setIsActive] = useState(false);
  const [view, setView] = useState("panel");

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const renderView = () => {
    switch (view) {
      case "panel":
        return <Dash toggleActive={toggleActive} />;
      case "customers":
        return <Customers toggleActive={toggleActive} />;
      case "reviews":
        return <Reviews />;
      case "products":
        return <Products toggleActive={toggleActive} />;
      case "providers":
        return <Providers />;
      case "orders":
        return <Orders />;
      case "settings":
        return <Configuration toggleActive={toggleActive} />;
      default:
        return <Dash toggleActive={toggleActive} />;
    }
  };

  // const options = {
  //   responsive: true,
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  return (
    <>
      <div>
        <div
          className={`${styles.navigation} ${isActive ? styles.active : ""}`}
        >
          <ul>
            <li>
              <a href="#">
                <img src={logo} alt="logo" width={80} height={50} />
                <span>PANEL ADMINISTRATIVO</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setView("panel")}>
                <span className={styles.icon}>
                  <VscHome size="1.6em" />
                </span>
                <span>Dashboard</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={() => setView("products")}>
                <span className={styles.icon}>
                  <AiOutlineShoppingCart size="1.6em" />
                </span>
                <span>Products</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={() => setView("customers")}>
                <span className={styles.icon}>
                  <BsPeople size="1.6em" />
                </span>
                <span>Customers</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={() => setView("providers")}>
                <span className={styles.icon}>
                  <TbTruckDelivery size="1.6em" />
                </span>
                <span>Providers</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={() => setView("reviews")}>
                <span className={styles.icon}>
                  <MdOutlineReviews size="1.6em" />
                </span>
                <span>Reviews</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={() => setView("orders")}>
                <span className={styles.icon}>
                  <TbReportMoney size="1.6em" />
                </span>
                <span>Orders</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={() => setView("settings")}>
                <span className={styles.icon}>
                  <AiOutlineSetting size="1.6em" />
                </span>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styles.main} ${isActive ? styles.active : ""}`}>
          {renderView()}
        </div>
      </div>
    </>
  );
};

export default Panel;
