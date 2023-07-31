import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../../assets/logo_2.png";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../users/Firebase/logout.js";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/actions";
import userImg from "../.././assets/user.png";


export const NavBar = ({ user, userLocal, handleSignIn }) => {
  //Lógica Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  let userLogin = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    if (userLocal) {
      dispatch(logout());
    } else {
      logoutUser();
    }
    window.location.reload(); // Forzar la recarga completa de la página
  };

  // console.log(user);

  //Handle Dropdown
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`p-0 m-0 ${styles.navContainer}`}>
      <div className={styles.divLogo}>
        <Link to="/home">
          <img className="img-fluid" src={logo} alt="img-logo" />
        </Link>
      </div>
      <div className={styles.divSearch}>{/* <SearchBar /> */}</div>
      <div className={styles.items}>

      {user || userLocal ? (
          <Link
            className={styles.icon}
            to="/favorites"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h2>
              <ion-icon name="heart"></ion-icon>
            </h2>
          </Link>
        ) : null }

        <Link
          className={styles.icon}
          to="/cart"
          style={{ textDecoration: "none", color: "white" }}
        >
          <h2 className={styles.icon}>
            <ion-icon name="cart"></ion-icon>
          </h2>
        </Link>

        {user || userLocal ? null : (
          <Link
            className={styles.icon}
            to="/login"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h2>
              <ion-icon name="person"></ion-icon>
            </h2>
          </Link>
        )}

        

        {/* <Link
              className={styles.icon}
              to="/settings"
              style={{ textDecoration: "none", color: "white" }}
            >
              <h2>
                <ion-icon name="settings"></ion-icon>
              </h2>
            </Link> */}
        {userLogin &&
          userLogin.user &&
          userLogin.user.image &&
          userLogin.user.image.length > 0 && (
            <img src={userLogin.user.image[0]} alt="User Avatar" />
          )}

        {userLocal ? (
          <div
            className={` ${styles.userInfo} ${styles.userContainer}`}
            onClick={handleDropdownToggle}
          >
            <p className={styles.name}>{userLocal.name}</p>
            <img
              src={userLocal.image}
              alt={userLocal.name}
              className={styles.avatar}
            />

            {/* Dropdown de opciones */}
            {isDropdownOpen && (
              <ul className={styles.dropdownOptions} style={{ zIndex: 10 }}>
                <li>
                <Link
                    className={styles.icon}
                    to="/dashboard"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontFamily: "Poppins",
                      textAlign: "start",
                    }}
                  >
                    <h6>
                      <ion-icon name="compass"></ion-icon> Dashboard
                    </h6>
                  </Link>
                </li>
                
                
                <li>
                  <h6
                    style={{
                      color: "black",
                      fontFamily: "Poppins",
                      textAlign: "start",
                    }}
                  >
                    <ion-icon name="person"></ion-icon> Profile
                  </h6>
                </li>
                {/* <li>
                  <Link
                    className={styles.icon}
                    to="/settings"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontFamily: "Poppins",
                      textAlign: "start",
                    }}
                  >
                    <h6>
                      <ion-icon name="settings"></ion-icon> Settings
                    </h6>
                  </Link>
                </li> */}

                <li>
                  {userLocal ? (
                    <h6
                      style={{
                        color: "black",
                        fontFamily: "Poppins",
                        textAlign: "start",
                      }}
                      onClick={handleLogoutClick}
                    >
                      <ion-icon name="power"></ion-icon> Logout
                    </h6>
                  ) : null}
                </li>
              </ul>
            )}
          </div>
        ) : null}

        {user ? (
          <div
            className={` ${styles.userInfo} ${styles.userContainer}`}
            onClick={handleDropdownToggle}
          >
            <p className={styles.name}>{user.displayName}</p>
            <img
              src={user.photoURL}
              alt={user.displayName}
              className={styles.avatar}
            />

            {/* Dropdown de opciones */}
            {isDropdownOpen && (
              <ul className={styles.dropdownOptions} style={{ zIndex: 10 }}>
                <li>
                <Link
                    className={styles.icon}
                    to="/dashboard"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontFamily: "Poppins",
                      textAlign: "start",
                    }}
                  >
                    <h6>
                      <ion-icon name="compass"></ion-icon> Dashboard
                    </h6>
                  </Link>
                </li>
                <li>
                  <h6
                    style={{
                      color: "black",
                      fontFamily: "Poppins",
                      textAlign: "start",
                    }}
                  >
                    <ion-icon name="person"></ion-icon> Profile
                  </h6>
                </li>
                {/* <li>
                  <Link
                    className={styles.icon}
                    to="/settings"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontFamily: "Poppins",
                      textAlign: "start",
                    }}
                  >
                    <h6>
                      <ion-icon name="settings"></ion-icon> Settings
                    </h6>
                  </Link>
                </li> */}

                <li>
                  {user ? (
                    <h6
                      style={{
                        color: "black",
                        fontFamily: "Poppins",
                        textAlign: "start",
                      }}
                      onClick={handleLogoutClick}
                    >
                      <ion-icon name="power"></ion-icon> Logout
                    </h6>
                  ) : null}
                </li>
              </ul>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
