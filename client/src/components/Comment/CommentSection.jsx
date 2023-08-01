// CommentSection.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsByProduct } from "../../redux/actions/actions";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
const CommentSection = ({ productId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getCommentsByProduct(productId));
  }, [dispatch, productId]);

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          userEmail={currentUser?.email} // Pasar el correo electrónico del usuario al componente Comment
        />
      ))}
      {currentUser && (
        <CommentForm productId={productId} /> // Mostrar el formulario de comentarios solo si hay un usuario autenticado
      )}
    </div>
  );
};

export default CommentSection;
