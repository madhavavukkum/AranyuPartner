import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaSearch, FaFilter, FaBoxOpen } from 'react-icons/fa';
import OrderCard from '../../components/Orders/OrderCard';
import { ordersData } from '../../data/ordersData';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Simulate loading orders data
    setOrders(ordersData);
    setFilteredOrders(ordersData);
  }, []);

  useEffect(() => {
    // Filter orders based on search term and status
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.guestName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const getStatusCounts = () => {
    return {
      all: orders.length,
      pending: orders.filter(order => order.status === 'pending').length,
      confirmed: orders.filter(order => order.status === 'confirmed').length,
      canceled: orders.filter(order => order.status === 'canceled').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="my-orders">
      <div className="my-orders__container">
        {/* Header */}
        <div className="my-orders__header">
          <div className="my-orders__header-content">
            <div className="my-orders__header-icon">
              <FaClipboardList />
            </div>
            <div className="my-orders__header-text">
              <h1 className="my-orders__title">My Orders</h1>
              <p className="my-orders__subtitle">Manage and track all your customer bookings</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="my-orders__filters">
          {/* Search */}
          <div className="my-orders__search-container">
            <FaSearch className="my-orders__search-icon" />
            <input
              type="text"
              className="my-orders__search-input"
              placeholder="Search by Order ID or Guest Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filters */}
          <div className="my-orders__status-filters">
            <button
              className={`my-orders__status-btn ${statusFilter === 'all' ? 'my-orders__status-btn--active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              <FaFilter className="my-orders__status-icon" />
              All Orders
              <span className="my-orders__status-count">{statusCounts.all}</span>
            </button>
            <button
              className={`my-orders__status-btn ${statusFilter === 'pending' ? 'my-orders__status-btn--active' : ''}`}
              onClick={() => setStatusFilter('pending')}
            >
              Pending
              <span className="my-orders__status-count">{statusCounts.pending}</span>
            </button>
            <button
              className={`my-orders__status-btn ${statusFilter === 'confirmed' ? 'my-orders__status-btn--active' : ''}`}
              onClick={() => setStatusFilter('confirmed')}
            >
              Confirmed
              <span className="my-orders__status-count">{statusCounts.confirmed}</span>
            </button>
            <button
              className={`my-orders__status-btn ${statusFilter === 'canceled' ? 'my-orders__status-btn--active' : ''}`}
              onClick={() => setStatusFilter('canceled')}
            >
              Canceled
              <span className="my-orders__status-count">{statusCounts.canceled}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="my-orders__content">
          {filteredOrders.length > 0 ? (
            <div className="my-orders__list">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="my-orders__empty-state">
              <div className="my-orders__empty-icon">
                <FaBoxOpen />
              </div>
              <h2 className="my-orders__empty-title">
                {searchTerm || statusFilter !== 'all' ? 'No matching orders found' : 'No orders yet'}
              </h2>
              <p className="my-orders__empty-description">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria or filters to find what you\'re looking for.'
                  : 'When customers book your services, their orders will appear here for you to manage.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;