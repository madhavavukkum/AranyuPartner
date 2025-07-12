import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBed, FaSave } from 'react-icons/fa';
import './EditRoom.css';

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    roomName: '',
    roomType: 'Single',
    maxGuests: 1,
    bedType: '',
    roomSize: '',
    pricePerNight: '',
    // Add other fields as needed
  });

  useEffect(() => {
    // In a real app, fetch room data by ID
    // For now, using mock data
    const mockRoomData = {
      roomName: 'Deluxe Ocean View Suite',
      roomType: 'Suite',
      maxGuests: 4,
      bedType: 'King',
      roomSize: '450',
      pricePerNight: '8500',
    };
    setFormData(mockRoomData);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Room updated:', formData);
    alert('Room updated successfully!');
    navigate('/rooms');
  };

  return (
    <div className="edit-room">
      <div className="edit-room__container">
        <div className="edit-room__header">
          <div className="edit-room__header-content glass-card">
            <Link to="/settings/rooms" className="edit-room__back-btn">
              <FaArrowLeft />
            </Link>
            <div className="edit-room__header-text">
              <h1 className="edit-room__title">Edit Room</h1>
              <p className="edit-room__subtitle">Update your room details</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="edit-room__form">
          <div className="edit-room__section glass-card">
            <div className="edit-room__section-header">
              <div className="edit-room__section-icon">
                <FaBed />
              </div>
              <div>
                <h2 className="edit-room__section-title">Room Information</h2>
                <p className="edit-room__section-subtitle">Update your room details</p>
              </div>
            </div>

            <div className="edit-room__form-grid">
              <div className="edit-room__form-group">
                <label className="edit-room__label">Room Name</label>
                <input
                  type="text"
                  name="roomName"
                  value={formData.roomName}
                  onChange={handleInputChange}
                  className="edit-room__input"
                  required
                />
              </div>

              <div className="edit-room__form-group">
                <label className="edit-room__label">Room Type</label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  className="edit-room__select"
                  required
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                  <option value="Deluxe">Deluxe</option>
                </select>
              </div>

              <div className="edit-room__form-group">
                <label className="edit-room__label">Max Guests</label>
                <input
                  type="number"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleInputChange}
                  className="edit-room__input"
                  min="1"
                  max="10"
                  required
                />
              </div>

              <div className="edit-room__form-group">
                <label className="edit-room__label">Bed Type</label>
                <input
                  type="text"
                  name="bedType"
                  value={formData.bedType}
                  onChange={handleInputChange}
                  className="edit-room__input"
                  required
                />
              </div>

              <div className="edit-room__form-group">
                <label className="edit-room__label">Room Size (sq. ft.)</label>
                <input
                  type="number"
                  name="roomSize"
                  value={formData.roomSize}
                  onChange={handleInputChange}
                  className="edit-room__input"
                  required
                />
              </div>

              <div className="edit-room__form-group">
                <label className="edit-room__label">Price per Night (₹)</label>
                <input
                  type="number"
                  name="pricePerNight"
                  value={formData.pricePerNight}
                  onChange={handleInputChange}
                  className="edit-room__input"
                  required
                />
              </div>
            </div>

            <div className="edit-room__submit-section">
              <button type="submit" className="btn btn--primary btn--lg">
                <FaSave /> Update Room
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;