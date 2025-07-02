import React, { useState } from 'react';
import { FaUser, FaUniversity, FaWallet, FaBarcode, FaTimes, FaSave } from 'react-icons/fa';
import './AddBankAccount.css';
import { showSuccessToast, showInfoToast } from '../../../App';

const AddBankAccount = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
  });

  const [errors, setErrors] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
  });

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
      const bankDetails = {
        accountHolderName: formData.accountHolderName,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
      };
      localStorage.setItem('bankDetails', JSON.stringify(bankDetails));
      onSubmit({
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
      });
      showSuccessToast('Bank account added successfully!');
      setFormData({
        accountHolderName: '',
        bankName: '',
        accountNumber: '',
        confirmAccountNumber: '',
        ifscCode: '',
      });
    }
  };

  const handleCancel = () => {
    showInfoToast('Bank account addition cancelled.');
    onCancel();
  };

  return (
    <div className="add-bank-account">
      <div className="add-bank-account__container">
        <h2 className="add-bank-account__title">Add Bank Account</h2>
        <form onSubmit={handleSubmit} className="add-bank-account__form">
          <div className="add-bank-account__field">
            <label htmlFor="accountHolderName" className="add-bank-account__label">Account Holder Name</label>
            <div className="add-bank-account__input-group">
              <span className="add-bank-account__input-icon"><FaUser /></span>
              <input
                type="text"
                className={`add-bank-account__input ${errors.accountHolderName ? 'add-bank-account__input--error' : ''}`}
                id="accountHolderName"
                placeholder="John Doe"
                value={formData.accountHolderName}
                onChange={handleChange}
              />
            </div>
            {errors.accountHolderName && (
              <div className="add-bank-account__error">{errors.accountHolderName}</div>
            )}
          </div>

          <div className="add-bank-account__field">
            <label htmlFor="bankName" className="add-bank-account__label">Bank Name</label>
            <div className="add-bank-account__input-group">
              <span className="add-bank-account__input-icon"><FaUniversity /></span>
              <input
                type="text"
                className={`add-bank-account__input ${errors.bankName ? 'add-bank-account__input--error' : ''}`}
                id="bankName"
                placeholder="e.g. State Bank of India"
                value={formData.bankName}
                onChange={handleChange}
              />
            </div>
            {errors.bankName && (
              <div className="add-bank-account__error">{errors.bankName}</div>
            )}
          </div>

          <div className="add-bank-account__field">
            <label htmlFor="accountNumber" className="add-bank-account__label">Account Number</label>
            <div className="add-bank-account__input-group">
              <span className="add-bank-account__input-icon"><FaWallet /></span>
              <input
                type="text"
                className={`add-bank-account__input ${errors.accountNumber ? 'add-bank-account__input--error' : ''}`}
                id="accountNumber"
                placeholder="1234567890"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
            {errors.accountNumber && (
              <div className="add-bank-account__error">{errors.accountNumber}</div>
            )}
          </div>

          <div className="add-bank-account__field">
            <label htmlFor="confirmAccountNumber" className="add-bank-account__label">Confirm Account Number</label>
            <div className="add-bank-account__input-group">
              <span className="add-bank-account__input-icon"><FaWallet /></span>
              <input
                type="text"
                className={`add-bank-account__input ${errors.confirmAccountNumber ? 'add-bank-account__input--error' : ''}`}
                id="confirmAccountNumber"
                placeholder="1234567890"
                value={formData.confirmAccountNumber}
                onChange={handleChange}
              />
            </div>
            {errors.confirmAccountNumber && (
              <div className="add-bank-account__error">{errors.confirmAccountNumber}</div>
            )}
          </div>

          <div className="add-bank-account__field">
            <label htmlFor="ifscCode" className="add-bank-account__label">IFSC Code</label>
            <div className="add-bank-account__input-group">
              <span className="add-bank-account__input-icon"><FaBarcode /></span>
              <input
                type="text"
                className={`add-bank-account__input ${errors.ifscCode ? 'add-bank-account__input--error' : ''}`}
                id="ifscCode"
                placeholder="SBIN0001234"
                value={formData.ifscCode}
                onChange={handleChange}
              />
            </div>
            <p className="add-bank-account__info">The IFSC Code is usually 11 digits and can be found on your passbook.</p>
            {errors.ifscCode && (
              <div className="add-bank-account__error">{errors.ifscCode}</div>
            )}
          </div>

          <div className="add-bank-account__actions">
            <button
              type="button"
              className="add-bank-account__btn add-bank-account__btn--outline"
              onClick={handleCancel}
            >
              <FaTimes className="add-bank-account__btn-icon" /> Cancel
            </button>
            <button
              type="submit"
              className="add-bank-account__btn add-bank-account__btn--primary"
            >
              <FaSave className="add-bank-account__btn-icon" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBankAccount;