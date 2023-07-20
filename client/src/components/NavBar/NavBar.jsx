import React from "react";
import styles from "./NavBar.module.css"
import { SearchBar } from "../SearchBar/SearchBar";
import logo from "../../assets/logo_2.png"
import { Link } from "react-router-dom";
Link



export const NavBar = () => {


    return (
        <div className={`p-0 m-0 ${styles.navContainer}`}>

        <div className={styles.divLogo}>
            <img className="img-fluid" src={logo} alt="img-logo" />
        </div>
        <Link to="/categoria">Categoria</Link>
        <Link to="/rol">Roles</Link>
        <Link to="/proveedor">Proveedor</Link>
        <Link to="/producto">Producto</Link>
        <Link to="/usuario">Usuario</Link>
        <Link to="/login">Login</Link>
        <SearchBar/>
        <div className={styles.items}>
        <h2><ion-icon name="cart"></ion-icon></h2>
        <h2><ion-icon name="person"></ion-icon></h2>
        </div>
        </div>
    )
}