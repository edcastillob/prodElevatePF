import React from "react";
import { Rating } from "@mui/material";
import { Card, CardContent, Typography, Avatar, Box, Grid} from "@mui/material";
import styles from "./ReviewsCard.module.css";
import StarIcon from "@mui/icons-material/Star";
const ReviewCard = ({ review, user }) => {
  const { score, title, text } = review;

  
  const userName = user ? user.displayName : "Usuario Anónimo";
  const userEmail = user ? user.email : "N/A";
  const userImage = user ? user.photoURL : null;

const renderStars = () => {
    const filledStars = Math.floor(score);
    const halfStar = score - filledStars >= 0.5;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<StarIcon key={i} />);
    }
    if (halfStar) {
      stars.push(<StarHalfIcon key={filledStars} />);
    }

    return stars;
  };
  return (
    <Card className={styles.reviewCard} sx={{ marginBottom: "16px", padding: "12px", width: "1000px" }}>
    <CardContent>
      <Box display="flex" alignItems="center" sx={{ marginBottom: "8px" }}>
        {userImage && <Avatar src={userImage} alt="User" />}
        <Typography variant="body1" sx={{ marginLeft: "8px", fontWeight: "bold" }}>
          {userName}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" sx={{ marginBottom: "8px" }}>
        <StarIcon sx={{ color: "gold", fontSize: "20px", marginRight: "4px" }} />
        <Rating name="read-only" value={score} readOnly precision={0.5} />
      </Box>
      <Typography variant="h6" sx={{ marginBottom: "8px", fontSize: "18px", fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>{text}</Typography>
    </CardContent>
  </Card>
);
};

export default ReviewCard;