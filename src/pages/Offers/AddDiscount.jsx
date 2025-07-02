import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaTag, FaPercent, FaRupeeSign, FaPalette, FaSave } from 'react-icons/fa';
import './AddDiscount.css';
import { showSuccessToast, showErrorToast, showInfoToast } from '../../App.jsx';

const AddDiscount = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    discountValue: '',
    discountType: 'percentage',
    description: '',
    backgroundColor: '#007994',
    textColor: '#ffffff'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      const savedOffers = localStorage.getItem('offers');
      if (savedOffers) {
        const offers = JSON.parse(savedOffers);
        const offer = offers.find(o => o.id === id);
        if (offer) {
          setFormData(offer);
          showInfoToast('Editing existing offer');
        } else {
          showErrorToast('Offer not found');
          navigate('/offers');
        }
      } else {
        showErrorToast('No offers available');
        navigate('/offers');
      }
    }
  }, [id, isEditing, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.discountValue) {
      newErrors.discountValue = 'Discount value is required';
    } else if (formData.discountValue <= 0) {
      newErrors.discountValue = 'Discount value must be greater than 0';
    } else if (formData.discountType === 'percentage' && formData.discountValue > 100) {
      newErrors.discountValue = 'Percentage cannot exceed 100%';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showErrorToast('Please fix the errors in the form');
      return;
    }

    const savedOffers = localStorage.getItem('offers');
    const offers = savedOffers ? JSON.parse(savedOffers) : [];

    if (isEditing) {
      const updatedOffers = offers.map(offer =>
        offer.id === id ? { ...formData, id } : offer
      );
      localStorage.setItem('offers', JSON.stringify(updatedOffers));
      showSuccessToast('Offer updated successfully!');
    } else {
      const newOffer = {
        ...formData,
        id: Date.now().toString(),
        isActive: true,
        createdAt: new Date().toISOString()
      };
      offers.push(newOffer);
      localStorage.setItem('offers', JSON.stringify(offers));
      showSuccessToast('New offer created successfully!');
    }

    window.dispatchEvent(new Event('offersUpdated'));
    navigate('/offers');
  };

  const handleCancel = () => {
    navigate('/offers');
  };

  return (
    <div className="add-discount">
      <div className="add-discount__container">
        <div className="add-discount__header">
          <div className="add-discount__header-content">
            <button
              className="add-discount__back-btn"
              onClick={handleCancel}
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>
            <div className="add-discount__header-text">
              <h1 className="add-discount__title">
                {isEditing ? 'Edit Discount' : 'Add Discount'}
              </h1>
              <p className="add-discount__subtitle">
                {isEditing ? 'Update your discount offer' : 'Create a new discount offer to attract customers'}
              </p>
            </div>
          </div>
        </div>
        <div className="add-discount__content">
          <div className="add-discount__form-section">
            <form onSubmit={handleSubmit} className="add-discount__form">
              <div className="add-discount__form-group">
                <label className="add-discount__form-label">
                  <FaTag className="add-discount__form-icon" />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className={`add-discount__form-input ${errors.title ? 'add-discount__form-input--error' : ''}`}
                  placeholder="e.g., Screen Replacement Special"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {errors.title && (
                  <span className="add-discount__error">{errors.title}</span>
                )}
              </div>
              <div className="add-discount__form-row">
                <div className="add-discount__form-group">
                  <label className="add-discount__form-label">
                    <FaPercent className="add-discount__form-icon" />
                    Discount Value
                  </label>
                  <input
                    type="number"
                    name="discountValue"
                    className={`add-discount__form-input ${errors.discountValue ? 'add-discount__form-input--error' : ''}`}
                    placeholder="Enter value"
                    value={formData.discountValue}
                    onChange={handleInputChange}
                    min="0"
                    max={formData.discountType === 'percentage' ? '100' : undefined}
                  />
                  {errors.discountValue && (
                    <span className="add-discount__error">{errors.discountValue}</span>
                  )}
                </div>
                <div className="add-discount__form-group">
                  <label className="add-discount__form-label">
                    <FaRupeeSign className="add-discount__form-icon" />
                    Discount Type
                  </label>
                  <select
                    name="discountType"
                    className="add-discount__form-input"
                    value={formData.discountType}
                    onChange={handleInputChange}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
              </div>
              <div className="add-discount__form-group">
                <label className="add-discount__form-label">
                  <FaTag className="add-discount__form-icon" />
                  Description
                </label>
                <textarea
                  name="description"
                  className={`add-discount__form-textarea ${errors.description ? 'add-discount__form-input--error' : ''}`}
                  placeholder="e.g., Get 20% off on all mobile and laptop screen replacements"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
                {errors.description && (
                  <span className="add-discount__error">{errors.description}</span>
                )}
              </div>
              <div className="add-discount__form-row">
                <div className="add-discount__form-group">
                  <label className="add-discount__form-label">
                    <FaPalette className="add-discount__form-icon" />
                    Background Color
                  </label>
                  <div className="add-discount__color-input-wrapper">
                    <input
                      type="color"
                      name="backgroundColor"
                      className="add-discount__color-input"
                      value={formData.backgroundColor}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      className="add-discount__color-text"
                      value={formData.backgroundColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="add-discount__form-group">
                  <label className="add-discount__form-label">
                    <FaPalette className="add-discount__form-icon" />
                    Text Color
                  </label>
                  <div className="add-discount__color-input-wrapper">
                    <input
                      type="color"
                      name="textColor"
                      className="add-discount__color-input"
                      value={formData.textColor}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      className="add-discount__color-text"
                      value={formData.textColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <div className="add-discount__form-actions">
                <button
                  type="button"
                  className="add-discount__btn add-discount__btn--cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="add-discount__btn add-discount__btn--save"
                >
                  <FaSave className="add-discount__btn-icon" />
                  {isEditing ? 'Update Discount' : 'Add Discount'}
                </button>
              </div>
            </form>
          </div>
          <div className="add-discount__preview-section">
            <h3 className="add-discount__preview-title">Preview</h3>
            <div 
              className="add-discount__preview-card"
              style={{
                backgroundColor: formData.backgroundColor,
                color: formData.textColor
              }}
            >
              <div className="add-discount__preview-header">
                <div className="add-discount__preview-discount">
                  {formData.discountValue ? 
                    (formData.discountType === 'percentage' ? `${formData.discountValue}%` : `₹${formData.discountValue}`) 
                    : '0%'
                  }
                </div>
              </div>
              <div className="add-discount__preview-content">
                <h4 className="add-discount__preview-card-title">
                  {formData.title || 'Discount Title'}
                </h4>
                <p className="add-discount__preview-description">
                  {formData.description || 'Discount description will appear here'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDiscount;