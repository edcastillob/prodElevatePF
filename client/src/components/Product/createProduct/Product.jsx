import React, { useEffect, useState } from "react";
import { UploadImg } from "../uploadImg/UploadImg";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  getCategory,
  getProvider,
} from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Product.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


export const Product = () => {
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProvider());
  }, []);



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector((state) => state.category);
  const provider = useSelector((state) => state.provider);

  const sortedCategories = [...category].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const sortedproviders = [...provider].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const [product, setProduct] = useState({
    category: "",
    name: "",
    brand: "",
    condition: "",
    description: "",
    purchasePrice: "",
    salePrice: "",
    minimumStock: "",
    provider: [],
    images: [],
  });
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (value) => {
    setDescription(value);
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: value,
    }));
  };

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
    // console.log(product);
    dispatch(addProduct(product));
    toast.success("¡Product created successfully!");
    setProduct({
      category: "",
      name: "",
      brand: "",
      condition: "",
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
  // console.log("provider: ", provider);
  return (
    <div className={styles.container}>
      <hr />
      <form onSubmit={handleSubmit} className={styles.form}>
        <h5 style={{ fontFamily: "Poppins", marginBottom: "2rem" }}>
          New product
        </h5>
        {/* Categoria de Producto */}
        <div className="d-flex justify-content-around">
          <select
            className="form-select form-select-sm mb-3 w-50 d-start"
            name="category"
            id="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="" style={{ fontFamily: "Poppins" }}>
              -- Category --
            </option>
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
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-around">
          {/* brand de Producto */}
          <input
            className="form-control mb-3 w-50 d-end"
            type="text"
            name="brand"
            placeholder="Product brand"
            value={product.brand}
            onChange={handleChange}
          />
          <select
  className="form-control mb-3 w-50 d-end"
  name="condition"
  value={product.condition}
  onChange={handleChange}
>
  <option value="">Select condition</option>
  <option value="Brand New">Brand New</option>
  <option value="Used">Used</option>
  <option value="Like New">Like New</option>
</select>
        </div>

        {/* Descripcion de Producto */}
        {/* <h6 style={{fontFamily:'Poppins', textAlign:'start'}}>Description:</h6> */}

        <ReactQuill
          value={product.description}
          onChange={handleDescriptionChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "link",
            "image",
          ]}
          placeholder="Enter product description..."
          style={{
            height: "130px",
            marginBottom: "4rem",
            fontFamily: "Poppins",
          }}
        />

        {/* precio de compra de Producto */}
        <div className="d-flex g-3">
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

        {/* Proveedor */}
        <div className="container-m">
          <select
            className="form-select form-select-sm mb-3 w-50 d-flex"
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

          <div className="d-flex w-50">
            {product.provider?.map((provId) => {
              const selectedProvider = provider.find(
                (prov) => prov.id === provId
              );
              return (
                <ul className="list-group d-flex" key={`provider_${provId}`}>
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

        {/* <UploadImg onImageUpload={handleImageUpload} /> */}
        <h6
          style={{
            fontFamily: "Poppins",
            textAlign: "start",
            marginTop: "-1rem",
          }}
        >
          Image:
        </h6>
        <UploadImg
          onImageUpload={handleImageUpload}
          uploadedImages={product.images}
          clearUploadedImages={() =>
            setUserData((product) => ({ ...product, images: [] }))
          }
        />
        <br />
        <button className={styles.create}>Create</button>
      </form>
    </div>
  );
};
