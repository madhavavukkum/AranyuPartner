import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaBed,
  FaUsers,
  FaRupeeSign,
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
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import './PreviewRoom.css';

const PreviewRoom = () => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const mockRoomData = {
      id: parseInt(id),
      name: 'Deluxe Ocean View Suite',
      type: 'Suite',
      maxGuests: 4,
      bedType: 'King',
      size: 450,
      pricePerNight: 8500,
      taxesAndFees: 850,
      discount: 10,
      images: [
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      amenities: ['AC', 'WiFi', 'TV', 'Mini Bar', 'Private Bathroom', 'Balcony', 'Hot Water', 'Room Service'],
      extras: ['Breakfast Included', 'Free Parking', 'Swimming Pool Access'],
      cancellationPolicy: 'free',
      checkInTime: '14:00',
      checkOutTime: '11:00',
      address: '123 Ocean Drive, Marine Beach, Mumbai, Maharashtra 400001',
      roomRules: 'No smoking inside the room. Valid ID required at check-in. Guests must be 18+ years old. Pets are not allowed.',
      isActive: true,
      availableFrom: '2024-01-01',
      availableTo: '2024-12-31'
    };
    
    setRoomData(mockRoomData);
  }, [id]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateFinalPrice = () => {
    if (!roomData) return 0;
    let price = roomData.pricePerNight;
    if (roomData.discount > 0) {
      price = price - (price * roomData.discount / 100);
    }
    return price;
  };

  if (!roomData) {
    return (
      <div className="preview-room">
        <div className="preview-room__container">
          <div className="preview-room__loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-room">
      <div className="preview-room__container">
        <div className="preview-room__header">
          <div className="preview-room__header-content glass-card">
            <Link to="/settings/rooms" className="preview-room__back-btn">
              <FaArrowLeft />
            </Link>
            <div className="preview-room__header-text">
              <h1 className="preview-room__title">Room Preview</h1>
              <p className="preview-room__subtitle">Preview how your room appears to guests</p>
            </div>
          </div>
        </div>

        <div className="preview-room__content">
          <div className="preview-room__main">
            {/* Room Images */}
            <div className="preview-room__images-section glass-card">
              <div className="preview-room__main-image">
                <img 
                  src={roomData.images[selectedImageIndex]} 
                  alt={`${roomData.name} - Image ${selectedImageIndex + 1}`}
                  className="preview-room__featured-image"
                />
                <div className="preview-room__image-overlay">
                  <div className="preview-room__status-badge">
                    {roomData.isActive ? 'Available' : 'Unavailable'}
                  </div>
                </div>
              </div>
              
              {roomData.images.length > 1 && (
                <div className="preview-room__image-thumbnails">
                  {roomData.images.map((image, index) => (
                    <button
                      key={index}
                      className={`preview-room__thumbnail ${selectedImageIndex === index ? 'preview-room__thumbnail--active' : ''}`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Details */}
            <div className="preview-room__details-section glass-card">
              <div className="preview-room__room-header">
                <div className="preview-room__room-title-section">
                  <h2 className="preview-room__room-name">{roomData.name}</h2>
                  <div className="preview-room__room-meta">
                    <span className="preview-room__room-type">{roomData.type}</span>
                    <span className="preview-room__room-size">{roomData.size} sq ft</span>
                  </div>
                </div>
                <div className="preview-room__room-capacity">
                  <FaUsers className="preview-room__capacity-icon" />
                  <span>Up to {roomData.maxGuests} guests</span>
                </div>
              </div>

              {/* Room Information */}
              <div className="preview-room__room-info">
                <div className="preview-room__section-header">
                  <div className="preview-room__section-icon">
                    <FaCheck />
                  </div>
                  <div>
                    <h3 className="preview-room__section-title">Room Information</h3>
                    <p className="preview-room__section-subtitle">Key details about the room</p>
                  </div>
                </div>
                <div className="preview-room__amenities-grid">
                  <div className="preview-room__amenity-item">
                    <div className="preview-room__amenity-icon">
                      <FaBed />
                    </div>
                    <span className="preview-room__amenity-text">Bed Type: {roomData.bedType}</span>
                  </div>
                  <div className="preview-room__amenity-item">
                    <div className="preview-room__amenity-icon">
                      <FaCalendarAlt />
                    </div>
                    <span className="preview-room__amenity-text">
                      Available: {new Date(roomData.availableFrom).toLocaleDateString()} - {new Date(roomData.availableTo).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="preview-room__amenity-item">
                    <div className="preview-room__amenity-icon">
                      <FaClock />
                    </div>
                    <span className="preview-room__amenity-text">
                      Check-in / Check-out: {roomData.checkInTime} / {roomData.checkOutTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="preview-room__amenities-section">
                <div className="preview-room__section-header">
                  <div className="preview-room__section-icon">
                    <FaCheck />
                  </div>
                  <div>
                    <h3 className="preview-room__section-title">Room Amenities</h3>
                    <p className="preview-room__section-subtitle">Available amenities in the room</p>
                  </div>
                </div>
                <div className="preview-room__amenities-grid">
                  {roomData.amenities.map(amenity => (
                    <div key={amenity} className="preview-room__amenity-item">
                      <div className="preview-room__amenity-icon">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="preview-room__amenity-text">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extras */}
              {roomData.extras.length > 0 && (
                <div className="preview-room__extras-section">
                  <div className="preview-room__section-header">
                    <div className="preview-room__section-icon">
                      <FaPlus />
                    </div>
                    <div>
                      <h3 className="preview-room__section-title">Additional Services</h3>
                      <p className="preview-room__section-subtitle">Extra services and features</p>
                    </div>
                  </div>
                  <div className="preview-room__amenities-grid">
                    {roomData.extras.map(extra => (
                      <div key={extra} className="preview-room__amenity-item">
                        <div className="preview-room__amenity-icon">
                          {getExtraIcon(extra)}
                        </div>
                        <span className="preview-room__amenity-text">{extra}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="preview-room__location-section">
                <div className="preview-room__section-header">
                  <div className="preview-room__section-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="preview-room__section-title">Location</h3>
                    <p className="preview-room__section-subtitle">Property location details</p>
                  </div>
                </div>
                <div className="preview-room__amenities-grid">
                  <div className="preview-room__amenity-item">
                    <div className="preview-room__amenity-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <span className="preview-room__amenity-text">{roomData.address}</span>
                  </div>
                </div>
              </div>

              {/* Room Rules */}
              {roomData.roomRules && (
                <div className="preview-room__rules-section">
                  <div className="preview-room__section-header">
                    <div className="preview-room__section-icon">
                      <FaCheck />
                    </div>
                    <div>
                      <h3 className="preview-room__section-title">Room Rules & Policies</h3>
                      <p className="preview-room__section-subtitle">Rules and cancellation policy</p>
                    </div>
                  </div>
                  <div className="preview-room__amenities-grid">
                    <div className="preview-room__amenity-item">
                      <div className="preview-room__amenity-icon">
                        <FaCheck />
                      </div>
                      <span className="preview-room__amenity-text">{roomData.roomRules}</span>
                    </div>
                    <div className="preview-room__amenity-item">
                      <div className="preview-room__amenity-icon">
                        {roomData.cancellationPolicy === 'free' ? <FaCheck /> : <FaTimes />}
                      </div>
                      <span className="preview-room__amenity-text">
                        Cancellation Policy: {roomData.cancellationPolicy === 'free' ? 'Free cancellation until check-in date' : 'No cancellation allowed after booking'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="preview-room__sidebar">
            <div className="preview-room__pricing-card glass-card">
              <div className="preview-room__pricing-header">
                <h3 className="preview-room__pricing-title">Pricing</h3>
              </div>
              <div className="preview-room__pricing-details">
                <div className="preview-room__price-item">
                  <span className="preview-room__price-label">Base Price</span>
                  <span className="preview-room__price-value">
                    {formatCurrency(roomData.pricePerNight)}/night
                  </span>
                </div>
                
                {roomData.taxesAndFees > 0 && (
                  <div className="preview-room__price-item">
                    <span className="preview-room__price-label">Taxes & Fees</span>
                    <span className="preview-room__price-value">
                      {formatCurrency(roomData.taxesAndFees)}
                    </span>
                  </div>
                )}
                
                {roomData.discount > 0 && (
                  <div className="preview-room__price-item preview-room__price-item--discount">
                    <span className="preview-room__price-label">Discount ({roomData.discount}%)</span>
                    <span className="preview-room__price-value">
                      -{formatCurrency(roomData.pricePerNight * roomData.discount / 100)}
                    </span>
                  </div>
                )}
              </div>

              <div className="preview-room__final-price">
                <div className="preview-room__final-price-content">
                  <span className="preview-room__final-price-label">Final Price</span>
                  <span className="preview-room__final-price-value">
                    <FaRupeeSign /> {formatCurrency(calculateFinalPrice())}/night
                  </span>
                </div>
              </div>

              <div className="preview-room__booking-actions">
                <button className="btn btn--primary btn--lg">
                  Book Now
                </button>
                <button className="btn btn--secondary">
                  Add to Wishlist
                </button>
              </div>
            </div>

            <div className="preview-room__actions-card glass-card">
              <h3 className="preview-room__actions-title">Room Management</h3>
              <div className="preview-room__management-actions">
                <Link to={`/edit-room/${roomData.id}`} className="btn btn--secondary">
                  <FaCheck /> Edit Room
                </Link>
                <Link to="/availability-calendar" className="btn btn--secondary">
                  <FaCalendarAlt /> Manage Availability
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewRoom;