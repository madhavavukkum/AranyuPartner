import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaGift } from 'react-icons/fa';
import ConfirmationModal from './ConfirmationModal';
import './OffersManager.css';
import { showSuccessToast,showInfoToast, showErrorToast } from '../../App.jsx';

const OffersManager = () => {
  const [offers, setOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  useEffect(() => {
    const savedOffers = localStorage.getItem('offers');
    if (savedOffers) {
      setOffers(JSON.parse(savedOffers));
    } else {
      showInfoToast('No offers found. Create your first discount offer!');
    }
  }, []);

  const toggleOfferStatus = (id) => {
    const updatedOffers = offers.map(offer =>
      offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
    );
    setOffers(updatedOffers);
    localStorage.setItem('offers', JSON.stringify(updatedOffers));
    showSuccessToast(`Offer ${updatedOffers.find(o => o.id === id).isActive ? 'activated' : 'deactivated'} successfully!`);
  };

  const handleDeleteOffer = (id) => {
    const offer = offers.find(offer => offer.id === id);
    setModalMessage(`Are you sure you want to delete the offer "${offer.title}"? This action cannot be undone.`);
    setSelectedOfferId(id);
    setIsModalOpen(true);
  };

  const deleteOffer = (id) => {
    const updatedOffers = offers.filter(offer => offer.id !== id);
    setOffers(updatedOffers);
    localStorage.setItem('offers', JSON.stringify(updatedOffers));
    showSuccessToast('Offer deleted successfully!');
    setIsModalOpen(false);
    setSelectedOfferId(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOfferId(null);
  };

  return (
    <div className="offers-manager">
      <ConfirmationModal
        isOpen={isModalOpen}
        message={modalMessage}
        onConfirm={() => deleteOffer(selectedOfferId)}
        onCancel={handleModalClose}
      />
      <div className="offers-manager__container">
        <div className="offers-manager__header">
          <div className="offers-manager__header-content">
            <div className="offers-manager__header-icon">
              <FaGift />
            </div>
            <div className="offers-manager__header-text">
              <h1 className="offers-manager__title">My Offers</h1>
              <p className="offers-manager__subtitle">Manage your discount offers and promotions</p>
            </div>
          </div>
        </div>
        <div className="offers-manager__content">
          {offers.length === 0 ? (
            <div className="offers-manager__empty-state">
              <div className="offers-manager__empty-icon">
                <FaGift />
              </div>
              <h2 className="offers-manager__empty-title">Hi Provider! You are now ready.</h2>
              <p className="offers-manager__empty-description">
                You are all set to create your first discount offer. Start attracting more customers with exciting deals!
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link
                  to="/offers/add"
                  className="offers-manager__add-btn offers-manager__add-btn--primary"
                >
                  <FaPlus className="offers-manager__btn-icon" />
                  Add Discounts
                </Link>
              </div>
            </div>
          ) : (
            <div className="offers-manager__offers-section">
              <div className="offers-manager__section-header">
                <div className="offers-manager__section-header-content">
                  <div className="offers-manager__section-header-icon">
                    <FaGift />
                  </div>
                  <h2 className="offers-manager__section-title">Your Active Offers</h2>
                </div>
                <Link to="/offers/add" className="offers-manager__add-btn offers-manager__add-btn--secondary">
                  <FaPlus className="offers-manager__btn-icon" />
                  Add Discounts
                </Link>
              </div>
              <div className="offers-manager__offers-grid">
                {offers.map((offer) => (
                  <div 
                    key={offer.id} 
                    className="offers-manager__offer-card"
                    style={{
                      backgroundColor: offer.backgroundColor || '#ffffff',
                      color: offer.textColor || '#000000'
                    }}
                  >
                    <div className="offers-manager__offer-header">
                      <div className="offers-manager__offer-discount">
                        {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `₹${offer.discountValue}`}
                      </div>
                      <div className="offers-manager__offer-actions">
                        <label className="offers-manager__status-toggle">
                          <input
                            type="checkbox"
                            checked={offer.isActive}
                            onChange={() => toggleOfferStatus(offer.id)}
                            aria-label={offer.isActive ? 'Deactivate offer' : 'Activate offer'}
                          />
                          <span className="offers-manager__toggle-slider"></span>
                        </label>
                        <Link
                          to={`/offers/edit/${offer.id}`}
                          className="offers-manager__action-btn offers-manager__action-btn--edit"
                          title="Edit offer"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          className="offers-manager__action-btn offers-manager__action-btn--delete"
                          onClick={() => handleDeleteOffer(offer.id)}
                          title="Delete offer"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="offers-manager__offer-content">
                      <h3 className="offers-manager__offer-title">{offer.title}</h3>
                      <p className="offers-manager__offer-description">{offer.description}</p>
                      <div className="offers-manager__offer-status">
                        <span className={`offers-manager__status-badge ${offer.isActive ? 'offers-manager__status-badge--active' : 'offers-manager__status-badge--inactive'}`}>
                          {offer.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OffersManager;