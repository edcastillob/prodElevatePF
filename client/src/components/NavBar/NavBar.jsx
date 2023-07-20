import React from "react";
import styles from "./NavBar.module.css"
import { SearchBar } from "../SearchBar/SearchBar";
import logo from "../../assets/logo_2.png"
import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
Link
>>>>>>> c4238e1a16db0af9bad94741f587f6acff29669c



export const NavBar = () => {


    return (
        <div className={`p-0 m-0 ${styles.navContainer}`}>

        <div className={styles.divLogo}>
            <Link to="/home"><img className="img-fluid" src={logo} alt="img-logo" /></Link>
        </div>
        <div className={styles.options}>
        <Link to="/categoria" className={styles.optionItem}>Categoria</Link>
        <Link to="/rol" className={styles.optionItem}>Roles</Link>
        <Link to="/proveedor" className={styles.optionItem}>Proveedor</Link>
        <Link to="/producto" className={styles.optionItem}>Producto</Link>
        <Link to="/usuario" className={styles.optionItem}>Usuario</Link>
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