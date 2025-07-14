import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for back button
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaSearch, FaBed, FaUsers, FaHome, FaCrown } from 'react-icons/fa'; // Use FaArrowLeft, remove FaHotel
import toast from 'react-hot-toast';
import './MyRooms.css';

const MyRooms = () => {
  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState(
    JSON.parse(localStorage.getItem('hotelData')) || {
      floors: [
        {
          number: 1,
          rooms: [
            { number: '101', type: 'deluxe', label: 'Sea View', notes: '', isActive: true },
            { number: '102', type: 'cottage', label: 'Garden View', notes: '', isActive: true },
            { number: '103', type: 'suite', label: 'Executive', notes: 'VIP guests only', isActive: false },
          ],
        },
        {
          number: 2,
          rooms: [
            { number: '201', type: 'deluxe', label: 'Poolside', notes: '', isActive: true },
            { number: '202', type: 'family', label: 'Connecting Rooms', notes: 'Connects to room 203', isActive: true },
          ],
        },
      ],
    }
  );

  const [roomTypes, setRoomTypes] = useState([]);
  const [showAddFloorModal, setShowAddFloorModal] = useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [showDeleteFloorModal, setShowDeleteFloorModal] = useState(false);
  const [showDeleteRoomModal, setShowDeleteRoomModal] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [floorNumber, setFloorNumber] = useState('');
  const [roomData, setRoomData] = useState({ number: '', type: '', label: '', notes: '', isActive: true });
  const [errors, setErrors] = useState({});
  const [filters, setFilters] = useState({ type: '', floor: '', search: '' });

  useEffect(() => {
    const hotelRoomTypes = [
      ...new Set(
        hotelData.floors
          .flatMap(floor => floor.rooms.map(room => room.type.toLowerCase()))
      ),
    ];
    const savedRooms = JSON.parse(localStorage.getItem('rooms') || '[]');
    const importedTypes = [...new Set(savedRooms.map(room => room.type.toLowerCase()))];
    const mergedTypes = [...new Set([...hotelRoomTypes, ...importedTypes])].sort();
    setRoomTypes(mergedTypes);
  }, [hotelData]);

  useEffect(() => {
    localStorage.setItem('hotelData', JSON.stringify(hotelData));
  }, [hotelData]);

  const getRoomTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'deluxe': return <FaBed className="room-card__type-icon" />;
      case 'suite': return <FaCrown className="room-card__type-icon" />;
      case 'cottage': return <FaHome className="room-card__type-icon" />;
      case 'family': return <FaUsers className="room-card__type-icon" />;
      default: return <FaBed className="room-card__type-icon" />;
    }
  };

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
    if (!roomData.type.trim()) {
      newErrors.roomType = 'Please enter a room type';
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

  const handleAddFloor = (e) => {
    e.preventDefault();
    if (validateAddFloor()) {
      setHotelData({
        ...hotelData,
        floors: [...hotelData.floors, { number: parseInt(floorNumber), rooms: [] }],
      });
      toast.success(`Floor ${floorNumber} added successfully!`);
      setFloorNumber('');
      setShowAddFloorModal(false);
      setErrors({});
    }
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (validateRoom()) {
      const newRoom = { ...roomData, type: roomData.type.toLowerCase() };
      setHotelData({
        ...hotelData,
        floors: hotelData.floors.map(f =>
          f.number === currentFloor
            ? { ...f, rooms: [...f.rooms, newRoom] }
            : f
        ),
      });
      toast.success(`Room ${roomData.number} added successfully!`);
      setRoomData({ number: '', type: '', label: '', notes: '', isActive: true });
      setShowAddRoomModal(false);
      setErrors({});
    }
  };

  const handleEditRoom = (e) => {
    e.preventDefault();
    if (validateRoom(true, currentRoom?.number)) {
      const updatedRoom = { ...roomData, type: roomData.type.toLowerCase() };
      setHotelData({
        ...hotelData,
        floors: hotelData.floors.map(f =>
          f.number === currentFloor
            ? {
                ...f,
                rooms: f.rooms.map(r =>
                  r.number === currentRoom.number ? updatedRoom : r
                ),
              }
            : f
        ),
      });
      toast.success(`Room ${roomData.number} updated successfully!`);
      setShowEditRoomModal(false);
      setRoomData({ number: '', type: '', label: '', notes: '', isActive: true });
      setErrors({});
    }
  };

  const handleDeleteFloor = () => {
    setHotelData({
      ...hotelData,
      floors: hotelData.floors.filter(f => f.number !== currentFloor),
    });
    toast.success(`Floor ${currentFloor} deleted successfully!`);
    setShowDeleteFloorModal(false);
  };

  const handleDeleteRoom = () => {
    setHotelData({
      ...hotelData,
      floors: hotelData.floors.map(f =>
        f.number === currentFloor
          ? { ...f, rooms: f.rooms.filter(r => r.number !== currentRoom.number) }
          : f
      ),
    });
    toast.success(`Room ${currentRoom.number} deleted successfully!`);
    setShowDeleteRoomModal(false);
  };

  const handleToggleRoomStatus = (floorNumber, roomNumber) => {
    setHotelData({
      ...hotelData,
      floors: hotelData.floors.map(f =>
        f.number === floorNumber
          ? {
              ...f,
              rooms: f.rooms.map(r =>
                r.number === roomNumber ? { ...r, isActive: !r.isActive } : r
              ),
            }
          : f
      ),
    });
    const room = hotelData.floors
      .find(f => f.number === floorNumber)
      .rooms.find(r => r.number === roomNumber);
    toast.success(`Room ${roomNumber} ${room.isActive ? 'deactivated' : 'activated'} successfully!`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredFloors = hotelData.floors
    .filter(f => !filters.floor || f.number.toString() === filters.floor)
    .sort((a, b) => a.number - b.number);

  return (
    <div className="room-management">
      <div className="room-management__container">
        <div className="room-management__header">
          <div className="room-management__header-content">
            <div className="room-management__header-row">
              <Link to="/settings/rooms" className="room-management__back-btn">
                <FaArrowLeft />
              </Link>
              <div className="room-management__header-text">
                <h1 className="room-management__title">My Rooms</h1>
                <p className="room-management__subtitle">Efficiently manage your hotel's room layout, floors, and room types</p>
              </div>
            </div>
          </div>
        </div>
        <div className="room-management__content">
          <div className="room-management__content-header">
            <h3 className="room-management__content-title">Your Floors</h3>
            <Button
              className="room-management__add-btn"
              onClick={() => setShowAddFloorModal(true)}
            >
              <FaPlus className="room-management__btn-icon" />
              Add Floor
            </Button>
          </div>
          <div className="room-management__filters">
            <h3 className="room-management__content-title">Filter & Search</h3>
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
                  {roomTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
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
                    placeholder="Room number or label..."
                    className="room-management__filter-input form-control"
                  />
                  <Button variant="primary" className="room-management__search-btn">
                    <FaSearch />
                  </Button>
                </InputGroup>
              </div>
            </div>
          </div>
          <div className="room-management__floors">
            {filteredFloors.length === 0 ? (
              <div className="room-management__empty-state">
                <div className="room-management__empty-icon">
                  <FaArrowLeft />
                </div>
                <h3 className="room-management__empty-title">No Floors</h3>
                <p className="room-management__empty-description">You haven't created any floors yet.</p>
                <div className="d-flex justify-content-center">
                  <Button
                    className="room-management__add-btn"
                    onClick={() => setShowAddFloorModal(true)}
                  >
                    <FaPlus className="room-management__btn-icon" />
                    Add New Floor
                  </Button>
                </div>
              </div>
            ) : (
              filteredFloors.map(floor => {
                const filteredRooms = floor.rooms.filter(
                  room =>
                    (!filters.type || room.type === filters.type) &&
                    (!filters.search ||
                      room.number.toLowerCase().includes(filters.search.toLowerCase()) ||
                      (room.label && room.label.toLowerCase().includes(filters.search.toLowerCase())))
                );
                return (
                  <div key={floor.number} className="floor-block">
                    <div className="floor-block__content-header">
                      <h3 className="floor-block__content-title">Floor {floor.number}</h3>
                      <div className="floor-block__actions">
                        <button
                          className="floor-block__action-btn floor-block__action-btn--delete"
                          onClick={() => {
                            setCurrentFloor(floor.number);
                            setShowDeleteFloorModal(true);
                          }}
                          aria-label="Delete floor"
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="floor-block__action-btn floor-block__action-btn--add"
                          onClick={() => {
                            setCurrentFloor(floor.number);
                            setShowAddRoomModal(true);
                          }}
                          aria-label="Add room"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <div className="floor-block__list">
                      {filteredRooms.length === 0 ? (
                        <div className="floor-block__empty">
                          <p className="floor-block__empty-text">No rooms available on this floor</p>
                          <Button
                            className="floor-block__add-btn"
                            onClick={() => {
                              setCurrentFloor(floor.number);
                              setShowAddRoomModal(true);
                            }}
                          >
                            <FaPlus className="room-management__btn-icon" />
                            Add First Room
                          </Button>
                        </div>
                      ) : (
                        filteredRooms.map(room => (
                          <div
                            key={room.number}
                            className={`room-card room-card--${room.type} ${!room.isActive ? 'room-card--inactive' : ''}`}
                          >
                            <div className="room-card__content">
                              <div className="room-card__info">
                                <h4 className="room-card__title">{room.number}</h4>
                                <div className="room-card__meta">
                                  <span className="room-card__type">
                                    {getRoomTypeIcon(room.type)}
                                    {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                                  </span>
                                </div>
                                <p className="room-card__label">{room.label || 'No Label'}</p>
                                {room.notes && (
                                  <p className="room-card__notes">{room.notes}</p>
                                )}
                              </div>
                              <div className="room-card__actions">
                                <label className="room-card__status-toggle">
                                  <input
                                    type="checkbox"
                                    checked={room.isActive}
                                    onChange={() => handleToggleRoomStatus(floor.number, room.number)}
                                  />
                                  <span className="room-card__toggle-slider"></span>
                                </label>
                                <button
                                  className="room-card__action-btn room-card__action-btn--edit"
                                  onClick={() => {
                                    setCurrentFloor(floor.number);
                                    setCurrentRoom(room);
                                    setRoomData({ ...room });
                                    setShowEditRoomModal(true);
                                  }}
                                  aria-label="Edit room"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  className="room-card__action-btn room-card__action-btn--delete"
                                  onClick={() => {
                                    setCurrentFloor(floor.number);
                                    setCurrentRoom(room);
                                    setShowDeleteRoomModal(true);
                                  }}
                                  aria-label="Delete room"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Modal
        show={showAddFloorModal}
        onHide={() => {
          setShowAddFloorModal(false);
          setFloorNumber('');
          setErrors({});
        }}
        centered
        className="room-modal"
      >
        <Modal.Header className="room-modal__header">
          <Modal.Title className="room-modal__title">Add New Floor</Modal.Title>
          <Button
            variant="link"
            className="room-modal__close"
            onClick={() => {
              setShowAddFloorModal(false);
              setFloorNumber('');
              setErrors({});
            }}
          >
            ×
          </Button>
        </Modal.Header>
        <Modal.Body className="room-modal__body">
          <Form onSubmit={handleAddFloor}>
            <Form.Group className="room-form__group">
              <Form.Label className="room-form__label">Floor Number</Form.Label>
              <Form.Control
                type="number"
                value={floorNumber}
                onChange={e => setFloorNumber(e.target.value)}
                min="1"
                max="100"
                placeholder="Enter floor number (1-100)"
                className="room-form__input"
                required
              />
              {errors.floorNumber && <small className="room-form__error">{errors.floorNumber}</small>}
              {errors.floorExists && <small className="room-form__error">{errors.floorExists}</small>}
            </Form.Group>
            <div className="room-modal__footer">
              <Button
                variant="secondary"
                className="room-modal__btn room-modal__btn--secondary"
                onClick={() => {
                  setShowAddFloorModal(false);
                  setFloorNumber('');
                  setErrors({});
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="room-modal__btn room-modal__btn--primary"
              >
                Add Floor
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showAddRoomModal}
        onHide={() => {
          setShowAddRoomModal(false);
          setRoomData({ number: '', type: '', label: '', notes: '', isActive: true });
          setErrors({});
        }}
        centered
        className="room-modal"
      >
        <Modal.Header className="room-modal__header">
          <Modal.Title className="room-modal__title">Add New Room</Modal.Title>
          <Button
            variant="link"
            className="room-modal__close"
            onClick={() => {
              setShowAddRoomModal(false);
              setRoomData({ number: '', type: '', label: '', notes: '', isActive: true });
              setErrors({});
            }}
          >
            ×
          </Button>
        </Modal.Header>
        <Modal.Body className="room-modal__body">
          <Form onSubmit={handleAddRoom}>
            <input type="hidden" value={currentFloor} />
            <Form.Group className="room-form__group">
              <Form.Label className="room-form__label">Room Number</Form.Label>
              <Form.Control
                type="text"
                value={roomData.number}
                onChange={e => setRoomData({ ...roomData, number: e.target.value })}
                placeholder="Enter room number"
                className="room-form__input"
                required
              />
              {errors.roomNumber && <small className="room-form__error">{errors.roomNumber}</small>}
              {errors.roomExists && <small className="room-form__error">{errors.roomExists}</small>}
            </Form.Group>
            <Form.Group className="room-form__group">
              <Form.Label className="room-form__label">Room Type</Form.Label>
              <Form.Control
                type="text"
                value={roomData.type}
                onChange={e => setRoomData({ ...roomData, type: e.target.value })}
                placeholder="Enter room type"
                className="room-form__input"
                list="room-types"
                required
              />
              <datalist id="room-types">
                {roomTypes.map(type => (
                  <option key={type} value={type.charAt(0).toUpperCase() + type.slice(1)} />
                ))}
              </datalist>
              {errors.roomType && <small className="room-form__error">{errors.roomType}</small>}
            </Form.Group>
            <Form.Group className="room-form__group">
              <Form.Label className="room-form__label">Room Label (Optional)</Form.Label>
              <Form.Control
                type="text"
                value={roomData.label}
                onChange={e => setRoomData({ ...roomData, label: e.target.value })}
                placeholder="Enter room label"
                className="room-form__input"
              />
            </Form.Group>
            <Form.Group className="room-form__group">
              <Form.Label className="room-form__label">Special Notes (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={roomData.notes}
                onChange={e => setRoomData({ ...roomData, notes: e.target.value })}
                placeholder="Enter special notes"
                className="room-form__textarea"
              />
            </Form.Group>
            <div className="room-modal__footer">
              <Button
                variant="secondary"
                className="room-modal__btn room-modal__btn--secondary"
                onClick={() => {
                  setShowAddRoomModal(false);
                  setRoomData({ number: '', type: '', label: '', notes: '', isActive: true });
                  setErrors({});
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="room-modal__btn room-modal__btn--primary"
              >
                Add Room
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showEditRoomModal}
        onHide={() => {
          setShowEditRoomModal(false);
          setRoomData({ number: '', type: '', label: '', notes: '', isActive: true });
          setErrors({});
        }}
        centered
        className="room-modal"
      >
        <Modal.Header className="room-modal__header">
          <Modal.Title className="room-modal__title">Edit Room</Modal.Title>
          <Button
            variant="link"
            className="room-modal__close"
            onClick={() => {
              setShowEditRoomModal(false);
              setRoomData({ number: '', type: '', label: '', notes: '', isActive: true });
              setErrors({});
            }}
          >
            ×
          </Button>
        </Modal.Header>
        <Modal.Body className="room-modal__body">
          <Form onSubmit={handleEditRoom}>
            <input type="hidden" value={currentFloor} />
            <input type="hidden" value={currentRoom?.number} />
            <Form.Group className="room-form__group">
              <Form.Label className="room-form__label">Room Number</Form.Label>
              <Form.Control
                type="text"
                value={roomData.number}
                onChange={e => setRoomData({ ...roomData, number: e.target.value })}
                placeholder="Enter room number"
                className="room-form__input"
                required
              />
              {errors.roomNumber && <small className="room-form__error">{errors.roomNumber}</small>}
              {errors.roomExists && <small className="room-form__error">{errors.roomExists}</small>}
            </Form.Group>
            <Form.Group className="room-form__group">
              <Form.Label className="room-form__label">Room Type</Form.Label>
              <Form.Control
                type="text"
                value={roomData.type}
                onChange={e => setRoomData({ ...roomData, type: e.target.value })}
                placeholder="Enter room type"
                className="room-form__input"
                list="room-types"
                required
              />
              <datalist id="room-types">
                {roomTypes.map(type => (
                  <option key={type} value={type.charAt(0).toUpperCase() + type.slice(1)} />
                ))}
              </datalist>
              {errors.roomType && <small className="room-form__error">{errors.roomType}</small>}
            </Form.Group>
            <Form.Group className="room-form__group">
              <Form.Label className="room-form__label">Room Label (Optional)</Form.Label>
              <Form.Control
                type="text"
                value={roomData.label}
                onChange={e => setRoomData({ ...roomData, label: e.target.value })}
                placeholder="Enter room label"
                className="room-form__input"
              />
            </Form.Group>
            <Form.Group className="room-form__group">
              <Form.Label className="room-form__label">Special Notes (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={roomData.notes}
                onChange={e => setRoomData({ ...roomData, notes: e.target.value })}
                placeholder="Enter special notes"
                className="room-form__textarea"
              />
            </Form.Group>
            <div className="room-modal__footer">
              <Button
                variant="secondary"
                className="room-modal__btn room-modal__btn--secondary"
                onClick={() => {
                  setShowEditRoomModal(false);
                  setRoomData({ number: '', type: '', label: '', notes: '', isActive: true });
                  setErrors({});
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="room-modal__btn room-modal__btn--primary"
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showDeleteFloorModal}
        onHide={() => setShowDeleteFloorModal(false)}
        centered
        className="room-modal room-modal--danger"
      >
        <Modal.Header className="room-modal__header">
          <Modal.Title className="room-modal__title">Delete Floor</Modal.Title>
          <Button
            variant="link"
            className="room-modal__close"
            onClick={() => setShowDeleteFloorModal(false)}
          >
            ×
          </Button>
        </Modal.Header>
        <Modal.Body className="room-modal__body">
          <div className="room-modal__danger-content">
            <div className="room-modal__danger-icon">
              <FaTrash />
            </div>
            <p className="room-modal__danger-message">
              Are you sure you want to delete Floor {currentFloor}? This action will permanently remove the floor and all its rooms.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="room-modal__footer">
          <Button
            variant="secondary"
            className="room-modal__btn room-modal__btn--secondary"
            onClick={() => setShowDeleteFloorModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="room-modal__btn room-modal__btn--danger"
            onClick={handleDeleteFloor}
          >
            Delete Floor
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDeleteRoomModal}
        onHide={() => setShowDeleteRoomModal(false)}
        centered
        className="room-modal room-modal--danger"
      >
        <Modal.Header className="room-modal__header">
          <Modal.Title className="room-modal__title">Delete Room</Modal.Title>
          <Button
            variant="link"
            className="room-modal__close"
            onClick={() => setShowDeleteRoomModal(false)}
          >
            ×
          </Button>
        </Modal.Header>
        <Modal.Body className="room-modal__body">
          <div className="room-modal__danger-content">
            <div className="room-modal__danger-icon">
              <FaTrash />
            </div>
            <p className="room-modal__danger-message">
              Are you sure you want to delete Room {currentRoom?.number}? This action cannot be undone.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="room-modal__footer">
          <Button
            variant="secondary"
            className="room-modal__btn room-modal__btn--secondary"
            onClick={() => setShowDeleteRoomModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="room-modal__btn room-modal__btn--danger"
            onClick={handleDeleteRoom}
          >
            Delete Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyRooms;