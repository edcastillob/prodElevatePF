import { useEffect } from "react";
import styles from "../Dashboard.module.css";
import logo from "../../../assets/logo.png";

import { BsPeople } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { AiOutlineComment, AiOutlineShoppingCart } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { getUsers, showProducts } from "../../../redux/actions/actions";

import BarChart from "../Charts/BarModel";
import PieChart from "../Charts/PieModel";

const Panel = ({ toggleActive }) => {
  const dispatch = useDispatch();
  
  /** Show Users */ 
  const users = useSelector((state) => state.users);
  
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
            <div className={styles.cardName}>Products</div>
          </div>
          <div className={styles.iconBx}>
            <AiOutlineShoppingCart />
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <div className={styles.numbers}>{users.length}</div>
            <div className={styles.cardName}>Users</div>
          </div>
          <div className={styles.iconBx}>
            <BsPeople />
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <div className={styles.numbers}>20</div>
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
          <h2>Products By Condition</h2>
          <BarChart/>
        </div>
        <div className={styles.box}>
          <span>Most selled products</span>
          <PieChart/>
        </div>
      </div>

      <div className={styles.details}>
        {/* products list */}
        <div className={styles.recentOrders}>
          <div className={styles.cardHeader}>
            <h2>Products by Sale Price</h2>
            {/* <a href="#" className={styles.btn}>
              View All
            </a> */}
          </div>
          <table>
            <thead>
              <tr>
                <td>NAME</td>
                <td>PRICE</td>
                <td>CONDITION</td>
                <td>REF.</td>
                </tr>
            </thead>
            <tbody>
            {
              firstFiveItems?.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>$ {product.salePrice}</td>
                  <td>{product.condition}</td>
                  <td>
                    <img src={product.images} width={50} height={50}/>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>

        {/* Users Table */}
        <div className={styles.recentCustomers}>
          <div className={styles.cardHeader}>
            <h2>Recent Users</h2>
          </div>
          {
            sortedUsers.map(user => (
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
            ))
          }
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Panel;
