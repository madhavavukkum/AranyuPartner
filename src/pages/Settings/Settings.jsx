import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet, NavLink } from 'react-router-dom';
import { RiMenu3Line } from 'react-icons/ri';
import { FaCog,FaHotel, FaUser, FaStore, FaCreditCard, FaWallet, FaConciergeBell, FaTags, FaBoxOpen, FaQuestionCircle, FaInfoCircle, FaHeadset, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaTimes, FaHome } from 'react-icons/fa';
import './Settings.css';

function Settings() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentSection = location.pathname.split('/').pop() || 'profile';

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLinkClick = (section) => {
    navigate(`/settings/${section}`);
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLinkLogout = () => {
    navigate('/logout');
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (location.pathname === '/settings' || location.pathname === '/settings/') {
      navigate('/settings/profile', { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        setIsSidebarCollapsed(false);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { key: 'profile', icon: FaUser, label: 'Profile Details', color: '#007994' },
    { key: 'shop', icon: FaStore, label: 'Shop Details', color: '#28a745' },
    { key: 'payment', icon: FaCreditCard, label: 'Payment Mode', color: '#17a2b8' },
    { key: 'wallet', icon: FaWallet, label: 'My Wallet', color: '#ffc107' },
    { key: 'service', icon: FaConciergeBell, label: 'Manage Service', color: '#6f42c1' },
    { key: 'category', icon: FaTags, label: 'Manage Category', color: '#e83e8c' },
    { key: 'packages', icon: FaBoxOpen, label: 'Packages', color: '#fd7e14' },
    { key: 'rooms', icon: FaHotel, label: 'Rooms', color: '#3f51b5' },
    { key: 'faqs', icon: FaQuestionCircle, label: 'FAQs', color: '#20c997' },
    { key: 'about', icon: FaInfoCircle, label: 'About Aranyu', color: '#6c757d' },
    { key: 'help', icon: FaHeadset, label: 'Help & Support', color: '#dc3545' },
  ];

  const getSectionTitle = () => {
    const item = menuItems.find(item => item.key === currentSection);
    return item ? item.label : 'Settings';
  };

  const getSectionIcon = () => {
    const item = menuItems.find(item => item.key === currentSection);
    return item ? item.icon : FaCog;
  };

  const getSectionColor = () => {
    const item = menuItems.find(item => item.key === currentSection);
    return item ? item.color : '#007994';
  };

  const SectionIcon = getSectionIcon();

  return (
    <div className="settings">
      <button 
        className={`settings__mobile-toggle ${isMobileMenuOpen ? 'settings__mobile-toggle--hidden' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Open menu"
      >
        <RiMenu3Line />
      </button>
      <div 
        className={`settings__backdrop ${isMobileMenuOpen ? 'settings__backdrop--show' : ''}`}
        onClick={toggleMobileMenu}
      ></div>
      <aside className={`settings__sidebar ${isSidebarCollapsed ? 'settings__sidebar--collapsed' : ''} ${isMobileMenuOpen ? 'settings__sidebar--mobile-open' : ''}`}>
        <div className="settings__sidebar-header">
          <div className="settings__sidebar-brand">
            {!isSidebarCollapsed && (
              <NavLink to="/" className="settings__home-link">
                <FaHome />
              </NavLink>
            )}
            <div className="settings__sidebar-title">
              <FaCog className="settings__sidebar-icon" />
              {!isSidebarCollapsed && <span>Settings</span>}
            </div>
          </div>
          <div className="settings__sidebar-controls">
            <button 
              className="settings__sidebar-toggle d-none d-lg-block"
              onClick={toggleSidebar}
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
            <button 
              className="settings__sidebar-close d-lg-none"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <nav className="settings__sidebar-nav">
          <ul className="settings__sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.key} className="settings__sidebar-item">
                <button
                  type="button"
                  className={`settings__sidebar-link ${currentSection === item.key ? 'settings__sidebar-link--active' : ''}`}
                  onClick={() => handleLinkClick(item.key)}
                  style={{
                    '--item-color': item.color,
                    '--item-color-light': `${item.color}20`,
                    '--item-color-lighter': `${item.color}10`
                  }}
                >
                  <item.icon className="settings__sidebar-link-icon" />
                  {!isSidebarCollapsed && <span className="settings__sidebar-link-text">{item.label}</span>}
                </button>
              </li>
            ))}
            <li className="settings__sidebar-item settings__sidebar-item--logout">
              <button
                type="button"
                className="settings__sidebar-link settings__sidebar-link--logout"
                onClick={handleLinkLogout}
              >
                <FaSignOutAlt className="settings__sidebar-link-icon" />
                {!isSidebarCollapsed && <span className="settings__sidebar-link-text">Sign Out</span>}
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={`settings__main ${isSidebarCollapsed ? 'settings__main--expanded' : ''}`}>
        <div className="settings__content">
          <header className="settings__content-header">
            <div className="settings__content-title">
              <SectionIcon className="settings__content-icon" style={{ color: getSectionColor() }} />
              <h1 className="settings__content-heading">{getSectionTitle()}</h1>
            </div>
            <div className="settings__content-breadcrumb">
              <NavLink to="/" className="settings__breadcrumb-link">Home</NavLink>
              <span className="settings__breadcrumb-separator">/</span>
              <span className="settings__breadcrumb-current">Settings</span>
              <span className="settings__breadcrumb-separator">/</span>
              <span className="settings__breadcrumb-current">{getSectionTitle()}</span>
            </div>
          </header>
          <div className="settings__content-body">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;