import React from "react";
import styles from "./SearchBar.module.css";



export const SearchBar = () => {

    return(
        <div className={styles.divSearchBar}>
            <input 
            type="text" 
            className={styles.searchInput}
            placeholder="Search product or category" />
            <button><ion-icon name="search"></ion-icon></button>
        </div>
    )
}