import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../redux/actions/actions";
import { Box, Grid, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AddReviewForm = ({ productId }) => {
  const [input, setInput] = useState({
    userMail: "",
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user.email);
        setInput((prevInput) => ({
          ...prevInput,
          userMail: user.email,
        }));
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleReviewSubmit = async () => {
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
        userName: currentUser.displayName, // Agregamos el nombre del usuario a reviewData
        userImage: currentUser.photoURL, // Agregamos la imagen del usuario a reviewData
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
            <h2>¡Gracias por dejar una reseña!</h2>
            <p>Tu opinión es muy valiosa para nosotros.</p>
            <Button variant="contained" color="primary" onClick={() => setShowThankYou(false)}>
              Cerrar
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
                Agregar Reseña
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
};

export default AddReviewForm;
