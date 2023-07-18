import React, { useState } from "react";
import { UploadImg } from "../uploadImg/UploadImg";

export const Product = () => {
  const [product, setProduct] = useState({
    isActive: false,
    category: "",
    name: "",
    description: "",
    purchasePrice: "",
    salePrice: "",
    minimumStock: "",
    provider: [],
   
  });
  const [myProvider, setMyProvider] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeCheckBox = (event) => {
    event.preventDefault();
    setProduct({ ...product, isActive: event.target.checked });
  };

  const handleProviderSelect = (event) => {
    const selectedProviderId = parseInt(event.target.value);
    if (!myProvider.includes(selectedProviderId)) {
      setMyProvider([...myProvider, selectedProviderId]);
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
  const provider = [
    {
      id: 1,
      name: "Edwar",
      identification: "0241561564561sdsd4564",
      address: "Venezuela",
      phoneNumber: "04145994073",
      phoneNumberCompany: "02545553712",
    },
    {
      id: 2,
      name: "Marcela",
      identification: "0241561564561sdsd4564",
      address: "Colombia",
      phoneNumber: "041255569874",
      phoneNumberCompany: "02545559074",
    },
  ];

  const handleImageUpload = (imageUrls) => {
    setProduct((imgProduct) => ({
      ...imgProduct,
      images: [...imgProduct.images, ...imageUrls],
    }));
  };

  return (
    <div className="container-sm">
      <h1>add product</h1>
      <hr />
      <form>
        <label htmlFor="isActive">active</label>
        <input
          className="form-check-input mt-10"
          type="checkbox"
          name="isActive"
          id="isActive"
          value={product.isActive}
          onChange={handleChangeCheckBox}
        />
        <br />

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

        {/* Proveedor*/}
        <label htmlFor="provider">Provider Product</label>
        <select
          className="form-select form-select-sm"
          name="provider"
          id="provider"
          
          value={product.provider}
          onChange={handleProviderSelect}
        >
          <option value="">  -- select provider --</option>
          {provider?.sort().map((prov) => (
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
              <ul className="list-group " key={provId}>
                {selectedProvider ? (<li className="list-group-item">{selectedProvider.name}</li>) 
                : ("")}
              </ul>
            );
          })}
        </div>


        <UploadImg onImageUpload={handleImageUpload} />

        <br />
        <button className="btn btn-primary">submit</button>
      </form>
    </div>
  );
};
