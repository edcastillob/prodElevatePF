import React, { useEffect, useState } from "react";
import { UploadImg } from "../uploadImg/UploadImg";
import {
  addProduct,
  getCategory,
  getProvider,
} from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Product.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Product = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const provider = useSelector((state) => state.provider);
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProvider());
  }, []);

  const sortedCategories = [...category].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const sortedproviders = [...provider].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const [product, setProduct] = useState({
    category: "",
    name: "",
    description: "",
    purchasePrice: "",
    salePrice: "",
    minimumStock: "",
    provider: [],
    images: [],
  });

  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleProviderSelect = (event) => {
    const selectedProviderId = parseInt(event.target.value);
    if (!product.provider.includes(selectedProviderId)) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        provider: [...prevProduct.provider, selectedProviderId],
      }));
    }
  };

  const handleImageUpload = (imageUrls) => {
    setProduct((imgProduct) => ({
      ...imgProduct,
      images: [...(imgProduct.images || []), ...imageUrls],
    }));
    setIsImageUploaded(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(product);
    dispatch(addProduct(product));
    toast.success('¡Product created successfully!');
    setProduct({
      category: "",
      name: "",
      description: "",
      purchasePrice: "",
      salePrice: "",
      minimumStock: "",
      provider: [],
      images: [],
    });
    // Reiniciar isImageUploaded a false después de enviar el formulario
    setIsImageUploaded(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.divLeft}>
      <hr />
      <form onSubmit={handleSubmit} className={styles.form}>
        <h5 style={{fontFamily:'Poppins'}}>New product</h5>
        {/* Categoria de Producto */}
        <div className="d-flex justify-content-around">
        <select
          className="form-select form-select-sm mb-3 w-50 d-start"
          name="category"
          id="category"
          value={product.category}
          onChange={handleChange}
        >
          <option value="">-- Category --</option>
          {sortedCategories.map((catg) => (
            <option key={catg.id} value={catg.id}>
              {catg.name}
            </option>
          ))}
        </select>

        {/* Nombre de Producto */}
        
        <input
          className="form-control mb-3 w-50 d-end"
          type="text"
          name="name"
          placeholder= "Product Name"
          value={product.name}
          onChange={handleChange}
        />
        </div>
        

        {/* Descripcion de Producto */}
        
        <input
          className="form-control mb-3"
          type="textarea"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />

        <div className="d-flex g-3">
            {/* precio de compra de Producto */}
        
        <div className="input-group">
          <input
            className="form-control mb-3 w-25"
            type="text"
            name="purchasePrice"
            placeholder="-- Purchase price --"
            value={product.purchasePrice}
            onChange={handleChange}
          />
          <span className="input-group-text mb-3">$</span>
          {/* <span className="input-group-text mb-3">0.00</span> */}
        </div>

        {/* precio de venta de Producto */}
        
        <div className="input-group">
          <input
            className="form-control mb-3 w-25"
            type="text"
            name="salePrice"
            placeholder="-- Sale price --"
            value={product.salePrice}
            onChange={handleChange}
          />
          <span className="input-group-text mb-3">$</span>
          {/* <span className="input-group-text mb-3">0.00</span> */}
        </div>

        </div>
        

        {/* stock minimo de Producto */}
        <input
          className="form-control mb-3"
          type="minimumStock"
          name="minimumStock"
          placeholder="-- Minimum stock --"
          value={product.minimumStock}
          onChange={handleChange}
        />

        <div className="container-m">
          {/* ... */}
          <select
            className="form-select form-select-sm mb-3 w-100"
            name="provider"
            id="provider"
            value=""
            onChange={handleProviderSelect}
          >
            <option value="">-- Select provider --</option>
            {sortedproviders?.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.name}
              </option>
            ))}
          </select>

          <div>
            {product.provider?.map((provId) => {
              const selectedProvider = provider.find(
                (prov) => prov.id === provId
              );
              return (
                <ul className="list-group" key={`provider_${provId}`}>
                  <li
                    className="list-group-item"
                    key={`provider_item_${provId}`}
                  >
                    {selectedProvider.name}
                  </li>
                </ul>
              );
            })}
          </div>
          {/* ... */}
        </div>

        <br />
        <button className={styles.create}>Create</button>
      </form>

      </div>
      <div className={styles.divRight}>
        
        {/* <UploadImg onImageUpload={handleImageUpload} /> */}
      <UploadImg
        onImageUpload={handleImageUpload}
        uploadedImages={product.images}
        clearUploadedImages={() =>
          setUserData((product) => ({ ...product, images: [] }))
        }
      />
          
      </div>
    </div>
  );
};
