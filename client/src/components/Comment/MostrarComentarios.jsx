import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReply, getCommentsByProduct } from '../../redux/actions/actions';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import './estilosComent.modules.css';
import { Avatar, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { ENDPOINT } from '../endpoint/ENDPOINT';
const CommentSkeleton = () => {
  return (
    <Box
      sx={{
        width: 'max(400px, 60%)',
        borderRadius: 0,
        border: '1px solid #ddd',
        padding: '10px',
        backgroundColor: '#fff',
        marginBottom: '10px',
      }}
    >
      <Box display="flex" alignItems="center">
        <Skeleton variant="circular" width={44} height={44} />
        <div style={{ marginLeft: '10px' }}>
          <Skeleton variant="text" width={100} />
          <Skeleton variant="text" width={200} />
        </div>
      </Box>
      <Skeleton variant="text" width="92%" height={20} />
      <Skeleton variant="text" width="99%" height={20} />
      <Skeleton variant="text" width="96%" height={20} />
    </Box>
  );
};

const MostrarComentarios = ({ productId, userEmail, userRole }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const [replyText, setReplyText] = useState('');
  const [userRoleLocal, setUserRoleLocal] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [repliedComments, setRepliedComments] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const handleReply = async (e, commentId) => {
    e.preventDefault();

    try {
      await dispatch(
        createReply({
          commentId,
          text: replyText,
          userEmail,
        })
      );
      console.log('Reply sent successfully');
      setReplyText('');

      setRepliedComments((prevRepliedComments) =>
        new Set([...prevRepliedComments, commentId])
      );

      await dispatch(getCommentsByProduct(productId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        try {
          const response = await axios.get(`${ENDPOINT}useremail/` + user.email);
          const data = response.data.rol;
          setUserRoleLocal(data);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      } else {
        setCurrentUser(null);
      }
    });

    dispatch(getCommentsByProduct(productId));

    return () => unsubscribe();
  }, [dispatch, productId]);

  if (!comments || comments.length === 0) {
    return <p>Cargando comentarios...</p>;
  }

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleToggleReplyForm = (commentId) => {
    setRepliedComments((prevRepliedComments) =>
      prevRepliedComments.has(commentId)
        ? new Set([...prevRepliedComments].filter((id) => id !== commentId))
        : new Set([...prevRepliedComments, commentId])
    );
    localStorage.setItem('repliedComments', JSON.stringify([...repliedComments]));
  };

  return (
    <Box py={2}>
      <Typography variant="h6">Preguntas sobre el Producto</Typography>
      {currentComments.map((comment, index) => (
        <Box
          key={comment.id}
          sx={{
            borderRadius: '8px',
            border: '1px solid #ddd',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#fff',
          }}
        >
        <Box display="flex" alignItems="center">
          <Avatar src={comment.user?.image} alt="User" />
          <Typography variant="body2" className="comment-user" sx={{ marginLeft: '10px' }}>
            {comment.user?.name}
          </Typography>
          </Box>
          <Typography className="comment-text" variant="body1">
            {comment.text}
          </Typography>
          {comment.respuestas && comment.respuestas.length > 0 && (
            <CardContent style={{ background: '#f1f1f1', marginBottom: '5px', padding: '5px', borderRadius: '8px' }}>
              {comment.respuestas.map((reply) => (
                <div key={reply.id} style={{ background: '#f1f1f1', marginBottom: '5px', padding: '5px', borderRadius: '8px' }}>
                 <div className="comment-info">
                  <Avatar src={reply.replyUser?.image} alt="User" />
                  <Typography variant="body2" className="comment-user">
                    {reply.replyUser?.name}
                  </Typography>
                </div>
                <Typography className="comment-text" variant="body1">
                  {reply.text}
                </Typography>
              </div>
            ))}
          </CardContent>
        )}
        {!repliedComments.has(comment.id) && userRole === 'Provider' && (
          <CardContent style={{ background: '#f1f1f1', borderRadius: '8px' }}>
            <Button variant="outlined" onClick={() => handleToggleReplyForm(comment.id)}>
              Responder
            </Button>
          </CardContent>
        )}
        {repliedComments.has(comment.id) && userRole === 'Provider' && (
          <CardContent style={{ background: '#f1f1f1', borderRadius: '8px' }}>
            <form onSubmit={(e) => handleReply(e, comment.id)}>
              <TextField
                multiline
                rows={4}
                variant="outlined"
                label="Escribe tu respuesta aquí"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                required
              />
              <Box marginTop={2}>
                <Button
                  variant="contained"
                  type="submit"
                  endIcon={<SendIcon />}
                >
                  Enviar Respuesta
                </Button>
              </Box>
            </form>
          </CardContent>
        )}
      </Box>
    ))}
    <Pagination
      count={Math.ceil(comments.length / commentsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
    />
  </Box>
);
};

export default MostrarComentarios;
