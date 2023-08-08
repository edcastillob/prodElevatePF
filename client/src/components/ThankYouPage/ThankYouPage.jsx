import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ThankYouPage.module.css";
import thanku from '../../assets/thanku2.png'
import { FaStar } from 'react-icons/fa';
import AddReviewForm from "../Reviews/addReview"; // Importar el formulario de reseña
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Backdrop } from "@mui/material";

const ThankYouPage = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

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
          <AddReviewForm productId={selectedProductId} />
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