import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardProduct } from "../Product/cardProduct/cardProduct";
import {
  filterData,
  filterNameAsc,
  priceHigherLower,
  priceLowerHigher,
  showProducts,
} from "../../redux/actions/actions";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TypeIt from "typeit-react";
import Marquee from "react-fast-marquee";
import styles from "./Home.module.css";
import OrderFilter from "../Filter/OrderFilter";
import FilterModal from "../Filter/FilterModal";



export const Home = ( { user, userLocal, handleSignIn  } ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(showProducts());
  }, []);
  const products = useSelector((state) => state.products);
  const productsFiltered = useSelector((state) => state.productsFiltered);
  const productReviews = useSelector((state) => state.productReviews);
  const [optionProducts, setOptionProducts] = useState([]);
  const [searchProductNav, setSearchProductNav] = useState("");

  useEffect(() => {
    setOptionProducts(productsFiltered.length ? productsFiltered : products);
  }, [productsFiltered, products]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUserData });
    }

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

 
  const handlePriceHigher = () => {
    dispatch(priceHigherLower());
  };

  const handlePriceLower = () => {
    dispatch(priceLowerHigher());
  };

  const handleSortName = () => {
    dispatch(filterNameAsc("az"));
  };

  const handleAllProdutcs = () => {
    dispatch(showProducts());
  };

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFilter = (filters) => {
    dispatch(filterData(filters));
    setShowModal(false);
  };

  const filteredProducts = optionProducts.filter((product) =>
    product.name.toLowerCase().includes(searchProductNav.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <Marquee className={styles.message}>
          Welcome to ProdElevate - The place for the exponential growth of your
          business
        </Marquee>
      </div>
      <div className={styles.divSearch}>
        {/* search */}
        <input
          type="text"
          placeholder="search product"
          value={searchProductNav}
          onChange={(event) => setSearchProductNav(event.target.value)}
        />
      </div>
      <div className={styles.oderFilters}>
        <div>
          <OrderFilter
            handlePriceHigher={handlePriceHigher}
            handlePriceLower={handlePriceLower}
            handleSortName={handleSortName}
            handleAllProdutcs={handleAllProdutcs}
          />
        </div>
        <div>
          <button onClick={handleOpenModal} className={styles.titleFilter}>
            Filter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              fill="currentColor"
              className="bi bi-funnel"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
            </svg>
          </button>
          <FilterModal
            show={showModal}
            handleClose={handleCloseModal}
            handleFilter={handleFilter}
          />
        </div>
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

        {/* optionProducts */}
        {filteredProducts?.map((product) => (
          <CardProduct 
           key={product.id}
          product={product}
          />
        ))}
      </div>
    </div>
  );
};


