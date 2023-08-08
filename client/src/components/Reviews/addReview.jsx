import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../redux/actions/actions";
import { Box, Grid, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const AddReviewForm = ({ productId, user }) => {
  const [input, setInput] = useState({
    userMail: user.email,
    productId: productId,
    score: 0,
    title: "",
    text: "",
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      if (!currentUser) {
        console.error("Usuario no autenticado");
        return;
      }

      const reviewData = {
        productId: input.productId,
        score: input.score,
        title: input.title,
        text: input.text,
        userMail: input.userMail,
        userName: currentUser.displayName,
        userImage: currentUser.photoURL,
      };

      dispatch(postReview(reviewData));
      setShowThankYou(true);
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
    }
  };
  return (
    <div>
      {showThankYou ? (
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
          <div style={{ backgroundColor: "#fff", width: 300, padding: 20, borderRadius: 10, margin: "auto", marginTop: 100 }}>
            <h2>¡Thank you for your Review!</h2>
            <p>Your opinion is very valuable to us.</p>
            <Button variant="contained" color="primary" onClick={() => setShowThankYou(false)}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleReviewSubmit}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Rating
                  defaultValue={2.5}
                  precision={0.5}
                  size="large"
                  label="Puntuación:"
                  name="score"
                  value={input.score}
                  onChange={(event, newValue) => {
                    setInput((prevInput) => ({
                      ...prevInput,
                      score: newValue,
                    }));
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                variant="standard"
                label="Reseña:"
                htmlFor="text"
                value={input.text}
                onChange={handleInputChange}
                name="text"
                InputLabelProps={{ shrink: true }}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Review
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
};

export default AddReviewForm;
