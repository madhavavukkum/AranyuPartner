import React, { useState, useRef, useEffect } from 'react';
import {
  FaEdit,
  FaCamera,
  FaStore,
  FaSign,
  FaTags,
  FaUser,
  FaIdCard,
  FaTimes,
  FaCheck,
  FaAddressBook,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaRoad,
  FaLandmark,
  FaCity,
  FaGlobe,
  FaFlag,
  FaCode,
  FaClock,
  FaCalendar,
  FaDoorOpen,
  FaDoorClosed,
  FaImages,
  FaPlus,
  FaTrash,
} from 'react-icons/fa';
import { shopData } from '../../../data/shopData';
import './ShopDetails.css';
import { showSuccessToast, showInfoToast } from '../../../App';

const ShopDetails = () => {
  const [bannerImage, setBannerImage] = useState(() => {
    try {
      return localStorage.getItem('shopBannerImage') || shopData.bannerImage;
    } catch {
      return shopData.bannerImage;
    }
  });
  const [profileImage, setProfileImage] = useState(() => {
    try {
      return localStorage.getItem('shopProfileImage') || shopData.profileImage;
    } catch {
      return shopData.profileImage;
    }
  });
  const [businessDetails, setBusinessDetails] = useState(() => {
    try {
      const saved = localStorage.getItem('shopBusinessDetails');
      return saved ? JSON.parse(saved) : shopData.businessDetails;
    } catch {
      return shopData.businessDetails;
    }
  });
  const [contactDetails, setContactDetails] = useState(() => {
    try {
      const saved = localStorage.getItem('shopContactDetails');
      return saved ? JSON.parse(saved) : shopData.contactDetails;
    } catch {
      return shopData.contactDetails;
    }
  });
  const [locationDetails, setLocationDetails] = useState(() => {
    try {
      const saved = localStorage.getItem('shopLocationDetails');
      return saved ? JSON.parse(saved) : shopData.locationDetails;
    } catch {
      return shopData.locationDetails;
    }
  });
  const [availabilityDetails, setAvailabilityDetails] = useState(() => {
    try {
      const saved = localStorage.getItem('shopAvailabilityDetails');
      return saved ? JSON.parse(saved) : shopData.availabilityDetails;
    } catch {
      return shopData.availabilityDetails;
    }
  });
  const [shopPhotos, setShopPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('shopPhotos');
      return saved ? JSON.parse(saved) : shopData.shopPhotos;
    } catch {
      return shopData.shopPhotos;
    }
  });
  const [cataloguePhotos, setCataloguePhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('shopCataloguePhotos');
      return saved ? JSON.parse(saved) : shopData.cataloguePhotos;
    } catch {
      return shopData.cataloguePhotos;
    }
  });
  const [editMode, setEditMode] = useState({
    business: false,
    contact: false,
    location: false,
    availability: false,
  });
  const [tempDetails, setTempDetails] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({ open: false, index: null, type: '' });

  const bannerInputRef = useRef(null);
  const profileInputRef = useRef(null);
  const shopPhotoInputRef = useRef(null);
  const cataloguePhotoInputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('shopBannerImage', bannerImage);
      localStorage.setItem('shopProfileImage', profileImage);
      localStorage.setItem('shopBusinessDetails', JSON.stringify(businessDetails));
      localStorage.setItem('shopContactDetails', JSON.stringify(contactDetails));
      localStorage.setItem('shopLocationDetails', JSON.stringify(locationDetails));
      localStorage.setItem('shopAvailabilityDetails', JSON.stringify(availabilityDetails));
      localStorage.setItem('shopPhotos', JSON.stringify(shopPhotos));
      localStorage.setItem('shopCataloguePhotos', JSON.stringify(cataloguePhotos));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [bannerImage, profileImage, businessDetails, contactDetails, locationDetails, availabilityDetails, shopPhotos, cataloguePhotos]);

  const editBannerImage = () => {
    bannerInputRef.current?.click();
  };

  const editProfileImage = () => {
    profileInputRef.current?.click();
  };

  const updateBanner = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBannerImage(event.target.result);
          showSuccessToast('Banner image updated successfully!');
        }
      };
      reader.onerror = () => {
        showInfoToast('Error uploading banner image');
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateProfile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result);
          showSuccessToast('Profile image updated successfully!');
        }
      };
      reader.onerror = () => {
        showInfoToast('Error uploading profile image');
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const addShopPhoto = () => {
    shopPhotoInputRef.current?.click();
  };

  const addCataloguePhoto = () => {
    cataloguePhotoInputRef.current?.click();
  };

  const handleShopPhotoUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setShopPhotos((prev) => [...prev, event.target.result]);
            showSuccessToast('Shop photo added successfully!');
          }
        };
        reader.onerror = () => {
          showInfoToast('Error uploading shop photo');
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCataloguePhotoUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setCataloguePhotos((prev) => [...prev, event.target.result]);
            showSuccessToast('Catalogue photo added successfully!');
          }
        };
        reader.onerror = () => {
          showInfoToast('Error uploading catalogue photo');
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const confirmRemovePhoto = (index, type) => {
    setShowDeleteConfirm({ open: true, index, type });
  };

  const handleRemovePhoto = () => {
    const { index, type } = showDeleteConfirm;
    if (type === 'shop') {
      setShopPhotos((prev) => prev.filter((_, i) => i !== index));
      showSuccessToast('Shop photo removed successfully!');
    } else if (type === 'catalogue') {
      setCataloguePhotos((prev) => prev.filter((_, i) => i !== index));
      showSuccessToast('Catalogue photo removed successfully!');
    }
    setShowDeleteConfirm({ open: false, index: null, type: '' });
  };

  const cancelRemovePhoto = () => {
    setShowDeleteConfirm({ open: false, index: null, type: '' });
  };

  const toggleEdit = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: true }));
    setTempDetails({
      business: { ...businessDetails },
      contact: { ...contactDetails },
      location: { ...locationDetails },
      availability: { ...availabilityDetails },
    });
  };

  const saveEdit = (section) => {
    if (section === 'business' && tempDetails.business) {
      setBusinessDetails(tempDetails.business);
    }
    if (section === 'contact' && tempDetails.contact) {
      setContactDetails(tempDetails.contact);
    }
    if (section === 'location' && tempDetails.location) {
      setLocationDetails(tempDetails.location);
    }
    if (section === 'availability' && tempDetails.availability) {
      setAvailabilityDetails(tempDetails.availability);
    }
    setEditMode((prev) => ({ ...prev, [section]: false }));
    setTempDetails({});
    showSuccessToast(`${section.charAt(0).toUpperCase() + section.slice(1)} details saved successfully!`);
  };

  const cancelEdit = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: false }));
    setTempDetails({});
    showInfoToast('Changes discarded');
  };

  const handleInputChange = (section, field, value) => {
    setTempDetails((prev) => ({
      ...prev,
      [section]: { ...prev[section] || {}, [field]: value },
    }));
  };

  return (
    <div className="shop-details">
      {showDeleteConfirm.open && (
        <div className="shop-details__confirm-overlay">
          <div className="shop-details__confirm-modal">
            <p className="shop-details__confirm-text">Are you sure you want to remove this photo?</p>
            <div className="shop-details__confirm-buttons">
              <button
                onClick={handleRemovePhoto}
                className="shop-details__confirm-btn shop-details__confirm-btn--delete"
              >
                Remove
              </button>
              <button
                onClick={cancelRemovePhoto}
                className="shop-details__confirm-btn shop-details__confirm-btn--cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="shop-details__container">
        <div className="shop-details__header">
          <div className="shop-details__header-content">
            <div className="shop-details__header-icon">
              <FaStore />
            </div>
            <div className="shop-details__header-text">
              <h1 className="shop-details__title">Shop Details</h1>
              <p className="shop-details__subtitle">Manage your shop information</p>
            </div>
          </div>
        </div>

        <div className="shop-details__banner">
          <img src={bannerImage} alt="Banner" className="shop-details__banner-image" />
          <div className="shop-details__banner-overlay">
            <button className="shop-details__banner-edit" onClick={editBannerImage}>
              <FaEdit className="shop-details__banner-edit-icon" />
              Edit Banner
            </button>
          </div>
          <input
            type="file"
            ref={bannerInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={updateBanner}
          />
        </div>

        <div className="shop-details__profile">
          <div className="shop-details__profile-wrapper">
            <img src={profileImage} alt="Profile" className="shop-details__profile-image" />
            <button className="shop-details__profile-edit" onClick={editProfileImage}>
              <FaCamera className="shop-details__profile-edit-icon" />
            </button>
          </div>
          <input
            type="file"
            ref={profileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={updateProfile}
          />
        </div>

        <div className="shop-details__section">
          <div className="shop-details__section-header">
            <div className="shop-details__section-title-wrapper">
              <div className="shop-details__section-icon-wrapper shop-details__section-icon-wrapper--business">
                <FaEdit className="shop-details__section-icon" />
              </div>
              <div className="shop-details__section-title-content">
                <h2 className="shop-details__section-title">Business Details</h2>
                <p className="shop-details__section-subtitle">Manage your business information</p>
              </div>
            </div>
            <div className="shop-details__button-container">
              {!editMode.business ? (
                <button
                  className="shop-details__edit-btn"
                  onClick={() => toggleEdit('business')}
                >
                  <FaEdit className="shop-details__edit-btn-icon" />
                  <span className="shop-details__edit-text">Edit</span>
                </button>
              ) : (
                <div className="shop-details__edit-actions">
                  <button
                    className="shop-details__action-btn shop-details__action-btn--save"
                    onClick={() => saveEdit('business')}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="shop-details__action-btn shop-details__action-btn--cancel"
                    onClick={() => cancelEdit('business')}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="shop-details__section-body">
            <div className="shop-details__field-grid">
              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaSign className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Business Name</label>
                    {!editMode.business ? (
                      <p className="shop-details__field-value">{businessDetails.businessName || ''}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.business?.businessName || businessDetails.businessName || ''}
                        onChange={(e) => handleInputChange('business', 'businessName', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaTags className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Business Type</label>
                    {!editMode.business ? (
                      <p className="shop-details__field-value">{businessDetails.businessType || ''}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.business?.businessType || businessDetails.businessType || ''}
                        onChange={(e) => handleInputChange('business', 'businessType', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaUser className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Owner's Name</label>
                    {!editMode.business ? (
                      <p className="shop-details__field-value">{businessDetails.ownerName || ''}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.business?.ownerName || businessDetails.ownerName || ''}
                        onChange={(e) => handleInputChange('business', 'ownerName', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaIdCard className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">GST Number</label>
                    {!editMode.business ? (
                      <p className="shop-details__field-value">{businessDetails.gstNumber || ''}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.business?.gstNumber || businessDetails.gstNumber || ''}
                        onChange={(e) => handleInputChange('business', 'gstNumber', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shop-details__section">
          <div className="shop-details__section-header">
            <div className="shop-details__section-title-wrapper">
              <div className="shop-details__section-icon-wrapper shop-details__section-icon-wrapper--contact">
                <FaAddressBook className="shop-details__section-icon" />
              </div>
              <div className="shop-details__section-title-content">
                <h2 className="shop-details__section-title">Contact Details</h2>
                <p className="shop-details__section-subtitle">Manage your contact information</p>
              </div>
            </div>
            <div className="shop-details__button-container">
              {!editMode.contact ? (
                <button
                  className="shop-details__edit-btn"
                  onClick={() => toggleEdit('contact')}
                >
                  <FaEdit className="shop-details__edit-btn-icon" />
                  <span className="shop-details__edit-text">Edit</span>
                </button>
              ) : (
                <div className="shop-details__edit-actions">
                  <button
                    className="shop-details__action-btn shop-details__action-btn--save"
                    onClick={() => saveEdit('contact')}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="shop-details__action-btn shop-details__action-btn--cancel"
                    onClick={() => cancelEdit('contact')}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="shop-details__section-body">
            <div className="shop-details__field-grid">
              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaPhone className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Mobile Number</label>
                    {!editMode.contact ? (
                      <p className="shop-details__field-value">{contactDetails.mobileNumber || ''}</p>
                    ) : (
                      <input
                        type="tel"
                        className="shop-details__field-input"
                        value={tempDetails.contact?.mobileNumber || contactDetails.mobileNumber || ''}
                        onChange={(e) => handleInputChange('contact', 'mobileNumber', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaEnvelope className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Email (optional)</label>
                    {!editMode.contact ? (
                      <p className="shop-details__field-value">{contactDetails.email || ''}</p>
                    ) : (
                      <input
                        type="email"
                        className="shop-details__field-input"
                        value={tempDetails.contact?.email || contactDetails.email || ''}
                        onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaWhatsapp className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">WhatsApp (optional)</label>
                    {!editMode.contact ? (
                      <p className="shop-details__field-value">{contactDetails.whatsapp || ''}</p>
                    ) : (
                      <input
                        type="tel"
                        className="shop-details__field-input"
                        value={tempDetails.contact?.whatsapp || contactDetails.whatsapp || ''}
                        onChange={(e) => handleInputChange('contact', 'whatsapp', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shop-details__section">
          <div className="shop-details__section-header">
            <div className="shop-details__section-title-wrapper">
              <div className="shop-details__section-icon-wrapper shop-details__section-icon-wrapper--location">
                <FaMapMarkerAlt className="shop-details__section-icon" />
              </div>
              <div className="shop-details__section-title-content">
                <h2 className="shop-details__section-title">Location Details</h2>
                <p className="shop-details__section-subtitle">Manage your location information</p>
              </div>
            </div>
            <div className="shop-details__button-container">
              {!editMode.location ? (
                <button
                  className="shop-details__edit-btn"
                  onClick={() => toggleEdit('location')}
                >
                  <FaEdit className="shop-details__edit-btn-icon" />
                  <span className="shop-details__edit-text">Edit</span>
                </button>
              ) : (
                <div className="shop-details__edit-actions">
                  <button
                    className="shop-details__action-btn shop-details__action-btn--save"
                    onClick={() => saveEdit('location')}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="shop-details__action-btn shop-details__action-btn--cancel"
                    onClick={() => cancelEdit('location')}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="shop-details__section-body">
            <div className="shop-details__field-grid">
              <div className="shop-details__field shop-details__field--full">
                <div className="shop-details__field-content">
                  <FaRoad className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Address</label>
                    {!editMode.location ? (
                      <p className="shop-details__field-value">{locationDetails.address || ''}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.location?.address || locationDetails.address || ''}
                        onChange={(e) => handleInputChange('location', 'address', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaLandmark className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Landmark</label>
                    {!editMode.location ? (
                      <p className="shop-details__field-value">{locationDetails.landmark || ''}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.location?.landmark || locationDetails.landmark || ''}
                        onChange={(e) => handleInputChange('location', 'landmark', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaCity className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">City</label>
                    {!editMode.location ? (
                      <p className="shop-details__field-value">{locationDetails.city || ''}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.location?.city || locationDetails.city || ''}
                        onChange={(e) => handleInputChange('location', 'city', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaGlobe className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">State</label>
                    {!editMode.location ? (
                      <p className="shop-details__field-value">{locationDetails.state || ''}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.location?.state || locationDetails.state || ''}
                        onChange={(e) => handleInputChange('location', 'state', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaFlag className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Country</label>
                    {!editMode.location ? (
                      <p className="shop-details__field-value">{locationDetails.country || ''}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.location?.country || locationDetails.country || ''}
                        onChange={(e) => handleInputChange('location', 'country', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaCode className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Pincode</label>
                    {!editMode.location ? (
                      <p className="shop-details__field-value">{locationDetails.pincode || ''}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.location?.pincode || locationDetails.pincode || ''}
                        onChange={(e) => handleInputChange('location', 'pincode', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shop-details__section">
          <div className="shop-details__section-header">
            <div className="shop-details__section-title-wrapper">
              <div className="shop-details__section-icon-wrapper shop-details__section-icon-wrapper--availability">
                <FaClock className="shop-details__section-icon" />
              </div>
              <div className="shop-details__section-title-content">
                <h2 className="shop-details__section-title">Availability Details</h2>
                <p className="shop-details__section-subtitle">Manage your availability information</p>
              </div>
            </div>
            <div className="shop-details__button-container">
              {!editMode.availability ? (
                <button
                  className="shop-details__edit-btn"
                  onClick={() => toggleEdit('availability')}
                >
                  <FaEdit className="shop-details__edit-btn-icon" />
                  <span className="shop-details__edit-text">Edit</span>
                </button>
              ) : (
                <div className="shop-details__edit-actions">
                  <button
                    className="shop-details__action-btn shop-details__action-btn--save"
                    onClick={() => saveEdit('availability')}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="shop-details__action-btn shop-details__action-btn--cancel"
                    onClick={() => cancelEdit('availability')}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="shop-details__section-body">
            <div className="shop-details__field-grid">
              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaCalendar className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Seasonal Availability</label>
                    {!editMode.availability ? (
                      <p className="shop-details__field-value">{availabilityDetails.seasonalAvailability || ''}</p>
                    ) : (
                      <select
                        className="shop-details__field-input"
                        value={tempDetails.availability?.seasonalAvailability || availabilityDetails.seasonalAvailability || ''}
                        onChange={(e) => handleInputChange('availability', 'seasonalAvailability', e.target.value)}
                      >
                        <option value="All Year">All Year</option>
                        <option value="Summer Only">Summer Only</option>
                        <option value="Winter Only">Winter Only</option>
                        <option value="Rainy Only">Rainy Only</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>

              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaDoorOpen className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Opening Time</label>
                    {!editMode.availability ? (
                      <p className="shop-details__field-value">{availabilityDetails.openingTime || ''}</p>
                    ) : (
                      <input
                        type="time"
                        className="shop-details__field-input"
                        value={tempDetails.availability?.openingTime || availabilityDetails.openingTime || ''}
                        onChange={(e) => handleInputChange('availability', 'openingTime', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaDoorClosed className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Closing Time</label>
                    {!editMode.availability ? (
                      <p className="shop-details__field-value">{availabilityDetails.closingTime || ''}</p>
                    ) : (
                      <input
                        type="time"
                        className="shop-details__field-input"
                        value={tempDetails.availability?.closingTime || availabilityDetails.closingTime || ''}
                        onChange={(e) => handleInputChange('availability', 'closingTime', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shop-details__section">
          <div className="shop-details__section-header">
            <div className="shop-details__section-title-wrapper">
              <div className="shop-details__section-icon-wrapper shop-details__section-icon-wrapper--photos">
                <FaImages className="shop-details__section-icon" />
              </div>
              <div className="shop-details__section-title-content">
                <h2 className="shop-details__section-title">Shop Photos</h2>
                <p className="shop-details__section-subtitle">Manage your shop and catalogue images</p>
              </div>
            </div>
          </div>

          <div className="shop-details__section-body">
            <div className="shop-details__photo-section">
              <div className="shop-details__photo-header">
                <h5 className="shop-details__photo-title">
                  <FaImages className="shop-details__photo-title-icon" />
                  Shop Images
                </h5>
                <button className="shop-details__photo-add-btn" onClick={addShopPhoto}>
                  <FaPlus className="shop-details__photo-add-icon" />
                  Add Photo
                </button>
              </div>
              <div className="shop-details__photo-grid">
                {shopPhotos.map((photo, index) => (
                  <div className="shop-details__photo-item" key={`shop-${index}`}>
                    <img src={photo} alt="Shop" className="shop-details__photo-image" />
                    <button
                      className="shop-details__photo-delete"
                      onClick={() => confirmRemovePhoto(index, 'shop')}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                ref={shopPhotoInputRef}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleShopPhotoUpload}
              />
            </div>

            <div className="shop-details__photo-section">
              <div className="shop-details__photo-header">
                <h5 className="shop-details__photo-title">
                  <FaImages className="shop-details__photo-title-icon" />
                  Catalogue Images
                </h5>
                <button className="shop-details__photo-add-btn" onClick={addCataloguePhoto}>
                  <FaPlus className="shop-details__photo-add-icon" />
                  Add Photo
                </button>
              </div>
              <div className="shop-details__photo-grid">
                {cataloguePhotos.map((photo, index) => (
                  <div className="shop-details__photo-item" key={`catalogue-${index}`}>
                    <img src={photo} alt="Catalogue" className="shop-details__photo-image" />
                    <button
                      className="shop-details__photo-delete"
                      onClick={() => confirmRemovePhoto(index, 'catalogue')}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                ref={cataloguePhotoInputRef}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleCataloguePhotoUpload}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;