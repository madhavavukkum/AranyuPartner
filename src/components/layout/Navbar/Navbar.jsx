import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { userData } from '../../../data/userData';
import { FaBell, FaCog, FaSignOutAlt, FaHome, FaClipboardList, FaChartBar } from 'react-icons/fa';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const notificationCount = 3;
  const navigate = useNavigate();

  const navigationLinks = [
    { name: 'Home', to: '/', icon: FaHome },
    { name: 'Orders', to: '/orders', icon: FaClipboardList },
    { name: 'Statistics', to: '/statistics', icon: FaChartBar },
    { name: 'Settings', to: '/settings', icon: FaCog },
  ];

  const handleLinkClick = () => {
    navigate('/notifications');
  };

  const handleLogout = () => {
    navigate('/logout');
  };

  useEffect(() => {
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < 5) {
        ticking = false;
        return;
      }

      if (scrollY > lastScrollY && scrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else {
        // Scrolling up or at top
        setIsVisible(true);
      }

      setLastScrollY(scrollY > 0 ? scrollY : 0);
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    const onScroll = () => requestTick();

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return (
    <BootstrapNavbar
      expand="lg"
      className={`navbar ${isVisible ? 'navbar--visible' : 'navbar--hidden'}`}
      fixed="top"
    >
      <Container>
        <div className="navbar__left">
          <BootstrapNavbar.Brand as={NavLink} to="/" className="navbar__brand">
            <div className="navbar__logo">
              <img src="/logo.png" alt="Aranyu Logo" className="navbar__logo-img" />
            </div>
            <span className="navbar__company-name" style={{ color: '#007994' }}>Aranyu</span>
          </BootstrapNavbar.Brand>
        </div>

        <div className="navbar__right">
          {/* Mobile actions - notification, profile, and logout */}
          <div className="navbar__actions navbar__actions--mobile d-flex d-lg-none">
            <div className="navbar__notification">
              <button className="navbar__notification-btn" onClick={handleLinkClick}>
                <FaBell className="navbar__notification-icon" />
                {notificationCount > 0 && (
                  <span className="navbar__notification-badge">{notificationCount}</span>
                )}
              </button>
            </div>
            <button className="navbar__action-btn" onClick={handleLinkClick}>
              <img src={userData.profileImage} alt="Profile" className="navbar__profile-img" />
            </button>
            <button onClick={handleLogout} className="navbar__logout-btn navbar__logout-btn--mobile">
              <FaSignOutAlt className="navbar__logout-icon" />
            </button>
          </div>
        </div>

        {/* Desktop navigation */}
        <BootstrapNavbar.Collapse id="navbar-nav" className="navbar__collapse d-none d-lg-flex">
          <div className="navbar__center">
            <Nav className="navbar__nav-desktop">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `navbar__nav-link ${isActive ? 'navbar__nav-link--active' : ''}`
                  }
                >
                  <link.icon className="navbar__nav-icon" />
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </Nav>
          </div>
          <div className="navbar__actions">
            <div className="navbar__notification">
              <button className="navbar__notification-btn" onClick={handleLinkClick}>
                <FaBell className="navbar__notification-icon" />
                {notificationCount > 0 && (
                  <span className="navbar__notification-badge">{notificationCount}</span>
                )}
              </button>
            </div>
            <button className="navbar__action-btn" onClick={handleLinkClick}>
              <img src={userData.profileImage} alt="Profile" className="navbar__profile-img" />
            </button>
            <button onClick={handleLogout} className="navbar__logout-btn">
              <FaSignOutAlt className="navbar__logout-icon" />
              <span className="navbar__logout-text">Logout</span>
            </button>
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;