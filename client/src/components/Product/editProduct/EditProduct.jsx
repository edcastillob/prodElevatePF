import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadImg } from "../uploadImg/UploadImg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  getCategory,
  getProvider,
  getProductDetail,
  editProduct,
} from "../../../redux/actions/actions";
import styles from "./EditProduct.module.css";
import ReactQuill from "react-quill";
import loadingImg from "../../../assets/loading.png";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import validateForm from "./validation";
import { useTranslation } from 'react-i18next';

export const EditProduct = ({ currentLanguage }) => {
  const { t } = useTranslation('global');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const category = useSelector((state) => state.category);
  const provider = useSelector((state) => state.provider);
  const productDetail = useSelector((state) => state.productDetail);

  const sortedCategories = [...category].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const sortedproviders = [...provider].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const [changeProduct, setChangeProduct] = useState({
    category: productDetail.categoryId,
    name: productDetail.name,
    isActive: productDetail.isActive,
    brand: productDetail.brand,
    condition: productDetail.condition,
    description: productDetail.description,
    purchasePrice: productDetail.purchasePrice,
    salePrice: productDetail.salePrice,
    minStock: productDetail.minStock,
    provider: [],
    stock: "",
    images: productDetail.images,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProvider());
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      productDetail.categoryId &&
      productDetail.name &&
      productDetail.isActive &&
      productDetail.brand &&
      productDetail.condition &&
      productDetail.description &&
      productDetail.purchasePrice &&
      productDetail.salePrice &&
      productDetail.minStock &&
      Array.isArray(productDetail.providers) &&
      productDetail.images
    ) {
      const providerIds = productDetail.providers.map((prov) => prov.id);
      setChangeProduct({
        category: productDetail.categoryId,
        name: productDetail.name,
        isActive: productDetail.isActive,
        brand: productDetail.brand,
        condition: productDetail.condition,
        description: productDetail.description,
        purchasePrice: productDetail.purchasePrice,
        salePrice: productDetail.salePrice,
        minStock: productDetail.minStock,
        provider: providerIds,
        stock: productDetail.stock,
        images: productDetail.images,
      });
    }
  }, [
    productDetail.categoryId,
    productDetail.name,
    productDetail.isActive,
    productDetail.brand,
    productDetail.condition,
    productDetail.description,
    productDetail.purchasePrice,
    productDetail.salePrice,
    productDetail.minStock,
    productDetail.providers,
    productDetail.stock,
    productDetail.images,
  ]);

  const handleChange = (event) => {
    event.preventDefault();
    setChangeProduct({
      ...changeProduct,
      [event.target.name]: event.target.value,
    });
  };

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (value) => {
    setDescription(value);
    setChangeProduct((changeProduct) => ({
      ...changeProduct,
      description: value,
    }));
  };

  const handleProviderSelect = (event) => {
    const selectedProviderId = parseInt(event.target.value);
    if (!changeProduct.provider) {
      setChangeProduct((prevProduct) => ({
        ...prevProduct,
        provider: [selectedProviderId],
      }));
    } else if (!changeProduct.provider.includes(selectedProviderId)) {
      setChangeProduct((prevProduct) => ({
        ...prevProduct,
        provider: [...prevProduct.provider, selectedProviderId],
      }));
    }
  };

  const handleRemoveProvider = (providerId) => {
    setChangeProduct((prevProduct) => ({
      ...prevProduct,
      provider: prevProduct.provider.filter((id) => id !== providerId),
    }));
  };

  const handleRemoveImage = () => {
    setChangeProduct((prevProduct) => ({
      ...prevProduct,
      images: [],
    }));
  };

  const handleImageUpload = (imageUrls) => {
    setChangeProduct((imgProduct) => ({
      ...imgProduct,
      images: [...(imgProduct.images || []), ...imageUrls],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      dispatch(editProduct(id, changeProduct));
      toast.success(t("edit-product.successfully", { lng: currentLanguage }));
      setErrors({});
    } else {
      toast.error(t("edit-product.error", { lng: currentLanguage }));
    }

    // console.log("Datos enviados: ", changeProduct);
    // toast.success("¡Edit Product successfully!");
    navigate("/dashboard");
  };

  console.log("productDetail: ", productDetail);
  // console.log("stock: ", productDetail.stock);
  console.log("changeProduct:  ", changeProduct);

  return (
    <div className={styles.container}>
      <hr />
      {/* Formulario */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <h4 style={{ fontFamily: "Poppins", marginBottom: "1rem" }}>
         {t("edit-product.edit-product", { lng: currentLanguage })}
        </h4>

        {/* _____________Status________________ */}
        <label style={{textAlign:'start'}}>{t("edit-product.status", { lng: currentLanguage })}</label>
        <select
          className="form-control mb-3 w-75"
          name="isActive"
          value={changeProduct.isActive}
          defaultValue={changeProduct.isActive}
          onChange={handleChange}
        >
          <option value="t">{t("edit-product.active", { lng: currentLanguage })}</option>
          <option value="f">{t("edit-product.inactive", { lng: currentLanguage })}</option>
        </select>
        {/* Categoria de Producto */}
        <div>
          <select
            className="form-select mb-3 w-75"
            name="category"
            id="category"
            value={changeProduct.category}
            onChange={handleChange}
          >
            <option value="">{t("product.category", { lng: currentLanguage })}</option>
            {sortedCategories.map((catg) => (
              <option key={catg.id} value={catg.id}>
                {catg.name}
              </option>
            ))}
          </select>
        </div>
        {errors.category && <p className={styles.error}>{errors.category}</p>}
        {/* Nombre de Producto */}

        <input
          className="form-control mb-3 w-75 d-end"
          type="text"
          name="name"
          placeholder={t("product.product-name", { lng: currentLanguage })}
          value={changeProduct.name}
          onChange={handleChange}
          defaultValue={productDetail.name}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
        <div className="d-flex justify-content-around">
          {/* brand de Producto */}
          <input
            className="form-control mb-3 w-50 d-end"
            type="text"
            name="brand"
            placeholder={t("product.product-brand", { lng: currentLanguage })}
            value={changeProduct.brand}
            onChange={handleChange}
          />
          {errors.brand && <p className={styles.error}>{errors.brand}</p>}
          <select
            className="form-control mb-3 w-50 d-end"
            name="condition"
            value={changeProduct.condition}
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

        <ReactQuill
          value={changeProduct.description}
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
          style={{ height: "130px", marginBottom: "4rem" }}
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
              value={changeProduct.purchasePrice}
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
              value={changeProduct.salePrice}
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
          type="minStock"
          name="minStock"
          placeholder={t("product.min-stock", { lng: currentLanguage })}
          value={changeProduct.minStock}
          onChange={handleChange}
        />
        {errors.minStock && <p className={styles.error}>{errors.minStock}</p>}
        {/* Proveedor */}
        <div>
          <select
            className="form-select mb-3 w-75 d-flex"
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
            {changeProduct.provider?.map((providerId) => {
              const selectedProvider = provider.find(
                (prov) => prov.id === providerId
              );
              return (
                <ul
                  className="list-group d-flex"
                  key={`provider_${providerId}`}
                >
                  <li
                    className="list-group-item d-flex"
                    key={`provider_item_${providerId}`}
                  >
                    <span>
                      {selectedProvider
                        ? selectedProvider.name
                        : "Proveedor no encontrado"}
                    </span>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleRemoveProvider(providerId)}
                    >
                      X
                    </button>
                  </li>
                </ul>
              );
            })}
          </div>
          {errors.provider && <p className={styles.error}>{errors.provider}</p>}
          {/* stock minimo de Producto */}
          <input
            className="form-control mb-3"
            type="text"
            name="stock"
            placeholder="-- Stock --"
            value={changeProduct.stock}
            onChange={handleChange}
          />
          {errors.stock && <p className={styles.error}>{errors.stock}</p>}
          <div>
            <div className="d-flex align-items-center">
              <div>
              <div>
  {changeProduct.images.length === 0 ? (
    <div>
      <h6
        style={{
          fontFamily: "Poppins",
          textAlign: "start",
          marginTop: "-1rem",
        }}
      >
        {t("product.image", { lng: currentLanguage })}
      </h6>
      <UploadImg
        onImageUpload={handleImageUpload}
        uploadedImages={changeProduct.images}
        clearUploadedImages={() =>
          setChangeProduct((product) => ({
            ...product,
            images: [],
          }))
        }
      />
    </div>
  ) : (
    <div>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={handleRemoveImage}
      >
        X
      </button>
      <img
        src={changeProduct.images}
        alt=""
        style={{ width: "200px", height: "auto" }}
      />
    </div>
  )}
</div>
                <br />
              </div>
            </div>
            {errors.images && <p className={styles.error}>{errors.images}</p>}
          </div>
        </div>
        <div className={styles.divBtn}>
        <button type="submit" className={styles.create}>
          {t("edit-product.update", { lng: currentLanguage })}
        </button>
        </div>
      </form>
    </div>
  );
};
