import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaBoxOpen, FaPlus, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PackagesDeleteModal from './PackagesDeleteModal';
import './Packages.css';

const PackageCard = ({ pkg, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="packages__package-card">
      <div className="packages__package-content">
        <div className="packages__package-info">
          <h4 className="packages__package-title">{pkg.name}</h4>
          <div className="packages__package-meta">
            <span className="packages__duration-tag">
              <FaClock className="packages__duration-icon" />
              {pkg.type}
            </span>
          </div>
          <p className="packages__package-route">{pkg.place}</p>
          <p className="packages__package-price">
            ₹{pkg.tripPrice.toFixed(2)} per trip
          </p>
        </div>
        <div className="packages__package-actions">
          <label className="packages__status-toggle">
            <input
              type="checkbox"
              checked={pkg.isActive}
              onChange={() => onToggleStatus(pkg.id, !pkg.isActive)}
            />
            <span className="packages__toggle-slider"></span>
          </label>
          <button
            className="packages__action-btn packages__action-btn--edit"
            onClick={() => onEdit(pkg.id)}
            aria-label="Edit package"
          >
            <FaEdit />
          </button>
          <button
            className="packages__action-btn packages__action-btn--delete"
            onClick={() => onDelete(pkg.id, pkg.name)}
            aria-label="Delete package"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ onAddNew }) => {
  return (
    <div className="packages__empty-state">
      <div className="packages__empty-icon">
        <FaBoxOpen />
      </div>
      <h3 className="packages__empty-title">No Packages</h3>
      <p className="packages__empty-description">You haven't created any packages yet.</p>
      <button className="packages__add-btn" onClick={onAddNew}>
        <FaPlus className="packages__btn-icon" />
        Add New Package
      </button>
    </div>
  );
};

const Packages = ({ setShowForm, setEditPackageId }) => {
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('travelPackages')) {
      const initialPackage = {
        id: Date.now(),
        name: "Monsoons surprise",
        type: "Five days",
        place: "Paderu ➝ Paderu",
        services: ["Local Tours", "Food", "Camping & Fire Setup"],
        adultPrice: 2000,
        childPrice: 1500,
        tripPrice: 4500,
        isActive: true,
      };
      localStorage.setItem('travelPackages', JSON.stringify([initialPackage]));
    }
    loadPackages();
  }, []);

  const loadPackages = () => {
    const storedPackages = JSON.parse(localStorage.getItem('travelPackages')) || [];
    setPackages(storedPackages);
  };

  const handleAddNew = () => {
    setEditPackageId(null);
    setShowForm(true);
  };

  const handleEdit = (packageId) => {
    setEditPackageId(packageId);
    setShowForm(true);
  };

  const handleToggleStatus = (packageId, isActive) => {
    const updatedPackages = packages.map((p) =>
      p.id === packageId ? { ...p, isActive } : p
    );
    localStorage.setItem('travelPackages', JSON.stringify(updatedPackages));
    setPackages(updatedPackages);
    toast.success(`Package ${isActive ? 'activated' : 'deactivated'} successfully!`);
  };

  const handleDelete = (packageId, packageName) => {
    setPackageToDelete({ id: packageId, name: packageName });
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (packageToDelete) {
      const updatedPackages = packages.filter((p) => p.id !== packageToDelete.id);
      localStorage.setItem('travelPackages', JSON.stringify(updatedPackages));
      setPackages(updatedPackages);
      toast.success(`Package "${packageToDelete.name}" deleted successfully!`);
    }
    setIsModalOpen(false);
    setPackageToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPackageToDelete(null);
  };

  return (
    <div className="packages">
      <div className="packages__container">
        <div className="packages__header">
          <div className="packages__header-content">
            <h1 className="packages__title">Packages</h1>
            <p className="packages__subtitle">Manage your travel packages and offerings</p>
          </div>
        </div>
        <div className="packages__content">
          {packages.length > 0 ? (
            <>
              <div className="packages__content-header">
                <h3 className="packages__content-title">Your Packages</h3>
                <button className="packages__add-btn" onClick={handleAddNew}>
                  <FaPlus className="packages__btn-icon" />
                  Add New Package
                </button>
              </div>
              <div className="packages__list">
                {packages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyState onAddNew={handleAddNew} />
          )}
        </div>
      </div>
      <PackagesDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        packageName={packageToDelete?.name || ''}
      />
    </div>
  );
};

export default Packages;