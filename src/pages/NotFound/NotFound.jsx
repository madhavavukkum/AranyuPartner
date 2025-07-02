import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found">
      <div className="not-found__container">
        {/* Header */}
        <div className="not-found__header">
          <div className="not-found__header-content">
            <div className="not-found__header-icon">
              <FaExclamationTriangle />
            </div>
            <div className="not-found__header-text">
              <h1 className="not-found__title">404 - Page Not Found</h1>
              <p className="not-found__subtitle">The page you're looking for doesn't exist</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="not-found__content">
          <div className="not-found__content-grid">
            {/* Illustration */}
            <div className="not-found__illustration">
              <img
                src="404.svg"
                alt="Adventure map illustration"
                className="not-found__image"
              />
            </div>

            {/* Text Content */}
            <div className="not-found__text-content">
              <div className="not-found__error-code">404</div>
              <h2 className="not-found__heading">Oops! You've wandered off the map!</h2>
              <p className="not-found__description">
                It looks like you've taken a wrong turn on your adventure. The page you're looking for 
                doesn't exist or has been moved to a different location. Don't worry, we'll help you 
                get back on track!
              </p>
              
              <div className="not-found__suggestions">
                <h3 className="not-found__suggestions-title">What you can do:</h3>
                <ul className="not-found__suggestions-list">
                  <li>Check the URL for any typos</li>
                  <li>Go back to the previous page</li>
                  <li>Visit our homepage to start fresh</li>
                  <li>Use the navigation menu to find what you need</li>
                </ul>
              </div>

              <div className="not-found__actions">
                <Link to="/" className="not-found__btn not-found__btn--primary">
                  <FaHome className="not-found__btn-icon" />
                  Go to Homepage
                </Link>
                <button 
                  onClick={handleGoBack}
                  className="not-found__btn not-found__btn--secondary"
                >
                  <FaArrowLeft className="not-found__btn-icon" />
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="not-found__help">
          <div className="not-found__help-content">
            <h3 className="not-found__help-title">Still need help?</h3>
            <p className="not-found__help-text">
              If you believe this is an error or you need assistance, please contact our support team.
            </p>
            <Link to="/settings/help" className="not-found__help-btn">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;