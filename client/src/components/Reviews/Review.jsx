import React from "react";
import { Rating } from "@mui/material";

const Reviews = ({ reviews }) => {

  const calculateAverageScore = () => {
    if (!reviews || reviews.length === 0) return 0;

    const totalScore = reviews.reduce((accumulator, review) => accumulator + review.score, 0);
    return totalScore / reviews.length;
  };

  return (
    <div style={{ textAlign: "left" }}>
      {reviews && reviews.length > 0 ? (
        <>
          <div style={{ marginBottom: "10px" }}>
            <Rating name="read-only" value={calculateAverageScore()} readOnly />
          </div>
          {reviews.map((review) => (
            <div key={review.id} style={{ marginBottom: "5px", paddingLeft: "10px" }}>
              <p style={{ fontSize: "12px" }}>{review.review}</p>
            </div>
          ))}
        </>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default Reviews;