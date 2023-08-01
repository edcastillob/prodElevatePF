// En el componente CommentForm:

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment,updateCurrentUser} from "../../redux/actions/actions";
import { Box, TextField, Button } from "@mui/material";

const CommentForm = ({ productId }) => {
  const [input, setInput] = useState({
    email: "", // Usaremos el email como identificador único
    productId: productId,
    text: "",
  });
  const dispatch = useDispatch();
  const { users, currentUser } = useSelector((state) => state); // Obtén la lista de usuarios locales y el usuario autenticado con Firebase desde el estado de Redux

  useEffect(() => {
    // Cuando se monta el componente, verificamos si el usuario está autenticado con Firebase y si sí, actualizamos el estado de Redux con los datos del usuario.
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(updateCurrentUser(user || null));
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si el usuario está autenticado
    if (!currentUser && users.length === 0) {
      alert("Debes estar logueado para agregar un comentario");
      return;
    }

    const user = currentUser || users[0]; // Utiliza currentUser si está definido, de lo contrario, toma el primer usuario de la lista de usuarios locales
    const commentData = {
      ...input,
      userEmail: user.email, // Usamos el email del usuario autenticado o del usuario local como identificador del usuario que hizo el comentario
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
            onChange={handleInputChange}
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
