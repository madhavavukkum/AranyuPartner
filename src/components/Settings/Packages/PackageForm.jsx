import React, { useState, useEffect } from 'react';
import {
  FaTag,
  FaCalendarAlt,
  FaPen,
  FaSun,
  FaMoon,
  FaMapMarkerAlt,
  FaSearch,
  FaPlus,
  FaBinoculars,
  FaUtensils,
  FaCampground,
  FaHome,
  FaUser,
  FaChild,
  FaRoute,
  FaTimes,
  FaSave,
  FaArrowLeft,
} from 'react-icons/fa';
import './PackageForm.css';
import { showSuccessToast, showErrorToast, showInfoToast } from '../../../App';

const PackageForm = ({ setShowForm, editPackageId, setEditPackageId }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: '',
    customType: '',
    numberOfDays: 1,
    numberOfNights: 0,
    place: '',
    services: [],
    adultPrice: '',
    childPrice: '',
    tripPrice: '',
    isActive: true,
  });
  const [placeSearch, setPlaceSearch] = useState('');
  const [allPlaces, setAllPlaces] = useState([
    'Araku',
    'Lamasingi',
    'Vanajangi',
    'Maredumilli',
    'Rampa Chodavaram',
    'Paderu',
    'Ananthagiri',
    'Dallapalli',
  ]);
  const [showCustomPlace, setShowCustomPlace] = useState(false);

  useEffect(() => {
    if (editPackageId) {
      const packages = JSON.parse(localStorage.getItem('travelPackages')) || [];
      const pkg = packages.find((p) => p.id === parseInt(editPackageId));
      if (pkg) {
        const isCustom = !['1 day', '2 days', '3 days', '4 days', '5 days'].includes(pkg.type);
        const customTypeMatch = isCustom ? pkg.type.match(/^([^(]+)\s*\(/) : null;
        const daysMatch = isCustom ? pkg.type.match(/(\d+)\s*day/) : null;
        const nightsMatch = isCustom ? pkg.type.match(/(\d+)\s*night/) : null;

        setFormData({
          id: pkg.id,
          name: pkg.name,
          type: isCustom ? 'Custom' : pkg.type,
          customType: isCustom ? (customTypeMatch ? customTypeMatch[1].trim() : '') : '',
          numberOfDays: isCustom ? parseInt(daysMatch?.[1] || 1) : 1,
          numberOfNights: isCustom ? parseInt(nightsMatch?.[1] || 0) : 0,
          place: pkg.place,
          services: pkg.services || [],
          adultPrice: pkg.adultPrice.toString(),
          childPrice: pkg.childPrice.toString(),
          tripPrice: pkg.tripPrice.toString(),
          isActive: pkg.isActive,
        });
      }
    } else {
      setFormData({
        id: '',
        name: '',
        type: '',
        customType: '',
        numberOfDays: 1,
        numberOfNights: 0,
        place: '',
        services: [],
        adultPrice: '',
        childPrice: '',
        tripPrice: '',
        isActive: true,
      });
    }
  }, [editPackageId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(value)
        ? prev.services.filter((s) => s !== value)
        : [...prev.services, value],
    }));
  };

  const handlePlaceSearch = (e) => {
    const searchTerm = e.target.value;
    setPlaceSearch(searchTerm);
    setShowCustomPlace(
      searchTerm &&
      !allPlaces.some((place) => place.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const handleAddCustomPlace = () => {
    if (placeSearch && !allPlaces.includes(placeSearch)) {
      setAllPlaces([...allPlaces, placeSearch]);
      setFormData((prev) => ({
        ...prev,
        place: prev.place ? `${prev.place}, ${placeSearch}` : placeSearch,
      }));
      setPlaceSearch('');
      setShowCustomPlace(false);
    }
  };

  const handlePlaceCheckboxChange = (place) => {
    const places = formData.place.split(', ').filter((p) => p);
    const newPlaces = places.includes(place)
      ? places.filter((p) => p !== place)
      : [...places, place];
    setFormData((prev) => ({ ...prev, place: newPlaces.join(', ') }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.type ||
      !formData.place ||
      !formData.adultPrice ||
      !formData.childPrice ||
      !formData.tripPrice ||
      (formData.type === 'Custom' && (!formData.customType || !formData.numberOfDays))
    ) {
      showErrorToast('Please fill in all required fields.');
      return;
    }

    let typeDisplay = formData.type;
    if (formData.type === 'Custom') {
      typeDisplay = `${formData.customType} (${formData.numberOfDays} day${
        formData.numberOfDays > 1 ? 's' : ''
      }${formData.numberOfNights > 0 ? `, ${formData.numberOfNights} night${formData.numberOfNights > 1 ? 's' : ''}` : ''})`;
    }

    const packageData = {
      id: formData.id || Date.now(),
      name: formData.name,
      type: typeDisplay,
      place: formData.place,
      services: formData.services,
      adultPrice: parseFloat(formData.adultPrice),
      childPrice: parseFloat(formData.childPrice),
      tripPrice: parseFloat(formData.tripPrice),
      isActive: formData.isActive,
    };

    const packages = JSON.parse(localStorage.getItem('travelPackages')) || [];
    if (formData.id) {
      const index = packages.findIndex((p) => p.id === parseInt(formData.id));
      if (index !== -1) {
        packages[index] = packageData;
        showSuccessToast('Package updated successfully!');
      }
    } else {
      packages.push(packageData);
      showSuccessToast('Package created successfully!');
    }
    localStorage.setItem('travelPackages', JSON.stringify(packages));
    setShowForm(false);
    setEditPackageId(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditPackageId(null);
    showInfoToast('Operation cancelled.');
  };

  const filteredPlaces = allPlaces.filter((place) =>
    place.toLowerCase().includes(placeSearch.toLowerCase())
  );

  return (
    <div className="package-form">
      <div className="package-form__container">
        <div className="package-form__header">
          <div className="package-form__header-content">
            <button
              className="package-form__back-btn"
              onClick={handleCancel}
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>
            <div className="package-form__header-text">
              <h1 className="package-form__title">
                {editPackageId ? 'Edit Package' : 'Add Package'}
              </h1>
              <p className="package-form__subtitle">
                {editPackageId ? 'Update package details' : 'Create a new travel package'}
              </p>
            </div>
          </div>
        </div>
        <div className="package-form__content">
          <form onSubmit={handleSave} className="package-form__form">
            <div className="package-form__form-group">
              <label className="package-form__form-label">
                <FaTag className="package-form__form-icon" />
                Package Name
              </label>
              <input
                type="text"
                name="name"
                className="package-form__form-input"
                placeholder="Enter package name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="package-form__form-group">
              <label className="package-form__form-label">
                <FaCalendarAlt className="package-form__form-icon" />
                Package Type
              </label>
              <select
                name="type"
                className="package-form__form-input"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select package type</option>
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
                <option value="4 days">4 days</option>
                <option value="5 days">5 days</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            {formData.type === 'Custom' && (
              <div className="package-form__custom-fields">
                <div className="package-form__form-group">
                  <label className="package-form__form-label">
                    <FaPen className="package-form__form-icon" />
                    Custom Package Name
                  </label>
                  <input
                    type="text"
                    name="customType"
                    className="package-form__form-input"
                    placeholder="e.g. Weekend Getaway"
                    value={formData.customType}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="package-form__form-row">
                  <div className="package-form__form-group">
                    <label className="package-form__form-label">
                      <FaSun className="package-form__form-icon" />
                      Number of Days
                    </label>
                    <input
                      type="number"
                      name="numberOfDays"
                      className="package-form__form-input"
                      min="1"
                      value={formData.numberOfDays}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="package-form__form-group">
                    <label className="package-form__form-label">
                      <FaMoon className="package-form__form-icon" />
                      Number of Nights
                    </label>
                    <input
                      type="number"
                      name="numberOfNights"
                      className="package-form__form-input"
                      min="0"
                      value={formData.numberOfNights}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="package-form__form-group">
              <label className="package-form__form-label">
                <FaMapMarkerAlt className="package-form__form-icon" />
                Places for Trip
              </label>
              <div className="package-form__search-container">
                <FaSearch className="package-form__search-icon" />
                <input
                  type="text"
                  className="package-form__search-input"
                  placeholder="Search or add new place..."
                  value={placeSearch}
                  onChange={handlePlaceSearch}
                />
              </div>
              <div className="package-form__places-container">
                {filteredPlaces.map((place) => (
                  <div className="package-form__place-item" key={place}>
                    <label className="package-form__place-label">
                      <input
                        type="checkbox"
                        className="package-form__place-checkbox"
                        checked={formData.place.split(', ').includes(place)}
                        onChange={() => handlePlaceCheckboxChange(place)}
                      />
                      <span className="package-form__checkbox-custom"></span>
                      <span className="package-form__place-text">{place}</span>
                    </label>
                  </div>
                ))}
              </div>
              {showCustomPlace && (
                <button
                  type="button"
                  className="package-form__add-place-btn"
                  onClick={handleAddCustomPlace}
                >
                  <FaPlus className="package-form__btn-icon" />
                  Add "{placeSearch}" to list
                </button>
              )}
            </div>
            <div className="package-form__form-group">
              <label className="package-form__form-label">Services Provided</label>
              <div className="package-form__services-grid">
                {[
                  { value: 'Local Tours', icon: FaBinoculars, label: 'Local Tours' },
                  { value: 'Food', icon: FaUtensils, label: 'Food' },
                  { value: 'Camping & Fire Setup', icon: FaCampground, label: 'Camping & Fire Setup' },
                  { value: 'Tent Rental', icon: FaHome, label: 'Tent Rental' },
                ].map((service) => (
                  <div className="package-form__service-item" key={service.value}>
                    <label className="package-form__service-label">
                      <input
                        type="checkbox"
                        className="package-form__service-checkbox"
                        checked={formData.services.includes(service.value)}
                        onChange={() => handleCheckboxChange(service.value)}
                      />
                      <span className="package-form__checkbox-custom"></span>
                      <div className="package-form__service-content">
                        <service.icon className="package-form__service-icon" />
                        <span className="package-form__service-text">{service.label}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="package-form__form-row">
              <div className="package-form__form-group">
                <label className="package-form__form-label">
                  <FaUser className="package-form__form-icon" />
                  Price for Adults
                </label>
                <div className="package-form__price-input">
                  <span className="package-form__currency">₹</span>
                  <input
                    type="number"
                    name="adultPrice"
                    className="package-form__form-input"
                    min="0"
                    step="0.01"
                    value={formData.adultPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="package-form__form-group">
                <label className="package-form__form-label">
                  <FaChild className="package-form__form-icon" />
                  Price for Children
                </label>
                <div className="package-form__price-input">
                  <span className="package-form__currency">₹</span>
                  <input
                    type="number"
                    name="childPrice"
                    className="package-form__form-input"
                    min="0"
                    step="0.01"
                    value={formData.childPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="package-form__form-group">
                <label className="package-form__form-label">
                  <FaRoute className="package-form__form-icon" />
                  Price for Trip
                </label>
                <div className="package-form__price-input">
                  <span className="package-form__currency">₹</span>
                  <input
                    type="number"
                    name="tripPrice"
                    className="package-form__form-input"
                    min="0"
                    step="0.01"
                    value={formData.tripPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="package-form__form-actions">
              <button
                type="button"
                className="package-form__btn package-form__btn--cancel"
                onClick={handleCancel}
              >
                <FaTimes className="package-form__btn-icon" />
                Cancel
              </button>
              <button
                type="submit"
                className="package-form__btn package-form__btn--save"
              >
                <FaSave className="package-form__btn-icon" />
                Save Package
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackageForm;