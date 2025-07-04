import React from 'react';
import { FaCalendarAlt, FaReceipt, FaRupeeSign, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import './PaymentCard.css';

const PaymentCard = ({ payment }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <FaCheckCircle className="payment-card__status-icon payment-card__status-icon--completed" />;
      case 'pending':
        return <FaClock className="payment-card__status-icon payment-card__status-icon--pending" />;
      case 'cancelled':
        return <FaTimesCircle className="payment-card__status-icon payment-card__status-icon--cancelled" />;
      default:
        return <FaClock className="payment-card__status-icon" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'payment-card__status-badge--completed';
      case 'pending':
        return 'payment-card__status-badge--pending';
      case 'cancelled':
        return 'payment-card__status-badge--cancelled';
      default:
        return 'payment-card__status-badge--pending';
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
    <div className="payment-card">
      <div className="payment-card__header">
        <div className="payment-card__booking-info">
          <span className="payment-card__booking-label">Booking ID:</span>
          <span className="payment-card__booking-value">{payment.bookingId}</span>
        </div>
        <div className={`payment-card__status-badge ${getStatusClass(payment.status)}`}>
          {getStatusIcon(payment.status)}
          <span className="payment-card__status-text">{payment.status}</span>
        </div>
      </div>
      
      <div className="payment-card__content">
        <div className="payment-card__title-section">
          <h3 className="payment-card__title">{payment.title}</h3>
        </div>
        
        <div className="payment-card__info-grid">
          <div className="payment-card__info-item">
            <FaRupeeSign className="payment-card__info-icon" />
            <div className="payment-card__info-text">
              <span className="payment-card__info-label">Amount</span>
              <span className="payment-card__info-value">{formatAmount(payment.amount)}</span>
            </div>
          </div>
          
          <div className="payment-card__info-item">
            <FaCalendarAlt className="payment-card__info-icon" />
            <div className="payment-card__info-text">
              <span className="payment-card__info-label">Payment Date</span>
              <span className="payment-card__info-value">{formatDate(payment.date)}</span>
            </div>
          </div>
          
          <div className="payment-card__info-item">
            <FaReceipt className="payment-card__info-icon" />
            <div className="payment-card__info-text">
              <span className="payment-card__info-label">Transaction</span>
              <span className="payment-card__info-value">Travel Booking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;