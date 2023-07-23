import React, { useEffect } from "react";
import styles from "./NavBar.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import logo from "../../assets/logo_2.png";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../users/Firebase/logout.js";
import { useSelector } from "react-redux";
import userImg from "../.././assets/user.png"
import { useDispatch } from "react-redux";

export const NavBar = ({ user, handleSignIn }) => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    // Eliminar el usuario del estado global (Redux)
    logoutUser();
    dispatch({ type: "LOGOUT" });

    // Eliminar el usuario del LocalStorage
    localStorage.removeItem("user");

    // Redirige al login después de cerrar sesión
    navigate("/login");
  };
  useEffect(() => {
    // Recupera los datos del usuario almacenados en el LocalStorage al cargar la página
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUserData });
    }
  
  }, [dispatch, navigate, user]);
 



  // const userProve = {
  //   name: "Luis Naveda",
  //   email: "luisnaveda10@gmail.com",
  //   images: userImg,
  // }

  
  return (
    <div className={`p-0 m-0 ${styles.navContainer}`}>
      <div className={styles.divLogo}>
        <Link to="/home">
          <img className="img-fluid" src={logo} alt="img-logo" />
        </Link>
      </div>
      <div className={styles.divSearch}>
      <SearchBar />
      </div>
      <div className={styles.items}>
        <h2 className={styles.icon}>
          <ion-icon name="cart"></ion-icon>
        </h2>
        <Link className={styles.icon} to="/login" style={{ textDecoration: "none", color: "white" }}>
        <h2>
          <ion-icon name="person"></ion-icon>
        </h2>
        </Link>
        <Link className={styles.icon} to="/settings" style={{ textDecoration: "none", color: "white" }}>
          <h2>
            <ion-icon name="settings"></ion-icon>
          </h2>
        </Link>

      </div>

      <div className={styles.items}>
        <h2>
          <ion-icon name="cart"></ion-icon>
        </h2>
        <h2 onClick={handleLogoutClick}>
          <ion-icon name="person"></ion-icon>
        </h2>
        {user ? user.displayName : null}

        {/* Renderizar la imagen del usuario si existe */}
        {userLogin && userLogin.user && userLogin.user.image && userLogin.user.image.length > 0 && (
          <img src={userLogin.user.image[0]} alt="User Avatar" />
        )}

        {user ? <p onClick={handleLogoutClick}>Logout</p> : null}

        {/* {userLogin ? userLogin.email : null }
        <h6>{userProve.name}</h6>
        <img src={userProve.images} alt={userProve.name} className={styles.avatar} />
        {user ? user.displayName : null }  
        {user ? (
        <p onClick={handleLogoutClick}>Logout</p>
      ) : null} */}

      </div>

    </div>
  );
};
