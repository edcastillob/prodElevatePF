import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardProduct } from "../Product/cardProduct/cardProduct";
import {
  filterData,
  filterNameAsc,
  getProductsByName,
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
import { useTranslation } from "react-i18next";
import loading from "../../assets/loading.png";

export const Home = ({ user, userLocal, handleSignIn, currentLanguage }) => {
  const { t } = useTranslation("global");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPage = useSelector((state) => state.currentPage);
  console.log(currentPage);
  const totalPages = useSelector((state) => state.totalPages);

  useEffect(() => {
    dispatch(showProducts(currentPage));
  }, []);

  const products = useSelector((state) => state.products);
  const productsFiltered = useSelector((state) => state.productsFiltered);

  const [optionProducts, setOptionProducts] = useState([]);
  const [searchProductNav, setSearchProductNav] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    event.preventDefault();
    setSearchProductNav(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getProductsByName(currentPage, searchProductNav));
  };

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
    dispatch(priceHigherLower(currentPage));
  };

  const handlePriceLower = () => {
    dispatch(priceLowerHigher(currentPage));
  };

  const handleSortName = () => {
    dispatch(filterNameAsc(currentPage));
  };

  const handleAllProdutcs = () => {
    dispatch(showProducts(currentPage));
  };

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFilter = (filters) => {
    dispatch(filterData(filters, currentPage));
    setSelectedFilters(filters);
    console.log("filter Home", currentPage);
    setShowModal(false);
  };

  const [selectedFilters, setSelectedFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    brand: "",
    condition: "",
  });

  const handleNextPage = () => {
    const nextPage = currentPage + 1;

    if (nextPage <= totalPages) {
      if (productsFiltered.length > 0) {
        dispatch(filterData(selectedFilters, nextPage));
        console.log(selectedFilters);
      } else {
        dispatch(showProducts(nextPage));
      }
    }
  };

  // const filteredProducts = optionProducts.filter((product) =>
  //   product.name.toLowerCase().includes(searchProductNav.toLowerCase())
  // );

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <Marquee className={styles.message}>
        {t("home.welcome", { lng: currentLanguage })}
        </Marquee>
      </div>
      <div className={styles.divSearch}>
        {/* search */}
        <form onChange={handleChange}>
          <input
            type="text"
            className={`${styles.search}`}
            placeholder={t("home.search", { lng: currentLanguage })}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.btnSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </form>
      </div>
      <div className={styles.orderFilters}>
        <div>
          <OrderFilter
            handlePriceHigher={handlePriceHigher}
            handlePriceLower={handlePriceLower}
            handleSortName={handleSortName}
            handleAllProdutcs={handleAllProdutcs}
            currentLanguage={currentLanguage}
          />
        </div>
        <div>
          <button onClick={handleOpenModal} className={styles.titleFilter}>
            {t("home.filter", { lng: currentLanguage })}
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
            currentLanguage={currentLanguage}
          />
        </div>
      </div>

      <div>
        {/* optionProducts */}

        {optionProducts.length === 0 ? (
          <div className={styles.loading}>
            <img src={loading} width={80} height={80} alt="loading" />
            <h3>Upsss</h3>
            <h5>{t("home.product-not-found", { lng: currentLanguage })}</h5>
            <h6>{t("home.please-try", { lng: currentLanguage })}</h6>
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
          <div className={styles.cards}>
            {optionProducts?.map((product) => (
              <CardProduct
                key={product.id}
                product={product}
                currentLanguage={currentLanguage}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <div className={styles.pages}>
          <button
            disabled={currentPage === 1}
            onClick={() => dispatch(showProducts(currentPage - 1))}
            className={styles.create}
          >
            <ion-icon name="arrow-round-back"></ion-icon>
          </button>
          <span style={{ marginLeft: "1rem", marginRight: "1rem" }}>
            {t("home.page", { lng: currentLanguage })} {currentPage}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className={styles.create}
          >
            <ion-icon name="arrow-round-forward"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};
