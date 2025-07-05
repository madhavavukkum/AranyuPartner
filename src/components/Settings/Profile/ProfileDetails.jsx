import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaMapMarkerAlt,
  FaHome,
  FaMapPin,
  FaGlobe,
  FaCamera,
  FaLock,
  FaTrashAlt,
  FaEdit,
  FaDownload,
  FaShieldAlt,
  FaIdCard,
  FaCalendarAlt,
  FaBriefcase,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import './ProfileDetails.css';

const userData = {
  fullName: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  phone: "+91 9876543210",
  gender: "Male",
  dateOfBirth: "1988-05-15",
  occupation: "Software Engineer",
  address: "123 Main Street, Sector 15",
  city: "Gurgaon",
  state: "Haryana",
  zipCode: "122001",
  landmark: "Near Metro Station",
  country: "India",
  profileImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  businessName: "Madhava Tours and travels",
  location: "Vijayawada, India",
  membership: {
    title: "Premium Member",
    info: "Active",
    buttonText: "Upgrade Plan"
  }
};

function ProfileDetails() {
  const [isEditing, setIsEditing] = useState({
    personal: false,
    address: false
  });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('profileDetails');
    return savedData ? JSON.parse(savedData) : {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
      occupation: userData.occupation,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      zipCode: userData.zipCode,
      landmark: userData.landmark,
      country: userData.country
    };
  });

  useEffect(() => {
    localStorage.setItem('profileDetails', JSON.stringify(formData));
  }, [formData]);

  const handleEdit = (section) => {
    setIsEditing(prev => ({ ...prev, [section]: true }));
  };

  const handleSave = (section) => {
    setIsEditing(prev => ({ ...prev, [section]: false }));
    console.log(`${section.charAt(0).toUpperCase() + section.slice(1)} information saved successfully!`);
  };

  const handleCancel = (section) => {
    setIsEditing(prev => ({ ...prev, [section]: false }));
    const savedData = JSON.parse(localStorage.getItem('profileDetails'));
    setFormData(savedData || {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
      occupation: userData.occupation,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      zipCode: userData.zipCode,
      landmark: userData.landmark,
      country: userData.country
    });
    console.log('Changes discarded');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="profile-details">
      <div className="profile-details__container">
        <div className="profile-details__header">
          <div className="profile-details__header-content">
            <div className="profile-details__header-text">
              <h1 className="profile-details__title">Profile Details</h1>
              <p className="profile-details__subtitle">Manage your personal information</p>
            </div>
          </div>
        </div>

        <div className="profile-details__content">
          <div className="profile-details__sidebar">
            <div className="profile-details__card profile-details__card--sidebar">
              <div className="profile-details__card-body">
                <div className="profile-details__avatar-section">
                  <div className="profile-details__avatar-wrapper">
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className="profile-details__avatar"
                    />
                    <button className="profile-details__avatar-edit">
                      <FaCamera />
                    </button>
                  </div>
                  <div className="profile-details__user-info">
                    <h3 className="profile-details__user-name">{formData.fullName}</h3>
                    <div className="profile-details__user-badge">

                    <span className={`profile-details__badge ${userData.membership.info === 'Active' ? 'profile-details__badge--active' : 'profile-details__badge--inactive'}`}>
                      {userData.membership.title} - {userData.membership.info}
                    </span>

                    </div>
                    <p className="profile-details__user-business">{userData.businessName}</p>
                    <p className="profile-details__user-location">{userData.location}</p>
                  </div>
                </div>
                <div className="profile-details__quick-actions">
                  <button className="profile-details__action-btn profile-details__action-btn--primary">
                    <FaLock className="profile-details__action-icon" />
                    Change Password
                  </button>
                  <button className="profile-details__action-btn profile-details__action-btn--danger">
                    <FaTrashAlt className="profile-details__action-icon" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-details__main">
            <div className="profile-details__card">
              <div className="profile-details__card-header">
                <div className="profile-details__card-header-content">
                  <div className="profile-details__card-icon-wrapper profile-details__card-icon-wrapper--primary">
                    <FaUser className="profile-details__card-icon" />
                  </div>
                  <div className="profile-details__card-header-text">
                    <h4 className="profile-details__card-title">Personal Information</h4>
                    <p className="profile-details__card-subtitle">Your basic profile details</p>
                  </div>
                </div>
                <div className="profile-details__card-actions">
                  {!isEditing.personal ? (
                    <button
                      className="profile-details__edit-btn"
                      onClick={() => handleEdit('personal')}
                    >
                      <FaEdit className="profile-details__edit-icon" />
                      <span className="profile-details__edit-text">Edit</span>
                    </button>
                  ) : (
                    <div className="profile-details__edit-actions">
                      <button
                        className="profile-details__save-btn"
                        onClick={() => handleSave('personal')}
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="profile-details__cancel-btn"
                        onClick={() => handleCancel('personal')}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="profile-details__card-body">
                <div className="profile-details__info-grid">
                  <div className="profile-details__info-item">
                    <div className="profile-details__info-content">
                      <FaIdCard className="profile-details__info-icon" />
                      <div className="profile-details__info-text">
                        <label className="profile-details__info-label">Full Name</label>
                        {!isEditing.personal ? (
                          <p className="profile-details__info-value">{formData.fullName}</p>
                        ) : (
                          <input
                            type="text"
                            className="profile-details__input"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile-details__info-item">
                    <div className="profile-details__info-content">
                      <FaEnvelope className="profile-details__info-icon" />
                      <div className="profile-details__info-text">
                        <label className="profile-details__info-label">Email Address</label>
                        {!isEditing.personal ? (
                          <p className="profile-details__info-value">{formData.email}</p>
                        ) : (
                          <input
                            type="email"
                            className="profile-details__input"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile-details__info-item">
                    <div className="profile-details__info-content">
                      <FaPhone className="profile-details__info-icon" />
                      <div className="profile-details__info-text">
                        <label className="profile-details__info-label">Phone Number</label>
                        {!isEditing.personal ? (
                          <p className="profile-details__info-value">{formData.phone}</p>
                        ) : (
                          <input
                            type="tel"
                            className="profile-details__input"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile-details__info-item">
                    <div className="profile-details__info-content">
                      <FaVenusMars className="profile-details__info-icon" />
                      <div className="profile-details__info-text">
                        <label className="profile-details__info-label">Gender</label>
                        {!isEditing.personal ? (
                          <p className="profile-details__info-value">{formData.gender}</p>
                        ) : (
                          <select
                            className="profile-details__input"
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile-details__info-item">
                    <div className="profile-details__info-content">
                      <FaCalendarAlt className="profile-details__info-icon" />
                      <div className="profile-details__info-text">
                        <label className="profile-details__info-label">Date of Birth</label>
                        {!isEditing.personal ? (
                          <p className="profile-details__info-value">
                            {new Date(formData.dateOfBirth).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        ) : (
                          <input
                            type="date"
                            className="profile-details__input"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile-details__info-item">
                    <div className="profile-details__info-content">
                      <FaBriefcase className="profile-details__info-icon" />
                      <div className="profile-details__info-text">
                        <label className="profile-details__info-label">Occupation</label>
                        {!isEditing.personal ? (
                          <p className="profile-details__info-value">{formData.occupation}</p>
                        ) : (
                          <input
                            type="text"
                            className="profile-details__input"
                            value={formData.occupation}
                            onChange={(e) => handleInputChange('occupation', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-details__card">
              <div className="profile-details__card-header">
                <div className="profile-details__card-header-content">
                  <div className="profile-details__card-icon-wrapper profile-details__card-icon-wrapper--secondary">
                    <FaMapMarkerAlt className="profile-details__card-icon" />
                  </div>
                  <div className="profile-details__card-header-text">
                    <h4 className="profile-details__card-title">Address Information</h4>
                    <p className="profile-details__card-subtitle">Your location details</p>
                  </div>
                </div>
                <div className="profile-details__card-actions">
                  {!isEditing.address ? (
                    <button
                      className="profile-details__edit-btn"
                      onClick={() => handleEdit('address')}
                    >
                      <FaEdit className="profile-details__edit-icon" />
                      <span className="profile-details__edit-text">Edit</span>
                    </button>
                  ) : (
                    <div className="profile-details__edit-actions">
                      <button
                        className="profile-details__save-btn"
                        onClick={() => handleSave('address')}
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="profile-details__cancel-btn"
                        onClick={() => handleCancel('address')}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="profile-details__card-body">
                <div className="profile-details__info-grid">
                  <div className="profile-details__info-item profile-details__info-item--full">
                    <div className="profile-details__info-content">
                      <FaHome className="profile-details__info-icon" />
                      <div className="profile-details__info-text">
                        <label className="profile-details__info-label">Street Address</label>
                        {!isEditing.address ? (
                          <p className="profile-details__info-value">{formData.address}</p>
                        ) : (
                          <input
                            type="text"
                            className="profile-details__input"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile-details__info-item">
                    <div className="profile-details__info-content">
                      <FaMapPin className="profile-details__info-icon" />
                      <div className="profile-details__info-text">
                        <label className="profile-details__info-label">City</label>
                        {!isEditing.address ? (
                          <p className="profile-details__info-value">{formData.city}</p>
                        ) : (
                          <input
                            type="text"
                            className="profile-details__input"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile-details__info-item">
                    <div className="profile-details__info-content">
                      <FaMapPin className="profile-details__info-icon" />
                      <div className="profile-details__info-text">
                        <label className="profile-details__info-label">State</label>
                        {!isEditing.address ? (
                          <p className="profile-details__info-value">{formData.state}</p>
                        ) : (
                          <input
                            type="text"
                            className="profile-details__input"
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile-details__info-item">
                    <div className="profile-details__info-content">
                      <FaMapPin className="profile-details__info-icon" />
                      <div className="profile-details__info-text">
                        <label className="profile-details__info-label">Pin Code</label>
                        {!isEditing.address ? (
                          <p className="profile-details__info-value">{formData.zipCode}</p>
                        ) : (
                          <input
                            type="text"
                            className="profile-details__input"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile-details__info-item">
                    <div className="profile-details__info-content">
                      <FaMapPin className="profile-details__info-icon" />
                      <div className="profile-details__info-text">
                        <label className="profile-details__info-label">Landmark</label>
                        {!isEditing.address ? (
                          <p className="profile-details__info-value">{formData.landmark}</p>
                        ) : (
                          <input
                            type="text"
                            className="profile-details__input"
                            value={formData.landmark}
                            onChange={(e) => handleInputChange('landmark', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile-details__info-item">
                    <div className="profile-details__info-content">
                      <FaGlobe className="profile-details__info-icon" />
                      <div className="profile-details__info-text">
                        <label className="profile-details__info-label">Country</label>
                        {!isEditing.address ? (
                          <p className="profile-details__info-value">{formData.country}</p>
                        ) : (
                          <select
                            className="profile-details__input"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                          >
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-details__bottom-actions">
              <button className="profile-details__bottom-btn profile-details__bottom-btn--secondary">
                <FaDownload className="profile-details__bottom-icon" />
                Export Data
              </button>
              <button className="profile-details__bottom-btn profile-details__bottom-btn--info">
                <FaShieldAlt className="profile-details__bottom-icon" />
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;