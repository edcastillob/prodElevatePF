import React from "react";
import styles from "./NavBar.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import logo from "../../assets/logo_2.png";
import { Link } from "react-router-dom";
import { logoutUser } from "../users/Firebase/logout.js";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/actions";


export const NavBar = ({ user, handleSignIn }) => {
  console.log(user);
  const dispatch = useDispatch();
  const userLogin= useSelector((state) => state.user);
  console.log("_________",userLogin)
  
  const handleLogoutClick = () => {
    if (user.displayName){
      logoutUser();
    } else {
      dispatch(logout());
    }
    window.location.reload(); // Forzar la recarga completa de la página
  };
  return (
    <div className={`p-0 m-0 ${styles.navContainer}`}>
      <div className={styles.divLogo}>
        <Link to="/home">
          <img className="img-fluid" src={logo} alt="img-logo" />
        </Link>
      </div>
      
      <SearchBar />
      <div className={styles.items}>
        <h2>
          <ion-icon name="cart"></ion-icon>
        </h2>
        <Link to="/login" style={{ textDecoration: "none", color: "white" }}>

        <h2>
          <ion-icon name="person"></ion-icon>
        </h2></Link>
        <Link to="/settings" style={{ textDecoration: "none", color: "white" }}>
          <h2>
            <ion-icon name="settings"></ion-icon>
          </h2>
        </Link>
      </div>
      <SearchBar />
      <div className={styles.items}>
        <h2>
          <ion-icon name="cart"></ion-icon>
        </h2>
        <h2 onClick={handleLogoutClick}>
          <ion-icon name="person"></ion-icon>
        </h2>
      {user ? user.User?.name : null} 
      {user ? user.displayName : null} 
      
      {user ? user.User?.email : null} 
      {user ? user.email : null} 

        {user ? (
        <p onClick={handleLogoutClick}>Logout</p>
      ) : null}
      </div>
    </div>
  );
};
