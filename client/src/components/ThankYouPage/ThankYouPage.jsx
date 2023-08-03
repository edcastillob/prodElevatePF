// Importaciones necesarias
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ThankYouPage.module.css";
import AddReviewForm from "../Reviews/addReview"; // Importar el formulario de reseña
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Backdrop } from "@mui/material";

const ThankYouPage = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [reviews, setReviews] = useState([]); // Lista de reseñas
  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleReviewSubmit = async (reviewData) => {
    try {
     
      const createdReview = await createReview(reviewData);

      
      setReviews((prevReviews) => [...prevReviews, createdReview]);

      
      handleCloseModal();
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
    }
  };

  return (
    <>
      <div className={styles.cartContainer}>
        <h2 style={{ fontFamily: 'Poppins' }}>Thank You for Your Purchase!</h2>
        <p style={{ fontFamily: 'Poppins' }}>We are thrilled that you chose to shop with us.</p>
        <p style={{ fontFamily: 'Poppins' }}>Your order has been successfully processed.</p>
        <div className={styles.cartItems}>
        {cartItems?.map((cartItem) => (
            <div className={styles.cartItem} key={cartItem.id}>
              <div className={styles.cartProduct}>
                <img src={cartItem.images} alt={cartItem.name} />
                <div>
                  <h3 style={{ fontFamily: 'Poppins' }}>{cartItem.name}</h3>
                  <Button variant="contained" color="primary" onClick={() => handleOpenModal(cartItem.id)}>
                      Agregar Reseña
                    </Button>
                  </div>
              </div>
              <div className={styles.cartProductPrice}>
                {cartItem.salePrice}
              </div>
              <div className={styles.cartProductQuantity}>
                <div className={styles.count}>{cartItem.cartQuantity}</div>
              </div>

              <div className={styles.cartProductTotalPrice}>
                ${cartItem.salePrice * cartItem.cartQuantity}
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'Poppins' }}>You will receive an email with your order details shortly.</p>
        <p style={{ fontFamily: 'Poppins' }}>Thank you again for your business!</p>
      </div>

      <Link to={"/home"}>
        <button className={styles.create}>Continue</button>
      </Link>

      
      <Dialog
        open={open}
        onClose={handleCloseModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.7)' }
        }}
      >
        <DialogTitle style={{ fontFamily: 'Poppins' }}>Agregar Reseña</DialogTitle>
        <DialogContent>
        <AddReviewForm productId={selectedProductId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="error" variant="contained">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ThankYouPage;