import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ThankYouPage.module.css";
import thanku from '../../assets/thanku2.png'
import { FaStar } from 'react-icons/fa';
import AddReviewForm from "../Reviews/addReview"; // Importar el formulario de reseña
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Backdrop } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const ThankYouPage = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user);
        setCurrentUser(user);
      } else {
        console.log("User is not authenticated");
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={styles.cartContainer1}>
        <div className={styles.thankyou}>
          <img src={thanku} alt="Thumbs up" />
        </div>
        <div />
        <div className={styles.cartContainer2}>
          <h2 style={{ fontFamily: 'Poppins' }}><FaStar /> Thank You!</h2>
          <p style={{ fontFamily: 'Poppins' }}>Your order has been successfully processed.</p>
          <div className={styles.cartItems}>
            {cartItems?.map((cartItem) => (
              <div className={styles.cartItem} key={cartItem.id}>
                <div className={styles.cartProduct}>
                  <img src={cartItem.images} alt={cartItem.name} />
                  <div>
                    <h3 style={{ fontFamily: 'Poppins' }}>{cartItem.name}</h3>
                    <Button style={{ backgroundColor: "#000924", color: "#ffffff" }}variant="contained" color="primary" onClick={() => handleOpenModal(cartItem.id)}>
                      Add Review
                    </Button>
                  </div>
                </div>
                <div className={styles.cartProductPrice}>
                  <p>Price</p>
                  {cartItem.salePrice}
                </div>
                <div className={styles.cartProductQuantity}>
                  <p>Quantity</p>
                  <div className={styles.count}>{cartItem.cartQuantity}</div>
                </div>

                <div className={styles.cartProductTotalPrice}>
                  <p>Total</p>
                  ${cartItem.salePrice * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'Poppins' }}>You will receive an email with your order details.</p>

          <Link to={"/home"}>
            <button className={styles.create}>Continue Shopping</button>
          </Link>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleCloseModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.7)' }
        }}
      >
        <DialogTitle style={{ fontFamily: 'Poppins' }}>Add Review</DialogTitle>
        <DialogContent>
          {currentUser !== null && currentUser !== undefined ? ( // Verificar si hay un usuario autenticado
            <AddReviewForm productId={selectedProductId} user={currentUser} /> // Pasar el usuario actual como prop
          ) : (
            <p>Please log in to add a review.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="error" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ThankYouPage;