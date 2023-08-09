import styles from "../Dashboard.module.css";
import { MdMenu, MdSearch } from "react-icons/md";
import { useState } from "react"; // Importa useState
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  showProducts,
  showProductsInactive,
  activeProduct,
  filterNameAsc,
  filterData,
} from "../../../redux/actions/actions";
// import { Modal, Button } from 'react-bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import swal from "sweetalert";
import yes from "../../../assets/yes.png";
import DashOrderFilter from "../DashFilter/DashOrderFilter";
import FilterModal from "../../Filter/FilterModal";
import { useTranslation } from "react-i18next";
import loading from "../../../assets/loading.png";
//import { useTranslation } from "react-i18next";

const Products = ({ toggleActive, currentLanguage }) => {
  const userActive = useSelector((state) => state.userLog);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const { t } = useTranslation("global");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showProducts(currentPage));
    //dispatch(showProductsInactive());
  }, []);

  const products = useSelector((state) => state.products);
  const productsFiltered = useSelector((state) => state.productsFiltered);
  const productsInactive = useSelector((state) => state.productsInactive);
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);
  const [searchProducts, setSearchProducts] = useState("");

  const [optionProducts, setOptionProducts] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    brand: "",
    condition: "",
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setOptionProducts(
      productsFiltered.length
        ? productsFiltered
        : products.length
        ? products
        : productsInactive
    );
  }, [productsFiltered, products, productsInactive]);

  // if (!optionProducts || optionProducts.length === 0)
  //   return <div>Loading...</div>;
  // if (!Array.isArray(optionProducts)) return <div>Loading...</div>;

  const sortedProducts = products
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  // const filteredProducts = sortedProducts.filter((products) =>
  //   products.name.toLowerCase().includes(searchProducts.toLowerCase())
  // );



  const handleConfirmDelete = (productId) => {
    setProductIdToDelete(null);
    setShowConfirmation(false);
  };
  // const activateProduct = async (event, productId) => {
  //   event.preventDefault();
  //   dispatch(activeProduct(productId));
  //   toggle();
  // };
  const activateProduct = (event, productId) => {
    event.preventDefault();
    swal({
      title: t("products.active-product", { lng: currentLanguage }),
      text: t("products.are-you-sure", { lng: currentLanguage }),
      icon: "warning",
      buttons: ["No", t("products.yes", { lng: currentLanguage })],
    }).then((res) => {
      if (res) {
        dispatch(activeProduct(productId));

        swal({
          text: t("products.successfully", { lng: currentLanguage }),
          icon: "success",
        });
      }
    });
  };

  const handleInactiveProducts = () => {
    dispatch(showProductsInactive(currentPage));
  };

  const handleSortName = () => {
    dispatch(filterNameAsc(currentPage));
  };

  const handleActiveProducts = () => {
    dispatch(showProducts(currentPage));
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFilter = (filters) => {
    dispatch(filterData(filters, currentPage));
    setSelectedFilters(filters);
    // console.log("filter Home", currentPage);
    setShowModal(false);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;

    if (nextPage <= totalPages) {
      if (productsFiltered.length > 0) {
        dispatch(filterData(selectedFilters, nextPage));
        // console.log(selectedFilters);
      } else {
        dispatch(showProducts(nextPage));
      }
    }
  };
  const handleDeleteProduct = (productId) => {
    // console.log(productId)
    setProductIdToDelete(productId);
    dispatch(deleteProduct(productId));
  };
  // console.log(productsInactive);
  return (
    <div>
      {/* TOPBAR */}
      <div className={styles.topbar}>
        <div className={styles.toggle} onClick={toggleActive}>
          <MdMenu />
        </div>
      </div>
      <div className={styles.customers}>
        <div className={styles.wrapper}>
          <div className={styles.customersHeader}>
            <h2 style={{ fontFamily: "Poppins" }}>
              {t("products.products", { lng: currentLanguage })}
            </h2>
          </div>
          {/* input search */}
          <div className={styles.search}>
            <label>
              <input
                type="text"
                placeholder={t("products.search", { lng: currentLanguage })}
                value={searchProducts}
                onChange={(event) => setSearchProducts(event.target.value)}
              />
              <MdSearch size="2em" className={styles.icon} />
            </label>
          </div>
          <br />
          {/* <Button
            onClick={toggle}
            style={{
              color: "#FFFFFF",
              backgroundColor: "#000924",
            }}
          >
            {t("products.inactive", { lng: currentLanguage })}
          </Button> */}
          <div>
            <DashOrderFilter
              handleActiveProducts={handleActiveProducts}
              handleSortName={handleSortName}
              handleInactiveProducts={handleInactiveProducts}
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

          {/* table products */}
          <div className={styles.productContainer}>
            {optionProducts.length === 0 || productsInactive === 0 ? (
              <div>
                <div>
                  <img src={loading} alt="loading" />
                  <h2>Upsss</h2>
                  <h3>You have no inactive products.</h3>
                  <h4>
                    Please click on active products to see all your products and
                    if you want you can deactivate the one you like.
                  </h4>
                </div>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t("products.product", { lng: currentLanguage })}</th>
                    <th>{t("products.name", { lng: currentLanguage })}</th>
                    <th>{t("products.State", { lng: currentLanguage })}</th>
                    <th>{t("products.actions", { lng: currentLanguage })}</th>
                  </tr>
                </thead>

                <tbody>
                  {optionProducts?.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.images}
                          alt={product.name}
                          className={styles.img}
                        />
                      </td>
                      <td>{product.name}</td>
                      {/* <td>{null}</td> */}
                      <td>
                        {product.isActive ? <p>Active</p> : <p>Inactive</p>}
                      </td>
                      <td>
                        <Link
                          title="Edit product"
                          to={`/productidedit/${product.id}`}
                        >
                          {product.isActive ? (
                            <button className={styles.edit}>
                              <ion-icon name="create"></ion-icon>
                            </button>
                          ) : (
                            <button
                              onClick={(event) =>
                                activateProduct(event, product.id)
                              }
                              style={{
                                background: "none",
                                backgroundColor: "none",
                                border: "none",
                                padding: 0,
                              }}
                            >
                              <img
                                src={yes}
                                alt="Imagen Clickeable"
                                style={{ width: "32px", height: "32px" }}
                              />
                            </button>
                          )}
                        </Link>

                        {userActive.email === "edwar.castillo@gmail.com" && (
                        <button
                          className={styles.delete}
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <ion-icon name="trash"></ion-icon>
                        </button>
                      )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {/* <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title> <h4 style={{fontFamily:'Poppins'}}>Confirmation</h4>
           </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <h6 style={{fontFamily:'Poppins'}}>Are you sure you want to delete this product?</h6> 
        </Modal.Body>
        <Modal.Footer>
          <Button style={{fontFamily:'Poppins'}} variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button style={{fontFamily:'Poppins'}} variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal> */}
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {t("products.inactive", { lng: currentLanguage })}
          </ModalHeader>
          <ModalBody>
            {/* table products */}
            <div className={styles.productContainer} style={{ width: "100%" }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t("products.active", { lng: currentLanguage })}</th>
                    <th>{t("products.name", { lng: currentLanguage })}</th>
                    <th>{t("products.product", { lng: currentLanguage })}</th>
                  </tr>
                </thead>
                <tbody>
                  {productsInactive?.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <button
                          onClick={(event) =>
                            activateProduct(event, product.id)
                          }
                          style={{
                            background: "none",
                            backgroundColor: "none",
                            border: "none",
                            padding: 0,
                          }}
                        >
                          <img
                            src={yes}
                            alt="Imagen Clickeable"
                            style={{ width: "32px", height: "32px" }}
                          />
                        </button>
                      </td>
                      <td colSpan={2}>{product.name}</td>
                      <td>
                        <img
                          src={product.images}
                          alt={product.name}
                          className={styles.img}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ModalBody>
        </Modal>
      </div>
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

export default Products;
