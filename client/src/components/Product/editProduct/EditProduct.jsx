import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getProvider, getProductDetail } from "../../../redux/actions/actions";
// import styles from "../createProduct/Product";
import ReactQuill from 'react-quill';
import loadingImg from "../../../assets/loading.png";
import 'react-quill/dist/quill.snow.css';
import { useParams } from "react-router-dom";

export const EditProduct = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;
  const [loading, setLoading] = useState(true);

    
    
    useEffect(() => {
        Promise.all([dispatch(getProductDetail(id))])
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }, [dispatch, id]);
 
      const productDetail = useSelector((state) => state.productDetail);   
      console.log('Detail:  ',productDetail)



  return (
    <div style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px' }}>

      <h3>activo: {productDetail.isActive.toString()} </h3>
      <h3>Nombre: {productDetail.name} </h3>
      <img src={productDetail.images} alt=""
       style={{ width: '200px', height: 'auto' }}/>
      <h3>categoria: {productDetail.categoryId}</h3>
      <h3>Stock minimo: {productDetail.minStock} </h3>
      <h3>P. Compra: {productDetail.purchasePrice} </h3>
      <h3>P. Venta: {productDetail.salePrice} </h3>
      <h3>Stock: {productDetail.stock} </h3>
    </div>
  );
};
