

          // <h3>activo: {productDetail.isActive} </h3>
          // <h3>Nombre: {productDetail.name} </h3>
          // <img
          //   src={productDetail.images}
          //   alt=""
          //   style={{ width: "200px", height: "auto" }}
          // />
          // <h3>categoria: {productDetail.categoryId}</h3>
          // <h3>Stock minimo: {productDetail.minStock} </h3>
          // <h3>P. Compra: {productDetail.purchasePrice} </h3>
          // <h3>P. Venta: {productDetail.salePrice} </h3>
          // <h3>Stock: {productDetail.stock} </h3>
          import React, { useEffect, useState } from "react";
          import { useDispatch, useSelector } from "react-redux";
          import {
            getCategory,
            getProvider,
            getProductDetail,
          } from "../../../redux/actions/actions";
          import styles from "./EditProduct.module.css";
          import ReactQuill from "react-quill";
          import loadingImg from "../../../assets/loading.png";
          import "react-quill/dist/quill.snow.css";
          import { useParams } from "react-router-dom";
          
          export const EditProduct = () => {
            const dispatch = useDispatch();
            const params = useParams();
            const { id } = params;
            const [loading, setLoading] = useState(true);
          
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
              description: productDetail.description,
              purchasePrice: productDetail.purchasePrice,
              salePrice: productDetail.salePrice,
              minStock: productDetail.minStock,
              provider: [],
              stock: "",
            });
          
            useEffect(() => {
              dispatch(getCategory());
              dispatch(getProvider());
              dispatch(getProductDetail(id));
            }, [dispatch, id]);
          
            useEffect(() => {
              if (
                productDetail.categoryId &&
                productDetail.name &&
                productDetail.description &&
                productDetail.purchasePrice &&
                productDetail.salePrice &&
                productDetail.minStock &&     
                Array.isArray(productDetail.providers) 
          
              ) {
                const providerIds = productDetail.providers.map((prov) => prov.id);
                setChangeProduct({
                  category: productDetail.categoryId,
                  name: productDetail.name,
                  description: productDetail.description,
                  purchasePrice: productDetail.purchasePrice,
                  salePrice: productDetail.salePrice,
                  minStock: productDetail.minStock,       
                  provider: providerIds,
                  stock: productDetail.stock,
                });
              }
            }, [
              productDetail.categoryId,
              productDetail.name,
              productDetail.description,
              productDetail.purchasePrice,
              productDetail.salePrice,
              productDetail.minStock,   
              productDetail.providers,
              productDetail.stock
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
          
            console.log("productDetail: ", productDetail);
            console.log("stock: ", productDetail.stock);
            console.log("changeProduct:  ", changeProduct);
          
            return (
              <div className={styles.container}>
                <div className={styles.divLeft}>
                  <hr />
                  {/* Formulario */}
                  <form>
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
                           
                    {/* stock minimo de Producto */}
                    <input
                      className="form-control mb-3"
                      type="text"
                      name="stock"
                      placeholder="-- Minimum stock --"
                      value={changeProduct.stock}
                      onChange={handleChange}
                      />
          
                    </div>  
                  </form>
                </div>
              </div>
            );
          };
          