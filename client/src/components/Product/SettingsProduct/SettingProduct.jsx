import { useState } from "react"; // Importa useState
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./SettingProduct.module.css";
import { deleteProduct, showProducts } from "../../../redux/actions/actions";
import { Table } from 'reactstrap';

export const SettingsProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showProducts());
  }, []);

  const products = useSelector((state) => state.products);
  const [searchProducts, setSearchProducts] = useState('');

  if (!products || products.length === 0) return <div>Loading...</div>;
  if (!Array.isArray(products)) return <div>Loading...</div>;

  const sortedProducts = products
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredProducts = sortedProducts.filter((products) =>
    products.name.toLowerCase().includes(searchProducts.toLowerCase())
  );

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <div className={styles.container}>
      <h2 style={{fontFamily:'Poppins'}}>Products Administration</h2>      
      <input
        type="text"
        placeholder="Search product"
        value={searchProducts}
        onChange={(event) => setSearchProducts(event.target.value)}
      />

      {filteredProducts?.map((product) => (
        <Table key={product.id} className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>
                <Link title="Edit product" to={`/productidedit/${product.id}`}>
                <button className={styles.edit}>
                  <ion-icon name="create"></ion-icon>
                </button>
                </Link>
                <button className={styles.delete} onClick={() => handleDeleteProduct(provider.id)}>
                  <ion-icon name="trash"></ion-icon>
                </button>
                </th>
              </tr>
            </thead>
              <tbody>
                <tr>
                  <td><img src={product.images} alt={product.name} className={styles.img} /></td>
                  <td>{product.name}</td>
                  <td>{null}</td>
                </tr>
              </tbody>
          {/* <img className={styles.img} src={product.images} alt="product" />
          <h5 className={styles.title}>Name: {product.name}</h5>   
          <Link title="Edit product" to={`/productidedit/${product.id}`}>
            <button>
              <ion-icon name="create"></ion-icon>
            </button>
          </Link>
          <button onClick={() => handleDeleteProduct(product.id)}>
              <ion-icon name="close"></ion-icon>
          </button> */}
        </Table>
      ))}
    </div>
  );
};
