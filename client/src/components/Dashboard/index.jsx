import styles from "./Dashboard.module.css";
import logo from "../../assets/logo_2.png";
import { VscHome } from "react-icons/vsc";
import { BsPeople } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { BiCategory } from "react-icons/bi";
import { MdOutlineReviews } from "react-icons/md";
import { TbTruckDelivery, TbReportMoney } from "react-icons/tb";
import { AiOutlineSetting, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import Customers from "./Customers";
import Reviews from "./Reviews";
import Dash from "./Dash";
import Products from "./Products";
import Providers from "./Providers";
import Orders from "./Orders";
import { Configuration } from "../Configuration/Configuration";
import { ShowCategory } from "../Product/category/ShowCategory/ShowCategory";
import { UsersAll } from "../users/UsersAll/UsersAll";
import { useTranslation } from 'react-i18next';

const Panel = ({ currentLanguage }) => {
  const [isActive, setIsActive] = useState(false);
  const [view, setView] = useState("panel");
  const { t } = useTranslation('global');

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const renderView = () => {
    switch (view) {
      case "panel":
        return <Dash toggleActive={toggleActive} currentLanguage={currentLanguage} />;
      case "users":
        return <UsersAll toggleActive={toggleActive} currentLanguage={currentLanguage} />;
      case "customers":
        return <Customers toggleActive={toggleActive} currentLanguage={currentLanguage} />;
      case "reviews":
        return <Reviews />;
      case "products":
        return <Products toggleActive={toggleActive} currentLanguage={currentLanguage}/>;
      case "providers":
        return <Providers toggleActive={toggleActive} currentLanguage={currentLanguage}/>;
      case "orders":
        return <Orders />;
      case "settings":
        return <Configuration toggleActive={toggleActive} currentLanguage={currentLanguage}/>;
      case "category":
        return <ShowCategory toggleActive={toggleActive} currentLanguage={currentLanguage}/>;
      default:
        return <Dash toggleActive={toggleActive} currentLanguage={currentLanguage}/>;
    }
  };

  return (
    <>
      <div>
        <div
          className={`${styles.navigation} ${isActive ? styles.active : ""}`}
        >
          <ul>
          <Link to="/home" className={styles.link}>
            <li>
                <img src={logo} alt="logo" width={70} height={70} />
            </li>
            </Link>
                <span style={{fontWeight:'700', color:'#fff'}} className={styles.titles}>{t("dashboard.admin", { lng: currentLanguage })}</span>
            <li>
              <a href="#" onClick={() => setView("panel")}>
                <span className={styles.icon}>
                  <VscHome size="1.6em" />
                </span>
                <span className={styles.titles}>{t("dashboard.dashboard", { lng: currentLanguage })}</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={() => setView("users")}>
                <span className={styles.icon}>
                  <BiUser size="1.6em" />
                </span>
                <span className={styles.titles}>{t("dashboard.users", { lng: currentLanguage })}</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={() => setView("products")}>
                <span className={styles.icon}>
                  <AiOutlineShoppingCart size="1.6em" />
                </span>
                <span className={styles.titles}>{t("dashboard.products", { lng: currentLanguage })}</span>
              </a>
            </li>
            
            <li>
              <a href="#" onClick={() => setView("category")}>
                <span className={styles.icon}>
                  <BiCategory size="1.6em" />
                </span>
                <span className={styles.titles}>{t("dashboard.categories", { lng: currentLanguage })}</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={() => setView("providers")}>
                <span className={styles.icon}>
                  <TbTruckDelivery size="1.6em" />
                </span>
                <span className={styles.titles}>{t("dashboard.providers", { lng: currentLanguage })}</span>
              </a>
            </li>
            
            {/* <li>
              <a href="#" onClick={() => setView("customers")}>
                <span className={styles.icon}>
                  <BsPeople size="1.6em" />
                </span>
                <span className={styles.titles}>Customers</span>
              </a>
            </li> */}

{/* 
            <li>
              <a href="#" onClick={() => setView("reviews")}>
                <span className={styles.icon}>
                  <MdOutlineReviews size="1.6em" />
                </span>
                <span className={styles.titles}>Reviews</span>
              </a>
            </li> */}

            {/* <li>
              <a href="#" onClick={() => setView("orders")}>
                <span className={styles.icon}>
                  <TbReportMoney size="1.6em" />
                </span>
                <span className={styles.titles}>Orders</span>
              </a>
            </li> */}

            <li>
              <a href="#" onClick={() => setView("settings")}>
                <span className={styles.icon}>
                  <AiOutlineSetting size="1.6em" />
                </span>
                <span className={styles.titles}>{t("dashboard.settings", { lng: currentLanguage })}</span>
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
