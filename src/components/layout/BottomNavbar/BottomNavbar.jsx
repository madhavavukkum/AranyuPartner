import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaClipboardList, FaChartBar, FaCog } from 'react-icons/fa';
import './BottomNavbar.css';

const BottomNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigationLinks = [
    { name: 'Home', to: '/', icon: FaHome },
    { name: 'Orders', to: '/orders', icon: FaClipboardList },
    { name: 'Statistics', to: '/statistics', icon: FaChartBar },
    { name: 'Settings', to: '/settings', icon: FaCog },
  ];

  useEffect(() => {
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (Math.abs(scrollY - lastScrollY) < 5) {
        ticking = false;
        return;
      }

      // Check if scrolled to bottom
      const isAtBottom = scrollY + windowHeight >= documentHeight - 10; // Small buffer

      if (isAtBottom) {
        setIsVisible(true); // Show navbar at bottom
      } else if (scrollY > lastScrollY && scrollY > 100) {
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
    <div className={`bottom-navbar ${isVisible ? 'bottom-navbar--visible' : 'bottom-navbar--hidden'} d-lg-none`}>
      <div className="bottom-navbar__container">
        {navigationLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `bottom-navbar__link ${isActive ? 'bottom-navbar__link--active' : ''}`
            }
          >
            <link.icon className="bottom-navbar__icon" />
            <span className="bottom-navbar__text">{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;