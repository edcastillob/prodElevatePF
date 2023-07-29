import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardProduct } from "../Product/cardProduct/cardProduct";
import {
  filterNameAsc,
  filterNameDesc,
  priceHigherLower,
  priceLowerHigher,
  showProducts,
} from "../../redux/actions/actions";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import TypeIt from "typeit-react";
import Marquee from "react-fast-marquee";
import styles from "./Home.module.css";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(showProducts());
  }, []);
  const products = useSelector((state) => state.products);
  const productsFiltered = useSelector((state) => state.productsFiltered);

  const [optionProducts, setOptionProducts] = useState([]);

  useEffect(() => {
    setOptionProducts(productsFiltered.length ? productsFiltered : products);
  }, [productsFiltered, products]);
  useEffect(() => {
    // Recupera los datos del usuario almacenados en el LocalStorage al cargar la página
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUserData });
    }

    // Agregar el evento DOMContentLoaded para que se dispare al cargar y refrescar la página
    const handleDOMContentLoaded = () => {
      const storedUserData = JSON.parse(localStorage.getItem("user"));
      if (storedUserData) {
        dispatch({ type: "LOGIN_SUCCESS", payload: storedUserData });
      }
    };

    window.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

    return () => {
      window.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
    };
  }, [dispatch]);

  //filter Price
  const [filterPrice, setFilterPrice] = useState("");
  const handleSortPrice = (event) => {
    const { value } = event.target;
    event.preventDefault();
    if (value === "all") {
      dispatch(showProducts());
    }
    if (value === "higher") {
      dispatch(priceHigherLower());
    }
    if (value === "lower") {
      dispatch(priceLowerHigher());
    }
    setFilterPrice(value);
  };

  const [filterName, setFilterName] = useState("");
  const handleSortName = (event) => {
    const { value } = event.target;
    event.preventDefault();
    if (value === "all") {
      dispatch(showProducts());
    }
    if (value === "Asc") {
      dispatch(filterNameAsc());
    }
    if (value === "Desc") {
      dispatch(filterNameDesc());
    }
    setFilterName(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <Marquee className={styles.message}>
          Welcome to ProdElevate - The place for the exponential growth of your
          business
        </Marquee>
      </div>
      <div className={styles.divSearch}>
        <SearchBar />
      </div>
      <span> Sort by Price </span>
      <select
        className={styles.select}
        value={filterPrice}
        onChange={handleSortPrice}
      >
        <option value="All"> All </option>
        <option value="higher"> Higher </option>
        <option value="lower"> Lower</option>
      </select>
      <br />

      <span> Sort by Name </span>
      <select
        className={styles.select}
        value={filterName}
        onChange={handleSortName}
      >
        <option value="All"> All </option>
        <option value="Asc"> Asec </option>
        <option value="Desc"> Desc</option>
      </select>
      <br />

      <div className={styles.cards}>
        {productsFiltered.length ? (
          <div>
            <NavLink
              style={{ textDecoration: "none" }}
              onClick={() => {
                navigate.push("/home");
                dispatch(showProducts());
              }}
            >
              {" "}
              <h3>&#8592;</h3>{" "}
            </NavLink>
          </div>
        ) : (
          ""
        )}
        {optionProducts?.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
