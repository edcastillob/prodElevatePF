import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../redux/actions/actions";
import {Box,Grid,Card,CardContent} from "@mui/material";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { getAuth, onAuthStateChanged } from "firebase/auth"; 
const AddReviewForm = ({ productId }) => {
    const [input, setInput] = useState({
      userId: "", // Agrega el estado para almacenar el UID del usuario
      productId: productId,
      score: 0,
      title: "",
      text: "",
    });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const usuario = useSelector((state) => state.user); // Obtén el estado del usuario logueado desde Redux

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
        setInput((prevInput) => ({
          ...prevInput,
          userId: user.uid, // Asigna el uid del usuario como userId en el estado del formulario
        }));
      } else {
        setCurrentUser(null);
      }
    });
  
    
    return () => unsubscribe();
  }, []);
    
    
const handleReviewSubmit = async (reviewData) => {
    try {
      const user = currentUser;
     
      if (!user) {
        console.error('Usuario no autenticado');
        return;
      }
  
      
      const token = await user.getIdToken();
  
     
      const formattedUserId = user.uid.replace(/-/g, ''); 
      reviewData.userId = formattedUserId;
  
     
       dispatch(postReview(reviewData, user, formattedUserId, token));
  
  
    } catch (error) {
      console.error('Error al enviar la review:', error);
    
    } finally {
      setLoading(false); 
    }
  };
      function validate(input) {
        let errors = {};
    
        if (!input.title) {
          errors.title = "Ingresa un título.";
        }
        if (!input.score) {
          errors.score = "Ingresa una puntuación.";
        }
        if (!input.text) {
          errors.text = "Ingresa una reseña.";
        }
        return errors;
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); 
      
        
        const user = currentUser;
        if (!user) {
          
          alert("Debes estar logueado para agregar una reseña");
          setLoading(false);
          return;
        }
      
      
        const validationErrors = validate(input);
        setErrors(validationErrors);
      
        if (Object.keys(validationErrors).length === 0) {
          handleReviewSubmit(input);
        } else {
          setLoading(false); 
        }
      };

  return (
    <div>
    <form onSubmit={handleSubmit}>
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
            {errors.score && <p>{errors.score}</p>}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="standard-basic"
            label="Título"
            variant="standard"
            htmlFor="title"
            value={input.title}
            name="title"
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          {errors.title && <p>{errors.title}</p>}
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
          {errors.text && <p>{errors.text}</p>}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Agregar Reseña
          </Button>
        </Grid>
      </Grid>
    </form>
  </div>
  );
};

export default AddReviewForm;
