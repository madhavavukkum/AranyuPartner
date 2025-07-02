import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTh, FaDollarSign, FaShoppingCart, FaUser, FaBookOpen, FaExclamationCircle, FaChevronRight } from 'react-icons/fa';
import './HelpSupport.css';

const menuItems = [
  {
    id: 'general',
    title: 'General',
    description: 'Basic questions about Aranyu',
    icon: FaTh,
    iconColor: 'general',
    onClick: () => console.log('General clicked'),
  },
  {
    id: 'sellers',
    title: 'Sellers',
    description: 'All you need to know about selling your services',
    icon: FaDollarSign,
    iconColor: 'sellers',
    onClick: () => console.log('Sellers clicked'),
  },
  {
    id: 'buyers',
    title: 'Buyers',
    description: 'Everything you need to know about booking with Aranyu',
    icon: FaShoppingCart,
    iconColor: 'buyers',
    onClick: () => console.log('Buyers clicked'),
  },
  {
    id: 'agents',
    title: 'Agents',
    description: 'How travel agents can work with Aranyu',
    icon: FaUser,
    iconColor: 'agents',
    onClick: () => console.log('Agents clicked'),
  },
  {
    id: 'guide',
    title: 'Guide to Aranyu App',
    description: 'Learn how Aranyu works',
    icon: FaBookOpen,
    iconColor: 'guide',
    href: '/settings/guide',
  },
  {
    id: 'report',
    title: 'Report an issue',
    description: 'Report an issue here',
    icon: FaExclamationCircle,
    iconColor: 'report',
    href: '/settings/report',
  },
];

const HelpSupport = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredItems = menuItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="help-support">
      <div className="help-support__container">
        {/* Header */}
        <div className="help-support__header">
          <div className="help-support__header-content">
            <h1 className="help-support__title">Help & Support</h1>
            <p className="help-support__subtitle">Hi, How can we help you?</p>
          </div>
        </div>

        {/* Search */}
        <div className="help-support__search-section">
          <div className="help-support__search-container">
            <FaSearch className="help-support__search-icon" />
            <input
              type="text"
              className="help-support__search-input"
              placeholder="Search for help topics..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="help-support__content">
          <div className="help-support__menu-list">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`help-support__menu-item help-support__menu-item--${item.iconColor}`}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  if (item.href) {
                    navigate(item.href);
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (item.onClick) item.onClick();
                    if (item.href) {
                      navigate(item.href);
                    }
                  }
                }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`help-support__menu-icon help-support__menu-icon--${item.iconColor}`}>
                  <item.icon />
                </div>
                <div className="help-support__menu-content">
                  <h3 className="help-support__menu-title">{item.title}</h3>
                  <p className="help-support__menu-description">{item.description}</p>
                </div>
                {item.href && <FaChevronRight className="help-support__arrow-icon" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;