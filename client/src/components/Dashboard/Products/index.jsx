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
} from "../../../redux/actions/actions";
// import { Modal, Button } from 'react-bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import swal from "sweetalert";
import yes from "../../../assets/yes.png";

const Products = ({ toggleActive }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showProducts());
    dispatch(showProductsInactive());
  }, []);

  const products = useSelector((state) => state.products);
  const productsInactive = useSelector((state) => state.productsInactive);
  const [searchProducts, setSearchProducts] = useState("");

  if (!products || products.length === 0) return <div>Loading...</div>;
  if (!Array.isArray(products)) return <div>Loading...</div>;

  const sortedProducts = products
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredProducts = sortedProducts.filter((products) =>
    products.name.toLowerCase().includes(searchProducts.toLowerCase())
  );

  const handleDeleteProduct = (productId) => {
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
      title: "Active product",
      text: "are you sure to activate this product?",
      icon: "warning",
      buttons: ["no", "yes"],
    }).then((res) => {
      if (res) {
        dispatch(activeProduct(productId));
        toggle();
        swal({
          text: "the product has been activated successfully!",
          icon: "success",
        });
      }     
    });
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
            <h2 style={{ fontFamily: "Poppins" }}>Products</h2>
          </div>
          {/* input search */}
          <div className={styles.search}>
            <label>
              <input
                type="text"
                placeholder="Search product"
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
            inactive products
          </Button>

          {/* table products */}
          <div className={styles.productContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts?.map((product) => (
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
                      <Link
                        title="Edit product"
                        to={`/productidedit/${product.id}`}
                      >
                        <button className={styles.edit}>
                          <ion-icon name="create"></ion-icon>
                        </button>
                      </Link>
                      {/* <button
                        className={styles.delete}
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <ion-icon name="trash"></ion-icon>
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* {filteredProducts?.map((product) => (
              
          ))} */}
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
  <ModalHeader toggle={toggle}>Inactive product</ModalHeader>
  <ModalBody>
    {/* table products */}
    <div className={styles.productContainer} style={{ width: "100%" }}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Active</th>
            <th>Name</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          {productsInactive?.map((product) => (
            <tr key={product.id}>
              <td >
                <button
                  onClick={(event) => activateProduct(event, product.id)}
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
              <td  colSpan={2}>
                {product.name}
              </td>
              <td >
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
