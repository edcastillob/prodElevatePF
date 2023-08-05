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
import loading from "../../assets/loading.png";

export const Home = ({ user, userLocal, handleSignIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);

  useEffect(() => {
    dispatch(showProducts(currentPage));
  }, []);

  const products = useSelector((state) => state.products);
  const productsFiltered = useSelector((state) => state.productsFiltered);
  const productReviews = useSelector((state) => state.productReviews);
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
    if (productsFiltered.length > 0) {
      dispatch(filterData(selectedFilters, currentPage + 1));
      console.log(selectedFilters);
    } else {
      dispatch(showProducts(currentPage + 1));
    }
  };

  // const filteredProducts = optionProducts.filter((product) =>
  //   product.name.toLowerCase().includes(searchProductNav.toLowerCase())
  // );

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
        <form onChange={handleChange}>
          <input type="search" placeholder="search product" />
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

      <div>
        {/* optionProducts */}

        {optionProducts.length === 0 ? (
          <div>
            <img src={loading} alt="loading" />
            <h2>Upsss</h2>
            <h3>
              The product you are trying to search or filter does not exist.
            </h3>
            <h4>
              Please try another search or click on all products to get all
              products
            </h4>
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
              <CardProduct key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

        {/* optionProducts */}
        {productsFiltered?.map((product) => (
          <CardProduct 
           key={product.id}
          product={product}
          />
        ))}
      <div>
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => dispatch(showProducts(currentPage - 1))}
          >
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
