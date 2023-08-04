import React from "react";
import Carousel from "react-material-ui-carousel";
import ReviewCard from "./ReviewCard";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const ReviewCarousel = ({ reviews }) => {
  return (
    <Carousel
      autoPlay={false}
      animation="slide"
      indicators={false}
      navButtonsAlwaysVisible
      PrevIcon={<ArrowBack style={{ fontSize: 20, color: "red" }} />}
      NextIcon={<ArrowForward style={{ fontSize: 20, color: "green" }} />}
      slidesToShow={1} // Mostrar solo un elemento a la vez
    >
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </Carousel>
  );
};

export default ReviewCarousel;
