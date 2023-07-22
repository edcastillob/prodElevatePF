import React from "react";
import styles from "./NavBar.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import logo from "../../assets/logo_2.png";
import { Link } from "react-router-dom";
import { logoutUser } from "../users/Firebase/logout.js";
import { useSelector } from "react-redux";


export const NavBar = ({ user, handleSignIn }) => {
  const userLogin= useSelector((state) => state.user);
  console.log("_________",userLogin)
  if(userLogin.length !==0){
    const email = userLogin[0].User.email
    console.log(email)
  }
  
  const handleLogoutClick = () => logoutUser();
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
      {user ? user.displayName : null }  
      {userLogin ? userLogin[0].User.email : null}
      {userLogin ? userLogin.email : null }  

        {user ? (
        <p onClick={handleLogoutClick}>Logout</p>
      ) : null}
      </div>
    </div>
  );
};
