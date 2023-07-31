import styles from "../Dashboard.module.css";
import { MdSearch, MdMenu } from "react-icons/md";
import { useState } from "react"; // Importa useState
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, showProducts } from "../../../redux/actions/actions";
import { Modal, Button } from 'react-bootstrap';



const Products = ({ toggleActive }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showProducts());
  }, []);

  const products = useSelector((state) => state.products);
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
            <h2 style={{fontFamily:'Poppins'}}>Products</h2>
          </div>

      <input
        type="text"
        className="form-control w-25 h-75"
        placeholder="Search product"
        value={searchProducts}
        onChange={(event) => setSearchProducts(event.target.value)}
      />
          <div className={styles.productContainer}>
          {filteredProducts?.map((product) => (
              <table key={product.id} className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>
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
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <ion-icon name="trash"></ion-icon>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      src={product.images}
                      alt={product.name}
                      className={styles.img}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{null}</td>
                </tr>
              </tbody>
            </table>
          ))}
          </div>
        </div>
      </div>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
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
      </Modal>
    </div>
  );
};

export default Products;
