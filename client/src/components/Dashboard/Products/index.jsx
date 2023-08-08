import styles from "../Dashboard.module.css";
import { MdMenu, MdSearch } from "react-icons/md";
import { useState, useEffect } from "react"; // Importa useState
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  showProducts,
  showProductsInactive,
  activeProduct,
} from "../../../redux/actions/actions";
// import { Modal, Button } from 'react-bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import swal from "sweetalert";
import yes from "../../../assets/yes.png";
import { useTranslation } from 'react-i18next';

const Products = ({ toggleActive, currentLanguage }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const { t } = useTranslation('global');

  const products = useSelector((state) => state.products);
  const productsInactive = useSelector((state) => state.productsInactive);
  const [searchProducts, setSearchProducts] = useState("");

  const [showAllProducts, setShowAllProducts] = useState([]);
  const [allSelectCheck, setAllSelectCheck] = useState(false);

  const sortedProducts = products
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

  const filteredProducts = sortedProducts.filter((products) =>
    products.name.toLowerCase().includes(searchProducts.toLowerCase())
  );

  useEffect(() => {
    setShowAllProducts(products)
  }, [products])

  useEffect(() => {
    setShowAllProducts(filteredProducts)
  }, [searchProducts])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showProducts());
    dispatch(showProductsInactive());
  }, []);

  if (!products || products.length === 0) return <div>Loading...</div>;
  if (!Array.isArray(products)) return <div>Loading...</div>;

  const handleDeleteProduct = (productId) => {
    console.log('deletees')
    setProductIdToDelete(productId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(productIdToDelete));
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
        toggle();
        swal({
          text: t("products.successfully", { lng: currentLanguage }),
          icon: "success",
        });
      }
    });
  };

  console.log('productsInactive: ', productsInactive);
  console.log('products: ', products);

  // Check all 
  const defineAllCheckedState = (items) => {
    const result = items.filter((item) => !item.isChecked )
    if (result.length >= 1) {
      return false
    } else {
      return true  
    }
  };
  
  const handleChangeCheckBox = (event) => {
    const { name, checked } = event.target;
      if (name === 'allSelect') {
        setAllSelectCheck(checked)
          let tempUsers = showAllProducts.map((i) =>{
            return { ...i, isChecked: checked }
          });
          setShowAllProducts(tempUsers)
      } else {
        let tempUsers = showAllProducts.map((product) => {
          if (product.id === name) {
            return { ...product, isChecked: checked }
          } else { 
            return product
          }
        });

        setShowAllProducts(tempUsers);
        setAllSelectCheck(defineAllCheckedState(tempUsers));
      }
  };
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
            <h2 style={{ fontFamily: "Poppins" }}>{t("products.products", { lng: currentLanguage })}</h2>
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
          <Button
            onClick={toggle}
            style={{
              color: "#FFFFFF",
              backgroundColor: "#000924",
            }}
          >
            {t("products.inactive", { lng: currentLanguage })}
          </Button>

          {/* table products */}
          <div className={styles.productContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      name='allSelect'
                      checked={allSelectCheck}
                      onChange={handleChangeCheckBox}
                    />
                  </th>
                  <th>{t("products.product", { lng: currentLanguage })}</th>
                  <th>{t("products.name", { lng: currentLanguage })}</th>
                  <th>{t("products.actions", { lng: currentLanguage })}</th>
                </tr>
              </thead>
              <tbody>
                {showAllProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <input
                        type="checkbox"
                        name={product.id}
                        checked={product?.isChecked || false}
                        onChange={handleChangeCheckBox}
                      />
                    </td>
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
                      <Link
                        title="Edit product"
                        to={`/productidedit/${product.id}`}
                      >
                        <button className={styles.edit}>
                          <ion-icon name="create"></ion-icon>
                        </button>
                      </Link>
                      <button
                        className={styles.delete}
                        style={{ display: !product.isChecked ||  allSelectCheck === true ? 'none' : null }}
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <ion-icon name="trash"></ion-icon>
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      className={styles.delete}
                      style={{ display: !allSelectCheck ? 'none' : null }}
                      onClick={() => handleDeleteProduct(products.map(product => product.id))}
                    >
                      Dellete All
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
          <ModalHeader toggle={toggle}>{t("products.inactive", { lng: currentLanguage })}</ModalHeader>
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
    </div>
  );
};

export default Products;

