import React from "react";
import { format } from "date-fns";
import "./ReviewCard.css";

const ReviewCard = ({ Review }) => {
  const renderStars = (rate) => {
    const maxStars = 5;
    return Array.from({ length: maxStars }, (_, index) => (
      <span key={index} style={{ color: index < rate ? "#FFD700" : "#CCC" }}>
        ★
      </span>
    ));
  };

  const formattedDate = format(new Date(Review.createdAt), "dd/MM/yyyy HH:mm");

  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="left">
          <img src="https://via.placeholder.com/150" alt="Avatar" />
          <h3>{Review.client.username}</h3>
        </div>
        <h3 className="type-container">{Review.type}</h3>
      </div>
      <div className="review-card-body">
        <p>{Review.content}</p>
      </div>
      <div className="review-card-footer">
        <p>{renderStars(Review.rate)}</p>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
