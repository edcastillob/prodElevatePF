import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/actions"; 

const CommentForm = () => {
    const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [productId, setProductId] = useState("");
  const currentUser = useSelector((state) => state.currentUser); // Suponiendo que almacenaste el estado del usuario actual en Redux
  const handleSubmit = async () => {
    // Obtener el ID del usuario actualmente autenticado desde Firebase
    const userId = "6a9fb616-ee00-4d42-bb0e-c320673a2b50";
    const userEmail = currentUser ? currentUser.email : "claudiodavid339@gmail.com";
    try {
        // Llamar a la acción para crear el comentario
        const commentData = {
          text,
          productId,
          userId,
          userEmail,
        };
        const createdComment = await dispatch(createComment(commentData));
  
        // Aquí puedes manejar la respuesta si es necesario
        console.log("Comentario creado:", createdComment);
  
        // Limpiar el formulario después de enviar el comentario
        // ...
      } catch (error) {
        console.error("Error creando el comentario:", error);
      }
    };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu comentario..."
      />
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="ID del producto"
      />
      <button onClick={handleSubmit}>Enviar Comentario</button>
    </div>
  );
};

export default CommentForm;
