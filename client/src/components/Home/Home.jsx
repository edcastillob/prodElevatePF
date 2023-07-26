import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardProduct } from "../Product/cardProduct/cardProduct";
import { showProducts } from "../../redux/actions/actions";
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


  return (
    <div className={styles.container}>
    <div className={styles.container}>
   {/* //COMMENT */}
      <div className={styles.welcome}>
        <Marquee className={styles.message}>
           Welcome to ProdElevate - The place for the exponential growth of your business
        </Marquee>
      </div>
      <div className={styles.divSearch}>
        <SearchBar />
      </div>
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
        <CardProduct key={product.id} product={product}/>
      ))}
    </div>
    </div>
  );
};
