import React, { useState, useEffect } from 'react';
import { FaUser, FaUniversity, FaWallet, FaBarcode, FaTimes, FaEdit } from 'react-icons/fa';
import './UpdateBankAccount.css';
import { showSuccessToast, showInfoToast } from '../../../App';

const UpdateBankAccount = ({ account, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    accountHolderName: '',
    bankName: account.bankName,
    accountNumber: account.accountNumber,
    confirmAccountNumber: account.accountNumber,
    ifscCode: '',
  });

  const [errors, setErrors] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
  });

  useEffect(() => {
    setFormData({
      accountHolderName: '',
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      confirmAccountNumber: account.accountNumber,
      ifscCode: '',
    });
  }, [account]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifscCode: '',
    };

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = 'Please enter account holder name';
      isValid = false;
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Please enter bank name';
      isValid = false;
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Please enter valid account number';
      isValid = false;
    } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Account number must be 9-18 digits';
      isValid = false;
    }

    if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Account numbers must match';
      isValid = false;
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'Please enter valid IFSC code';
      isValid = false;
    } else if (!/^[A-Z]{4}0\d{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = 'IFSC code must be 11 characters (e.g., SBIN0001234)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
      });
      showSuccessToast('Bank account updated successfully!');
    }
  };

  const handleCancel = () => {
    showInfoToast('Bank account update cancelled.');
    onCancel();
  };

  return (
    <div className="update-bank-account">
      <div className="update-bank-account__container">
        <h2 className="update-bank-account__title">Update Bank Account</h2>
        <form onSubmit={handleSubmit} className="update-bank-account__form">
          <div className="update-bank-account__field">
            <label htmlFor="accountHolderName" className="update-bank-account__label">Account Holder Name</label>
            <div className="update-bank-account__input-group">
              <span className="update-bank-account__input-icon"><FaUser /></span>
              <input
                type="text"
                className={`update-bank-account__input ${errors.accountHolderName ? 'update-bank-account__input--error' : ''}`}
                id="accountHolderName"
                placeholder="John Doe"
                value={formData.accountHolderName}
                onChange={handleChange}
              />
            </div>
            {errors.accountHolderName && (
              <div className="update-bank-account__error">{errors.accountHolderName}</div>
            )}
          </div>

          <div className="update-bank-account__field">
            <label htmlFor="bankName" className="update-bank-account__label">Bank Name</label>
            <div className="update-bank-account__input-group">
              <span className="update-bank-account__input-icon"><FaUniversity /></span>
              <input
                type="text"
                className={`update-bank-account__input ${errors.bankName ? 'update-bank-account__input--error' : ''}`}
                id="bankName"
                placeholder="e.g. State Bank of India"
                value={formData.bankName}
                onChange={handleChange}
              />
            </div>
            {errors.bankName && (
              <div className="update-bank-account__error">{errors.bankName}</div>
            )}
          </div>

          <div className="update-bank-account__field">
            <label htmlFor="accountNumber" className="update-bank-account__label">Account Number</label>
            <div className="update-bank-account__input-group">
              <span className="update-bank-account__input-icon"><FaWallet /></span>
              <input
                type="text"
                className={`update-bank-account__input ${errors.accountNumber ? 'update-bank-account__input--error' : ''}`}
                id="accountNumber"
                placeholder="1234567890"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
            {errors.accountNumber && (
              <div className="update-bank-account__error">{errors.accountNumber}</div>
            )}
          </div>

          <div className="update-bank-account__field">
            <label htmlFor="confirmAccountNumber" className="update-bank-account__label">Confirm Account Number</label>
            <div className="update-bank-account__input-group">
              <span className="update-bank-account__input-icon"><FaWallet /></span>
              <input
                type="text"
                className={`update-bank-account__input ${errors.confirmAccountNumber ? 'update-bank-account__input--error' : ''}`}
                id="confirmAccountNumber"
                placeholder="1234567890"
                value={formData.confirmAccountNumber}
                onChange={handleChange}
              />
            </div>
            {errors.confirmAccountNumber && (
              <div className="update-bank-account__error">{errors.confirmAccountNumber}</div>
            )}
          </div>

          <div className="update-bank-account__field">
            <label htmlFor="ifscCode" className="update-bank-account__label">IFSC Code</label>
            <div className="update-bank-account__input-group">
              <span className="update-bank-account__input-icon"><FaBarcode /></span>
              <input
                type="text"
                className={`update-bank-account__input ${errors.ifscCode ? 'update-bank-account__input--error' : ''}`}
                id="ifscCode"
                placeholder="SBIN0001234"
                value={formData.ifscCode}
                onChange={handleChange}
              />
            </div>
            <p className="update-bank-account__info">The IFSC Code is usually 11 digits and can be found on your passbook.</p>
            {errors.ifscCode && (
              <div className="update-bank-account__error">{errors.ifscCode}</div>
            )}
          </div>

          <div className="update-bank-account__actions">
            <button
              type="button"
              className="update-bank-account__btn update-bank-account__btn--outline"
              onClick={handleCancel}
            >
              <FaTimes className="update-bank-account__btn-icon" /> Cancel
            </button>
            <button
              type="submit"
              className="update-bank-account__btn update-bank-account__btn--primary"
            >
              <FaEdit className="update-bank-account__btn-icon" /> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBankAccount;