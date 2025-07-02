import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaSearch, FaFilter, FaUserCircle } from 'react-icons/fa';
import ReviewCard from './ReviewCard';
import { reviewsData } from '../../data/reviewsData';
import './CustomerRatings.css';

const CustomerRatings = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  useEffect(() => {
    // Load reviews data
    setReviews(reviewsData);
    setFilteredReviews(reviewsData);
  }, []);

  useEffect(() => {
    // Filter reviews based on search term and rating
    let filtered = reviews;

    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ratingFilter !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(ratingFilter));
    }

    setFilteredReviews(filtered);
  }, [reviews, searchTerm, ratingFilter]);

  const getRatingCounts = () => {
    return {
      all: reviews.length,
      5: reviews.filter(review => review.rating === 5).length,
      4: reviews.filter(review => review.rating === 4).length,
      3: reviews.filter(review => review.rating === 3).length,
      2: reviews.filter(review => review.rating === 2).length,
      1: reviews.filter(review => review.rating === 1).length
    };
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const ratingCounts = getRatingCounts();
  const averageRating = calculateAverageRating();

  return (
    <div className="customer-ratings">
      <div className="customer-ratings__container">
        {/* Header */}
        <div className="customer-ratings__header">
          <div className="customer-ratings__header-content">
            <div className="customer-ratings__header-icon">
              <FaStar />
            </div>
            <div className="customer-ratings__header-text">
              <h1 className="customer-ratings__title">Customer Ratings</h1>
              <p className="customer-ratings__subtitle">View and manage your customer reviews and ratings</p>
            </div>
            <div className="customer-ratings__stats">
              <div className="customer-ratings__average">
                <span className="customer-ratings__average-number">{averageRating}</span>
                <div className="customer-ratings__average-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`customer-ratings__star ${
                        star <= Math.round(averageRating) ? 'customer-ratings__star--filled' : ''
                      }`}
                    />
                  ))}
                </div>
                <span className="customer-ratings__total-reviews">({reviews.length} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="customer-ratings__filters">
          {/* Search */}
          <div className="customer-ratings__search-container">
            <FaSearch className="customer-ratings__search-icon" />
            <input
              type="text"
              className="customer-ratings__search-input"
              placeholder="Search by customer name, service, or review..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Rating Filters */}
          <div className="customer-ratings__rating-filters">
            <button
              className={`customer-ratings__rating-btn ${ratingFilter === 'all' ? 'customer-ratings__rating-btn--active' : ''}`}
              onClick={() => setRatingFilter('all')}
            >
              <FaFilter className="customer-ratings__rating-icon" />
              All Ratings
              <span className="customer-ratings__rating-count">{ratingCounts.all}</span>
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                className={`customer-ratings__rating-btn ${ratingFilter === rating.toString() ? 'customer-ratings__rating-btn--active' : ''}`}
                onClick={() => setRatingFilter(rating.toString())}
              >
                <div className="customer-ratings__rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`customer-ratings__filter-star ${
                        star <= rating ? 'customer-ratings__filter-star--filled' : ''
                      }`}
                    />
                  ))}
                </div>
                <span className="customer-ratings__rating-count">{ratingCounts[rating]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="customer-ratings__content">
          {filteredReviews.length > 0 ? (
            <div className="customer-ratings__list">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="customer-ratings__empty-state">
              <div className="customer-ratings__empty-icon">
                <FaUserCircle />
              </div>
              <h2 className="customer-ratings__empty-title">
                {searchTerm || ratingFilter !== 'all' ? 'No matching reviews found' : 'No reviews yet'}
              </h2>
              <p className="customer-ratings__empty-description">
                {searchTerm || ratingFilter !== 'all' 
                  ? 'Try adjusting your search criteria or filters to find what you\'re looking for.'
                  : 'When customers leave reviews for your services, they will appear here.'
                }
              </p>
              {!searchTerm && ratingFilter === 'all' && (
                <Link to="/" className="customer-ratings__back-btn">
                  Back to Home
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerRatings;