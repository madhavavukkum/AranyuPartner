import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaList, 
  FaSearch,
  FaFilter,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBed,
  FaCalendarAlt,
  FaRupeeSign,
  FaEye,
  FaCheck,
  FaTimes,
  FaClock
} from 'react-icons/fa';
import './BookingsList.css';

const BookingsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roomFilter, setRoomFilter] = useState('all');

  // Sample bookings data
  const [bookings] = useState([
    {
      id: 1,
      bookingId: 'BK001',
      guestName: 'John Doe',
      phone: '+91 9876543210',
      email: 'john@example.com',
      roomName: 'Deluxe Ocean View Suite',
      roomType: 'Suite',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      nights: 3,
      totalAmount: 25500,
      status: 'confirmed',
      bookingDate: '2024-01-10'
    },
    {
      id: 2,
      bookingId: 'BK002',
      guestName: 'Jane Smith',
      phone: '+91 9876543211',
      email: 'jane@example.com',
      roomName: 'Standard Double Room',
      roomType: 'Double',
      checkIn: '2024-01-20',
      checkOut: '2024-01-22',
      nights: 2,
      totalAmount: 7000,
      status: 'pending',
      bookingDate: '2024-01-18'
    },
    {
      id: 3,
      bookingId: 'BK003',
      guestName: 'Robert Johnson',
      phone: '+91 9876543212',
      email: 'robert@example.com',
      roomName: 'Family Suite',
      roomType: 'Suite',
      checkIn: '2024-01-25',
      checkOut: '2024-01-29',
      nights: 4,
      totalAmount: 48000,
      status: 'confirmed',
      bookingDate: '2024-01-22'
    },
    {
      id: 4,
      bookingId: 'BK004',
      guestName: 'Emily Davis',
      phone: '+91 9876543213',
      email: 'emily@example.com',
      roomName: 'Standard Double Room',
      roomType: 'Double',
      checkIn: '2024-01-30',
      checkOut: '2024-02-02',
      nights: 3,
      totalAmount: 10500,
      status: 'cancelled',
      bookingDate: '2024-01-28'
    },
    {
      id: 5,
      bookingId: 'BK005',
      guestName: 'Michael Brown',
      phone: '+91 9876543214',
      email: 'michael@example.com',
      roomName: 'Deluxe Ocean View Suite',
      roomType: 'Suite',
      checkIn: '2024-02-05',
      checkOut: '2024-02-08',
      nights: 3,
      totalAmount: 25500,
      status: 'pending',
      bookingDate: '2024-02-01'
    }
  ]);

  const rooms = [
    { id: 1, name: 'Deluxe Ocean View Suite', type: 'Suite' },
    { id: 2, name: 'Standard Double Room', type: 'Double' },
    { id: 3, name: 'Family Suite', type: 'Suite' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <FaCheck />;
      case 'pending': return <FaClock />;
      case 'cancelled': return <FaTimes />;
      default: return <FaClock />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesRoom = roomFilter === 'all' || booking.roomName === roomFilter;
    
    return matchesSearch && matchesStatus && matchesRoom;
  });

  const handleStatusChange = (bookingId, newStatus) => {
    // In a real app, this would update the backend
    console.log(`Changing booking ${bookingId} status to ${newStatus}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bookings-list">
      <div className="bookings-list__container">
        <div className="bookings-list__header">
          <div className="bookings-list__header-content glass-card">
            <Link to="/settings/rooms" className="bookings-list__back-btn">
              <FaArrowLeft />
            </Link>
            <div className="bookings-list__header-text">
              <h1 className="bookings-list__title">Bookings Management</h1>
              <p className="bookings-list__subtitle">View and manage all your room bookings</p>
            </div>
          </div>
        </div>

        <div className="bookings-list__content glass-card">
          <div className="bookings-list__toolbar">
            <div className="bookings-list__toolbar-left">
              <div className="bookings-list__search-box">
                <FaSearch className="bookings-list__search-icon" />
                <input
                  type="text"
                  placeholder="Search by guest name, booking ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bookings-list__search-input"
                />
              </div>
            </div>

            <div className="bookings-list__toolbar-right">
              <div className="bookings-list__filter-group">
                <FaFilter className="bookings-list__filter-icon" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bookings-list__filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="bookings-list__filter-group">
                <FaBed className="bookings-list__filter-icon" />
                <select
                  value={roomFilter}
                  onChange={(e) => setRoomFilter(e.target.value)}
                  className="bookings-list__filter-select"
                >
                  <option value="all">All Rooms</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.name}>{room.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bookings-list__stats">
            <div className="bookings-list__stat-item">
              <div className="bookings-list__stat-number">{filteredBookings.length}</div>
              <div className="bookings-list__stat-label">Total Bookings</div>
            </div>
            <div className="bookings-list__stat-item">
              <div className="bookings-list__stat-number">
                {filteredBookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div className="bookings-list__stat-label">Confirmed</div>
            </div>
            <div className="bookings-list__stat-item">
              <div className="bookings-list__stat-number">
                {filteredBookings.filter(b => b.status === 'pending').length}
              </div>
              <div className="bookings-list__stat-label">Pending</div>
            </div>
            <div className="bookings-list__stat-item">
              <div className="bookings-list__stat-number">
                {formatCurrency(filteredBookings.reduce((sum, b) => b.status === 'confirmed' ? sum + b.totalAmount : sum, 0))}
              </div>
              <div className="bookings-list__stat-label">Total Revenue</div>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="bookings-list__empty-state">
              <div className="bookings-list__empty-icon">
                <FaList />
              </div>
              <h3 className="bookings-list__empty-title">No bookings found</h3>
              <p className="bookings-list__empty-description">
                {searchTerm || statusFilter !== 'all' || roomFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No bookings have been made yet'
                }
              </p>
            </div>
          ) : (
            <div className="bookings-list__table-container">
              <div className="bookings-list__bookings-grid">
                {filteredBookings.map(booking => (
                  <div key={booking.id} className="bookings-list__booking-card">
                    <div className="bookings-list__booking-header">
                      <div className="bookings-list__booking-id">
                        <span className="bookings-list__id-label">Booking ID:</span>
                        <span className="bookings-list__id-value">{booking.bookingId}</span>
                      </div>
                      <div 
                        className="bookings-list__status-badge" 
                        style={{ backgroundColor: getStatusColor(booking.status) }}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>
                    </div>

                    <div className="bookings-list__booking-content">
                      <div className="bookings-list__guest-info">
                        <div className="bookings-list__guest-main">
                          <h3 className="bookings-list__guest-name">
                            <FaUser /> {booking.guestName}
                          </h3>
                          <div className="bookings-list__contact-info">
                            <span className="bookings-list__contact-item">
                              <FaPhone /> {booking.phone}
                            </span>
                            <span className="bookings-list__contact-item">
                              <FaEnvelope /> {booking.email}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bookings-list__booking-details">
                        <div className="bookings-list__room-info">
                          <div className="bookings-list__detail-item">
                            <FaBed className="bookings-list__detail-icon" />
                            <div>
                              <div className="bookings-list__detail-label">Room</div>
                              <div className="bookings-list__detail-value">{booking.roomName}</div>
                            </div>
                          </div>
                        </div>

                        <div className="bookings-list__dates-info">
                          <div className="bookings-list__detail-item">
                            <FaCalendarAlt className="bookings-list__detail-icon" />
                            <div>
                              <div className="bookings-list__detail-label">Check-in</div>
                              <div className="bookings-list__detail-value">{formatDate(booking.checkIn)}</div>
                            </div>
                          </div>
                          <div className="bookings-list__detail-item">
                            <FaCalendarAlt className="bookings-list__detail-icon" />
                            <div>
                              <div className="bookings-list__detail-label">Check-out</div>
                              <div className="bookings-list__detail-value">{formatDate(booking.checkOut)}</div>
                            </div>
                          </div>
                        </div>

                        <div className="bookings-list__amount-info">
                          <div className="bookings-list__detail-item">
                            <FaRupeeSign className="bookings-list__detail-icon" />
                            <div>
                              <div className="bookings-list__detail-label">Total Amount</div>
                              <div className="bookings-list__detail-value bookings-list__detail-value--amount">
                                {formatCurrency(booking.totalAmount)}
                              </div>
                            </div>
                          </div>
                          <div className="bookings-list__nights-info">
                            {booking.nights} night{booking.nights > 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bookings-list__booking-actions">
                      <div className="bookings-list__booking-meta">
                        <small className="bookings-list__booking-date">
                          Booked on {formatDate(booking.bookingDate)}
                        </small>
                      </div>
                      <div className="bookings-list__action-buttons">
                        <button 
                          className="bookings-list__action-btn bookings-list__action-btn--view"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {booking.status === 'pending' && (
                          <>
                            <button 
                              className="bookings-list__action-btn bookings-list__action-btn--confirm"
                              onClick={() => handleStatusChange(booking.bookingId, 'confirmed')}
                              title="Confirm Booking"
                            >
                              <FaCheck />
                            </button>
                            <button 
                              className="bookings-list__action-btn bookings-list__action-btn--cancel"
                              onClick={() => handleStatusChange(booking.bookingId, 'cancelled')}
                              title="Cancel Booking"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsList;