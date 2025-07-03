import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaSearch, FaFilter, FaBoxOpen } from 'react-icons/fa';
import PaymentCard from '../../components/Payments/PaymentCard';
import { paymentsData } from '../../data/paymentsData';
import './Payments.css';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Simulate loading payments data
    setPayments(paymentsData);
    setFilteredPayments(paymentsData);
  }, []);

  useEffect(() => {
    // Filter payments based on search term and status
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status.toLowerCase() === statusFilter);
    }

    setFilteredPayments(filtered);
  }, [payments, searchTerm, statusFilter]);

  const getStatusCounts = () => {
    return {
      all: payments.length,
      pending: payments.filter(payment => payment.status.toLowerCase() === 'pending').length,
      completed: payments.filter(payment => payment.status.toLowerCase() === 'completed').length,
      cancelled: payments.filter(payment => payment.status.toLowerCase() === 'cancelled').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="payments">
      <div className="payments__container">
        {/* Header */}
        <div className="payments__header">
          <div className="payments__header-content">
            <div className="payments__header-icon">
              <FaCreditCard />
            </div>
            <div className="payments__header-text">
              <h1 className="payments__title">Payment History</h1>
              <p className="payments__subtitle">Track and manage all your payment transactions</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="payments__filters">
          {/* Search */}
          <div className="payments__search-container">
            <FaSearch className="payments__search-icon" />
            <input
              type="text"
              className="payments__search-input"
              placeholder="Search by Booking ID or Tour Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filters */}
          <div className="payments__status-filters">
            <button
              className={`payments__status-btn ${statusFilter === 'all' ? 'payments__status-btn--active' : ''}`}
              onClick={() => setStatusFilter('all')}
              data-status="all"
            >
              <FaFilter className="payments__status-icon" />
              All Payments
              <span className="payments__status-count">{statusCounts.all}</span>
            </button>
            <button
              className={`payments__status-btn ${statusFilter === 'pending' ? 'payments__status-btn--active' : ''}`}
              onClick={() => setStatusFilter('pending')}
              data-status="pending"
            >
              Pending
              <span className="payments__status-count">{statusCounts.pending}</span>
            </button>
            <button
              className={`payments__status-btn ${statusFilter === 'completed' ? 'payments__status-btn--active' : ''}`}
              onClick={() => setStatusFilter('completed')}
              data-status="completed"
            >
              Completed
              <span className="payments__status-count">{statusCounts.completed}</span>
            </button>
            <button
              className={`payments__status-btn ${statusFilter === 'cancelled' ? 'payments__status-btn--active' : ''}`}
              onClick={() => setStatusFilter('cancelled')}
              data-status="cancelled"
            >
              Cancelled
              <span className="payments__status-count">{statusCounts.cancelled}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="payments__content">
          {filteredPayments.length > 0 ? (
            <div className="payments__list">
              {filteredPayments.map((payment, index) => (
                <PaymentCard key={index} payment={payment} />
              ))}
            </div>
          ) : (
            <div className="payments__empty-state">
              <div className="payments__empty-icon">
                <FaBoxOpen />
              </div>
              <h2 className="payments__empty-title">
                {searchTerm || statusFilter !== 'all' ? 'No matching payments found' : 'No payments yet'}
              </h2>
              <p className="payments__empty-description">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria or filters to find what you\'re looking for.'
                  : 'When you make bookings and payments, they will appear here for you to track.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;