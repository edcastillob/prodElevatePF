import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import logo from "../../assets/logo_2.png";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../users/Firebase/logout.js";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/actions";
// import { useSelector } from "react-redux";
// import userImg from "../.././assets/user.png"
// import { useDispatch } from "react-redux";

export const NavBar = ({ user, handleSignIn }) => {
  //Lógica Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const handleLogoutClick = () => {
  //   // Eliminar el usuario del estado global (Redux)
  //   logoutUser();
  //   dispatch({ type: "LOGOUT" });

  //   // Eliminar el usuario del LocalStorage
  //   localStorage.removeItem("user");

  //   // Redirige al login después de cerrar sesión
  //   navigate("/login");
  // };
  useEffect(() => {
    // Recupera los datos del usuario almacenados en el LocalStorage al cargar la página
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUserData });
    }
  }, [dispatch, navigate, user]);



  if (userLogin) {
    console.log(userLogin);
    const email = userLogin[0].User.email;
    console.log(email);
  }

  const handleLogoutClick = () => {
    if (user.displayName) {
      logoutUser();
    } else {
      dispatch(logout());
    }
    window.location.reload(); // Forzar la recarga completa de la página
  };
  console.log(user)

  //Handle Dropdown
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }


  
  return (
    <div className={`p-0 m-0 ${styles.navContainer}`}>
      <div className={styles.divLogo}>
        <Link to="/home">
          <img className="img-fluid" src={logo} alt="img-logo" />
        </Link>
      </div>
      <div className={styles.divSearch}>
        {/* <SearchBar /> */}
      </div>
      <div className={styles.items}>
        <Link
          className={styles.icon}
          to="/cart"
          style={{ textDecoration: "none", color: "white" }}
        >
          <h2 className={styles.icon}>
            <ion-icon name="cart"></ion-icon>
          </h2>
        </Link>
        {user ? null : (
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

        

        {user ? (
          <div
            className={` ${styles.userInfo} ${styles.userContainer}`}
            onClick={handleDropdownToggle}
          >
            <p className={styles.name}>{user.displayName}</p>
            <img src={user.photoURL} alt={user.displayName} className={styles.avatar} />

            {/* Dropdown de opciones */}
            {isDropdownOpen && (
              <ul className={styles.dropdownOptions}>
                <li>
                  <Link
                  className={styles.icon}
                  to="/settings"
                  style={{ textDecoration: "none", color: "black", fontFamily:'Poppins', textAlign:'start' }}
                >
                  <h6>
                    <ion-icon name="settings"></ion-icon> Settings
                  </h6>
                </Link>
                </li>

                <li>{user ? <h6 style={{color:'black', fontFamily:'Poppins', textAlign:'start'}} onClick={handleLogoutClick}><ion-icon name="power"></ion-icon> Logout</h6> : null}
                </li>
                
                
              </ul>
            )}
          </div>
        ) : null}

      </div>

    </div>
  );
};