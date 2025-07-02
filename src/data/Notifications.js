import { FaGift, FaStar, FaMoneyBillWave } from 'react-icons/fa';

const notificationsData = [
    {
      id: 1,
      type: 'offer',
      title: 'New Customer Inquiry',
      message: 'A customer is interested in your Screen Replacement Special offer. They want to know about pricing and availability.',
      time: '2 hours ago',
      isRead: false,
      icon: FaGift,
      iconColor: '#8b5cf6',
      actionText: 'View Offer'
    },
    {
      id: 2,
      type: 'review',
      title: 'New 5-Star Review!',
      message: 'Priya Sharma left you a 5-star review for Mobile Screen Replacement service. "Excellent service! Highly recommended!"',
      time: '1 day ago',
      isRead: false,
      icon: FaStar,
      iconColor: '#f59e0b',
      actionText: 'View Review'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      message: 'You received ₹2,500 payment for Booking ID: BK001234 - Mobile Screen Replacement service.',
      time: '2 days ago',
      isRead: true,
      icon: FaMoneyBillWave,
      iconColor: '#10b981',
      actionText: 'View Payment'
    }
];

export default notificationsData;