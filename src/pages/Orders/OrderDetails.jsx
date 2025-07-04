import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaRupeeSign, FaPhone, FaIdCard, FaCheck, FaTimes } from 'react-icons/fa';
import ConfirmationModal from '../../components/Orders/ConfirmationModal';
import { ordersData } from '../../data/ordersData';
import './OrderDetails.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    // Find the order by ID
    const foundOrder = ordersData.find(o => o.id === orderId);
    setOrder(foundOrder);
  }, [orderId]);

  const handleConfirm = () => {
    setModalMessage('Do you want to confirm this booking?');
    setPendingAction('confirm');
    setShowModal(true);
  };

  const handleCancel = () => {
    setModalMessage('Do you want to cancel this booking?');
    setPendingAction('cancel');
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    if (pendingAction === 'confirm') {
      // Update order status to confirmed
      const updatedOrder = { ...order, status: 'confirmed' };
      setOrder(updatedOrder);
      
      // Update in the data source (in a real app, this would be an API call)
      const orderIndex = ordersData.findIndex(o => o.id === orderId);
      if (orderIndex !== -1) {
        ordersData[orderIndex] = updatedOrder;
      }
    } else if (pendingAction === 'cancel') {
      // Update order status to canceled
      const updatedOrder = { ...order, status: 'canceled' };
      setOrder(updatedOrder);
      
      // Update in the data source (in a real app, this would be an API call)
      const orderIndex = ordersData.findIndex(o => o.id === orderId);
      if (orderIndex !== -1) {
        ordersData[orderIndex] = updatedOrder;
      }
    }
    
    setShowModal(false);
    setPendingAction(null);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setPendingAction(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#22c55e';
      case 'pending':
        return '#f59e0b';
      case 'canceled':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const renderActionButtons = () => {
    switch (order?.status) {
      case 'confirmed':
        return (
          <button 
            className="order-details__btn order-details__btn--cancel"
            onClick={handleCancel}
          >
            <FaTimes className="order-details__btn-icon" />
            Cancel Booking
          </button>
        );
      case 'pending':
        return (
          <div className="order-details__btn-group">
            <button 
              className="order-details__btn order-details__btn--confirm"
              onClick={handleConfirm}
            >
              <FaCheck className="order-details__btn-icon" />
              Confirm Booking
            </button>
            <button 
              className="order-details__btn order-details__btn--cancel"
              onClick={handleCancel}
            >
              <FaTimes className="order-details__btn-icon" />
              Cancel Booking
            </button>
          </div>
        );
      case 'canceled':
        return (
          <div className="order-details__status-message">
            <FaTimes className="order-details__status-icon" />
            This booking has been canceled
          </div>
        );
      default:
        return null;
    }
  };

  if (!order) {
    return (
      <div className="order-details">
        <div className="order-details__container">
          <div className="order-details__not-found">
            <h2>Order not found</h2>
            <p>The order you're looking for doesn't exist or has been removed.</p>
            <Link to="/orders" className="order-details__back-link">
              <FaArrowLeft className="order-details__back-icon" />
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-details">
      <div className="order-details__container">
        {/* Header */}
        <div className="order-details__header">
          <div className="order-details__header-content">
            <div className="order-details__header-row">
              <Link to="/orders" className="order-details__back-btn">
                <FaArrowLeft />
              </Link>
              <div className="order-details__header-text">
                <h1 className="order-details__title">Order Details</h1>
                <p className="order-details__subtitle">Manage booking information and status</p>
              </div>
            </div>
            <div 
              className="order-details__status-badge"
              style={{ backgroundColor: getStatusColor(order.status) }}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="order-details__content">
          {/* Order Information */}
          <div className="order-details__section">
            <div className="order-details__section-header">
              <div className="order-details__section-icon order-details__section-icon--primary">
                <FaIdCard />
              </div>
              <div className="order-details__section-title-content">
                <h2 className="order-details__section-title">Order Information</h2>
                <p className="order-details__section-subtitle">Basic booking details</p>
              </div>
            </div>
            
            <div className="order-details__section-body">
              <div className="order-details__info-grid">
                <div className="order-details__info-item">
                  <div className="order-details__info-content">
                    <FaIdCard className="order-details__info-icon" />
                    <div className="order-details__info-text">
                      <span className="order-details__info-label">Order ID</span>
                      <span className="order-details__info-value">{order.id}</span>
                    </div>
                  </div>
                </div>
                
                <div className="order-details__info-item">
                  <div className="order-details__info-content">
                    <FaMapMarkerAlt className="order-details__info-icon" />
                    <div className="order-details__info-text">
                      <span className="order-details__info-label">Order From</span>
                      <span className="order-details__info-value">{order.orderFrom}</span>
                    </div>
                  </div>
                </div>
                
                <div className="order-details__info-item">
                  <div className="order-details__info-content">
                    <FaPhone className="order-details__info-icon" />
                    <div className="order-details__info-text">
                      <span className="order-details__info-label">Contact Number</span>
                      <span className="order-details__info-value">{order.contactNumber}</span>
                    </div>
                  </div>
                </div>
                
                <div className="order-details__info-item">
                  <div className="order-details__info-content">
                    <FaUser className="order-details__info-icon" />
                    <div className="order-details__info-text">
                      <span className="order-details__info-label">Guest Name</span>
                      <span className="order-details__info-value">{order.guestName}</span>
                    </div>
                  </div>
                </div>
                
                <div className="order-details__info-item">
                  <div className="order-details__info-content">
                    <FaCalendarAlt className="order-details__info-icon" />
                    <div className="order-details__info-text">
                      <span className="order-details__info-label">Arrival Date & Time</span>
                      <span className="order-details__info-value">{order.arrivalDateTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="order-details__info-item">
                  <div className="order-details__info-content">
                    <FaRupeeSign className="order-details__info-icon" />
                    <div className="order-details__info-text">
                      <span className="order-details__info-label">Total Amount</span>
                      <span className="order-details__info-value order-details__info-value--amount">
                        {formatAmount(order.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="order-details__section">
            <div className="order-details__section-header">
              <div className="order-details__section-icon order-details__section-icon--secondary">
                <FaCalendarAlt />
              </div>
              <div className="order-details__section-title-content">
                <h2 className="order-details__section-title">Trip Details</h2>
                <p className="order-details__section-subtitle">Journey dates and timeline</p>
              </div>
            </div>
            
            <div className="order-details__section-body">
              <div className="order-details__info-grid">
                <div className="order-details__info-item">
                  <div className="order-details__info-content">
                    <FaCalendarAlt className="order-details__info-icon" />
                    <div className="order-details__info-text">
                      <span className="order-details__info-label">Trip Starts From</span>
                      <span className="order-details__info-value">{formatDate(order.tripStartsFrom)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="order-details__info-item">
                  <div className="order-details__info-content">
                    <FaCalendarAlt className="order-details__info-icon" />
                    <div className="order-details__info-text">
                      <span className="order-details__info-label">Trip Ends On</span>
                      <span className="order-details__info-value">{formatDate(order.endDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Passenger Details */}
          <div className="order-details__section">
            <div className="order-details__section-header">
              <div className="order-details__section-icon order-details__section-icon--tertiary">
                <FaUser />
              </div>
              <div className="order-details__section-title-content">
                <h2 className="order-details__section-title">Passenger Details</h2>
                <p className="order-details__section-subtitle">Information about travelers</p>
              </div>
            </div>
            
            <div className="order-details__section-body">
              {order.passengerDetails && order.passengerDetails.length > 0 ? (
                <div className="order-details__passengers">
                  {order.passengerDetails.map((passenger, index) => (
                    <div key={index} className="order-details__passenger">
                      <div className="order-details__passenger-avatar">
                        <FaUser />
                      </div>
                      <div className="order-details__passenger-info">
                        <h4 className="order-details__passenger-name">{passenger.name}</h4>
                        <div className="order-details__passenger-details">
                          <span className="order-details__passenger-detail">
                            <strong>Age:</strong> {passenger.age}
                          </span>
                          <span className="order-details__passenger-detail">
                            <strong>Gender:</strong> {passenger.gender}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="order-details__no-passengers">
                  <FaUser className="order-details__no-passengers-icon" />
                  <p className="order-details__no-passengers-text">No passenger details available</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="order-details__actions">
            {renderActionButtons()}
          </div>
        </div>
      </div>
      
      <ConfirmationModal
        isOpen={showModal}
        message={modalMessage}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </div>
  );
};

export default OrderDetails;