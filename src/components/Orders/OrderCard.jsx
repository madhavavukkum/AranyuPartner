import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaRupeeSign, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <FaCheckCircle className="order-card__status-icon order-card__status-icon--confirmed" />;
      case 'pending':
        return <FaClock className="order-card__status-icon order-card__status-icon--pending" />;
      case 'canceled':
        return <FaTimesCircle className="order-card__status-icon order-card__status-icon--canceled" />;
      default:
        return <FaClock className="order-card__status-icon" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'order-card__status-badge--confirmed';
      case 'pending':
        return 'order-card__status-badge--pending';
      case 'canceled':
        return 'order-card__status-badge--canceled';
      default:
        return 'order-card__status-badge--pending';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Link to={`/order-details/${order.id}`} className="order-card__link">
      <div className="order-card">
        <div className="order-card__header">
          <div className="order-card__booking-info">
            <span className="order-card__booking-label">Booking ID:</span>
            <span className="order-card__booking-value">{order.id}</span>
          </div>
          <div className={`order-card__status-badge ${getStatusClass(order.status)}`}>
            {getStatusIcon(order.status)}
            <span className="order-card__status-text">{order.status}</span>
          </div>
        </div>
        
        <div className="order-card__content">
          <div className="order-card__title-section">
            <h3 className="order-card__title">{order.title}</h3>
          </div>
          
          <div className="order-card__info-grid">
            <div className="order-card__info-item">
              <FaUser className="order-card__info-icon" />
              <div className="order-card__info-text">
                <span className="order-card__info-label">Guest Name</span>
                <span className="order-card__info-value">{order.guestName}</span>
              </div>
            </div>
            
            <div className="order-card__info-item">
              <FaRupeeSign className="order-card__info-icon" />
              <div className="order-card__info-text">
                <span className="order-card__info-label">Amount</span>
                <span className="order-card__info-value">{formatAmount(order.amount)}</span>
              </div>
            </div>
            
            <div className="order-card__info-item">
              <FaClock className="order-card__info-icon" />
              <div className="order-card__info-text">
                <span className="order-card__info-label">Booked On</span>
                <span className="order-card__info-value">{formatDate(order.bookedOn)}</span>
              </div>
            </div>
            
            <div className="order-card__info-item">
              <FaCalendarAlt className="order-card__info-icon" />
              <div className="order-card__info-text">
                <span className="order-card__info-label">Journey Date</span>
                <span className="order-card__info-value">{formatDate(order.journeyDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;