import React, { useState, useEffect, useRef } from 'react';
import { FaUtensils, FaPlane, FaCar, FaBed, FaCampground, FaSave } from 'react-icons/fa';
import './ManageCategory.css';
import { showSuccessToast, showErrorToast } from '../../../App';

const ManageCategory = () => {
  const defaultCategories = {
    Food: {
      'Traditional Bamboo Foods': true,
      'South Indian Foods': false,
    },
    Travel: {
      Travel: false,
      Fashion: true,
    },
    Vehicle: {
      'Tempo Traveler': true,
      'Commander Jeeps': false,
      'Mahindra Bolero': false,
    },
    Room: {
      'Single Room': true,
      'Couple Room': true,
      'Family Room': true,
    },
    'Camping Tent': {
      '2 Persons': true,
      '3 Persons': true,
      '5 Persons': true,
    },
  };

  const [categories, setCategories] = useState(defaultCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const hasLoadedToast = useRef(false);

  useEffect(() => {
    const loadCategoriesFromStorage = () => {
      try {
        const savedCategories = localStorage.getItem('manageCategories');
        if (savedCategories && !hasLoadedToast.current) {
          const parsedCategories = JSON.parse(savedCategories);
          setCategories(parsedCategories);
          hasLoadedToast.current = true;
          showSuccessToast('Categories loaded from saved data');
        }
      } catch (error) {
        console.error('Error loading categories from localStorage:', error);
        if (!hasLoadedToast.current) {
          hasLoadedToast.current = true;
          showErrorToast('Failed to load saved categories');
        }
      }
    };

    loadCategoriesFromStorage();
  }, []);

  const categoryIcons = {
    Food: <FaUtensils className="manage-category__category-icon" />,
    Travel: <FaPlane className="manage-category__category-icon" />,
    Vehicle: <FaCar className="manage-category__category-icon" />,
    Room: <FaBed className="manage-category__category-icon" />,
    'Camping Tent': <FaCampground className="manage-category__category-icon" />,
  };

  const saveCategoriesToStorage = (categoriesToSave) => {
    try {
      localStorage.setItem('manageCategories', JSON.stringify(categoriesToSave));
      return true;
    } catch (error) {
      console.error('Error saving categories to localStorage:', error);
      return false;
    }
  };

  const handleCheckboxChange = (category, subCategory) => {
    const updatedCategories = {
      ...categories,
      [category]: {
        ...categories[category],
        [subCategory]: !categories[category][subCategory],
      },
    };

    setCategories(updatedCategories);

    if (saveCategoriesToStorage(updatedCategories)) {
      showSuccessToast(`${subCategory} ${updatedCategories[category][subCategory] ? 'enabled' : 'disabled'}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const saveSuccess = saveCategoriesToStorage(categories);

      if (saveSuccess) {
        const enabledCount = Object.values(categories).reduce((total, categoryObj) => {
          return total + Object.values(categoryObj).filter(Boolean).length;
        }, 0);

        showSuccessToast(`Categories updated successfully! ${enabledCount} services enabled`);
      } else {
        throw new Error('Failed to save to localStorage');
      }
    } catch (error) {
      console.error('Error updating categories:', error);
      showErrorToast('Failed to update categories. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setCategories(defaultCategories);
    saveCategoriesToStorage(defaultCategories);
    showSuccessToast('Categories reset to default');
    setShowResetConfirm(false);
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  return (
    <div className="manage-category">
      {showResetConfirm && (
        <div className="manage-category__confirm-overlay">
          <div className="manage-category__confirm-modal">
            <p className="manage-category__confirm-text">Reset all categories to default?</p>
            <div className="manage-category__confirm-buttons">
              <button
                onClick={confirmReset}
                className="manage-category__confirm-btn manage-category__confirm-btn--reset"
              >
                Reset
              </button>
              <button
                onClick={cancelReset}
                className="manage-category__confirm-btn manage-category__confirm-btn--cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="manage-category__container">
        <div className="manage-category__header">
          <div className="manage-category__header-content">
            <h1 className="manage-category__title">Manage Category</h1>
            <p className="manage-category__subtitle">Configure your service categories and subcategories</p>
          </div>
        </div>
        <form onSubmit={handleUpdate} className="manage-category__form">
          <div className="manage-category__categories-list">
            {Object.keys(categories).map((category) => (
              <div key={category} className="manage-category__category-section">
                <div className="manage-category__category-header">
                  <div className="manage-category__category-icon-wrapper">
                    {categoryIcons[category]}
                  </div>
                  <h3 className="manage-category__category-name">{category}</h3>
                  <div className="manage-category__category-stats">
                    <span className="manage-category__enabled-count">
                      {Object.values(categories[category]).filter(Boolean).length} / {Object.keys(categories[category]).length} enabled
                    </span>
                  </div>
                </div>
                <div className="manage-category__subcategory-list">
                  {Object.keys(categories[category]).map((subCategory) => (
                    <div key={subCategory} className="manage-category__category-item">
                      <label className="manage-category__category-label">
                        <input
                          type="checkbox"
                          className="manage-category__category-checkbox"
                          checked={categories[category][subCategory]}
                          onChange={() => handleCheckboxChange(category, subCategory)}
                        />
                        <span className="manage-category__checkbox-custom"></span>
                        <span className="manage-category__category-text">{subCategory}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="manage-category__actions">
            <button
              type="button"
              onClick={handleReset}
              className="manage-category__reset-btn"
            >
              Reset to Default
            </button>
            <button
              type="submit"
              className="manage-category__update-btn"
              disabled={isLoading}
            >
              <FaSave className="manage-category__btn-icon" />
              {isLoading ? 'Updating...' : 'Update Categories'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageCategory;