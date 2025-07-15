import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHotel, 
  FaPlus, 
  FaCalendarAlt, 
  FaList, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaBed,
  FaUsers,
  FaRupeeSign
} from 'react-icons/fa';
import './RoomsDashboard.css';

const RoomsDashboard = () => {
  const [activeTab, setActiveTab] = useState('listings');
  
  // Initialize rooms from local storage or fallback to sample data
  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem('rooms');
    return savedRooms ? JSON.parse(savedRooms) : [
      {
        id: 1,
        name: 'Deluxe Ocean View Suite',
        type: 'Suite',
        maxGuests: 4,
        bedType: 'King',
        size: 450,
        pricePerNight: 8500,
        coverImage: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
        amenities: ['AC', 'WiFi', 'TV', 'Mini Bar', 'Balcony']
      },
      {
        id: 2,
        name: 'Standard Double Room',
        type: 'Double',
        maxGuests: 2,
        bedType: 'Double',
        size: 280,
        pricePerNight: 3500,
        coverImage: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
        amenities: ['AC', 'WiFi', 'TV', 'Private Bathroom']
      },
      {
        id: 3,
        name: 'Family Suite',
        type: 'Suite',
        maxGuests: 6,
        bedType: 'King + Twin',
        size: 550,
        pricePerNight: 12000,
        coverImage: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400',
        amenities: ['AC', 'WiFi', 'TV', 'Mini Bar', 'Balcony', 'Extra Bed Available']
      }
    ];
  });

  // Update local storage whenever rooms change
  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);

  const deleteRoom = (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(rooms.filter(room => room.id !== roomId));
      console.log(`Deleted room ${roomId}`);
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'listings':
        return renderListings();
      case 'calendar':
        return renderCalendarRedirect();
      default:
        return renderListings();
    }
  };

  const renderListings = () => (
    <div className="roomsdashboard__tab-content">
      <div className="roomsdashboard__content-header">
        <div className="roomsdashboard__content-header-left">
          <div className="roomsdashboard__content-icon">
            <FaList />
          </div>
          <div>
            <h2 className="roomsdashboard__content-title">Types of Rooms</h2>
            <p className="roomsdashboard__content-subtitle">Manage your hotel rooms and their availability</p>
          </div>
        </div>
        <Link to="/settings/add-room" className="btn btn--primary">
          <FaPlus /> Add
        </Link>
      </div>

      {rooms.length === 0 ? (
        <div className="roomsdashboard__empty-state">
          <div className="roomsdashboard__empty-icon">
            <FaBed />
          </div>
          <h3 className="roomsdashboard__empty-title">No rooms added yet</h3>
          <p className="roomsdashboard__empty-description">
            Start by adding your first room to begin managing your hotel inventory
          </p>
          <Link to="/settings/add-room" className="btn btn--primary">
            <FaPlus /> Add Your First Room
          </Link>
        </div>
      ) : (
        <div className="roomsdashboard__rooms-grid">
          {rooms.map(room => (
            <div key={room.id} className="roomsdashboard__room-card">
              <div className="roomsdashboard__room-image">
                <img src={room.coverImage} alt={room.type} />
              </div>
              
              <div className="roomsdashboard__room-content">
                <div className="roomsdashboard__room-header">
                  <h3 className="roomsdashboard__room-name">{room.type}</h3>
                  <div className="roomsdashboard__room-actions">
                    <Link 
                      to={`/settings/preview-room/${room.id}`}
                      className="roomsdashboard__action-btn roomsdashboard__action-btn--view"
                      title="Preview Room"
                    >
                      <FaEye />
                    </Link>
                    <Link 
                      to={`/settings/edit-room/${room.id}`}
                      className="roomsdashboard__action-btn roomsdashboard__action-btn--edit"
                      title="Edit Room"
                    >
                      <FaEdit />
                    </Link>
                    <button 
                      className="roomsdashboard__action-btn roomsdashboard__action-btn--delete"
                      onClick={() => deleteRoom(room.id)}
                      title="Delete Room"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="roomsdashboard__room-details">
                  <div className="roomsdashboard__room-detail">
                    <span className="roomsdashboard__detail-label">Type: {room.type}</span>
                  </div>
                  <div className="roomsdashboard__room-detail">
                    <span className="roomsdashboard__detail-label">Guests: </span>
                    <span className="roomsdashboard__detail-value">
                      <FaUsers /> {room.maxGuests}
                    </span>
                  </div>
                  <div className="roomsdashboard__room-detail">
                    <span className="roomsdashboard__detail-label">Size: </span>
                    <span className="roomsdashboard__detail-value">{room.size} sq ft</span>
                  </div>
                  <div className="roomsdashboard__room-detail">
                    <span className="roomsdashboard__detail-label">Bed: </span>
                    <span className="roomsdashboard__detail-value">{room.bedType}</span>
                  </div>
                </div>

                <div className="roomsdashboard__room-amenities">
                  {room.amenities.slice(0, 3).map(amenity => (
                    <span key={amenity} className="roomsdashboard__amenity-tag">
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="roomsdashboard__amenity-tag roomsdashboard__amenity-tag--more">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <div className="roomsdashboard__room-footer">
                  <div className="roomsdashboard__room-price">
                    <FaRupeeSign /> {room.pricePerNight.toLocaleString()}/night
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCalendarRedirect = () => (
    <div className="roomsdashboard__redirect-content">
      <div className="roomsdashboard__redirect-icon">
        <FaCalendarAlt />
      </div>
      <h3 className="roomsdashboard__redirect-title">Availability Calendar</h3>
      <p className="roomsdashboard__redirect-description">
        Manage room availability and view bookings on the calendar
      </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/settings/availability-calendar" className="btn btn--primary">
          <FaCalendarAlt /> Open Calendar
        </Link>
      </div>

    </div>
  );

  return (
    <div className="roomsdashboard">
      <div className="roomsdashboard__container">
        <div className="roomsdashboard__header">
          <div className="roomsdashboard__header-content glass-card">
            <div className="roomsdashboard__header-icon">
              <FaHotel />
            </div>
            <div className="roomsdashboard__header-text">
              <h1 className="roomsdashboard__title">Rooms Dashboard</h1>
              <p className="roomsdashboard__subtitle">Manage your hotel rooms and bookings efficiently</p>
            </div>
          </div>
        </div>

        <div className="roomsdashboard__navigation">
          <div className="roomsdashboard__nav-tabs glass-card">
            <button 
              className={`roomsdashboard__nav-tab ${activeTab === 'listings' ? 'roomsdashboard__nav-tab--active' : ''}`}
              onClick={() => setActiveTab('listings')}
            >
              <FaList /> My Listings
            </button>
            
            <Link
              to="/settings/my-rooms"
              className={`roomsdashboard__nav-tab ${activeTab === 'myRooms' ? 'roomsdashboard__nav-tab--active' : ''}`}
              onClick={() => {
                setActiveTab('myRooms');
              }}
            >
              <FaList /> MY ROOMS
            </Link>
            
            <button 
              className={`roomsdashboard__nav-tab ${activeTab === 'calendar' ? 'roomsdashboard__nav-tab--active' : ''}`}
              onClick={() => setActiveTab('calendar')}
            >
              <FaCalendarAlt /> Availability Calendar
            </button>
          </div>
        </div>

        <div className="roomsdashboard__content glass-card">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default RoomsDashboard;