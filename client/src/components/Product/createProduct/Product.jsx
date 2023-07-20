import React, { useState } from "react";
import { UploadImg } from "../uploadImg/UploadImg";
import { addProduct } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";

export const Product = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({    
    category: "",
    name: "",
    description: "",
    purchasePrice: "",
    salePrice: "",
    minimumStock: "",
    provider: [],
   
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
  //-----------------------------------------------------------------------------
  const category = [
    { id: 1, name: "hardware", description: "Perifericos fisicos" },
    { id: 2, name: "software", description: "Programa de computación" },
  ];
  //-----------------------------------------------------------------------------
 
  const handleImageUpload = (imageUrls) => {
    setProduct((imgProduct) => ({
      ...imgProduct,
      images: [...(imgProduct.images || []), ...imageUrls],
    }));
    setIsImageUploaded(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();   
    dispatch(addProduct(product));
    alert("Exito");
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
    setIsImageUploaded(false); // Reiniciar isImageUploaded a false después de enviar el formulario
  };

  return (
    <div className="container-sm">
      <h1>add product</h1>
      <hr />
      <form onSubmit={ handleSubmit }>
       
        {/* Categoria de Producto */}
        <label htmlFor="category">category product</label>
        <select
          className="form-select form-select-sm"
          name="category"
          id="category"
          value={product.category}
          onChange={handleChange}
        >
          <option value="">  -- select category --</option>
          {category?.sort().map((catg) => (
            <option key={catg.id} value={catg.id}>
              {catg.name}
            </option>
          ))}
        </select>

        {/* Nombre de Producto */}
        <label htmlFor="name">name: </label>
        <input
          className="form-control"
          type="text"
          name="name"
          placeholder=" enter name "
          value={product.name}
          onChange={handleChange}
        />

        {/* Descripcion de Producto */}
        <label htmlFor="name">description: </label>
        <input
          className="form-control"
          type="textarea"
          name="description"
          value={product.description}
          onChange={handleChange}
        />

        {/* precio de compra de Producto */}
        <label htmlFor="purchasePrice">purchase price</label>
        <div className="input-group">
        <input
          className="form-control"
          type="text"
          name="purchasePrice"
          placeholder="-- purchase price --"
          value={product.purchasePrice}
          onChange={handleChange}
        />
        <span className="input-group-text">$</span>
          <span className="input-group-text">0.00</span>
        </div>

        {/* precio de venta de Producto */}
        <label htmlFor="purchasePrice">sale price</label>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            name="salePrice"
            placeholder="-- sale price --"
            value={product.salePrice}
            onChange={handleChange}
          />
          <span className="input-group-text">$</span>
          <span className="input-group-text">0.00</span>
        </div>

        {/* stock minimo de Producto */}
        <label htmlFor="minimumStock">Stock minimum</label>
        <input
          className="form-control"
          type="minimumStock"
          name="minimumStock"
          placeholder="-- enter minimum stock --"
          value={product.minimumStock}
          onChange={handleChange}
        />
  
<div className="container-sm">
      {/* ... */}
      <select
        className="form-select form-select-sm"
        name="provider"
        id="provider"
        value=""
        onChange={handleProviderSelect}
      >
        <option value="">-- select provider --</option>
        {provider?.map((prov) => (
          <option key={prov.id} value={prov.id}>
            {prov.name}
          </option>
        ))}
      </select>

      <div>
        {product.provider?.map((provId) => {
          const selectedProvider = provider.find((prov) => prov.id === provId);
          return (
            <ul className="list-group" key={`provider_${provId}`}>
              <li className="list-group-item" key={`provider_item_${provId}`}>
                {selectedProvider.name}
              </li>
            </ul>
          );
        })}
      </div>
      {/* ... */}
    </div>

        <UploadImg onImageUpload={handleImageUpload} />

        <br />
        <button className="btn btn-primary">submit</button>
      </form>
    </div>
  );
};