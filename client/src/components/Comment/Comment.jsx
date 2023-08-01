// Comment.js
import React, { useState } from "react";


const Comment = ({ comment, userRole, onSubmitReply }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState("");
  
    const handleReplySubmit = (e) => {
      e.preventDefault();
      onSubmitReply(comment.id, replyText);
      setReplyText("");
      setShowReplyForm(false);
    };
  
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
        {userRole === "provider" && (
          <button onClick={() => setShowReplyForm(!showReplyForm)}>Responder</button>
        )}
        {showReplyForm && userRole === "provider" && (
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