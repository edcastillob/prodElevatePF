import React from "react";
import styles from "./NavBar.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import logo from "../../assets/logo_2.png";
import { Link } from "react-router-dom";
import { logoutUser } from "../users/Firebase/logout.js";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/actions";
import { useSelector } from "react-redux";
import userImg from "../.././assets/user.png"



export const NavBar = ({ user, handleSignIn }) => {
  console.log(user);
  const dispatch = useDispatch();
  const userLogin= useSelector((state) => state.user);
  console.log("_________",userLogin)


  if(userLogin.length !==0){
    const email = userLogin[0].User.email
    console.log(email)
  }

  const userProve = {
    name: "Luis Naveda",
    email: "luisnaveda10@gmail.com",
    images: userImg,
  }

  
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


        {userLogin ? userLogin.email : null }
        <h6>{userProve.name}</h6>
        <img src={userProve.images} alt={userProve.name} className={styles.avatar} />
        {user ? user.displayName : null }  

        {user ? (
        <p onClick={handleLogoutClick}>Logout</p>
      ) : null}
      </div>

    </div>
  );
};