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
import validateForm from "./validation";
import { useTranslation } from 'react-i18next';


export const Product = ({ currentLanguage }) => {
  const { t } = useTranslation('global');

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
  const [errors, setErrors] = useState({});

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
    console.log(product);
    const errors = validateForm (
      product.category,
      product.name,
      product.brand,
      product.condition,
      product.description,
      product.purchasePrice,
      product.salePrice,
      product.minimumStock,
      product.provider,
      product.images
    );
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
    dispatch(addProduct(product));
    toast.success(t("product.successfully", { lng: currentLanguage }));
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
    setErrors({});
    // Reiniciar isImageUploaded a false después de enviar el formulario
    setIsImageUploaded(false);
    } else {
       toast.error("Data is Incompleted. All fields must be filled Correctly");
    }
  };
  // console.log("provider: ", provider);
  console.log(product);
  return (
    <div className={styles.container}>
      <hr />
      <form onSubmit={handleSubmit} className={styles.form}>
        <h5 style={{ fontFamily: "Poppins", marginBottom: "2rem" }}>
         {t("product.new-product", { lng: currentLanguage })}
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
            {t("product.category", { lng: currentLanguage })}
            </option>
            {sortedCategories.map((catg) => (
              <option key={catg.id} value={catg.id}>
                {catg.name}
              </option>
            ))}
          </select>
          {errors.category && (
                  <p className={styles.error}>{errors.category}</p>
          )}
          {/* Nombre de Producto */}

          <input
            className="form-control mb-3 w-50 d-end"
            type="text"
            name="name"
            placeholder={t("product.product-name", { lng: currentLanguage })}
            value={product.name}
            onChange={handleChange}
          />
          {errors.name && (
                  <p className={styles.error}>{errors.name}</p>
          )}
        </div>
        <div className="d-flex justify-content-around">
          {/* brand de Producto */}
          <input
            className="form-control mb-3 w-50 d-end"
            type="text"
            name="brand"
            placeholder={t("product.product-brand", { lng: currentLanguage })}
            value={product.brand}
            onChange={handleChange}
          />
          {errors.brand && (
              <p className={styles.error}>{errors.brand}</p>
          )}
          <select
            className="form-control mb-3 w-50 d-end"
            name="condition"
            value={product.condition}
            onChange={handleChange}
          >
            <option value="">{t("product.select-condition", { lng: currentLanguage })}</option>
            <option value="Brand New">{t("product.brand-new", { lng: currentLanguage })}</option>
            <option value="Used">{t("product.used", { lng: currentLanguage })}</option>
            <option value="Like New">{t("product.like-new", { lng: currentLanguage })}</option>
          </select>
          {errors.condition && (
            <p className={styles.error}>{errors.condition}</p>
          )}
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
          placeholder={t("product.product-description", { lng: currentLanguage })}
          style={{
            height: "130px",
            marginBottom: "4rem",
            fontFamily: "Poppins",
          }}
        />
        {errors.description && (
          <p className={styles.error}>{errors.description}</p>
        )}
        {/* precio de compra de Producto */}
        <div className="d-flex g-3">
          <div className="input-group">
            <input
              className="form-control mb-3 w-25"
              type="text"
              name="purchasePrice"
              placeholder={t("product.purchase-price", { lng: currentLanguage })}
              value={product.purchasePrice}
              onChange={handleChange}
            />
            <span className="input-group-text mb-3">$</span>
            {/* <span className="input-group-text mb-3">0.00</span> */}
          </div>
          {errors.purchasePrice && (
            <p className={styles.error}>{errors.purchasePrice}</p>
          )}
          {/* precio de venta de Producto */}

          <div className="input-group">
            <input
              className="form-control mb-3 w-25"
              type="text"
              name="salePrice"
              placeholder={t("product.sale-price", { lng: currentLanguage })}
              value={product.salePrice}
              onChange={handleChange}
            />
            <span className="input-group-text mb-3">$</span>
            {/* <span className="input-group-text mb-3">0.00</span> */}
          </div>
          {errors.salePrice && (
            <p className={styles.error}>{errors.salePrice}</p>
          )}
        </div>

        {/* stock minimo de Producto */}
        <input
          className="form-control mb-3"
          type="minimumStock"
          name="minimumStock"
          placeholder={t("product.min-stock", { lng: currentLanguage })}
          value={product.minimumStock}
          onChange={handleChange}
        />
        {errors.minimumStock && (
          <p className={styles.error}>{errors.minimumStock}</p>
        )}

        {/* Proveedor */}
        <div className="container-m">
          <select
            className="form-select form-select-sm mb-3 w-50 d-flex"
            name="provider"
            id="provider"
            value=""
            onChange={handleProviderSelect}
          >
            <option value="">{t("product.select-provider", { lng: currentLanguage })}</option>
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
        {errors.provider && (
              <p className={styles.error}>{errors.provider}</p>
        )}
        <br />

        {/* <UploadImg onImageUpload={handleImageUpload} /> */}
        <h6
          style={{
            fontFamily: "Poppins",
            textAlign: "start",
            marginTop: "-1rem",
          }}
        >
          {t("product.image", { lng: currentLanguage })}
        </h6>
        <div className={styles.uploadImg}>
          <UploadImg
            onImageUpload={handleImageUpload}
            uploadedImages={product.images}
            clearUploadedImages={() =>
              setProduct((product) => ({ ...product, images: [] }))
            }
          />
        </div>
        {errors.images && (
             <p className={styles.error}>{errors.images}</p>
        )}
        <br />
        <button className={styles.create}>{t("product.create", { lng: currentLanguage })}</button>
      </form>
    </div>
  );
};
