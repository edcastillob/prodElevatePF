import React from "react";
import { useDispatch } from "react-redux";
import { updateCart, deleteCart,addCart  } from "../../../redux/actions/actions";
import { updateStoredCart } from "../../Cart/cartUtils";



export default function Seleccion({ pokes, updateQuantity, deleteProduct }) {
  
  const dispatch = useDispatch();
  const { id, name, image, quantity, price } = pokes;
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    const newSubtotal = newQuantity * price;
  
    // Llamar a la acción 'updateCart' para actualizar el estado del carrito
    dispatch(updateCart(id, newQuantity, price, newSubtotal));
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      const newSubtotal = newQuantity * price;
  
      // Llamar a la acción 'updateCart' para actualizar el estado del carrito
      dispatch(updateCart(id, newQuantity, price, newSubtotal));
    }
  };

  const handleDelete = () => {
    deleteProduct(id);
  };

  const precioTotal = quantity * price;

  return (
    <div className="pruebita">
      <div className="pruebita"></div>
      <div className="pruebita">
        <img src={image} alt={name} className="imagen-producto" />
        <h2>{name}</h2>
        <button className="pruebita" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
      <div className="pruebita">
        <div className="pruebita">
          <button onClick={handleDecrement}>-</button>
          {quantity}
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
      <div className="pruebita">Prec: ${price}</div>
      <div className="pruebita">Subt: ${(precioTotal || 0)}</div>
      <div className="pruebita"></div>
    </div>
  );
}