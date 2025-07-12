import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaChevronLeft, 
  FaChevronRight,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBed,
  FaCircle,
  FaSquare,
  FaCheck,
  FaTimes,
  FaLock,
  FaUnlock,
  FaEye
} from 'react-icons/fa';
import './AvailabilityCalendar.css';

const AvailabilityCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [isRangeSelection, setIsRangeSelection] = useState(false);
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  // Sample rooms data
  const rooms = [
    { id: 1, name: 'Deluxe Ocean View Suite', type: 'Suite' },
    { id: 2, name: 'Standard Double Room', type: 'Double' },
    { id: 3, name: 'Family Suite', type: 'Suite' }
  ];

  // Sample bookings data with guest details
  const bookings = {
    '2024-01-15': [
      { 
        roomId: 1, 
        guestName: 'John Doe', 
        phone: '+91 9876543210', 
        email: 'john@example.com', 
        nights: 3,
        bookingId: 'BK001',
        checkIn: '2024-01-15',
        checkOut: '2024-01-18',
        totalAmount: 25500
      },
      { 
        roomId: 2, 
        guestName: 'Jane Smith', 
        phone: '+91 9876543211', 
        email: 'jane@example.com', 
        nights: 2,
        bookingId: 'BK002',
        checkIn: '2024-01-15',
        checkOut: '2024-01-17',
        totalAmount: 7000
      }
    ],
    '2024-01-20': [
      { 
        roomId: 1, 
        guestName: 'Robert Johnson', 
        phone: '+91 9876543212', 
        email: 'robert@example.com', 
        nights: 2,
        bookingId: 'BK003',
        checkIn: '2024-01-20',
        checkOut: '2024-01-22',
        totalAmount: 17000
      }
    ],
    '2024-01-25': [
      { 
        roomId: 2, 
        guestName: 'Emily Davis', 
        phone: '+91 9876543213', 
        email: 'emily@example.com', 
        nights: 1,
        bookingId: 'BK004',
        checkIn: '2024-01-25',
        checkOut: '2024-01-26',
        totalAmount: 3500
      },
      { 
        roomId: 3, 
        guestName: 'Michael Brown', 
        phone: '+91 9876543214', 
        email: 'michael@example.com', 
        nights: 4,
        bookingId: 'BK005',
        checkIn: '2024-01-25',
        checkOut: '2024-01-29',
        totalAmount: 48000
      }
    ]
  };

  // Room availability status
  const [roomAvailability, setRoomAvailability] = useState({
    1: { 
      available: true, 
      blocked: ['2024-01-18', '2024-01-19'],
      unavailableReason: {}
    },
    2: { 
      available: true, 
      blocked: ['2024-01-28', '2024-01-29'],
      unavailableReason: {
        '2024-01-28': 'Maintenance',
        '2024-01-29': 'Maintenance'
      }
    },
    3: { 
      available: false, 
      blocked: ['2024-01-30', '2024-01-31'],
      unavailableReason: {
        '2024-01-30': 'Personal Use',
        '2024-01-31': 'Personal Use'
      }
    }
  });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getDayStatus = (day, roomId = null) => {
    if (!day) return 'empty';
    
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayBookings = bookings[dateStr] || [];
    
    // If specific room is selected, check only that room
    if (roomId) {
      const roomBooking = dayBookings.find(booking => booking.roomId === roomId);
      if (roomBooking) return 'booked';
      
      const roomAvail = roomAvailability[roomId];
      if (roomAvail && roomAvail.blocked.includes(dateStr)) return 'blocked';
      
      return 'available';
    }
    
    // For all rooms view
    if (dayBookings.length > 0) return 'booked';
    
    const hasBlockedRoom = Object.values(roomAvailability).some(room => 
      room.blocked.includes(dateStr)
    );
    
    if (hasBlockedRoom) return 'blocked';
    return 'available';
  };

  const handleDateClick = (day) => {
    if (!day) return;
    
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    // If range selection is active
    if (isRangeSelection) {
      if (!rangeStart) {
        setRangeStart(dateStr);
        setSelectedDate(dateStr);
      } else if (!rangeEnd && dateStr !== rangeStart) {
        const start = new Date(rangeStart);
        const end = new Date(dateStr);
        
        if (end > start) {
          setRangeEnd(dateStr);
        } else {
          setRangeStart(dateStr);
          setRangeEnd(rangeStart);
        }
      } else {
        // Reset range selection
        setRangeStart(dateStr);
        setRangeEnd(null);
        setSelectedDate(dateStr);
      }
    } else {
      setSelectedDate(dateStr);
      setRangeStart(null);
      setRangeEnd(null);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
    setRangeStart(null);
    setRangeEnd(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
    setRangeStart(null);
    setRangeEnd(null);
  };

  const toggleRoomAvailability = (roomId) => {
    setRoomAvailability(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        available: !prev[roomId].available
      }
    }));
  };

  const blockDate = (roomId, date, reason = 'Blocked by vendor') => {
    setRoomAvailability(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        blocked: [...prev[roomId].blocked, date],
        unavailableReason: {
          ...prev[roomId].unavailableReason,
          [date]: reason
        }
      }
    }));
  };

  const unblockDate = (roomId, date) => {
    setRoomAvailability(prev => {
      const newUnavailableReason = { ...prev[roomId].unavailableReason };
      delete newUnavailableReason[date];
      
      return {
        ...prev,
        [roomId]: {
          ...prev[roomId],
          blocked: prev[roomId].blocked.filter(d => d !== date),
          unavailableReason: newUnavailableReason
        }
      };
    });
  };

  const blockDateRange = (roomId, startDate, endDate, reason = 'Blocked by vendor') => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(formatDate(d.getFullYear(), d.getMonth(), d.getDate()));
    }
    
    setRoomAvailability(prev => {
      const newBlocked = [...prev[roomId].blocked, ...dates];
      const newUnavailableReason = { ...prev[roomId].unavailableReason };
      
      dates.forEach(date => {
        newUnavailableReason[date] = reason;
      });
      
      return {
        ...prev,
        [roomId]: {
          ...prev[roomId],
          blocked: [...new Set(newBlocked)], // Remove duplicates
          unavailableReason: newUnavailableReason
        }
      };
    });
  };

  const getSelectedDateBookings = () => {
    if (!selectedDate) return [];
    return bookings[selectedDate] || [];
  };

  const isDateInRange = (day) => {
    if (!rangeStart || !rangeEnd || !day) return false;
    
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    const date = new Date(dateStr);
    const start = new Date(rangeStart);
    const end = new Date(rangeEnd);
    
    return date >= start && date <= end;
  };

  const isDateRangeStart = (day) => {
    if (!rangeStart || !day) return false;
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    return dateStr === rangeStart;
  };

  const isDateRangeEnd = (day) => {
    if (!rangeEnd || !day) return false;
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    return dateStr === rangeEnd;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="availability-calendar">
      <div className="availability-calendar__container">
        <div className="availability-calendar__header">
          <div className="availability-calendar__header-content glass-card">
            <Link to="/settings/rooms" className="availability-calendar__back-btn">
              <FaArrowLeft />
            </Link>
            <div className="availability-calendar__header-text">
              <h1 className="availability-calendar__title">Availability Calendar</h1>
              <p className="availability-calendar__subtitle">Manage room availability and view bookings</p>
            </div>
          </div>
        </div>

        <div className="availability-calendar__content">
          <div className="availability-calendar__main">
            <div className="availability-calendar__calendar-section glass-card">
              <div className="availability-calendar__controls">
                <div className="availability-calendar__room-filter">
                  <label className="availability-calendar__filter-label">Filter by Room:</label>
                  <select 
                    value={selectedRoom} 
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="availability-calendar__filter-select"
                  >
                    <option value="all">All Rooms</option>
                    {rooms.map(room => (
                      <option key={room.id} value={room.id}>{room.name}</option>
                    ))}
                  </select>
                </div>

                <div className="availability-calendar__range-toggle">
                  <label className="availability-calendar__range-label">
                    <input
                      type="checkbox"
                      checked={isRangeSelection}
                      onChange={(e) => {
                        setIsRangeSelection(e.target.checked);
                        setRangeStart(null);
                        setRangeEnd(null);
                        setSelectedDate(null);
                      }}
                      className="availability-calendar__range-checkbox"
                    />
                    <span>Range Selection Mode</span>
                  </label>
                </div>

                <div className="availability-calendar__legend">
                  <div className="availability-calendar__legend-item">
                    <FaCircle className="availability-calendar__legend-icon availability-calendar__legend-icon--available" />
                    <span>Available</span>
                  </div>
                  <div className="availability-calendar__legend-item">
                    <FaCircle className="availability-calendar__legend-icon availability-calendar__legend-icon--booked" />
                    <span>Booked</span>
                  </div>
                  <div className="availability-calendar__legend-item">
                    <FaSquare className="availability-calendar__legend-icon availability-calendar__legend-icon--blocked" />
                    <span>Blocked</span>
                  </div>
                </div>
              </div>

              <div className="availability-calendar__calendar">
                <div className="availability-calendar__calendar-header">
                  <button 
                    onClick={handlePrevMonth}
                    className="availability-calendar__nav-btn"
                  >
                    <FaChevronLeft />
                  </button>
                  <h2 className="availability-calendar__month-year">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <button 
                    onClick={handleNextMonth}
                    className="availability-calendar__nav-btn"
                  >
                    <FaChevronRight />
                  </button>
                </div>

                <div className="availability-calendar__calendar-grid">
                  {dayNames.map(day => (
                    <div key={day} className="availability-calendar__day-header">
                      {day}
                    </div>
                  ))}
                  
                  {getDaysInMonth(currentDate).map((day, index) => {
                    const dateStr = day ? formatDate(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
                    const dayStatus = getDayStatus(day);
                    const isSelected = selectedDate === dateStr;
                    const isInRange = isDateInRange(day);
                    const isRangeStartDay = isDateRangeStart(day);
                    const isRangeEndDay = isDateRangeEnd(day);
                    
                    return (
                      <div
                        key={index}
                        className={`availability-calendar__day ${
                          day ? `availability-calendar__day--${dayStatus}` : 'availability-calendar__day--empty'
                        } ${isSelected ? 'availability-calendar__day--selected' : ''} ${
                          isInRange ? 'availability-calendar__day--in-range' : ''
                        } ${isRangeStartDay ? 'availability-calendar__day--range-start' : ''} ${
                          isRangeEndDay ? 'availability-calendar__day--range-end' : ''
                        }`}
                        onClick={() => handleDateClick(day)}
                      >
                        {day && (
                          <>
                            <span className="availability-calendar__day-number">{day}</span>
                            {bookings[dateStr] && (
                              <div className="availability-calendar__booking-indicator">
                                {bookings[dateStr].length}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Range Selection Actions */}
              {isRangeSelection && rangeStart && rangeEnd && (
                <div className="availability-calendar__range-actions">
                  <h4 className="availability-calendar__range-title">
                    Block Range: {new Date(rangeStart).toLocaleDateString()} - {new Date(rangeEnd).toLocaleDateString()}
                  </h4>
                  <div className="availability-calendar__range-buttons">
                    {rooms.map(room => (
                      <button
                        key={room.id}
                        onClick={() => {
                          const reason = prompt('Enter reason for blocking (optional):') || 'Blocked by vendor';
                          blockDateRange(room.id, rangeStart, rangeEnd, reason);
                          setRangeStart(null);
                          setRangeEnd(null);
                          setSelectedDate(null);
                        }}
                        className="availability-calendar__range-block-btn"
                      >
                        <FaLock /> Block {room.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="availability-calendar__sidebar">
            {/* Room Status Panel */}
            <div className="availability-calendar__room-status glass-card">
              <div className="availability-calendar__section-header">
                <FaBed className="availability-calendar__section-icon" />
                <h3 className="availability-calendar__section-title">Room Status</h3>
              </div>

              <div className="availability-calendar__rooms-list">
                {rooms.map(room => (
                  <div key={room.id} className="availability-calendar__room-item">
                    <div className="availability-calendar__room-info">
                      <h4 className="availability-calendar__room-name">{room.name}</h4>
                      <p className="availability-calendar__room-type">{room.type}</p>
                    </div>
                    <div className="availability-calendar__room-controls">
                      <button
                        onClick={() => toggleRoomAvailability(room.id)}
                        className={`availability-calendar__status-btn ${
                          roomAvailability[room.id]?.available 
                            ? 'availability-calendar__status-btn--active' 
                            : 'availability-calendar__status-btn--inactive'
                        }`}
                      >
                        {roomAvailability[room.id]?.available ? 'Available' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Date Info */}
            {selectedDate && (
              <div className="availability-calendar__date-info glass-card">
                <div className="availability-calendar__section-header">
                  <FaCalendarAlt className="availability-calendar__section-icon" />
                  <h3 className="availability-calendar__section-title">
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                </div>

                <div className="availability-calendar__bookings-list">
                  {getSelectedDateBookings().length > 0 ? (
                    getSelectedDateBookings().map((booking, index) => {
                      const room = rooms.find(r => r.id === booking.roomId);
                      return (
                        <div key={index} className="availability-calendar__booking-item">
                          <div className="availability-calendar__booking-header">
                            <h4 className="availability-calendar__guest-name">
                              <FaUser /> {booking.guestName}
                            </h4>
                            <span className="availability-calendar__nights-badge">
                              {booking.nights} night{booking.nights > 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="availability-calendar__booking-details">
                            <p className="availability-calendar__room-booked">
                              <FaBed /> {room?.name}
                            </p>
                            <p className="availability-calendar__contact-info">
                              <FaPhone /> {booking.phone}
                            </p>
                            <p className="availability-calendar__contact-info">
                              <FaEnvelope /> {booking.email}
                            </p>
                            <p className="availability-calendar__booking-amount">
                              <strong>Amount: {formatCurrency(booking.totalAmount)}</strong>
                            </p>
                            <p className="availability-calendar__booking-id">
                              <strong>Booking ID: {booking.bookingId}</strong>
                            </p>
                          </div>
                          <div className="availability-calendar__booking-actions">
                            <button className="availability-calendar__view-booking-btn">
                              <FaEye /> View Details
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="availability-calendar__no-bookings">
                      <p>No bookings for this date</p>
                      <small>Click on rooms below to manage availability</small>
                    </div>
                  )}
                </div>

                {/* Quick Actions for Selected Date */}
                <div className="availability-calendar__date-actions">
                  <h4 className="availability-calendar__actions-title">Quick Actions</h4>
                  <div className="availability-calendar__actions-grid">
                    {rooms.map(room => {
                      const isBooked = getSelectedDateBookings().some(booking => booking.roomId === room.id);
                      const isBlocked = roomAvailability[room.id]?.blocked.includes(selectedDate);
                      const blockReason = roomAvailability[room.id]?.unavailableReason[selectedDate];
                      
                      return (
                        <div key={room.id} className="availability-calendar__action-item">
                          <div className="availability-calendar__action-room-info">
                            <span className="availability-calendar__action-room">{room.name}</span>
                            {isBooked && <span className="availability-calendar__booked-label">BOOKED</span>}
                            {isBlocked && blockReason && (
                              <span className="availability-calendar__block-reason">({blockReason})</span>
                            )}
                          </div>
                          {!isBooked && (
                            <>
                              {isBlocked ? (
                                <button
                                  onClick={() => unblockDate(room.id, selectedDate)}
                                  className="availability-calendar__action-btn availability-calendar__action-btn--unblock"
                                >
                                  <FaUnlock /> Unblock
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    const reason = prompt('Enter reason for blocking (optional):') || 'Blocked by vendor';
                                    blockDate(room.id, selectedDate, reason);
                                  }}
                                  className="availability-calendar__action-btn availability-calendar__action-btn--block"
                                >
                                  <FaLock /> Block
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;