import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getCommentsByProduct, createReply } from "../../redux/actions/actions";
import Comment from "./Comment";

const CommentSection = ({ productId, userEmail }) => {
  const [newCommentText, setNewCommentText] = useState("");
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getCommentsByProduct(productId));
  }, [dispatch, productId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createComment(newCommentText, productId, userEmail));
      setNewCommentText("");
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  const handleReplySubmit = async (commentId, replyText) => {
    try {
      dispatch(createReply(replyText, commentId, userEmail));
    } catch (error) {
      console.log("Error adding reply:", error);
    }
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          userEmail={userEmail}
          onSubmitReply={(commentId, replyText) => handleReplySubmit(commentId, replyText)}
        />
      ))}
      {userEmail && (
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button type="submit">Comment</button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;