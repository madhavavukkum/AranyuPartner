import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaArrowLeft, FaCheck, FaTrash, FaGift, FaStar, FaMoneyBillWave, FaCalendarAlt, FaEye } from 'react-icons/fa';
import './Notifications.css';
import { showSuccessToast } from '../../App.jsx';
import notificationsData from '../../data/Notifications.js';

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
    showSuccessToast('Notification marked as read');
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
    showSuccessToast('All notifications marked as read');
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    showSuccessToast('Notification deleted');
  };

  const getActionLink = (notification) => {
    switch (notification.type) {
      case 'offer':
        return '/offers';
      case 'review':
        return '/myratings';
      case 'payment':
        return '/payments';
      default:
        return '/';
    }
  };

  return (
    <div className="notifications">
      <div className="notifications__container">
        <div className="notifications__header">
          <div className="notifications__header-content">
            <Link to="/" className="notifications__back-btn">
              <FaArrowLeft />
            </Link>
            <div className="notifications__header-icon">
              <FaBell />
              {unreadCount > 0 && (
                <span className="notifications__header-badge">{unreadCount}</span>
              )}
            </div>
            <div className="notifications__header-text">
              <h1 className="notifications__title">Notifications</h1>
              <p className="notifications__subtitle">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
          </div>
        </div>
        {unreadCount > 0 && (
          <div className="notifications__actions">
            <button
              className="notifications__action-btn notifications__action-btn--primary"
              onClick={markAllAsRead}
            >
              <FaCheck className="notifications__action-icon" />
              Mark All as Read
            </button>
          </div>
        )}
        <div className="notifications__content">
          {notifications.length > 0 ? (
            <div className="notifications__list">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`notifications__item ${!notification.isRead ? 'notifications__item--unread' : ''}`}
                  >
                    <div className="notifications__item-content">
                      <div className="notifications__item-icon" style={{ backgroundColor: notification.iconColor }}>
                        <IconComponent />
                      </div>
                      <div className="notifications__item-body">
                        <div className="notifications__item-header">
                          <h3 className="notifications__item-title">{notification.title}</h3>
                          <div className="notifications__item-meta">
                            <span className="notifications__item-time">
                              <FaCalendarAlt className="notifications__meta-icon" />
                              {notification.time}
                            </span>
                            {!notification.isRead && (
                              <span className="notifications__unread-indicator">New</span>
                            )}
                          </div>
                        </div>
                        <p className="notifications__item-message">{notification.message}</p>
                        <div className="notifications__item-actions">
                          <Link
                            to={getActionLink(notification)}
                            className="notifications__item-action-btn notifications__item-action-btn--primary"
                          >
                            <FaEye className="notifications__item-action-icon" />
                            {notification.actionText}
                          </Link>
                          {!notification.isRead && (
                            <button
                              className="notifications__item-action-btn notifications__item-action-btn--secondary"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <FaCheck className="notifications__item-action-icon" />
                              Mark as Read
                            </button>
                          )}
                          <button
                            className="notifications__item-action-btn notifications__item-action-btn--danger"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <FaTrash className="notifications__item-action-icon" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="notifications__empty-state">
              <div className="notifications__empty-icon">
                <FaBell />
              </div>
              <h2 className="notifications__empty-title">No notifications yet</h2>
              <p className="notifications__empty-description">
                When you receive new notifications about your business, they will appear here.
              </p>
              <Link to="/" className="notifications__empty-btn">
                <FaArrowLeft className="notifications__empty-btn-icon" />
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;