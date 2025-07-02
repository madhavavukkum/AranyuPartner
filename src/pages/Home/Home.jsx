import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaEdit, 
  FaCrown, 
  FaInfoCircle, 
  FaStar, 
  FaWallet, 
  FaMoneyBillWave, 
  FaGift, 
  FaList, 
  FaPlus, 
  FaCalendarAlt
} from 'react-icons/fa';
import './Home.css';
import { userData } from '../../data/userData';
import { paymentsData } from '../../data/paymentsData';
import { reviewsData } from '../../data/reviewsData';

function Home() {
  const [activeOffers, setActiveOffers] = useState([]);
  const [activeOffersCount, setActiveOffersCount] = useState(0);

  // Calculate average rating from reviews
  const calculateAverageRating = () => {
    if (reviewsData.length === 0) return 0;
    const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviewsData.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();

  const quickInfoData = [
    { 
      title: 'Customer Rating', 
      value: `${averageRating} / 5.0`, 
      icon: FaStar, 
      iconClass: 'rating',
      link: '/myratings',
      color: '#f59e0b'
    },
    { 
      title: 'My Wallet', 
      value: '₹2,50,000', 
      icon: FaWallet, 
      iconClass: 'wallet',
      link: '/settings/wallet',
      color: '#10b981'
    },
    { 
      title: 'Received Payments', 
      value: '₹9,50,000', 
      subtitle: 'this month', 
      icon: FaMoneyBillWave, 
      iconClass: 'payment',
      link: '/payments',
      color: '#3b82f6'
    },
    { 
      title: 'Active Offers', 
      value: `${activeOffersCount} Offer${activeOffersCount !== 1 ? 's' : ''}`, 
      icon: FaGift, 
      iconClass: 'offer',
      link: '/offers',
      color: '#8b5cf6'
    }
  ];

  useEffect(() => {
    // Load offers from localStorage and filter active ones
    const loadActiveOffers = () => {
      const savedOffers = localStorage.getItem('offers');
      if (savedOffers) {
        const offers = JSON.parse(savedOffers);
        const activeOffersList = offers.filter(offer => offer.isActive);
        
        // Sort by creation date (most recent first) and take only 3
        const sortedActiveOffers = activeOffersList
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        
        setActiveOffers(sortedActiveOffers);
        setActiveOffersCount(activeOffersList.length);
      } else {
        setActiveOffers([]);
        setActiveOffersCount(0);
      }
    };

    // Load offers on component mount
    loadActiveOffers();

    // Listen for storage changes to update offers in real-time
    const handleStorageChange = () => {
      loadActiveOffers();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when offers are updated within the same tab
    window.addEventListener('offersUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('offersUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        {/* Hero Section */}
        <div className="home__hero">
          <div 
            className="home__hero-banner"
            style={{ backgroundImage: `url(${userData.heroBannerImage})` }}
          >
            <div className="home__hero-overlay"></div>
          </div>
          {/* Profile Image - Independent positioning */}
          <img
            src={userData.profileImage}
            alt="Profile"
            className="home__profile-image"
          />
        </div>

        {/* Main Content */}
        <div className="home__content">
          <div className="home__content-grid">
            {/* Welcome Section */}
            <div className="home__welcome-section">
              <div className="home__welcome-content">
                <div className="home__welcome-text">
                  <h1 className="home__welcome-title">
                    Welcome back, <span className="home__welcome-name">{userData.name}</span>!
                  </h1>
                  <h2 className="home__business-name">{userData.businessName}</h2>
                  <div className="home__location">
                    <FaMapMarkerAlt className="home__location-icon" />
                    <span className="home__location-text">{userData.location}</span>
                  </div>
                  <p className="home__description">{userData.description}</p>
                  <Link to="/settings/profile" className="home__edit-profile-btn">
                    <FaEdit className="home__btn-icon" />
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Membership Card */}
            <div className="home__membership-card">
              <div className="home__membership-content">
                <div className="home__membership-icon">
                  <FaCrown />
                </div>
                <h3 className="home__membership-title">{userData.membership.title}</h3>
                <p className="home__membership-description">{userData.membership.description}</p>
                <button className="home__membership-btn">
                  <FaCrown className="home__btn-icon" />
                  {userData.membership.buttonText}
                </button>
                <div className="home__membership-info">
                  <FaInfoCircle className="home__info-icon" />
                  <span className="home__info-text">{userData.membership.info}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="home__quick-info">
            <div className="home__quick-info-grid">
              {quickInfoData.map((item, index) => (
                <Link 
                  key={index}
                  to={item.link} 
                  className="home__quick-info-card"
                  style={{ '--card-color': item.color }}
                >
                  <div className="home__quick-info-icon">
                    <item.icon />
                  </div>
                  <div className="home__quick-info-content">
                    <h4 className="home__quick-info-title">{item.title}</h4>
                    <p className="home__quick-info-value">{item.value}</p>
                    {item.subtitle && (
                      <span className="home__quick-info-subtitle">{item.subtitle}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="home__main-grid">
            {/* Recent Payments */}
            <div className="home__payments-section">
              <div className="home__section-header">
                <h3 className="home__section-title">Recent Payments</h3>
                <Link to="/payments" className="home__view-all-btn">
                  <FaList className="home__btn-icon" />
                  View All
                </Link>
              </div>
              <div className="home__payments-list">
                {paymentsData.slice(0, 3).map((payment, index) => (
                  <div key={index} className="home__payment-card">
                    <div className="home__payment-content">
                      <div className="home__payment-info">
                        <h4 className="home__payment-title">{payment.title}</h4>
                        <p className="home__payment-booking">
                          Booking ID: {payment.bookingId}
                        </p>
                        <span className={`home__payment-status home__payment-status--${payment.statusClass.split(' ')[0]}`}>
                          {payment.status}
                        </span>
                      </div>
                      <div className="home__payment-amount-section">
                        <p className="home__payment-amount">{payment.amount}</p>
                        <p className="home__payment-date">{payment.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offers Section */}
            <div className="home__offers-section">
              <div className="home__section-header">
                <h3 className="home__section-title">Your Active Offers</h3>
                <Link to="/offers" className="home__create-offer-btn">
                  <FaGift className="home__btn-icon" />
                  View All
                </Link>
              </div>
              
              {activeOffers.length > 0 ? (
                <div className="home__offers-list">
                  {activeOffers.map((offer) => (
                    <Link 
                      key={offer.id} 
                      to="/offers" 
                      className="home__offer-card"
                      style={{
                        backgroundColor: offer.backgroundColor || '#ffffff',
                        color: offer.textColor || '#000000',
                        borderLeftColor: offer.backgroundColor || '#8b5cf6'
                      }}
                    >
                      <div className="home__offer-content">
                        <div className="home__offer-info">
                          <h4 className="home__offer-title">{offer.title}</h4>
                          <p className="home__offer-description">{offer.description}</p>
                          <div className="home__offer-validity">
                            <FaCalendarAlt className="home__offer-icon" />
                            <span className="home__offer-validity-text">Active Offer</span>
                          </div>
                        </div>
                        <div className="home__offer-discount">
                          {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `₹${offer.discountValue}`}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="home__offers-empty">
                  <p className="home__offers-empty-text">No active offers yet. Create your first offer to attract customers!</p>
                </div>
              )}
              
              <Link to="/offers/add" className="home__add-offer-btn">
                <FaPlus className="home__btn-icon" />
                Create New Offer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;