import React from "react";
import Slider from "react-slick";
import ReviewCard from "./ReviewCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewCarousel = ({ reviews }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {reviews.map((review) => (
        <div key={review.id}>
          <ReviewCard review={review} />
        </div>
      ))}
    </Slider>
  );
};

export default ReviewCarousel;
