import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUniversity, FaHeadset, FaChevronRight, FaWallet, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
import './WalletDetails.css';

const WalletDetails = () => {
  const navigate = useNavigate();

  // Navigate to settings routes
  const handleOptionClick = (section) => {
    navigate(`/settings/${section}`);
  };

  return (
    <div className="wallet-details">
      <div className="wallet-details__container">
        {/* Header Section */}
        <div className="wallet-details__header">
          <div className="wallet-details__header-content">
            <div className="wallet-details__header-icon">
              <FaWallet />
            </div>
            <div className="wallet-details__header-text">
              <h1 className="wallet-details__title">My Wallet</h1>
              <p className="wallet-details__subtitle">Manage your wallet information</p>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="wallet-details__balance-card">
          <div className="wallet-details__balance-header">
            <div className="wallet-details__balance-icon">
              <FaMoneyBillWave />
            </div>
            <div className="wallet-details__balance-info">
              <div className="wallet-details__balance-label">Current Balance</div>
              <div className="wallet-details__balance-amount">₹0</div>
            </div>
          </div>
          <div className="wallet-details__balance-message">
            Transfer all your wallet balance into your bank account
          </div>
          <button className="wallet-details__cash-out-btn">
            <FaCreditCard className="wallet-details__cash-out-icon" />
            Cash Out
          </button>
        </div>

        {/* Options Section */}
        <div className="wallet-details__options">
          {/* Payment Mode Option */}
          <div
            className="wallet-details__option-card"
            onClick={() => handleOptionClick('payment')}
          >
            <div className="wallet-details__option-content">
              <div className="wallet-details__option-icon wallet-details__option-icon--primary">
                <FaUniversity />
              </div>
              <div className="wallet-details__option-text">
                <h3 className="wallet-details__option-title">Payment Mode</h3>
                <p className="wallet-details__option-description">
                  Add Bank account to Receive money
                </p>
              </div>
            </div>
            <div className="wallet-details__option-arrow">
              <FaChevronRight />
            </div>
          </div>

          {/* Help & Support Option */}
          <div
            className="wallet-details__option-card"
            onClick={() => handleOptionClick('help')}
          >
            <div className="wallet-details__option-content">
              <div className="wallet-details__option-icon wallet-details__option-icon--secondary">
                <FaHeadset />
              </div>
              <div className="wallet-details__option-text">
                <h3 className="wallet-details__option-title">Help & Support</h3>
                <p className="wallet-details__option-description">
                  Make grievance regarding any issue
                </p>
              </div>
            </div>
            <div className="wallet-details__option-arrow">
              <FaChevronRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;