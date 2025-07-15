import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaFilter, FaUser, FaPhone, FaIdCard, FaTimes, FaExclamationTriangle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { roomTypes, floors, rooms, bookingsData, blockedDates } from '../../../data/roomsbookingdata';
import './AvailabilityCalendar.css';

const AvailabilityCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [blockReason, setBlockReason] = useState('');
  const [bookings, setBookings] = useState(bookingsData);
  const [blocked, setBlocked] = useState(blockedDates);

  // Get calendar data
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days = [];
    const startDay = firstDay.getDay();

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = (startDay + day - 1) % 7;
      days.push({ day, dayOfWeek });
    }
    
    return days;
  };

  // Get current room based on filters
  const getCurrentRoom = () => {
    if (selectedRoom) {
      return rooms.find(room => room.id === selectedRoom);
    }
    
    return null;
  };

  const currentRoom = getCurrentRoom();

  // Get room status for a specific date
  const getRoomStatus = (roomId, date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    // Check if blocked
    const isBlocked = blocked.some(block => 
      block.roomId === roomId && block.date === dateStr
    );
    if (isBlocked) return 'blocked';
    
    // Check if booked
    const booking = bookings.find(booking => 
      booking.roomId === roomId && 
      dateStr >= booking.checkIn && 
      dateStr <= booking.checkOut
    );
    
    if (booking) {
      return booking.status === 'cancelled' ? 'cancelled' : 'booked';
    }
    
    return 'available';
  };

  // Get booking details for a specific date
  const getBookingDetails = (roomId, date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    const booking = bookings.find(booking => 
      booking.roomId === roomId && 
      dateStr >= booking.checkIn && 
      dateStr <= booking.checkOut
    );
    
    const blockInfo = blocked.find(block => 
      block.roomId === roomId && block.date === dateStr
    );
    
    return { booking, blockInfo };
  };

  // Handle date click
  const handleDateClick = (day) => {
    if (!day || !currentRoom) return;
    
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day);
    setSelectedDate({ date: clickedDate, roomId: currentRoom.id });
  };

  // Handle room blocking
  const handleBlockRoom = () => {
    if (!selectedDate || !blockReason.trim()) return;
    
    const dateStr = selectedDate.date.toISOString().split('T')[0];
    const newBlock = {
      id: `BL${Date.now()}`,
      roomId: selectedDate.roomId,
      date: dateStr,
      reason: blockReason.trim()
    };
    
    setBlocked([...blocked, newBlock]);
    setShowModal(false);
    setBlockReason('');
    setSelectedDate(null);
  };

  // Navigate months
  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
    setSelectedDate(null);
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedRoom('');
    setSelectedFloor('');
    setSelectedRoomType('');
    setSelectedDate(null);
    setCurrentDate(new Date()); // Reset to current month
  };

  // Handle filter changes
  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
    setSelectedRoom(''); // Reset room selection when room type changes
    setSelectedDate(null); // Clear selected date
    setCurrentDate(new Date()); // Reset to current month
  };

  const handleFloorChange = (e) => {
    setSelectedFloor(e.target.value);
    setSelectedRoom(''); // Reset room selection when floor changes
    setSelectedDate(null); // Clear selected date
    setCurrentDate(new Date()); // Reset to current month
  };

  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
    setSelectedDate(null); // Clear selected date
    setCurrentDate(new Date()); // Reset to current month
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="availability">
      <div className="availability__container">
        {/* Header */}
        <div className="availability__header">
          <div className="availability__header-content">
            <div className="availability__header-icon">
              <FaCalendarAlt />
            </div>
            <div className="availability__header-text">
              <h1 className="availability__title">Room Availability Calendar</h1>
              <p className="availability__subtitle">
                Manage room bookings and availability with real-time status updates
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="availability__filters">
          <div className="availability__filters-header">
            <div className="availability__filters-left">
              <FaFilter className="availability__filters-icon" />
              <h3 className="availability__filters-title">Filter Rooms</h3>
            </div>
            <button 
              className="availability__clear-filters"
              onClick={clearFilters}
            >
              Clear All
            </button>
          </div>
          
          <div className="availability__filters-content">
            <div className="availability__filter-group">
              <label className="availability__filter-label">Room Type</label>
              <select 
                className="availability__filter-select"
                value={selectedRoomType}
                onChange={handleRoomTypeChange} // Updated handler
              >
                <option value="">All Types</option>
                {roomTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <div className="availability__filter-group">
              <label className="availability__filter-label">Floor</label>
              <select 
                className="availability__filter-select"
                value={selectedFloor}
                onChange={handleFloorChange} // Updated handler
              >
                <option value="">All Floors</option>
                {floors.map(floor => (
                  <option key={floor.id} value={floor.id}>Floor {floor.name}</option>
                ))}
              </select>
            </div>

            <div className="availability__filter-group">
              <label className="availability__filter-label">Room Number</label>
              <select 
                className="availability__filter-select"
                value={selectedRoom}
                onChange={handleRoomChange} // Updated handler
              >
                <option value="">Select Room</option>
                {rooms
                  .filter(room => {
                    if (selectedFloor && room.floor !== parseInt(selectedFloor)) return false;
                    if (selectedRoomType && room.type !== selectedRoomType) return false;
                    return true;
                  })
                  .map(room => (
                    <option key={room.id} value={room.id}>Room {room.number}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="availability__main">
          {currentRoom ? (
            <div className="availability__calendar-section">
              {/* Current Room Info */}
              <div className="availability__current-room">
                <h2 className="availability__current-room-title">
                  Room {currentRoom.number} - {roomTypes.find(t => t.id === currentRoom.type)?.name}
                </h2>
                <span className="availability__current-room-floor">Floor {currentRoom.floor}</span>
              </div>

              {/* Calendar Navigation */}
              <div className="availability__calendar-nav">
                <button 
                  className="availability__nav-btn"
                  onClick={() => navigateMonth(-1)}
                >
                  <FaChevronLeft />
                </button>
                <h3 className="availability__month-title">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button 
                  className="availability__nav-btn"
                  onClick={() => navigateMonth(1)}
                >
                  <FaChevronRight />
                </button>
              </div>

              {/* Legend */}
              <div className="availability__legend">
                <div className="availability__legend-item">
                  <div className="availability__legend-color availability__legend-color--available"></div>
                  <span>Available</span>
                </div>
                <div className="availability__legend-item">
                  <div className="availability__legend-color availability__legend-color--booked"></div>
                  <span>Booked</span>
                </div>
                <div className="availability__legend-item">
                  <div className="availability__legend-color availability__legend-color--cancelled"></div>
                  <span>Cancelled</span>
                </div>
                <div className="availability__legend-item">
                  <div className="availability__legend-color availability__legend-color--blocked"></div>
                  <span>Blocked</span>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="availability__calendar-wrapper">
                <div className="availability__calendar-grid">
                  {/* Day headers */}
                  {dayNames.map(day => (
                    <div key={day} className="availability__day-header">{day}</div>
                  ))}
                  
                  {/* Calendar days */}
                  {getDaysInMonth(currentDate).map((dayObj, index) => {
                    const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayObj.day);
                    const status = getRoomStatus(currentRoom.id, cellDate);
                    const isSelected = selectedDate && 
                      selectedDate.date.getDate() === dayObj.day && 
                      selectedDate.date.getMonth() === currentDate.getMonth() &&
                      selectedDate.date.getFullYear() === currentDate.getFullYear();
                    
                    return (
                      <div 
                        key={dayObj.day}
                        className={`availability__day availability__day--${status} ${isSelected ? 'availability__day--selected' : ''}`}
                        onClick={() => handleDateClick(dayObj)}
                        style={{ gridColumn: index === 0 ? dayObj.dayOfWeek + 1 : 'auto' }}
                      >
                        <span className="availability__day-number">{dayObj.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="availability__room-selection">
              <div className="availability__room-selection-content">
                <div className="availability__room-selection-icon">
                  <FaCalendarAlt />
                </div>
                <h2 className="availability__room-selection-title">Select a Room</h2>
                <p className="availability__room-selection-description">
                  Please use the filters above to select a room and view its availability calendar.
                  You can filter by room type, floor, or choose a specific room number.
                </p>
                <div className="availability__room-selection-stats">
                  <div className="availability__stat-item">
                    <span className="availability__stat-number">{rooms.length}</span>
                    <span className="availability__stat-label">Total Rooms</span>
                  </div>
                  <div className="availability__stat-item">
                    <span className="availability__stat-number">{roomTypes.length}</span>
                    <span className="availability__stat-label">Room Types</span>
                  </div>
                  <div className="availability__stat-item">
                    <span className="availability__stat-number">{floors.length}</span>
                    <span className="availability__stat-label">Floors</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Details Panel */}
          <div className="availability__details">
            <div className="availability__details-header">
              <h3 className="availability__details-title">Booking Details</h3>
            </div>
            
            <div className="availability__details-content">
              {selectedDate ? (
                <>
                  <div className="availability__details-info">
                    <div className="availability__details-date">
                      <strong>Selected Date:</strong> {selectedDate.date.toLocaleDateString()}
                    </div>
                    <div className="availability__details-room">
                      <strong>Room:</strong> {rooms.find(r => r.id === selectedDate?.roomId)?.number}
                    </div>
                  </div>
                  
                  {(() => {
                    const { booking, blockInfo } = getBookingDetails(selectedDate.roomId, selectedDate.date);
                    const status = getRoomStatus(selectedDate.roomId, selectedDate.date);
                    
                    if (status === 'blocked') {
                      return (
                        <div className="availability__details-blocked">
                          <h4 className="availability__details-status-title">Room Blocked</h4>
                          <p><strong>Reason:</strong> {blockInfo?.reason}</p>
                        </div>
                      );
                    }
                    
                    if (booking) {
                      return (
                        <div className="availability__details-booking">
                          <h4 className="availability__details-status-title">Booking Information</h4>
                          <div className="availability__booking-info">
                            <div className="availability__booking-item">
                              <FaUser className="availability__booking-icon" />
                              <span><strong>Guest:</strong> {booking.guestName}</span>
                            </div>
                            <div className="availability__booking-item">
                              <FaIdCard className="availability__booking-icon" />
                              <span><strong>Booking ID:</strong> {booking.id}</span>
                            </div>
                            <div className="availability__booking-item">
                              <span><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</span>
                            </div>
                            <div className="availability__booking-item">
                              <span><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</span>
                            </div>
                            <div className="availability__booking-item">
                              <FaPhone className="availability__booking-icon" />
                              <span><strong>Contact:</strong> {booking.contact}</span>
                            </div>
                            <div className="availability__booking-item">
                              <span><strong>Status:</strong> 
                                <span className={`availability__status availability__status--${booking.status}`}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div className="availability__details-available">
                        <h4 className="availability__details-status-title">Room Available</h4>
                        <p>This room is available for booking on the selected date.</p>
                        <button 
                          className="availability__block-btn"
                          onClick={() => setShowModal(true)}
                        >
                          Block Room
                        </button>
                      </div>
                    );
                  })()}
                </>
              ) : (
                <div className="availability__details-empty">
                  <p>Click on a date to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Block Room Modal */}
        {showModal && (
          <div className="availability__modal-overlay">
            <div className="availability__modal">
              <div className="availability__modal-header">
                <h3 className="availability__modal-title">
                  <FaExclamationTriangle className="availability__modal-icon" />
                  Block Room
                </h3>
                <button 
                  className="availability__modal-close"
                  onClick={() => setShowModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="availability__modal-content">
                <p className="availability__modal-text">
                  Block Room {rooms.find(r => r.id === selectedDate?.roomId)?.number} 
                  for {selectedDate?.date.toLocaleDateString()}?
                </p>
                
                <div className="availability__modal-form">
                  <label className="availability__modal-label">
                    Reason for blocking:
                  </label>
                  <textarea 
                    className="availability__modal-textarea"
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    placeholder="Enter reason for blocking this room..."
                    rows="3"
                  />
                </div>
              </div>
              
              <div className="availability__modal-actions">
                <button 
                  className="availability__modal-btn availability__modal-btn--cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="availability__modal-btn availability__modal-btn--confirm"
                  onClick={handleBlockRoom}
                  disabled={!blockReason.trim()}
                >
                  Confirm Block
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;