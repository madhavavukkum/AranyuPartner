import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaBed, 
  FaUpload, 
  FaImage, 
  FaTrash,
  FaCheck,
  FaSave,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaUsers,
  FaWifi,
  FaSnowflake,
  FaTv,
  FaGlassWhiskey,
  FaBath,
  FaWindowMaximize,
  FaFire,
  FaPlus,
  FaBell,
  FaFan,
  FaUtensils,
  FaCar,
  FaSwimmer,
  FaDumbbell,
  FaPercent,
  FaCreditCard
} from 'react-icons/fa';
import './AddRoom.css';

const AddRoom = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Basic Info
    roomType: '',
    maxGuests: 1,
    bedType: '',
    roomSize: '',
    roomName: '',
    // Availability
    availableFrom: '',
    availableTo: '',
    isUnavailable: false,
    // Pricing
    pricePerNight: '',
    taxesAndFees: '',
    discount: '',
    // Images
    images: [],
    coverImageIndex: 0,
    // Amenities
    amenities: {
      AC: false,
      WiFi: false,
      TV: false,
      'Mini Bar': false,
      'Private Bathroom': false,
      Balcony: false,
      'Hot Water': false,
      'Extra Bed Available': false,
      'Room Service': false,
      Fan: false
    },
    // Extras
    extras: {
      'Breakfast Included': false,
      'Free Parking': false,
      'Swimming Pool Access': false,
      'Gym Access': false
    },
    // Cancellation
    cancellationPolicy: 'free',
    // Timing
    checkInTime: '14:00',
    checkOutTime: '11:00',
    // Location
    address: '',
    // Rules
    roomRules: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity]
      }
    }));
  };

  const handleExtraChange = (extra) => {
    setFormData(prev => ({
      ...prev,
      extras: {
        ...prev.extras,
        [extra]: !prev.extras[extra]
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, {
            id: Date.now() + Math.random(),
            url: event.target.result,
            file: file
          }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId),
      coverImageIndex: prev.coverImageIndex >= prev.images.length - 1 ? 0 : prev.coverImageIndex
    }));
  };

  const setCoverImage = (index) => {
    setFormData(prev => ({
      ...prev,
      coverImageIndex: index
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = {
      id: Date.now(),
      name: formData.roomName,
      type: formData.roomType,
      maxGuests: parseInt(formData.maxGuests),
      bedType: formData.bedType,
      size: parseInt(formData.roomSize),
      pricePerNight: parseFloat(formData.pricePerNight),
      isActive: !formData.isUnavailable,
      coverImage: formData.images.length > 0 
        ? formData.images[formData.coverImageIndex].url 
        : 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: Object.keys(formData.amenities).filter(key => formData.amenities[key]),
      bookings: 0
    };

    // Load existing rooms from local storage
    const existingRooms = JSON.parse(localStorage.getItem('rooms') || '[]');
    // Add new room
    const updatedRooms = [...existingRooms, newRoom];
    // Save to local storage
    localStorage.setItem('rooms', JSON.stringify(updatedRooms));
    
    console.log('Form submitted:', newRoom);
    alert('Room added successfully!');
    navigate('/settings/rooms');
  };

  const amenitiesList = ['AC', 'WiFi', 'TV', 'Mini Bar', 'Private Bathroom', 'Balcony', 'Hot Water', 'Extra Bed Available', 'Room Service', 'Fan'];
  const extrasList = ['Breakfast Included', 'Free Parking', 'Swimming Pool Access', 'Gym Access'];

  const getAmenityIcon = (amenity) => {
    const icons = {
      'AC': <FaSnowflake />,
      'WiFi': <FaWifi />,
      'TV': <FaTv />,
      'Mini Bar': <FaGlassWhiskey />,
      'Private Bathroom': <FaBath />,
      'Balcony': <FaWindowMaximize />,
      'Hot Water': <FaFire />,
      'Extra Bed Available': <FaPlus />,
      'Room Service': <FaBell />,
      'Fan': <FaFan />
    };
    return icons[amenity] || <FaCheck />;
  };

  const getExtraIcon = (extra) => {
    const icons = {
      'Breakfast Included': <FaUtensils />,
      'Free Parking': <FaCar />,
      'Swimming Pool Access': <FaSwimmer />,
      'Gym Access': <FaDumbbell />
    };
    return icons[extra] || <FaCheck />;
  };

  return (
    <div className="add-room">
      <div className="add-room__container">
        <div className="add-room__header">
          <div className="add-room__header-content glass-card">
            <Link to="/settings/rooms" className="add-room__back-btn">
              <FaArrowLeft />
            </Link>
            <div className="add-room__header-text">
              <h1 className="add-room__title">Add New Room</h1>
              <p className="add-room__subtitle">Create a new room listing for your hotel</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="add-room__form">
          {/* Basic Room Info */}
          <div className="add-room__section glass-card">
            <div className="add-room__section-header">
              <div className="add-room__section-icon">
                <FaBed />
              </div>
              <div>
                <h2 className="add-room__section-title">Basic Room Information</h2>
                <p className="add-room__section-subtitle">Enter the basic details of your room</p>
              </div>
            </div>

            <div className="add-room__form-grid">
              <div className="add-room__form-group">
                <label className="add-room__label">Room Type</label>
                <input
                  type="text"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  className="add-room__input"
                  placeholder="e.g., Single, Double, Suite, Deluxe"
                  required
                />
              </div>

              <div className="add-room__form-group">
                <label className="add-room__label">Max Guests</label>
                <input
                  type="number"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleInputChange}
                  className="add-room__input"
                  min="1"
                  max="10"
                  required
                />
              </div>

              <div className="add-room__form-group">
                <label className="add-room__label">Bed Type</label>
                <input
                  type="text"
                  name="bedType"
                  value={formData.bedType}
                  onChange={handleInputChange}
                  className="add-room__input"
                  placeholder="e.g., King, Queen, Twin"
                  required
                />
              </div>

              <div className="add-room__form-group">
                <label className="add-room__label">Room Size (sq. ft.)</label>
                <input
                  type="number"
                  name="roomSize"
                  value={formData.roomSize}
                  onChange={handleInputChange}
                  className="add-room__input"
                  placeholder="e.g., 350"
                  required
                />
              </div>

              <div className="add-room__form-group">
                <label className="add-room__label">Room Name (Optional)</label>
                <input
                  type="text"
                  name="roomName"
                  value={formData.roomName}
                  onChange={handleInputChange}
                  className="add-room__input"
                  placeholder="e.g., Deluxe Ocean View Suite"
                />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="add-room__section glass-card">
            <div className="add-room__section-header">
              <div className="add-room__section-icon">
                <FaCalendarAlt />
              </div>
              <div>
                <h2 className="add-room__section-title">Availability</h2>
                <p className="add-room__section-subtitle">Set when this room is available for booking</p>
              </div>
            </div>

            <div className="add-room__form-grid">
              <div className="add-room__form-group">
                <label className="add-room__label">Available From</label>
                <input
                  type="date"
                  name="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleInputChange}
                  className="add-room__input"
                  required
                />
              </div>

              <div className="add-room__form-group">
                <label className="add-room__label">Available To</label>
                <input
                  type="date"
                  name="availableTo"
                  value={formData.availableTo}
                  onChange={handleInputChange}
                  className="add-room__input"
                  required
                />
              </div>

              <div className="add-room__form-group add-room__form-group--full">
                <label className="add-room__checkbox-label">
                  <input
                    type="checkbox"
                    name="isUnavailable"
                    checked={formData.isUnavailable}
                    onChange={handleInputChange}
                    className="add-room__checkbox"
                  />
                  <span className="add-room__checkbox-text">Mark as temporarily unavailable</span>
                </label>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div className="add-room__section glass-card">
            <div className="add-room__section-header">
              <div className="add-room__section-icon">
                <FaRupeeSign />
              </div>
              <div>
                <h2 className="add-room__section-title">Price Details</h2>
                <p className="add-room__section-subtitle">Set pricing for your room</p>
              </div>
            </div>

            <div className="add-room__form-grid">
              <div className="add-room__form-group">
                <label className="add-room__label">Price per Night (₹)</label>
                <input
                  type="number"
                  name="pricePerNight"
                  value={formData.pricePerNight}
                  onChange={handleInputChange}
                  className="add-room__input"
                  placeholder="e.g., 5000"
                  required
                />
              </div>

              <div className="add-room__form-group">
                <label className="add-room__label">Taxes & Fees (₹) - Optional</label>
                <input
                  type="number"
                  name="taxesAndFees"
                  value={formData.taxesAndFees}
                  onChange={handleInputChange}
                  className="add-room__input"
                  placeholder="e.g., 500"
                />
              </div>

              <div className="add-room__form-group">
                <label className="add-room__label">Discount (%) - Optional</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  className="add-room__input"
                  placeholder="e.g., 10"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Room Photos */}
          <div className="add-room__section glass-card">
            <div className="add-room__section-header">
              <div className="add-room__section-icon">
                <FaImage />
              </div>
              <div>
                <h2 className="add-room__section-title">Room Photos</h2>
                <p className="add-room__section-subtitle">Upload images of your room</p>
              </div>
            </div>

            <div className="add-room__upload-area">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="add-room__file-input"
                id="room-images"
              />
              <label htmlFor="room-images" className="add-room__upload-label">
                <FaUpload />
                <span>Click to upload room images</span>
                <small>Support JPG, PNG files (Max 10MB each)</small>
              </label>
            </div>

            {formData.images.length > 0 && (
              <div className="add-room__images-preview">
                <div className="add-room__images-grid">
                  {formData.images.map((image, index) => (
                    <div key={image.id} className="add-room__image-item">
                      <img src={image.url} alt={`Room ${index + 1}`} />
                      <div className="add-room__image-actions">
                        <button
                          type="button"
                          onClick={() => setCoverImage(index)}
                          className={`add-room__image-btn ${formData.coverImageIndex === index ? 'add-room__image-btn--active' : ''}`}
                        >
                          {formData.coverImageIndex === index ? 'Cover' : 'Set Cover'}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="add-room__image-btn add-room__image-btn--delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="add-room__section glass-card">
            <div className="add-room__section-header">
              <div className="add-room__section-icon">
                <FaCheck />
              </div>
              <div>
                <h2 className="add-room__section-title">Amenities</h2>
                <p className="add-room__section-subtitle">Select available amenities in your room</p>
              </div>
            </div>

            <div className="add-room__amenities-grid">
              {amenitiesList.map(amenity => (
                <label key={amenity} className="add-room__amenity-item">
                  <input
                    type="checkbox"
                    checked={formData.amenities[amenity]}
                    onChange={() => handleAmenityChange(amenity)}
                    className="add-room__amenity-checkbox"
                  />
                  <div className="add-room__amenity-content">
                    <div className="add-room__amenity-icon">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="add-room__amenity-text">{amenity}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Extras */}
          <div className="add-room__section glass-card">
            <div className="add-room__section-header">
              <div className="add-room__section-icon">
                <FaPlus />
              </div>
              <div>
                <h2 className="add-room__section-title">Extras</h2>
                <p className="add-room__section-subtitle">Additional services and features</p>
              </div>
            </div>

            <div className="add-room__extras-grid">
              {extrasList.map(extra => (
                <label key={extra} className="add-room__extra-item">
                  <input
                    type="checkbox"
                    checked={formData.extras[extra]}
                    onChange={() => handleExtraChange(extra)}
                    className="add-room__extra-checkbox"
                  />
                  <div className="add-room__extra-content">
                    <div className="add-room__extra-icon">
                      {getExtraIcon(extra)}
                    </div>
                    <span className="add-room__extra-text">{extra}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="add-room__section glass-card">
            <div className="add-room__section-header">
              <div className="add-room__section-icon">
                <FaCreditCard />
              </div>
              <div>
                <h2 className="add-room__section-title">Cancellation Policy</h2>
                <p className="add-room__section-subtitle">Set your cancellation terms</p>
              </div>
            </div>

            <div className="add-room__policy-options">
              <label className="add-room__policy-option">
                <input
                  type="radio"
                  name="cancellationPolicy"
                  value="free"
                  checked={formData.cancellationPolicy === 'free'}
                  onChange={handleInputChange}
                  className="add-room__policy-radio"
                />
                <div className="add-room__policy-content">
                  <div className="add-room__policy-title">Free Cancellation</div>
                  <div className="add-room__policy-description">Guests can cancel until check-in date</div>
                </div>
              </label>

              <label className="add-room__policy-option">
                <input
                  type="radio"
                  name="cancellationPolicy"
                  value="no-cancel"
                  checked={formData.cancellationPolicy === 'no-cancel'}
                  onChange={handleInputChange}
                  className="add-room__policy-radio"
                />
                <div className="add-room__policy-content">
                  <div className="add-room__policy-title">No Cancellation</div>
                  <div className="add-room__policy-description">No cancellation allowed after booking</div>
                </div>
              </label>
            </div>
          </div>

          {/* Check-in/Check-out Timing */}
          <div className="add-room__section glass-card">
            <div className="add-room__section-header">
              <div className="add-room__section-icon">
                <FaClock />
              </div>
              <div>
                <h2 className="add-room__section-title">Check-in / Check-out Timing</h2>
                <p className="add-room__section-subtitle">Set arrival and departure times</p>
              </div>
            </div>

            <div className="add-room__form-grid">
              <div className="add-room__form-group">
                <label className="add-room__label">Check-in Time</label>
                <input
                  type="time"
                  name="checkInTime"
                  value={formData.checkInTime}
                  onChange={handleInputChange}
                  className="add-room__input"
                  required
                />
              </div>

              <div className="add-room__form-group">
                <label className="add-room__label">Check-out Time</label>
                <input
                  type="time"
                  name="checkOutTime"
                  value={formData.checkOutTime}
                  onChange={handleInputChange}
                  className="add-room__input"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="add-room__section glass-card">
            <div className="add-room__section-header">
              <div className="add-room__section-icon">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h2 className="add-room__section-title">Location</h2>
                <p className="add-room__section-subtitle">Provide location details</p>
              </div>
            </div>

            <div className="add-room__form-group">
              <label className="add-room__label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="add-room__textarea"
                placeholder="Enter the complete address of your property"
                rows="3"
                required
              />
            </div>
          </div>

          {/* Room Rules */}
          <div className="add-room__section glass-card">
            <div className="add-room__section-header">
              <div className="add-room__section-icon">
                <FaCheck />
              </div>
              <div>
                <h2 className="add-room__section-title">Room Rules & Notes</h2>
                <p className="add-room__section-subtitle">Any special rules or important information</p>
              </div>
            </div>

            <div className="add-room__form-group">
              <label className="add-room__label">Rules & Notes</label>
              <textarea
                name="roomRules"
                value={formData.roomRules}
                onChange={handleInputChange}
                className="add-room__textarea"
                placeholder="e.g., No smoking, ID required at check-in, Pet-friendly, etc."
                rows="4"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="add-room__submit-section glass-card">
            <div className="add-room__submit-content">
              <div className="add-room__submit-text">
                <h3>Ready to list your room?</h3>
                <p>Review all the information and submit your room listing</p>
              </div>
              <button type="submit" className="btn btn--primary btn--lg">
                <FaSave /> Save Room
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;