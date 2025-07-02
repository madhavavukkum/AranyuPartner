import React, { useState, useRef, useEffect } from 'react';
import {
  FaEdit,
  FaCamera,
  FaBriefcase,
  FaPencilAlt,
  FaSign,
  FaTags,
  FaUser,
  FaIdCard,
  FaComment,
  FaTimes,
  FaSave,
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
import './ShopDetails.css';
import { showSuccessToast, showInfoToast } from '../../../App';

const ShopDetails = () => {
  const [bannerImage, setBannerImage] = useState(() => {
    return localStorage.getItem('shopBannerImage') || 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  });
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('shopProfileImage') || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1';
  });
  const [businessDetails, setBusinessDetails] = useState(() => {
    const saved = localStorage.getItem('shopBusinessDetails');
    return saved ? JSON.parse(saved) : {
      businessName: 'Madhava Tours & Travels',
      businessType: 'Tours & Travel',
      ownerName: 'Ravi Kumar',
      gstNumber: '183939292',
    };
  });
  const [contactDetails, setContactDetails] = useState(() => {
    const saved = localStorage.getItem('shopContactDetails');
    return saved ? JSON.parse(saved) : {
      mobileNumber: '+91 98765 43210',
      email: 'ravi.kumar@example.com',
      whatsapp: '+91 98765 43210',
    };
  });
  const [locationDetails, setLocationDetails] = useState(() => {
    const saved = localStorage.getItem('shopLocationDetails');
    return saved ? JSON.parse(saved) : {
      address: '12-3-45, Gandhi Nagar',
      landmark: 'Near Krishna River',
      city: 'Vijayawada',
      state: 'Andhra Pradesh',
      country: 'India',
      pincode: '520003',
    };
  });
  const [availabilityDetails, setAvailabilityDetails] = useState(() => {
    const saved = localStorage.getItem('shopAvailabilityDetails');
    return saved ? JSON.parse(saved) : {
      seasonalAvailability: 'All Year',
      openingTime: '07:30:00',
      closingTime: '18:50:00',
    };
  });
  const [shopPhotos, setShopPhotos] = useState(() => {
    const saved = localStorage.getItem('shopPhotos');
    return saved ? JSON.parse(saved) : [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1676139860466-8b8f71c0a737?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
  });
  const [cataloguePhotos, setCataloguePhotos] = useState(() => {
    const saved = localStorage.getItem('shopCataloguePhotos');
    return saved ? JSON.parse(saved) : [
      'https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1683133963821-a499e44dbeae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1661962836485-79ceb0ec7017?q=80&w=1166&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
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
    localStorage.setItem('shopBannerImage', bannerImage);
    localStorage.setItem('shopProfileImage', profileImage);
    localStorage.setItem('shopBusinessDetails', JSON.stringify(businessDetails));
    localStorage.setItem('shopContactDetails', JSON.stringify(contactDetails));
    localStorage.setItem('shopLocationDetails', JSON.stringify(locationDetails));
    localStorage.setItem('shopAvailabilityDetails', JSON.stringify(availabilityDetails));
    localStorage.setItem('shopPhotos', JSON.stringify(shopPhotos));
    localStorage.setItem('shopCataloguePhotos', JSON.stringify(cataloguePhotos));
  }, [bannerImage, profileImage, businessDetails, contactDetails, locationDetails, availabilityDetails, shopPhotos, cataloguePhotos]);

  const editBannerImage = () => {
    bannerInputRef.current.click();
  };

  const editProfileImage = () => {
    profileInputRef.current.click();
  };

  const updateBanner = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerImage(event.target.result);
        showSuccessToast('Banner image updated successfully!');
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateProfile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        showSuccessToast('Profile image updated successfully!');
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const addShopPhoto = () => {
    shopPhotoInputRef.current.click();
  };

  const addCataloguePhoto = () => {
    cataloguePhotoInputRef.current.click();
  };

  const handleShopPhotoUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setShopPhotos((prev) => [...prev, event.target.result]);
          showSuccessToast('Shop photo added successfully!');
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
          setCataloguePhotos((prev) => [...prev, event.target.result]);
          showSuccessToast('Catalogue photo added successfully!');
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
    } else {
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
    if (section === 'business') setBusinessDetails(tempDetails.business);
    if (section === 'contact') setContactDetails(tempDetails.contact);
    if (section === 'location') setLocationDetails(tempDetails.location);
    if (section === 'availability') setAvailabilityDetails(tempDetails.availability);
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
      [section]: { ...prev[section], [field]: value },
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
          <h1 className="shop-details__title">Shop Details</h1>
          <p className="shop-details__subtitle">Here you can view and edit your shop information</p>
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
                <FaBriefcase className="shop-details__section-icon" />
              </div>
              <div className="shop-details__section-title-content">
                <h2 className="shop-details__section-title">Business Details</h2>
                <p className="shop-details__section-subtitle">Manage your business information</p>
              </div>
            </div>
            {!editMode.business && (
              <button
                className="shop-details__edit-btn"
                onClick={() => toggleEdit('business')}
              >
                <FaPencilAlt className="shop-details__edit-btn-icon" />
                Edit
              </button>
            )}
          </div>

          <div className="shop-details__section-body">
            <div className="shop-details__field-grid">
              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaSign className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Business Name</label>
                    {!editMode.business ? (
                      <p className="shop-details__field-value">{businessDetails.businessName}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.business?.businessName || businessDetails.businessName}
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
                      <p className="shop-details__field-value">{businessDetails.businessType}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.business?.businessType || businessDetails.businessType}
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
                      <p className="shop-details__field-value">{businessDetails.ownerName}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.business?.ownerName || businessDetails.ownerName}
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
                      <p className="shop-details__field-value">{businessDetails.gstNumber}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.business?.gstNumber || businessDetails.gstNumber}
                        onChange={(e) => handleInputChange('business', 'gstNumber', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {editMode.business && (
              <div className="shop-details__edit-actions">
                <button
                  className="shop-details__action-btn shop-details__action-btn--cancel"
                  onClick={() => cancelEdit('business')}
                >
                  <FaTimes className="shop-details__action-btn-icon" />
                  Cancel
                </button>
                <button
                  className="shop-details__action-btn shop-details__action-btn--save"
                  onClick={() => saveEdit('business')}
                >
                  <FaSave className="shop-details__action-btn-icon" />
                  Save
                </button>
              </div>
            )}
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
            {!editMode.contact && (
              <button
                className="shop-details__edit-btn"
                onClick={() => toggleEdit('contact')}
              >
                <FaPencilAlt className="shop-details__edit-btn-icon" />
                Edit
              </button>
            )}
          </div>

          <div className="shop-details__section-body">
            <div className="shop-details__field-grid">
              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaPhone className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Mobile Number</label>
                    {!editMode.contact ? (
                      <p className="shop-details__field-value">{contactDetails.mobileNumber}</p>
                    ) : (
                      <input
                        type="tel"
                        className="shop-details__field-input"
                        value={tempDetails.contact?.mobileNumber || contactDetails.mobileNumber}
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
                      <p className="shop-details__field-value">{contactDetails.email}</p>
                    ) : (
                      <input
                        type="email"
                        className="shop-details__field-input"
                        value={tempDetails.contact?.email || contactDetails.email}
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
                      <p className="shop-details__field-value">{contactDetails.whatsapp}</p>
                    ) : (
                      <input
                        type="tel"
                        className="shop-details__field-input"
                        value={tempDetails.contact?.whatsapp || contactDetails.whatsapp}
                        onChange={(e) => handleInputChange('contact', 'whatsapp', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {editMode.contact && (
              <div className="shop-details__edit-actions">
                <button
                  className="shop-details__action-btn shop-details__action-btn--cancel"
                  onClick={() => cancelEdit('contact')}
                >
                  <FaTimes className="shop-details__action-btn-icon" />
                  Cancel
                </button>
                <button
                  className="shop-details__action-btn shop-details__action-btn--save"
                  onClick={() => saveEdit('contact')}
                >
                  <FaSave className="shop-details__action-btn-icon" />
                  Save
                </button>
              </div>
            )}
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
            {!editMode.location && (
              <button
                className="shop-details__edit-btn"
                onClick={() => toggleEdit('location')}
              >
                <FaPencilAlt className="shop-details__edit-btn-icon" />
                Edit
              </button>
            )}
          </div>

          <div className="shop-details__section-body">
            <div className="shop-details__field-grid">
              <div className="shop-details__field shop-details__field--full">
                <div className="shop-details__field-content">
                  <FaRoad className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Address</label>
                    {!editMode.location ? (
                      <p className="shop-details__field-value">{locationDetails.address}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.location?.address || locationDetails.address}
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
                      <p className="shop-details__field-value">{locationDetails.landmark}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.location?.landmark || locationDetails.landmark}
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
                      <p className="shop-details__field-value">{locationDetails.city}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.location?.city || locationDetails.city}
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
                      <p className="shop-details__field-value">{locationDetails.state}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.location?.state || locationDetails.state}
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
                      <p className="shop-details__field-value">{locationDetails.country}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.location?.country || locationDetails.country}
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
                      <p className="shop-details__field-value">{locationDetails.pincode}</p>
                    ) : (
                      <input
                        type="text"
                        className="shop-details__field-input"
                        value={tempDetails.location?.pincode || locationDetails.pincode}
                        onChange={(e) => handleInputChange('location', 'pincode', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {editMode.location && (
              <div className="shop-details__edit-actions">
                <button
                  className="shop-details__action-btn shop-details__action-btn--cancel"
                  onClick={() => cancelEdit('location')}
                >
                  <FaTimes className="shop-details__action-btn-icon" />
                  Cancel
                </button>
                <button
                  className="shop-details__action-btn shop-details__action-btn--save"
                  onClick={() => saveEdit('location')}
                >
                  <FaSave className="shop-details__action-btn-icon" />
                  Save
                </button>
              </div>
            )}
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
            {!editMode.availability && (
              <button
                className="shop-details__edit-btn"
                onClick={() => toggleEdit('availability')}
              >
                <FaPencilAlt className="shop-details__edit-btn-icon" />
                Edit
              </button>
            )}
          </div>

          <div className="shop-details__section-body">
            <div className="shop-details__field-grid">
              <div className="shop-details__field">
                <div className="shop-details__field-content">
                  <FaCalendar className="shop-details__field-icon" />
                  <div className="shop-details__field-text">
                    <label className="shop-details__field-label">Seasonal Availability</label>
                    {!editMode.availability ? (
                      <p className="shop-details__field-value">{availabilityDetails.seasonalAvailability}</p>
                    ) : (
                      <select
                        className="shop-details__field-input"
                        value={tempDetails.availability?.seasonalAvailability || availabilityDetails.seasonalAvailability}
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
                      <p className="shop-details__field-value">{availabilityDetails.openingTime}</p>
                    ) : (
                      <input
                        type="time"
                        className="shop-details__field-input"
                        value={tempDetails.availability?.openingTime || availabilityDetails.openingTime}
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
                      <p className="shop-details__field-value">{availabilityDetails.closingTime}</p>
                    ) : (
                      <input
                        type="time"
                        className="shop-details__field-input"
                        value={tempDetails.availability?.closingTime || availabilityDetails.closingTime}
                        onChange={(e) => handleInputChange('availability', 'closingTime', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {editMode.availability && (
              <div className="shop-details__edit-actions">
                <button
                  className="shop-details__action-btn shop-details__action-btn--cancel"
                  onClick={() => cancelEdit('availability')}
                >
                  <FaTimes className="shop-details__action-btn-icon" />
                  Cancel
                </button>
                <button
                  className="shop-details__action-btn shop-details__action-btn--save"
                  onClick={() => saveEdit('availability')}
                >
                  <FaSave className="shop-details__action-btn-icon" />
                  Save
                </button>
              </div>
            )}
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