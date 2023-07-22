// ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail, addCart } from '../../../redux/actions/actions';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import loadingImg from '../../../assets/loading.png';
import { getStoredCart, updateStoredCart } from '../../Cart/cartUtils';


export const ProductDetail = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  const productDetail = useSelector((state) => state.productDetail);
  const selectedCategory = useSelector((state) => state.category);
  const cartItems = useSelector((state) => state.cart);

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

  const { images, categoryId, salePrice, description, name } = productDetail;
  const imageUrl = images && images.length > 0 ? images[0] : null;
  const category = selectedCategory.find((cat) => cat.id === categoryId)?.name || "Unknown Category";

  const addToCart = () => {
    const isProductInCart = cartItems.some((item) => item.id === id);
  
    if (!isProductInCart) {
      const productToAdd = {
        id,
        name,
        price: salePrice,
        quantity: 1,
        image: imageUrl,
      };
  
      dispatch(addCart(productToAdd));
      console.log("Producto agregado al carrito:", productToAdd);
  
      // Aquí estás llamando a getStoredCart(), lo cual no es necesario
      // updateStoredCart(getStoredCart()); 
  
      // En su lugar, debes llamar a updateStoredCart y pasar el carrito actual
      updateStoredCart(cartItems);
    } else {
      console.log("El producto ya existe en el carrito.");
    }
  };
  

  return (
    <div>
      <h1>Detail</h1>
      {loading ? (
        <div>
          <img src={loadingImg} alt="Loading" />
        </div>
      ) : (
        <Card>
          <CardImg
            top
            width="100%"
            src={images}
            alt="Product Image"
            className="mx-auto"
            style={{ maxWidth: "300px" }}
          />
          <CardBody>
            <CardText> {name}</CardText>
            <CardTitle tag="h5">{description}</CardTitle>
            <CardText>Price: {salePrice}</CardText>
            <CardText>{description}</CardText>
            <CardText>{category}</CardText>
            <button onClick={addToCart}>Agregar al carrito</button>
          </CardBody>
        </Card>
      )}
    </div>
  );
};