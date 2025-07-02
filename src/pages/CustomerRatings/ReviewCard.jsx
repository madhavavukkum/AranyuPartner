import React from 'react';
import { FaStar, FaUser, FaCalendarAlt, FaMapMarkedAlt } from 'react-icons/fa';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        className={`review-card__star ${
          star <= rating ? 'review-card__star--filled' : ''
        }`}
      />
    ));
  };

  return (
    <div className="review-card">
      <div className="review-card__header">
        <div className="review-card__customer-info">
          <div className="review-card__avatar">
            <FaUser />
          </div>
          <div className="review-card__customer-details">
            <h3 className="review-card__customer-name">{review.customerName}</h3>
            <div className="review-card__rating">
              <div className="review-card__stars">
                {renderStars(review.rating)}
              </div>
              <span className="review-card__rating-number">{review.rating}.0</span>
            </div>
          </div>
        </div>
        <div className="review-card__meta">
          <div className="review-card__date">
            <FaCalendarAlt className="review-card__meta-icon" />
            <span>{formatDate(review.date)}</span>
          </div>
        </div>
      </div>
      
      <div className="review-card__body">
        <div className="review-card__service">
          <FaMapMarkedAlt className="review-card__service-icon" />
          <span className="review-card__service-name">{review.service}</span>
        </div>
        
        <div className="review-card__comment">
          <p className="review-card__comment-text">{review.comment}</p>
        </div>
        
        {review.response && (
          <div className="review-card__response">
            <div className="review-card__response-header">
              <strong>Your Response:</strong>
            </div>
            <p className="review-card__response-text">{review.response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;