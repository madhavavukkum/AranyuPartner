import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaCamera, FaUsers, FaStar, FaRocket, FaHeart } from 'react-icons/fa';
import './GuideToAranyu.css';

const GuideToAranyu = () => {
  const navigate = useNavigate();

  return (
    <div className="guide-to-aranyu">
      <div className="guide-to-aranyu__container">
        {/* Header */}
        <div className="guide-to-aranyu__header">
          <div className="guide-to-aranyu__header-content">
            <button
              className="guide-to-aranyu__back-btn"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>
            <div className="guide-to-aranyu__header-text">
              <h1 className="guide-to-aranyu__title">Guide to Aranyu</h1>
              <p className="guide-to-aranyu__subtitle">Your complete travel companion guide</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="guide-to-aranyu__content">
          {/* Welcome Section */}
          <div className="guide-to-aranyu__welcome">
            <div className="guide-to-aranyu__welcome-icon">
              <FaRocket />
            </div>
            <h2 className="guide-to-aranyu__welcome-title">Welcome to Aranyu - Your Travel Companion</h2>
            <p className="guide-to-aranyu__welcome-text">
              Aranyu is your ultimate travel companion, designed to make your journeys memorable and hassle-free. 
              Whether you're planning a weekend getaway or an extended adventure, Aranyu has everything you need 
              to explore the world with confidence.
            </p>
          </div>

          {/* Features Section */}
          <div className="guide-to-aranyu__features">
            <h3 className="guide-to-aranyu__features-title">Key Features</h3>
            <div className="guide-to-aranyu__features-grid">
              <div className="guide-to-aranyu__feature-card guide-to-aranyu__feature-card--blue">
                <div className="guide-to-aranyu__feature-icon">
                  <FaMapMarkerAlt />
                </div>
                <h4 className="guide-to-aranyu__feature-title">Discover Amazing Places</h4>
                <p className="guide-to-aranyu__feature-description">
                  Find hidden gems and popular destinations with our comprehensive location database.
                </p>
              </div>

              <div className="guide-to-aranyu__feature-card guide-to-aranyu__feature-card--purple">
                <div className="guide-to-aranyu__feature-icon">
                  <FaCamera />
                </div>
                <h4 className="guide-to-aranyu__feature-title">Capture & Share Memories</h4>
                <p className="guide-to-aranyu__feature-description">
                  Document your travels with our built-in camera features and share with fellow travelers.
                </p>
              </div>

              <div className="guide-to-aranyu__feature-card guide-to-aranyu__feature-card--green">
                <div className="guide-to-aranyu__feature-icon">
                  <FaUsers />
                </div>
                <h4 className="guide-to-aranyu__feature-title">Connect with Travelers</h4>
                <p className="guide-to-aranyu__feature-description">
                  Meet like-minded travelers and share experiences with our community features.
                </p>
              </div>

              <div className="guide-to-aranyu__feature-card guide-to-aranyu__feature-card--yellow">
                <div className="guide-to-aranyu__feature-icon">
                  <FaStar />
                </div>
                <h4 className="guide-to-aranyu__feature-title">Rate & Review</h4>
                <p className="guide-to-aranyu__feature-description">
                  Help other travelers by rating and reviewing places you've visited.
                </p>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="guide-to-aranyu__getting-started">
            <h3 className="guide-to-aranyu__getting-started-title">Getting Started</h3>
            <div className="guide-to-aranyu__steps">
              <div className="guide-to-aranyu__step">
                <div className="guide-to-aranyu__step-number">1</div>
                <div className="guide-to-aranyu__step-content">
                  <h4 className="guide-to-aranyu__step-title">Download the App</h4>
                  <p className="guide-to-aranyu__step-description">Download the Aranyu app from your app store</p>
                </div>
              </div>

              <div className="guide-to-aranyu__step">
                <div className="guide-to-aranyu__step-number">2</div>
                <div className="guide-to-aranyu__step-content">
                  <h4 className="guide-to-aranyu__step-title">Create Your Profile</h4>
                  <p className="guide-to-aranyu__step-description">Set up your traveler profile with your preferences</p>
                </div>
              </div>

              <div className="guide-to-aranyu__step">
                <div className="guide-to-aranyu__step-number">3</div>
                <div className="guide-to-aranyu__step-content">
                  <h4 className="guide-to-aranyu__step-title">Explore Destinations</h4>
                  <p className="guide-to-aranyu__step-description">Browse and discover amazing places to visit</p>
                </div>
              </div>

              <div className="guide-to-aranyu__step">
                <div className="guide-to-aranyu__step-number">4</div>
                <div className="guide-to-aranyu__step-content">
                  <h4 className="guide-to-aranyu__step-title">Plan Your Trip</h4>
                  <p className="guide-to-aranyu__step-description">Create detailed itineraries for your adventures</p>
                </div>
              </div>

              <div className="guide-to-aranyu__step">
                <div className="guide-to-aranyu__step-number">5</div>
                <div className="guide-to-aranyu__step-content">
                  <h4 className="guide-to-aranyu__step-title">Start Your Adventure</h4>
                  <p className="guide-to-aranyu__step-description">Begin exploring and creating memories!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="guide-to-aranyu__quote">
            <div className="guide-to-aranyu__quote-icon">
              <FaHeart />
            </div>
            <blockquote className="guide-to-aranyu__quote-text">
              "Travel is the only thing you buy that makes you richer. Let Aranyu be your guide to unforgettable experiences."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideToAranyu;