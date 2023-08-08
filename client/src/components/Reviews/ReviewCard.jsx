import React from "react";
import { Rating } from "@mui/material";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const ReviewCard = ({ review }) => {
  const { score, title, text , user} = review;

  const userName = user ? user.name : "Usuario Anónimo";
  const userImage = user ? user.image[0] : null;

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
    <Card sx={{ marginBottom: "16px", padding: "12px", backgroundColor: "#f1f1f1", border: "none"}}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" alignItems="center" sx={{ marginBottom: "8px" }}>
            {userImage && <Avatar src={userImage} alt="User" />}
            <Typography variant="body1" sx={{ marginLeft: "8px", fontWeight: "bold", textAlign: "center" }}>
              {userName}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ marginBottom: "8px" }}>
            <StarIcon sx={{ color: "gold", fontSize: "20px", marginRight: "4px" }} />
            <Rating name="read-only" value={score} readOnly precision={0.5} />
          </Box>
          <Typography variant="h6" sx={{ marginBottom: "8px", fontSize: "18px", fontWeight: "bold", textAlign: "center" }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: "14px", textAlign: "center" }}>{text}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};


export default ReviewCard;
