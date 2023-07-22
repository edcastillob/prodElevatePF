import React from "react";
import styles from "./NavBar.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import logo from "../../assets/logo_2.png";
import { Link } from "react-router-dom";
import { logoutUser } from "../users/Firebase/logout.js";

export const NavBar = ({ user, handleSignIn }) => {
  const handleLogoutClick = () => logoutUser();
  console.log(user);
  return (
    <div className={`p-0 m-0 ${styles.navContainer}`}>
      <div className={styles.divLogo}>
        <img className="img-fluid" src={logo} alt="img-logo" />
      </div>
      <Link to="/categoria">Categoría</Link>
      <Link to="/rol">Roles</Link>
      <Link to="/proveedor">Proveedor</Link>
      <Link to="/producto">Producto</Link>
      <Link to="/usuario">Usuario</Link>
      {!user ? (
        // <button onClick={handleSignIn}>Iniciar sesión</button>
        <Link to="/login">Login</Link>
      ) : (
        <div className={styles.items}>
          <h2>
            <ion-icon name="cart"></ion-icon>
          </h2>
          <h2>{user.displayName}</h2>
        </div>
      )}
      <SearchBar />
      <div className={styles.items}>
        <h2>
          <ion-icon name="cart"></ion-icon>
        </h2>
        <h2 onClick={handleLogoutClick}>
          <ion-icon name="person"></ion-icon>
        </h2>
      </div>
    </div>
  );
};
