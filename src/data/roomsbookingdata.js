// Mock data for room bookings
export const roomTypes = [
  { id: 'single', name: 'Single Room' },
  { id: 'double', name: 'Double Room' },
  { id: 'suite', name: 'Suite' },
  { id: 'deluxe', name: 'Deluxe Room' }
];

export const floors = [
  { id: 1, name: 'Floor 1' },
  { id: 2, name: 'Floor 2' },
  { id: 3, name: 'Floor 3' },
  { id: 4, name: 'Floor 4' }
];

export const rooms = [
  { id: 'R101', number: '101', type: 'single', floor: 1 },
  { id: 'R102', number: '102', type: 'double', floor: 1 },
  { id: 'R103', number: '103', type: 'suite', floor: 1 },
  { id: 'R201', number: '201', type: 'single', floor: 2 },
  { id: 'R202', number: '202', type: 'double', floor: 2 },
  { id: 'R203', number: '203', type: 'deluxe', floor: 2 },
  { id: 'R301', number: '301', type: 'single', floor: 3 },
  { id: 'R302', number: '302', type: 'double', floor: 3 },
  { id: 'R303', number: '303', type: 'suite', floor: 3 },
  { id: 'R401', number: '401', type: 'deluxe', floor: 4 }
];
export const bookingsData = [
  // June 2025 bookings
  {
    id: 'BK001',
    roomId: 'R101',
    guestName: 'John Smith',
    checkIn: '2025-06-10',
    checkOut: '2025-06-13',
    contact: '+1-555-0123',
    status: 'booked'
  },
  {
    id: 'BK002',
    roomId: 'R102',
    guestName: 'Sarah Johnson',
    checkIn: '2025-06-15',
    checkOut: '2025-06-18',
    contact: '+1-555-0456',
    status: 'booked'
  },
  {
    id: 'BK003',
    roomId: 'R103',
    guestName: 'Michael Brown',
    checkIn: '2025-06-20',
    checkOut: '2025-06-22',
    contact: '+1-555-0789',
    status: 'cancelled'
  },
  {
    id: 'BK004',
    roomId: 'R201',
    guestName: 'Emily Davis',
    checkIn: '2025-06-25',
    checkOut: '2025-06-28',
    contact: '+1-555-0987',
    status: 'booked'
  },
  {
    id: 'BK005',
    roomId: 'R202',
    guestName: 'David Wilson',
    checkIn: '2025-06-08',
    checkOut: '2025-06-11',
    contact: '+1-555-0654',
    status: 'booked'
  },
  {
    id: 'BK006',
    roomId: 'R301',
    guestName: 'Lisa Anderson',
    checkIn: '2025-06-12',
    checkOut: '2025-06-15',
    contact: '+1-555-0321',
    status: 'cancelled'
  },
  // July 2025 bookings
  {
    id: 'BK007',
    roomId: 'R101',
    guestName: 'Robert Taylor',
    checkIn: '2025-07-05',
    checkOut: '2025-07-08',
    contact: '+1-555-1234',
    status: 'booked'
  },
  {
    id: 'BK008',
    roomId: 'R203',
    guestName: 'Jennifer White',
    checkIn: '2025-07-12',
    checkOut: '2025-07-15',
    contact: '+1-555-5678',
    status: 'booked'
  },
  {
    id: 'BK009',
    roomId: 'R302',
    guestName: 'Mark Johnson',
    checkIn: '2025-07-18',
    checkOut: '2025-07-21',
    contact: '+1-555-9012',
    status: 'cancelled'
  },
  {
    id: 'BK010',
    roomId: 'R401',
    guestName: 'Amanda Clark',
    checkIn: '2025-07-22',
    checkOut: '2025-07-25',
    contact: '+1-555-3456',
    status: 'booked'
  },
  // August 2025 bookings
  {
    id: 'BK011',
    roomId: 'R102',
    guestName: 'Thomas Lee',
    checkIn: '2025-08-03',
    checkOut: '2025-08-06',
    contact: '+1-555-6789',
    status: 'booked'
  },
  {
    id: 'BK012',
    roomId: 'R201',
    guestName: 'Patricia Moore',
    checkIn: '2025-08-10',
    checkOut: '2025-08-13',
    contact: '+1-555-2345',
    status: 'booked'
  },
  {
    id: 'BK013',
    roomId: 'R301',
    guestName: 'James Walker',
    checkIn: '2025-08-15',
    checkOut: '2025-08-18',
    contact: '+1-555-7890',
    status: 'cancelled'
  },
  {
    id: 'BK014',
    roomId: 'R401',
    guestName: 'Laura Harris',
    checkIn: '2025-08-20',
    checkOut: '2025-08-23',
    contact: '+1-555-4567',
    status: 'booked'
  }
];

// Blocked dates data
export const blockedDates = [
  {
    id: 'BL001',
    roomId: 'R103',
    date: '2025-06-22',
    reason: 'Maintenance work scheduled'
  },
  {
    id: 'BL002',
    roomId: 'R203',
    date: '2025-06-30',
    reason: 'Room renovation'
  },
  {
    id: 'BL003',
    roomId: 'R302',
    date: '2025-07-18',
    reason: 'Deep cleaning'
  },
  {
    id: 'BL004',
    roomId: 'R101',
    date: '2025-07-10',
    reason: 'AC repair'
  },
  {
    id: 'BL005',
    roomId: 'R201',
    date: '2025-08-08',
    reason: 'Electrical maintenance'
  },
  {
    id: 'BL006',
    roomId: 'R401',
    date: '2025-08-25',
    reason: 'Plumbing repair'
  }
];