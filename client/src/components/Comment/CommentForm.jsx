import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/actions/actions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Box, TextField, Button } from "@mui/material";

const CommentForm = ({ productId }) => {
  const [input, setInput] = useState({
    email: "", // Usaremos el email como identificador único
    productId: productId,
    text: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users); // Obtén el usuario desde Redux (puede ser de Firebase o de la base de datos local)

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });

    return () => unsubscribe();
  }, []); // Solo se ejecutará una vez al montar el componente

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener el email del usuario (Firebase o de la base de datos local)
    const userEmail = currentUser ? currentUser.email : (user && user.email) || "";

    // Validar si el usuario está autenticado o tiene un email válido
    if (!currentUser && !user && !userEmail) {
      alert("Debes estar logueado para agregar un comentario");
      return;
    }

    const commentData = {
      ...input,
      userEmail: userEmail, // Usamos el email como identificador del usuario que hizo el comentario
    };

    dispatch(createComment(commentData));

    setInput({
      ...input,
      text: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box>
          <TextField
            id="standard-basic"
            label="Agregar Comentario"
            variant="standard"
            htmlFor="text"
            value={input.text}
            name="text"
            onChange={(e) => setInput((prevInput) => ({ ...prevInput, text: e.target.value }))}
            InputLabelProps={{ shrink: true }}
            fullWidth
            multiline
            rows={4}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Enviar Comentario
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
