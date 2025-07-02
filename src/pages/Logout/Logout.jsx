import React from 'react';
import { FaSignOutAlt, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Logout.css';
import { showSuccessToast, showInfoToast } from '../../App.jsx';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    showSuccessToast('Logout successful! Redirecting...');
    logout();
    setTimeout(() => navigate('/login', { replace: true }), 2000);
  };

  const handleCancel = () => {
    showInfoToast('Logout cancelled.');
    setTimeout(() => navigate(-1), 1500);
  };

  return (
    <div className="logout">
      <div className="logout__container">
        <div className="logout__header">
          <div className="logout__header-content">
            <div className="logout__header-icon">
              <FaExclamationTriangle />
            </div>
            <div className="logout__header-text">
              <h1 className="logout__title">Sign Out</h1>
              <p className="logout__subtitle">Are you sure you want to sign out?</p>
            </div>
          </div>
        </div>

        <div className="logout__content">
          <div className="logout__card">
            <div className="logout__card-body">
              <div className="logout__icon-wrapper">
                <FaSignOutAlt className="logout__icon" />
              </div>
              
              <h2 className="logout__heading">Confirm Sign Out</h2>
              
              <p className="logout__description">
                You will be signed out of your account and redirected to the login page.
              </p>

              <div className="logout__actions">
                <button 
                  className="logout__btn logout__btn--primary" 
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="logout__btn-icon" />
                  Yes, Sign Out
                </button>
                <button 
                  className="logout__btn logout__btn--secondary" 
                  onClick={handleCancel}
                >
                  <FaArrowLeft className="logout__btn-icon" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;