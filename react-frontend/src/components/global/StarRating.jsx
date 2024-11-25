import React, { useState } from "react";
import "./StarRating.css";

const StarRating = ({ onChange, maxStars = 5, defaultRating = 1 }) => {
  const [rating, setRating] = useState(defaultRating);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className="star-rating">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={starValue}
            className={`star ${starValue <= (hover || rating) ? "filled" : ""}`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
