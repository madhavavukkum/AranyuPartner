import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaRupeeSign, FaClock } from 'react-icons/fa';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'order-card__status--confirmed';
      case 'pending':
        return 'order-card__status--pending';
      case 'canceled':
        return 'order-card__status--canceled';
      default:
        return '';
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
          <div className="order-card__id-section">
            <h3 className="order-card__id">{order.id}</h3>
            <span className={`order-card__status ${getStatusClass(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="order-card__body">
          <div className="order-card__details">
            <div className="order-card__detail">
              <div className="order-card__detail-content">
                <FaUser className="order-card__detail-icon" />
                <div className="order-card__detail-text">
                  <span className="order-card__detail-label">Guest Name</span>
                  <span className="order-card__detail-value">{order.guestName}</span>
                </div>
              </div>
            </div>
            
            <div className="order-card__detail">
              <div className="order-card__detail-content">
                <FaRupeeSign className="order-card__detail-icon" />
                <div className="order-card__detail-text">
                  <span className="order-card__detail-label">Amount</span>
                  <span className="order-card__detail-value order-card__detail-value--amount">
                    {formatAmount(order.amount)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="order-card__detail">
              <div className="order-card__detail-content">
                <FaClock className="order-card__detail-icon" />
                <div className="order-card__detail-text">
                  <span className="order-card__detail-label">Booked On</span>
                  <span className="order-card__detail-value">{formatDate(order.bookedOn)}</span>
                </div>
              </div>
            </div>
            
            <div className="order-card__detail">
              <div className="order-card__detail-content">
                <FaCalendarAlt className="order-card__detail-icon" />
                <div className="order-card__detail-text">
                  <span className="order-card__detail-label">Journey Date</span>
                  <span className="order-card__detail-value">{formatDate(order.journeyDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;