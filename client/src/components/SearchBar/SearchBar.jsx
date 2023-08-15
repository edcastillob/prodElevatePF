import React from "react";
import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductName } from "../../redux/actions/actions";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = ({ target }) => {
    const { value } = target;
    setName(value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getProductName(name));
    setName("");
  };

  return (
    <div className={styles.divSearchBar}>
      <input
        type="text"
        name="name"
        value={name}
        autoComplete="off"
        className={styles.searchInput}
        placeholder="Search product..."
        onChange={handleChange}
      />
      <button onClick={handleClick}>
        <ion-icon name="search"></ion-icon>
      </button>
    </div>
  );
};
