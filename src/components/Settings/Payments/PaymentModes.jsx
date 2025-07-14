import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaChevronRight, FaCheckCircle, FaCreditCard, FaUniversity } from 'react-icons/fa';
import './PaymentModes.css';
import AddBankAccount from './AddBankAccount';
import UpdateBankAccount from './UpdateBankAccount';
import { showSuccessToast, showInfoToast } from '../../../App';

const PaymentModes = () => {
  const [accounts, setAccounts] = useState(() => {
    const savedAccounts = localStorage.getItem('bankDetails');
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  });
  const [currentScreen, setCurrentScreen] = useState('paymentModes');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('bankDetails', JSON.stringify(accounts));
  }, [accounts]);

  const showAccountDetails = (bankName, accountNumber, isPayout) => {
    setCurrentScreen('accountDetails');
    setSelectedAccount({ bankName, accountNumber, isPayout });
  };

  const backToPaymentModes = () => {
    setCurrentScreen('paymentModes');
    setSelectedAccount(null);
  };

  const addNewAccount = () => {
    setCurrentScreen('addAccount');
  };

  const handleAddAccount = (newAccount) => {
    const updatedAccounts = [...accounts, { ...newAccount, isPayout: accounts.length === 0 }];
    setAccounts(updatedAccounts);
    showSuccessToast('Bank account added successfully!');
    backToPaymentModes();
  };

  const editAccount = () => {
    setCurrentScreen('updateAccount');
  };

  const handleUpdateAccount = (updatedAccount) => {
    const updatedAccounts = accounts.map((acc) =>
      acc.bankName === selectedAccount.bankName && acc.accountNumber === selectedAccount.accountNumber
        ? { ...acc, bankName: updatedAccount.bankName, accountNumber: updatedAccount.accountNumber }
        : acc
    );
    setAccounts(updatedAccounts);
    setSelectedAccount({ ...selectedAccount, ...updatedAccount });
    showSuccessToast('Bank account updated successfully!');
    backToPaymentModes();
  };

  const deleteAccount = () => {
    if (accounts.length === 1) {
      showInfoToast('Cannot delete the only account.');
      setShowDeleteModal(false);
      return;
    }

    const updatedAccounts = accounts.filter(
      (acc) => !(acc.bankName === selectedAccount.bankName && acc.accountNumber === selectedAccount.accountNumber)
    );
    setAccounts(updatedAccounts);
    setShowDeleteModal(false);
    showSuccessToast('Account deleted successfully');
    backToPaymentModes();
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    showInfoToast('Account deletion cancelled.');
  };

  const handlePayoutToggle = (bankName, accountNumber, checked) => {
    if (checked) {
      const updatedAccounts = accounts.map((acc) => ({
        ...acc,
        isPayout: acc.bankName === bankName && acc.accountNumber === accountNumber,
      }));
      setAccounts(updatedAccounts);
      setSelectedAccount({ ...selectedAccount, isPayout: true });
      showSuccessToast('Payout account updated successfully');
    } else if (accounts.length > 1) {
      const updatedAccounts = accounts.map((acc) => ({
        ...acc,
        isPayout: acc.bankName === bankName && acc.accountNumber === accountNumber ? false : acc.isPayout,
      }));
      setAccounts(updatedAccounts);
      setSelectedAccount({ ...selectedAccount, isPayout: false });
      showSuccessToast('Payout account updated successfully');
    } else {
      showInfoToast('At least one account must be set as the payout account.');
    }
  };

  const renderActivePayout = () => {
    const activeAccount = accounts.find((acc) => acc.isPayout);
    return (
      <div className="payment-modes__card payment-modes__card--active">
        <div className="payment-modes__card-body">
          <h5 className="payment-modes__card-title">Primary Account</h5>
          <div className="payment-modes__account-list">
            {activeAccount ? (
              <div
                className="payment-modes__account-item"
                onClick={() => showAccountDetails(activeAccount.bankName, activeAccount.accountNumber, true)}
              >
                <div className="payment-modes__account-content">
                  <div className="payment-modes__account-info">
                    <FaUniversity className="payment-modes__account-icon" />
                    <div className="payment-modes__account-details">
                      <h6 className="payment-modes__account-title">Bank account - {activeAccount.accountNumber}</h6>
                      <span className="payment-modes__account-badge payment-modes__account-badge--active">{activeAccount.bankName}</span>
                    </div>
                  </div>
                  <div className="payment-modes__account-actions">
                    <FaCheckCircle className="payment-modes__check-icon" />
                    <FaChevronRight className="payment-modes__chevron-icon" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="payment-modes__account-item">
                <div className="payment-modes__account-content">
                  <div className="payment-modes__account-info">
                    <h6 className="payment-modes__no-account-text">No Payout Account Selected</h6>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="payment-modes__info-box">
            <p className="payment-modes__info-text">
              Payout week starts Monday 4:00 AM and ends next Monday 3:59 AM.<br />
              Trips in this window count toward that week's earnings.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderLinkedAccounts = () => {
    return (
      <div className="payment-modes__card">
        <div className="payment-modes__card-body">
          <h5 className="payment-modes__card-title">Linked Payment Methods</h5>
          <div className="payment-modes__account-list">
            {accounts.map((acc) => (
              <div
                key={`${acc.bankName}-${acc.accountNumber}`}
                className="payment-modes__account-item payment-modes__account-item--linked"
                onClick={() => showAccountDetails(acc.bankName, acc.accountNumber, acc.isPayout)}
              >
                <div className="payment-modes__account-content">
                  <div className="payment-modes__account-info">
                    <FaUniversity className="payment-modes__account-icon" />
                    <div className="payment-modes__account-details">
                      <h6 className="payment-modes__account-title">Bank account - {acc.accountNumber}</h6>
                      <span className={`payment-modes__account-badge ${acc.isPayout ? 'payment-modes__account-badge--active' : 'payment-modes__account-badge--secondary'}`}>
                        {acc.bankName}
                      </span>
                    </div>
                  </div>
                  <FaChevronRight className="payment-modes__chevron-icon" />
                </div>
              </div>
            ))}
          </div>
          <button className="payment-modes__add-btn" onClick={addNewAccount}>
            <FaPlus className="payment-modes__add-icon" /> Add Bank Account
          </button>
        </div>
      </div>
    );
  };

  const renderAccountDetails = () => {
    if (!selectedAccount) return null;
    return (
      <div className="payment-modes__details">
        <div className="payment-modes__details-header">
          <span className="payment-modes__back-btn" onClick={backToPaymentModes}>
            <FaArrowLeft className="payment-modes__back-icon" /> Back
          </span>
          <h2 className="payment-modes__details-title">Account Details</h2>
        </div>
        <div className="payment-modes__details-card">
          <div className="payment-modes__details-body">
            <div className="payment-modes__details-section">
              <h5 className="payment-modes__details-section-title">Bank Account Info</h5>
              <div className="payment-modes__details-row">
                <div className="payment-modes__details-field">
                  <p className="payment-modes__details-label">Bank Name</p>
                  <h4 className="payment-modes__details-value">{selectedAccount.bankName}</h4>
                </div>
              </div>
              <div className="payment-modes__details-row">
                <div className="payment-modes__details-field">
                  <p className="payment-modes__details-label">Account Number</p>
                  <h4 className="payment-modes__details-value">{selectedAccount.accountNumber}</h4>
                </div>
              </div>
              <div className="payment-modes__details-row">
                <div className="payment-modes__details-field">
                  <p className="payment-modes__details-label">Account Status</p>
                  <div className="payment-modes__details-status">
                    <h5 className="payment-modes__details-status-label">Is Payout Account:</h5>
                    <div className="payment-modes__toggle-wrapper">
                      <input
                        className="payment-modes__toggle-input"
                        type="checkbox"
                        checked={selectedAccount.isPayout}
                        onChange={(e) =>
                          handlePayoutToggle(selectedAccount.bankName, selectedAccount.accountNumber, e.target.checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="payment-modes__alert payment-modes__alert--success"
              style={{ display: selectedAccount.isPayout ? 'block' : 'none' }}
            >
              This account ({selectedAccount.bankName} - {selectedAccount.accountNumber}) is currently set as your payout
              account.
            </div>
            <div className="payment-modes__details-actions">
              <button className="payment-modes__btn payment-modes__btn--outline-primary" onClick={editAccount}>
                <FaEdit className="payment-modes__btn-icon" /> Update Account
              </button>
              <button
                className="payment-modes__btn payment-modes__btn--outline-danger"
                onClick={() => setShowDeleteModal(true)}
              >
                <FaTrash className="payment-modes__btn-icon" /> Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDeleteModal = () => (
    <div className={`payment-modes__modal ${showDeleteModal ? 'payment-modes__modal--show' : ''}`}>
      <div className="payment-modes__modal-dialog">
        <div className="payment-modes__modal-content">
          <div className="payment-modes__modal-header">
            <h5 className="payment-modes__modal-title">Confirm Deletion</h5>
            <button
              type="button"
              className="payment-modes__modal-close"
              onClick={cancelDelete}
              aria-label="Close"
            ></button>
          </div>
          <div className="payment-modes__modal-body">
            <p className="payment-modes__modal-text">Are you sure you want to delete this bank account? This action cannot be undone.</p>
          </div>
          <div className="payment-modes__modal-footer">
            <button
              type="button"
              className="payment-modes__btn payment-modes__btn--outline-dark"
              onClick={cancelDelete}
            >
              Cancel
            </button>
            <button type="button" className="payment-modes__btn payment-modes__btn--danger" onClick={deleteAccount}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddAccount = () => (
    <AddBankAccount onSubmit={handleAddAccount} onCancel={backToPaymentModes} />
  );

  const renderUpdateAccount = () => (
    <UpdateBankAccount
      account={selectedAccount}
      onSubmit={handleUpdateAccount}
      onCancel={backToPaymentModes}
    />
  );

  return (
    <div className="payment-modes">
      {currentScreen === 'paymentModes' ? (
        <>
          <div className="payment-modes__header">
            <div className="payment-modes__header-content">
              <div className="payment-modes__header-icon">
                <FaCreditCard />
              </div>
              <div className="payment-modes__header-text">
                <h1 className="payment-modes__header-title">Payment Modes</h1>
                <p className="payment-modes__header-subtitle">Manage your bank accounts</p>
              </div>
            </div>
          </div>
          {renderActivePayout()}
          {renderLinkedAccounts()}
        </>
      ) : currentScreen === 'accountDetails' ? (
        renderAccountDetails()
      ) : currentScreen === 'addAccount' ? (
        renderAddAccount()
      ) : (
        renderUpdateAccount()
      )}
      {showDeleteModal && renderDeleteModal()}
    </div>
  );
};

export default PaymentModes;