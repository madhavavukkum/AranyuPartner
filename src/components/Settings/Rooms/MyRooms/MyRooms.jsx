import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaHotel, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import './MyRooms.css';

const MyRooms = () => {
  // Initialize hotel data from localStorage or use default
  const [hotelData, setHotelData] = useState(
    JSON.parse(localStorage.getItem('hotelData')) || {
      floors: [
        {
          number: 1,
          rooms: [
            { number: '101', type: 'deluxe', label: 'Sea View', notes: '' },
            { number: '102', type: 'cottage', label: 'Garden View', notes: '' },
            { number: '103', type: 'suite', label: 'Executive', notes: 'VIP guests only' },
          ],
        },
        {
          number: 2,
          rooms: [
            { number: '201', type: 'deluxe', label: 'Poolside', notes: '' },
            { number: '202', type: 'family', label: 'Connecting Rooms', notes: 'Connects to room 203' },
          ],
        },
      ],
    }
  );

  // State for modals, form inputs, errors, and filters
  const [showAddFloorModal, setShowAddFloorModal] = useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [showDeleteFloorModal, setShowDeleteFloorModal] = useState(false);
  const [showDeleteRoomModal, setShowDeleteRoomModal] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [floorNumber, setFloorNumber] = useState('');
  const [roomData, setRoomData] = useState({ number: '', type: '', label: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [filters, setFilters] = useState({ type: '', floor: '', search: '' });

  // Save to localStorage
  useEffect(() => {
    console.log('Saving hotel data to localStorage');
    localStorage.setItem('hotelData', JSON.stringify(hotelData));
  }, [hotelData]);

  // Form validation
  const validateAddFloor = () => {
    const newErrors = {};
    const num = parseInt(floorNumber);
    if (isNaN(num) || num < 1 || num > 100) {
      newErrors.floorNumber = 'Please enter a valid floor number between 1 and 100';
    } else if (hotelData.floors.some(f => f.number === num)) {
      newErrors.floorExists = 'Floor already exists';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRoom = (isEdit = false, originalNumber = null) => {
    const newErrors = {};
    if (!roomData.number.trim()) {
      newErrors.roomNumber = 'Please enter a valid room number';
    }
    if (!roomData.type) {
      newErrors.roomType = 'Please select a room type';
    }
    const floor = hotelData.floors.find(f => f.number === currentFloor);
    if (floor && (!isEdit || roomData.number !== originalNumber)) {
      if (floor.rooms.some(r => r.number === roomData.number)) {
        newErrors.roomExists = 'Room number already exists on this floor';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleAddFloor = (e) => {
    e.preventDefault();
    console.log('Add Floor Form submitted');
    if (validateAddFloor()) {
      setHotelData({
        ...hotelData,
        floors: [...hotelData.floors, { number: parseInt(floorNumber), rooms: [] }],
      });
      console.log(`Added floor ${floorNumber}. Total floors: ${hotelData.floors.length + 1}`);
      setFloorNumber('');
      setShowAddFloorModal(false);
      setErrors({});
    } else {
      console.error('Add Floor validation failed', errors);
    }
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    console.log('Add Room Form submitted');
    if (validateRoom()) {
      setHotelData({
        ...hotelData,
        floors: hotelData.floors.map(f =>
          f.number === currentFloor
            ? { ...f, rooms: [...f.rooms, { ...roomData }] }
            : f
        ),
      });
      console.log(`Added room ${roomData.number} to floor ${currentFloor}`);
      setRoomData({ number: '', type: '', label: '', notes: '' });
      setShowAddRoomModal(false);
      setErrors({});
    } else {
      console.error('Add Room validation failed', errors);
    }
  };

  const handleEditRoom = (e) => {
    e.preventDefault();
    console.log('Edit Room Form submitted');
    if (validateRoom(true, currentRoom?.number)) {
      setHotelData({
        ...hotelData,
        floors: hotelData.floors.map(f =>
          f.number === currentFloor
            ? {
                ...f,
                rooms: f.rooms.map(r =>
                  r.number === currentRoom.number ? { ...roomData } : r
                ),
              }
            : f
        ),
      });
      console.log(`Updated room ${currentRoom.number} to ${roomData.number} on floor ${currentFloor}`);
      setShowEditRoomModal(false);
      setRoomData({ number: '', type: '', label: '', notes: '' });
      setErrors({});
    } else {
      console.error('Edit Room validation failed', errors);
    }
  };

  const handleDeleteFloor = () => {
    console.log('Confirm Delete Floor clicked');
    setHotelData({
      ...hotelData,
      floors: hotelData.floors.filter(f => f.number !== currentFloor),
    });
    console.log(`Deleted floor ${currentFloor}. Total floors: ${hotelData.floors.length - 1}`);
    setShowDeleteFloorModal(false);
  };

  const handleDeleteRoom = () => {
    console.log('Confirm Delete Room clicked');
    setHotelData({
      ...hotelData,
      floors: hotelData.floors.map(f =>
        f.number === currentFloor
          ? { ...f, rooms: f.rooms.filter(r => r.number !== currentRoom.number) }
          : f
      ),
    });
    console.log(`Deleted room ${currentRoom.number} from floor ${currentFloor}`);
    setShowDeleteRoomModal(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    console.log(`Filter changed: ${name} = ${value}`);
  };

  // Render floors
  const filteredFloors = hotelData.floors
    .filter(f => !filters.floor || f.number.toString() === filters.floor)
    .sort((a, b) => a.number - b.number);

  return (
    <div className="room-management">
      <div className="room-management__container">
        {/* Header */}
        <div className="room-management__header">
          <div className="room-management__header-content">
            <div className="room-management__header-icon">
              <FaHotel />
            </div>
            <div className="room-management__header-text">
              <h1 className="room-management__title">My Rooms</h1>
              <p className="room-management__subtitle">Manage your hotel's room layout, floors, and room types</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="room-management__filters">
          <div className="room-management__filter-row">
            <div className="room-management__filter-group">
              <Form.Label className="room-management__filter-label">Room Type</Form.Label>
              <Form.Select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="room-management__filter-select form-select"
              >
                <option value="">All Types</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
                <option value="cottage">Cottage</option>
                <option value="family">Family</option>
              </Form.Select>
            </div>
            <div className="room-management__filter-group">
              <Form.Label className="room-management__filter-label">Floor</Form.Label>
              <Form.Select
                name="floor"
                value={filters.floor}
                onChange={handleFilterChange}
                className="room-management__filter-select form-select"
              >
                <option value="">All Floors</option>
                {hotelData.floors
                  .sort((a, b) => a.number - b.number)
                  .map(floor => (
                    <option key={floor.number} value={floor.number}>
                      Floor {floor.number}
                    </option>
                  ))}
              </Form.Select>
            </div>
            <div className="room-management__filter-group">
              <Form.Label className="room-management__filter-label">Search Room</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Room number..."
                  className="room-management__filter-input form-control"
                />
                <Button variant="primary">
                  <FaSearch />
                </Button>
              </InputGroup>
            </div>
          </div>
        </div>

        {/* Floors */}
        <div className="room-management__floors">
          {filteredFloors.map(floor => {
            const filteredRooms = floor.rooms.filter(
              room =>
                (!filters.type || room.type === filters.type) &&
                (!filters.search ||
                  room.number.toLowerCase().includes(filters.search.toLowerCase()) ||
                  (room.label && room.label.toLowerCase().includes(filters.search.toLowerCase())))
            );
            console.log(`Rendering floor ${floor.number} with ${filteredRooms.length} rooms`);
            return (
              <div key={floor.number} className="floor-block">
                <div className="floor-block__header">
                  <h2 className="floor-block__title">Floor {floor.number}</h2>
                  <div className="floor-block__actions">
                    <Button
                      className="floor-block__btn floor-block__btn--danger"
                      onClick={() => {
                        setCurrentFloor(floor.number);
                        setShowDeleteFloorModal(true);
                        console.log(`Opening Delete Floor Modal for floor ${floor.number}`);
                      }}
                    >
                      <FaTrash className="floor-block__btn-icon" /> Delete
                    </Button>
                    <Button
                      className="floor-block__btn floor-block__btn--primary"
                      onClick={() => {
                        setCurrentFloor(floor.number);
                        setShowAddRoomModal(true);
                        console.log(`Opening Add Room Modal for floor ${floor.number}`);
                      }}
                    >
                      <FaPlus className="floor-block__btn-icon" /> Add Room
                    </Button>
                  </div>
                </div>
                <div className="floor-block__rooms">
                  {filteredRooms.length === 0 ? (
                    <p>No rooms available</p>
                  ) : (
                    filteredRooms.map(room => (
                      <div
                        key={room.number}
                        className={`room-card room-card--${room.type}`}
                      >
                        <div className="room-card__number">{room.number}</div>
                        <div className="room-card__type">
                          {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                        </div>
                        <div className="room-card__label">{room.label || 'No Label'}</div>
                        <div className="room-card__actions">
                          <Button
                            className="room-card__btn"
                            onClick={() => {
                              setCurrentFloor(floor.number);
                              setCurrentRoom(room);
                              setRoomData({ ...room });
                              setShowEditRoomModal(true);
                              console.log(`Opening Edit Room Modal for floor ${floor.number}, room ${room.number}`);
                            }}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            className="room-card__btn"
                            onClick={() => {
                              setCurrentFloor(floor.number);
                              setCurrentRoom(room);
                              setShowDeleteRoomModal(true);
                              console.log(`Opening Delete Room Modal for floor ${floor.number}, room ${room.number}`);
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Floor Button */}
        <div className="room-management__add-floor">
          <Button
            className="room-management__add-floor-btn"
            onClick={() => {
              setShowAddFloorModal(true);
              console.log('Opening Add Floor Modal');
            }}
          >
            <FaPlus /> Add New Floor
          </Button>
        </div>

        {/* Add Floor Modal */}
        <Modal
          show={showAddFloorModal}
          onHide={() => {
            setShowAddFloorModal(false);
            setFloorNumber('');
            setErrors({});
            console.log('Closed Add Floor Modal');
          }}
          centered
          className="confirmation-modal"
          contentClassName="confirmation-modal__content"
          backdropClassName="confirmation-modal__backdrop"
        >
          <Modal.Header className="confirmation-modal__header">
            <Modal.Title className="confirmation-modal__title">Add New Floor</Modal.Title>
            <Button
              variant="link"
              className="confirmation-modal__close"
              onClick={() => {
                setShowAddFloorModal(false);
                setFloorNumber('');
                setErrors({});
                console.log('Closed Add Floor Modal');
              }}
            >
              ×
            </Button>
          </Modal.Header>
          <Modal.Body className="confirmation-modal__body">
            <Form onSubmit={handleAddFloor}>
              <Form.Group className="form-group">
                <Form.Label className="form-label">Floor Number</Form.Label>
                <Form.Control
                  type="number"
                  value={floorNumber}
                  onChange={e => setFloorNumber(e.target.value)}
                  min="1"
                  max="100"
                  placeholder="Enter floor number (1-100)"
                  className="form-control"
                  required
                />
                {errors.floorNumber && <small className="form-error form-error--visible">{errors.floorNumber}</small>}
                {errors.floorExists && <small className="form-error form-error--visible">{errors.floorExists}</small>}
              </Form.Group>
              <div className="confirmation-modal__footer">
                <Button
                  variant="secondary"
                  className="confirmation-modal__btn confirmation-modal__btn--secondary"
                  onClick={() => {
                    setShowAddFloorModal(false);
                    setFloorNumber('');
                    setErrors({});
                    console.log('Closed Add Floor Modal');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="confirmation-modal__btn confirmation-modal__btn--primary"
                >
                  Add Floor
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Add Room Modal */}
        <Modal
          show={showAddRoomModal}
          onHide={() => {
            setShowAddRoomModal(false);
            setRoomData({ number: '', type: '', label: '', notes: '' });
            setErrors({});
            console.log('Closed Add Room Modal');
          }}
          centered
          className="confirmation-modal"
          contentClassName="confirmation-modal__content"
          backdropClassName="confirmation-modal__backdrop"
        >
          <Modal.Header className="confirmation-modal__header">
            <Modal.Title className="confirmation-modal__title">Add New Room</Modal.Title>
            <Button
              variant="link"
              className="confirmation-modal__close"
              onClick={() => {
                setShowAddRoomModal(false);
                setRoomData({ number: '', type: '', label: '', notes: '' });
                setErrors({});
                console.log('Closed Add Room Modal');
              }}
            >
              ×
            </Button>
          </Modal.Header>
          <Modal.Body className="confirmation-modal__body">
            <Form onSubmit={handleAddRoom}>
              <input type="hidden" value={currentFloor} />
              <Form.Group className="form-group">
                <Form.Label className="form-label">Room Number</Form.Label>
                <Form.Control
                  type="text"
                  value={roomData.number}
                  onChange={e => setRoomData({ ...roomData, number: e.target.value })}
                  placeholder="Enter room number"
                  className="form-control"
                  required
                />
                {errors.roomNumber && <small className="form-error form-error--visible">{errors.roomNumber}</small>}
                {errors.roomExists && <small className="form-error form-error--visible">{errors.roomExists}</small>}
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label className="form-label">Room Type</Form.Label>
                <Form.Select
                  value={roomData.type}
                  onChange={e => setRoomData({ ...roomData, type: e.target.value })}
                  className="form-control form-select"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                  <option value="cottage">Cottage</option>
                  <option value="family">Family</option>
                </Form.Select>
                {errors.roomType && <small className="form-error form-error--visible">{errors.roomType}</small>}
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label className="form-label">Room Label (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  value={roomData.label}
                  onChange={e => setRoomData({ ...roomData, label: e.target.value })}
                  placeholder="Enter room label"
                  className="form-control"
                />
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label className="form-label">Special Notes (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={roomData.notes}
                  onChange={e => setRoomData({ ...roomData, notes: e.target.value })}
                  placeholder="Enter special notes"
                  className="form-control"
                />
              </Form.Group>
              <div className="confirmation-modal__footer">
                <Button
                  variant="secondary"
                  className="confirmation-modal__btn confirmation-modal__btn--secondary"
                  onClick={() => {
                    setShowAddRoomModal(false);
                    setRoomData({ number: '', type: '', label: '', notes: '' });
                    setErrors({});
                    console.log('Closed Add Room Modal');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="confirmation-modal__btn confirmation-modal__btn--primary"
                >
                  Add Room
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Edit Room Modal */}
        <Modal
          show={showEditRoomModal}
          onHide={() => {
            setShowEditRoomModal(false);
            setRoomData({ number: '', type: '', label: '', notes: '' });
            setErrors({});
            console.log('Closed Edit Room Modal');
          }}
          centered
          className="confirmation-modal"
          contentClassName="confirmation-modal__content"
          backdropClassName="confirmation-modal__backdrop"
        >
          <Modal.Header className="confirmation-modal__header">
            <Modal.Title className="confirmation-modal__title">Edit Room</Modal.Title>
            <Button
              variant="link"
              className="confirmation-modal__close"
              onClick={() => {
                setShowEditRoomModal(false);
                setRoomData({ number: '', type: '', label: '', notes: '' });
                setErrors({});
                console.log('Closed Edit Room Modal');
              }}
            >
              ×
            </Button>
          </Modal.Header>
          <Modal.Body className="confirmation-modal__body">
            <Form onSubmit={handleEditRoom}>
              <input type="hidden" value={currentFloor} />
              <input type="hidden" value={currentRoom?.number} />
              <Form.Group className="form-group">
                <Form.Label className="form-label">Room Number</Form.Label>
                <Form.Control
                  type="text"
                  value={roomData.number}
                  onChange={e => setRoomData({ ...roomData, number: e.target.value })}
                  placeholder="Enter room number"
                  className="form-control"
                  required
                />
                {errors.roomNumber && <small className="form-error form-error--visible">{errors.roomNumber}</small>}
                {errors.roomExists && <small className="form-error form-error--visible">{errors.roomExists}</small>}
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label className="form-label">Room Type</Form.Label>
                <Form.Select
                  value={roomData.type}
                  onChange={e => setRoomData({ ...roomData, type: e.target.value })}
                  className="form-control form-select"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                  <option value="cottage">Cottage</option>
                  <option value="family">Family</option>
                </Form.Select>
                {errors.roomType && <small className="form-error form-error--visible">{errors.roomType}</small>}
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label className="form-label">Room Label (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  value={roomData.label}
                  onChange={e => setRoomData({ ...roomData, label: e.target.value })}
                  placeholder="Enter room label"
                  className="form-control"
                />
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label className="form-label">Special Notes (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={roomData.notes}
                  onChange={e => setRoomData({ ...roomData, notes: e.target.value })}
                  placeholder="Enter special notes"
                  className="form-control"
                />
              </Form.Group>
              <div className="confirmation-modal__footer">
                <Button
                  variant="secondary"
                  className="confirmation-modal__btn confirmation-modal__btn--secondary"
                  onClick={() => {
                    setShowEditRoomModal(false);
                    setRoomData({ number: '', type: '', label: '', notes: '' });
                    setErrors({});
                    console.log('Closed Edit Room Modal');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="confirmation-modal__btn confirmation-modal__btn--primary"
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Delete Floor Modal */}
        <Modal
          show={showDeleteFloorModal}
          onHide={() => {
            setShowDeleteFloorModal(false);
            console.log('Closed Delete Floor Modal');
          }}
          centered
          className="confirmation-modal"
          contentClassName="confirmation-modal__content"
          backdropClassName="confirmation-modal__backdrop"
        >
          <Modal.Header className="confirmation-modal__header">
            <Modal.Title className="confirmation-modal__title">Delete Floor</Modal.Title>
            <Button
              variant="link"
              className="confirmation-modal__close"
              onClick={() => {
                setShowDeleteFloorModal(false);
                console.log('Closed Delete Floor Modal');
              }}
            >
              ×
            </Button>
          </Modal.Header>
          <Modal.Body className="confirmation-modal__body">
            <p className="confirmation-modal__message">
              Are you sure you want to delete this floor and all its rooms?
            </p>
          </Modal.Body>
          <Modal.Footer className="confirmation-modal__footer">
            <Button
              variant="secondary"
              className="confirmation-modal__btn confirmation-modal__btn--secondary"
              onClick={() => {
                setShowDeleteFloorModal(false);
                console.log('Closed Delete Floor Modal');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="confirmation-modal__btn confirmation-modal__btn--danger"
              onClick={handleDeleteFloor}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Room Modal */}
        <Modal
          show={showDeleteRoomModal}
          onHide={() => {
            setShowDeleteRoomModal(false);
            console.log('Closed Delete Room Modal');
          }}
          centered
          className="confirmation-modal"
          contentClassName="confirmation-modal__content"
          backdropClassName="confirmation-modal__backdrop"
        >
          <Modal.Header className="confirmation-modal__header">
            <Modal.Title className="confirmation-modal__title">Delete Room</Modal.Title>
            <Button
              variant="link"
              className="confirmation-modal__close"
              onClick={() => {
                setShowDeleteRoomModal(false);
                console.log('Closed Delete Room Modal');
              }}
            >
              ×
            </Button>
          </Modal.Header>
          <Modal.Body className="confirmation-modal__body">
            <p className="confirmation-modal__message">Are you sure you want to delete this room?</p>
          </Modal.Body>
          <Modal.Footer className="confirmation-modal__footer">
            <Button
              variant="secondary"
              className="confirmation-modal__btn confirmation-modal__btn--secondary"
              onClick={() => {
                setShowDeleteRoomModal(false);
                console.log('Closed Delete Room Modal');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="confirmation-modal__btn confirmation-modal__btn--danger"
              onClick={handleDeleteRoom}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default MyRooms;