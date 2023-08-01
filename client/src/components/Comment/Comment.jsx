import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReply } from "../../redux/actions/actions";

const Comment = ({ comment, userEmail }) => {
  const dispatch = useDispatch();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const userRole = useSelector((state) => state.users.role); 

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    try {
      const replyData = {
        text: replyText,
        commentId: comment.id,
        userEmail,
      };

      // Llamar a la acción para crear la respuesta al comentario
      await dispatch(createReply(replyData));

      // Limpiar el formulario después de enviar la respuesta
      setReplyText("");
      setShowReplyForm(false);
    } catch (error) {
      console.error("Error al responder al comentario:", error);
    }
  };

  const canUserReply = userRole === "Provider"; // Verificar si el usuario tiene el rol "Provider"

  return (
    <div className="comment">
      <p>{comment.text}</p>
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="reply">
              <p>{reply.text}</p>
            </div>
          ))}
        </div>
      )}
      {userEmail && canUserReply && ( // Agregamos la comprobación de canUserReply para mostrar el botón de respuesta
        <button onClick={() => setShowReplyForm(!showReplyForm)}>Responder</button>
      )}
      {showReplyForm && userEmail && canUserReply && ( // Agregamos la comprobación de canUserReply para mostrar el formulario de respuesta
        <form onSubmit={handleReplySubmit}>
          <input
            type="text"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button type="submit">Reply</button>
        </form>
      )}
    </div>
  );
};

export default Comment;
