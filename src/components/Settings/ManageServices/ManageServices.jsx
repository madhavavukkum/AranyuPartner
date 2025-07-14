import React, { useState, useEffect, useRef } from 'react';
import { FaUtensils, FaPlane, FaCar, FaBed, FaCampground, FaSave, FaUndo, FaConciergeBell } from 'react-icons/fa';
import './ManageServices.css';
import { showSuccessToast, showErrorToast } from '../../../App';

const ManageServices = () => {
  const defaultServices = {
    Food: true,
    Travel: true,
    Vehicle: true,
    Room: true,
    'Camping Tent': true,
  };

  const [services, setServices] = useState(defaultServices);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const hasLoadedToast = useRef(false);

  useEffect(() => {
    const loadServicesFromStorage = () => {
      try {
        const savedServices = localStorage.getItem('manageServices');
        if (savedServices) {
          const parsedServices = JSON.parse(savedServices);
          setServices(parsedServices);
          if (!hasLoadedToast.current) {
            hasLoadedToast.current = true;
            showSuccessToast('Services loaded from saved data');
          }
        } else {
          saveServicesToStorage(defaultServices);
        }
      } catch (error) {
        console.error('Error loading services from localStorage:', error);
        if (!hasLoadedToast.current) {
          hasLoadedToast.current = true;
          showErrorToast('Failed to load services. Using defaults.');
          saveServicesToStorage(defaultServices);
        }
      }
    };

    loadServicesFromStorage();
  }, []);

  const saveServicesToStorage = (servicesToSave) => {
    try {
      localStorage.setItem('manageServices', JSON.stringify(servicesToSave));
      return true;
    } catch (error) {
      console.error('Error saving services to localStorage:', error);
      showErrorToast('Failed to save services to localStorage.');
      return false;
    }
  };

  const serviceIcons = {
    Food: <FaUtensils className="manage-services__service-icon" />,
    Travel: <FaPlane className="manage-services__service-icon" />,
    Vehicle: <FaCar className="manage-services__service-icon" />,
    Room: <FaBed className="manage-services__service-icon" />,
    'Camping Tent': <FaCampground className="manage-services__service-icon" />,
  };

  const handleCheckboxChange = (service) => {
    const updatedServices = {
      ...services,
      [service]: !services[service],
    };

    setServices(updatedServices);

    if (saveServicesToStorage(updatedServices)) {
      showSuccessToast(`${service} service ${updatedServices[service] ? 'enabled' : 'disabled'}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (saveServicesToStorage(services)) {
        const enabledCount = Object.values(services).filter(Boolean).length;
        const totalCount = Object.keys(services).length;
        showSuccessToast(`Services updated successfully! ${enabledCount}/${totalCount} services enabled`);
      } else {
        throw new Error('Failed to save to localStorage');
      }
    } catch (error) {
      console.error('Error updating services:', error);
      showErrorToast('Failed to update services. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setServices(defaultServices);
    saveServicesToStorage(defaultServices);
    showSuccessToast('Services reset to default');
    setShowResetConfirm(false);
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  const getServiceStats = () => {
    const enabled = Object.values(services).filter(Boolean).length;
    const total = Object.keys(services).length;
    return { enabled, total };
  };

  const { enabled, total } = getServiceStats();

  return (
    <div className="manage-services">
      {showResetConfirm && (
        <div className="manage-services__confirm-overlay">
          <div className="manage-services__confirm-modal">
            <p className="manage-services__confirm-text">Reset all services to default?</p>
            <div className="manage-services__confirm-buttons">
              <button
                onClick={confirmReset}
                className="manage-services__confirm-btn manage-services__confirm-btn--reset"
              >
                Reset
              </button>
              <button
                onClick={cancelReset}
                className="manage-services__confirm-btn manage-services__confirm-btn--cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="manage-services__container">
        <div className="manage-services__header">
          <div className="manage-services__header-content">
            <div className="manage-services__header-icon-text">
              <div className="manage-services__header-icon">
                <FaConciergeBell />
              </div>
              <div className="manage-services__header-text">
                <h1 className="manage-services__title">Manage Services</h1>
                <p className="manage-services__subtitle">Enable or disable services for your business</p>
              </div>
            </div>
            <div className="manage-services__stats">
              <span className="manage-services__stats-badge">
                {enabled} / {total} services enabled
              </span>
            </div>
          </div>
        </div>
        <form onSubmit={handleUpdate} className="manage-services__form">
          <div className="manage-services__services-list">
            {Object.keys(services).map((service) => (
              <div key={service} className="manage-services__service-item">
                <label className="manage-services__service-label">
                  <input
                    type="checkbox"
                    className="manage-services__service-checkbox"
                    checked={services[service]}
                    onChange={() => handleCheckboxChange(service)}
                  />
                  <span className="manage-services__checkbox-custom"></span>
                  <div className="manage-services__service-content">
                    <div className="manage-services__service-icon-wrapper">
                      {serviceIcons[service]}
                    </div>
                    <div className="manage-services__service-info">
                      <span className="manage-services__service-text">{service}</span>
                      <span className="manage-services__service-status">
                        {services[service] ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className="manage-services__actions">
            <button
              type="button"
              onClick={handleReset}
              className="manage-services__reset-btn"
            >
              <FaUndo className="manage-services__btn-icon" />
              Reset to Default
            </button>
            <button
              type="submit"
              className="manage-services__update-btn"
              disabled={isLoading}
            >
              <FaSave className="manage-services__btn-icon" />
              {isLoading ? 'Updating...' : 'Update Services'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageServices;