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

export const EditProduct = () => {
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
      images: "",
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

    console.log("Datos enviados: ", changeProduct);
    const errors = validateForm (
      changeProduct.category,
      changeProduct.name,
      changeProduct.brand,
      changeProduct.condition,
      changeProduct.description,
      changeProduct.purchasePrice,
      changeProduct.salePrice,
      changeProduct.minStock,
      changeProduct.provider,
      changeProduct.stock,
      changeProduct.images,
    );
    setErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      dispatch(editProduct(id, changeProduct));
      toast.success("¡Edit Product successfully!");
      setErrors({});
    } else { 
      toast.error("Data must be filled Correctly")
    }

    // console.log("Datos enviados: ", changeProduct);   
    toast.success("¡Edit Product successfully!");
    navigate('/dashboard')
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
            Edit Product
          </h4>
          {/* Categoria de Producto */}
          <div className="d-flex justify-content-around">
            <select
              className="form-select form-select-sm mb-3 w-50 d-start"
              name="category"
              id="category"
              value={changeProduct.category}
              onChange={handleChange}
            >
              <option value="">-- Category --</option>
              {sortedCategories.map((catg) => (
                <option key={catg.id} value={catg.id}>
                  {catg.name}
                </option>
              ))}
            </select>
          </div>
          {errors.category && (
            <p className={styles.error}>{errors.category}</p>
          )}
          {/* Nombre de Producto */}

          <input
            className="form-control mb-3 w-50 d-end"
            type="text"
            name="name"
            placeholder="Product Name"
            value={changeProduct.name}
            onChange={handleChange}
            defaultValue={productDetail.name}
          />
          {errors.name && (
            <p className={styles.error}>{errors.name}</p>
          )}
        <div className="d-flex justify-content-around">
          {/* brand de Producto */}
          <input
            className="form-control mb-3 w-50 d-end"
            type="text"
            name="brand"
            placeholder="Product brand"
            value={changeProduct.brand}
            onChange={handleChange}
          />
          {errors.brand && (
            <p className={styles.error}>{errors.brand}</p>
          )}
          <select
  className="form-control mb-3 w-50 d-end"
  name="condition"
  value={changeProduct.condition}
  onChange={handleChange}
>
  <option value="">Select condition</option>
  <option value="Brand New">Brand New</option>
  <option value="Used">Used</option>
  <option value="Like New">Like New</option>
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
            placeholder="Enter product description..."
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
                placeholder="-- Purchase price --"
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
                placeholder="-- Sale price --"
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
            placeholder="-- Minimum stock --"
            value={changeProduct.minStock}
            onChange={handleChange}
          />
          {errors.minStock && (
            <p className={styles.error}>{errors.minStock}</p>
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
              <option value="">-- Select provider --</option>
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
            {errors.provider && (
              <p className={styles.error}>{errors.provider}</p>
            )}
            {/* stock minimo de Producto */}
            <input
              className="form-control mb-3"
              type="text"
              name="stock"
              placeholder="-- Stock --"
              value={changeProduct.stock}
              onChange={handleChange}
            />
            {errors.stock && (
              <p className={styles.error}>{errors.stock}</p>
            )}
            <div>
              <div className="d-flex align-items-center">
                <div>
                  {changeProduct.images ? (
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
                  ) : (
                    <div>
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
                        uploadedImages={changeProduct.images}
                        clearUploadedImages={() =>
                          setChangeProduct((product) => ({
                            ...product,
                            images: [],
                          }))
                        }
                      />
                    </div>
                  )}
                  <br />
                </div>
              </div>
              {errors.images && (
                <p className={styles.error}>{errors.images}</p>
              )}
            </div>
          </div>
          <button type="submit" className={styles.create}>
            Update product
          </button>
        </form>
      </div>

  );
};