import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartState } from "../../redux/actions/actions";
import Mensaje from "./mensaje/mensaje";
import Seleccion from "./seleccion/seleccion";
import { getStoredCart, updateStoredCart } from "./cartUtils";
import styles from "./Cart.module.css";

export const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [sumaTotal, setSumaTotal] = useState(0);

 
  useEffect(() => {
    const storedCart = getStoredCart() || [];
    console.log("Productos almacenados en localStorage:", storedCart); // Imprimir los productos almacenados

    // Si hay productos en el localStorage, actualizamos el estado del carrito en Redux
    if (storedCart.length > 0) {
      dispatch(updateCartState(storedCart));
    }
  }, [dispatch]);
  useEffect(() => {
    updateStoredCart(cart);
    updateSumaTotal(cart);
  }, [cart]);





  const updateQuantity = (id, quantity, price) => {
    const updatedCart = cart.map((product) =>
      product.id === id ? { ...product, quantity, subtotalitem: quantity * price } : product
    );
    updateSumaTotal(updatedCart);
    dispatch(updateCartState(updatedCart));
  };

  const deleteProduct = (id) => {
    const updatedCart = cart.filter((producto) => producto.id !== id);
    updateSumaTotal(updatedCart);
    dispatch(updateCartState(updatedCart));
  };

  const updateSumaTotal = (updatedCart) => {
    let sum = 0;
    for (const producto of updatedCart) {
      sum += producto.subtotalitem;
    }
    setSumaTotal(sum);
  };

  return (
    <div>
      <div className={styles.fondo}>
        <div className="pruebita">
          <div className="pruebita">
            <div className="pruebita">
              <h1>Carrito</h1>
            </div>
            {cart.length === 0 ? (
              <Mensaje></Mensaje>
            ) : (
              cart?.map((producto) => (
                <Seleccion
                  key={producto.id}
                  pokes={producto}
                  updateQuantity={updateQuantity}
                  deleteProduct={() => deleteProduct(producto.id)} // Pasar la función deleteProduct como prop
                  purchasePrice={producto.purchasePrice}
                  image={producto.image}
                />
              ))
            )}
            <div className="pruebita">TotalTabla: ${sumaTotal}</div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};