import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Box } from '@mui/material';
import { createComment, getCommentsByProduct } from '../../redux/actions/actions';

const CrearComentario = ({ productId, userEmail, userRole }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createComment({
        text,
        productId,
        userEmail,
      }));
      console.log('Comment sent successfully');
      setText('');
      await dispatch(getCommentsByProduct(productId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {userRole === 2 && (
        <form onSubmit={handleSubmit}>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            label="Escribe tu comentario aquí"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <Box marginTop={2}>
            <Button variant="contained" type="submit">
              Send Commentary
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default CrearComentario;
