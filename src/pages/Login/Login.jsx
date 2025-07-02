import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import LoginPanel from './LoginPanel';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-page__background-image"></div>
      <div className="login-page__overlay"></div>
      <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative login-page__padding--4">
        <div className="login-page__container d-flex flex-column flex-md-row align-items-center justify-content-between login-page__width--100">
          <div className="login-page__content-section login-page__width--100 login-page__width--md-50 login-page__padding--4 login-page__padding--md-8 text-center text-md-start login-page__animation--fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="login-page__logo-container login-page__margin--bottom-6 d-flex align-items-center justify-content-center justify-content-md-start">
              <img src="/logo.png" alt="Aranyu Partner Logo" className="login-page__logo-img login-page__margin--right-3" />
              <h2 className="login-page__text--4xl login-page__font--bold login-page__text--sky-600">Aranyu Partner</h2>
            </div>
            <div className="login-page__description-container d-md-block">
              <h1 className="login-page__text--2xl login-page__text--md-5xl login-page__font--bold login-page__margin--bottom-4 login-page__leading--tight login-page__text--slate-700">
                Grow Your Travel Business with Aranyu Partner
              </h1>
              <p className="login-page__text--lg login-page__text--slate-600 login-page__margin--bottom-6">
                List your travel packages, reach more tourists, and grow your bookings—all in one place.
              </p>
              <div className="d-flex justify-content-center justify-content-md-start login-page__space-x-4">
                <a className="login-page__social-icon" href="#">
                  <FaFacebookF size={28} />
                  <span className="login-page__sr-only">Facebook</span>
                </a>
                <a className="login-page__social-icon" href="#">
                  <FaInstagram size={28} />
                  <span className="login-page__sr-only">Instagram</span>
                </a>
                <a className="login-page__social-icon" href="#">
                  <FaTwitter size={28} />
                  <span className="login-page__sr-only">Twitter</span>
                </a>
              </div>
            </div>
          </div>
          <LoginPanel />
          <div className="login-page__description-container--mobile d-block d-md-none text-center login-page__margin--top-4">
            <h1 className="login-page__text--4xl login-page__font--bold login-page__margin--bottom-4 login-page__leading--tight login-page__text--slate-700">
              Explore the World, One Journey at a Time.
            </h1>
            <p className="login-page__text--lg login-page__text--slate-600 login-page__margin--bottom-6">
              Join thousands of travelers finding their dream destinations. Log in or sign up to start planning your next unforgettable journey with Aranyu Partner.
            </p>
            <div className="d-flex justify-content-center login-page__space-x-4">
              <a className="login-page__social-icon" href="#">
                <FaFacebookF size={28} />
                <span className="login-page__sr-only">Facebook</span>
              </a>
              <a className="login-page__social-icon" href="#">
                <FaInstagram size={28} />
                <span className="login-page__sr-only">Instagram</span>
              </a>
              <a className="login-page__social-icon" href="#">
                <FaTwitter size={28} />
                <span className="login-page__sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;