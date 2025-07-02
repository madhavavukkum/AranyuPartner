import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal__backdrop" onClick={onCancel}></div>
      <div className="confirmation-modal__content">
        <h2 className="confirmation-modal__title">Confirmation</h2>
        <p className="confirmation-modal__message">{message}</p>
        <div className="confirmation-modal__actions">
          <button 
            className="confirmation-modal__btn confirmation-modal__btn--yes"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button 
            className="confirmation-modal__btn confirmation-modal__btn--no"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;