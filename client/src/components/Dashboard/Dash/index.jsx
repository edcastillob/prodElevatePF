import { useEffect } from "react";
import styles from "../Dashboard.module.css";
import logo from "../../../assets/logo.png";

import { BsPeople } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { AiOutlineComment, AiOutlineShoppingCart } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  showProducts,
  showReviews,
} from "../../../redux/actions/actions";

import BarChart from "../Charts/BarModel";
import PieChart from "../Charts/PieModel";
import { useTranslation } from "react-i18next";

const Panel = ({ toggleActive, currentLanguage }) => {
  const { t } = useTranslation("global");
  const dispatch = useDispatch();

  /** Show Users */
  const users = useSelector((state) => state.users);
  /** Show reviews */
  const reviews = useSelector((state) => state.reviews);
  // console.log("___", reviews)

  const sortedUsers = users
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  /** Show Prodcuts */
  const products = useSelector((state) => state.products);

  const sortedProducts = products
    .slice()
    .sort((a, b) => a.salePrice - b.salePrice);
  const firstFiveItems = sortedProducts.slice(0, 5);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(showProducts());
    dispatch(showReviews());
  }, []);

  return (
    <>
      {/* <-- main --> */}
      {/* <div> */}
      <div className={styles.topbar}>
        <div className={styles.toggle} onClick={toggleActive}>
          <MdMenu />
        </div>
        {/* userImg */}
        {/* <div className={styles.user}>
          <img src={logo} />
        </div> */}
      </div>

      {/* cards */}
      <div className={styles.cardBox}>
        <div className={styles.card}>
          <div>
            <div className={styles.numbers}>{products.length}</div>
            <div className={styles.cardName}>
              {t("dashboard.products", { lng: currentLanguage })}
            </div>
          </div>
          <div className={styles.iconBx}>
            <AiOutlineShoppingCart />
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <div className={styles.numbers}>{users.length}</div>
            <div className={styles.cardName}>
              {t("dashboard.users", { lng: currentLanguage })}
            </div>
          </div>
          <div className={styles.iconBx}>
            <BsPeople />
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <div className={styles.numbers}>{reviews.length}</div>
            <div className={styles.cardName}>
              {t("dashboard.reviews", { lng: currentLanguage })}
            </div>
          </div>
          <div className={styles.iconBx}>
            <AiOutlineComment />
          </div>
        </div>
      </div>

      {/* Add Charts */}
      <div className={styles.graphBox}>
        <div className={styles.box}>
          <h2>{t("dashboard.by-condition", { lng: currentLanguage })}</h2>
          <BarChart currentLanguage={currentLanguage} />
        </div>
        <div className={styles.box}>
          <span>
            {t("dashboard.most-selled-products", { lng: currentLanguage })}
          </span>
          <PieChart currentLanguage={currentLanguage} />
        </div>
      </div>

      <div className={styles.details}>
        {/* products list */}
        <div className={styles.recentOrders}>
          <div className={styles.cardHeader}>
            <h2>{t("dashboard.by-price", { lng: currentLanguage })}</h2>
            {/* <a href="#" className={styles.btn}>
              View All
            </a> */}
          </div>
          <table>
            <thead>
              <tr>
                <td>{t("dashboard.name", { lng: currentLanguage })}</td>
                <td>{t("dashboard.price", { lng: currentLanguage })}</td>
                <td>{t("dashboard.condition", { lng: currentLanguage })}</td>
                <td>REF.</td>
              </tr>
            </thead>
            <tbody>
              {firstFiveItems?.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>$ {product.salePrice}</td>
                  <td>{product.condition}</td>
                  <td>
                    <img src={product.images} width={50} height={50} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Users Table */}
        <div className={styles.recentCustomers}>
          <div className={styles.cardHeader}>
            <h2>{t("dashboard.recent-users", { lng: currentLanguage })}</h2>
          </div>
          {sortedUsers.map((user) => (
            <table key={user.id}>
              <tbody>
                <tr>
                  <td width="60px">
                    <div className={styles.imgBx}>
                      <img src={user.image} />
                    </div>
                  </td>
                  <td>
                    <h4>{user.name}</h4>
                    <span>{user.email}</span>
                    <p>{user.address}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Panel;
