import React from 'react';
import './PackagesDeleteModal.css';
import { showInfoToast } from '../../../App';

const PackagesDeleteModal = ({ isOpen, onClose, onConfirm, packageName }) => {
  if (!isOpen) return null;

  const handleCancel = () => {
    showInfoToast('Deletion cancelled.');
    onClose();
  };

  return (
    <div className="packages__modal-backdrop">
      <div className="packages__modal">
        <div className="packages__modal-header">
          <h2 className="packages__modal-title">Confirm Deletion</h2>
        </div>
        <div className="packages__modal-body">
          <p className="packages__modal-text">
            Are you sure you want to delete the package "{packageName}"? This action cannot be undone.
          </p>
        </div>
        <div className="packages__modal-footer">
          <button
            className="packages__modal-btn packages__modal-btn--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="packages__modal-btn packages__modal-btn--delete"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackagesDeleteModal;