import React, { useState } from 'react';
import { FaBuilding, FaExclamationTriangle, FaShieldAlt, FaFileContract, FaChevronRight, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [currentView, setCurrentView] = useState('main');

  const menuItems = [
    {
      id: 'about-aranyu',
      icon: FaBuilding,
      title: 'About Aranyu',
      description: 'Info page about the organization/app',
      color: '#007994'
    },
    {
      id: 'grievance-policy',
      icon: FaExclamationTriangle,
      title: 'Grievance Policy',
      description: 'Page detailing how users can raise complaints or issues',
      color: '#dc3545'
    },
    {
      id: 'privacy-policy',
      icon: FaShieldAlt,
      title: 'Privacy Policy',
      description: 'Page explaining data collection, usage, and protection practices',
      color: '#28a745'
    },
    {
      id: 'terms-conditions',
      icon: FaFileContract,
      title: 'Terms & Conditions',
      description: 'Page outlining legal usage terms for the app',
      color: '#6f42c1'
    }
  ];

  const handleItemClick = (itemId) => {
    setCurrentView(itemId);
  };

  const handleBackClick = () => {
    setCurrentView('main');
  };

  const getCurrentItem = () => {
    return menuItems.find(item => item.id === currentView);
  };

  const renderMainView = () => (
    <div className="about__main-content">
      <div className="about__header">
        <div className="about__header-content">
          <div className="about__header-icon">
            <FaInfoCircle />
          </div>
          <div className="about__header-text">
            <h1 className="about__title">About</h1>
            <p className="about__subtitle">Learn more about Aranyu and our policies</p>
          </div>
        </div>
      </div>
      <div className="about__main-list">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="about__list-item"
            onClick={() => handleItemClick(item.id)}
            style={{ '--item-color': item.color }}
          >
            <div className="about__item-icon" style={{ backgroundColor: item.color }}>
              <item.icon style={{ color: 'white' }} />
            </div>
            <div className="about__item-content">
              <h3 className="about__item-title">{item.title}</h3>
              <p className="about__item-description">{item.description}</p>
            </div>
            <div className="about__item-arrow">
              <FaChevronRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAboutAranyu = () => (
    <div className="about__detail-content">
      <div className="about__detail-header">
        <FaBuilding className="about__detail-icon" style={{ color: '#007994' }} />
        <h2 className="about__detail-title" style={{ '--title-color': '#007994' }}>About Aranyu</h2>
      </div>
      
      <div className="about__detail-body">
        <p className="about__welcome-text">
          Welcome to Aranyu, your number one solution of your daily payments. We are dedicated to providing you with the best services, with a focus on dependability, customer service, and your benefits.
        </p>
        
        <p className="about__description">
          Aranyu is a FinTech startup based in Chandigarh aimed at uplifting local and small businesses. Aranyu is an application-based startup that helps users save money while making payments at local shops and businesses, also helping them manage all of their expenses in one place.
        </p>
        
        <p className="about__mission">
          During the COVID-19 pandemic, local and small-scale businesses were the most affected. Aranyu is a startup promoting these small businesses to grow and become recognized brands before the users. Aranyu is solving multiple problems for users such as fake discounts, lack of savings, and unmanaged expenses.
        </p>
        
        <p className="about__vision">
          We are working to turn our passion for services into a booming Market Network. We hope you enjoy our services as much as we enjoy offering them to you.
        </p>
        
        <div className="about__founder-section">
          <h3 className="about__founder-title">Sincerely</h3>
          <p className="about__founder-name">Sai Rathnam Kandukuri</p>
          <p className="about__founder-role">(Founder)</p>
        </div>
        
        <div className="about__contact-section">
          <h3 className="about__contact-title">Here are some ways through which you can connect with us:</h3>
          <div className="about__social-links">
            <div className="about__social-item">
              <strong>Instagram:</strong> Aranyu.in
            </div>
            <div className="about__social-item">
              <strong>Facebook:</strong> Aranyu DEALZ
            </div>
            <div className="about__social-item">
              <strong>Twitter:</strong> Aranyu_in
            </div>
          </div>
          <div className="about__email-contact">
            <p>For any queries, you can contact us at <strong>help@aranyu.in</strong></p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGrievancePolicy = () => (
    <div className="about__detail-content">
      <div className="about__detail-header">
        <FaExclamationTriangle className="about__detail-icon" style={{ color: '#dc3545' }} />
        <h2 className="about__detail-title" style={{ '--title-color': '#dc3545' }}>Grievance Policy</h2>
      </div>
      
      <div className="about__detail-body">
        <h3>How to Raise Complaints or Issues</h3>
        
        <p>At Aranyu, we are committed to providing excellent service to all our users. However, we understand that sometimes issues may arise. This grievance policy outlines the process for raising and resolving complaints.</p>
        
        <h4>Types of Grievances</h4>
        <ul>
          <li>Service-related issues</li>
          <li>Payment and transaction disputes</li>
          <li>Technical problems with the app</li>
          <li>Account-related concerns</li>
          <li>Privacy and data protection issues</li>
        </ul>
        
        <h4>How to File a Grievance</h4>
        <ol>
          <li><strong>In-App Support:</strong> Use the Help & Support section in the app</li>
          <li><strong>Email:</strong> Send detailed complaint to help@aranyu.in</li>
          <li><strong>Phone:</strong> Call our customer support during business hours</li>
          <li><strong>Written Complaint:</strong> Send a formal letter to our registered office</li>
        </ol>
        
        <h4>Information Required</h4>
        <p>When filing a grievance, please provide:</p>
        <ul>
          <li>Your registered name and contact details</li>
          <li>Account/User ID</li>
          <li>Date and time of the incident</li>
          <li>Detailed description of the issue</li>
          <li>Supporting documents or screenshots</li>
        </ul>
        
        <h4>Resolution Timeline</h4>
        <ul>
          <li>Acknowledgment: Within 24 hours</li>
          <li>Investigation: 3-5 business days</li>
          <li>Resolution: Within 7-10 business days</li>
          <li>Complex issues: Up to 15 business days</li>
        </ul>
        
        <h4>Escalation Process</h4>
        <p>If you are not satisfied with the initial resolution, you can escalate your grievance to our senior management team. We are committed to fair and transparent resolution of all complaints.</p>
      </div>
    </div>
  );

  const renderPrivacyPolicy = () => (
    <div className="about__detail-content">
      <div className="about__detail-header">
        <FaShieldAlt className="about__detail-icon" style={{ color: '#28a745' }} />
        <h2 className="about__detail-title" style={{ '--title-color': '#28a745' }}>Privacy Policy</h2>
      </div>
      
      <div className="about__detail-body">
        <p><strong>Last updated:</strong> January 2024</p>
        
        <h3>Information We Collect</h3>
        <h4>Personal Information</h4>
        <ul>
          <li>Name, email address, and phone number</li>
          <li>Payment information and transaction history</li>
          <li>Location data for nearby merchant discovery</li>
          <li>Device information and app usage analytics</li>
        </ul>
        
        <h4>Automatically Collected Information</h4>
        <ul>
          <li>IP address and device identifiers</li>
          <li>App usage patterns and preferences</li>
          <li>Transaction metadata</li>
          <li>Log files and crash reports</li>
        </ul>
        
        <h3>How We Use Your Information</h3>
        <ul>
          <li>To provide and improve our services</li>
          <li>To process payments and transactions</li>
          <li>To send important notifications and updates</li>
          <li>To prevent fraud and ensure security</li>
          <li>To personalize your app experience</li>
          <li>To comply with legal obligations</li>
        </ul>
        
        <h3>Information Sharing</h3>
        <p>We do not sell your personal information. We may share information with:</p>
        <ul>
          <li>Payment processors for transaction processing</li>
          <li>Service providers who assist in app operations</li>
          <li>Law enforcement when legally required</li>
          <li>Business partners with your explicit consent</li>
        </ul>
        
        <h3>Data Security</h3>
        <p>We implement industry-standard security measures including:</p>
        <ul>
          <li>Encryption of sensitive data</li>
          <li>Secure data transmission protocols</li>
          <li>Regular security audits and updates</li>
          <li>Access controls and authentication</li>
        </ul>
        
        <h3>Your Rights</h3>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Delete your account and data</li>
          <li>Opt-out of marketing communications</li>
          <li>Data portability</li>
        </ul>
        
        <h3>Contact Us</h3>
        <p>For privacy-related questions, contact us at privacy@aranyu.in</p>
      </div>
    </div>
  );

  const renderTermsConditions = () => (
    <div className="about__detail-content">
      <div className="about__detail-header">
        <FaFileContract className="about__detail-icon" style={{ color: '#6f42c1' }} />
        <h2 className="about__detail-title" style={{ '--title-color': '#6f42c1' }}>Terms & Conditions</h2>
      </div>
      
      <div className="about__detail-body">
        <p><strong>Last updated:</strong> January 2024</p>
        
        <h3>Acceptance of Terms</h3>
        <p>By downloading, installing, or using the Aranyu app, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
        
        <h3>Service Description</h3>
        <p>Aranyu is a financial technology platform that enables users to:</p>
        <ul>
          <li>Make payments at local businesses</li>
          <li>Earn cashback and discounts</li>
          <li>Manage expenses and track spending</li>
          <li>Discover local merchants and offers</li>
        </ul>
        
        <h3>User Responsibilities</h3>
        <h4>Account Security</h4>
        <ul>
          <li>Maintain confidentiality of login credentials</li>
          <li>Notify us immediately of unauthorized access</li>
          <li>Provide accurate and up-to-date information</li>
          <li>Use the app only for lawful purposes</li>
        </ul>
        
        <h4>Prohibited Activities</h4>
        <ul>
          <li>Fraudulent transactions or activities</li>
          <li>Attempting to hack or compromise the system</li>
          <li>Using the app for illegal purposes</li>
          <li>Sharing account credentials with others</li>
          <li>Reverse engineering the application</li>
        </ul>
        
        <h3>Payment Terms</h3>
        <ul>
          <li>All transactions are subject to verification</li>
          <li>Cashback and rewards are subject to terms</li>
          <li>Refunds are processed according to our refund policy</li>
          <li>Transaction fees may apply for certain services</li>
        </ul>
        
        <h3>Limitation of Liability</h3>
        <p>Aranyu shall not be liable for:</p>
        <ul>
          <li>Indirect, incidental, or consequential damages</li>
          <li>Loss of profits or business opportunities</li>
          <li>Service interruptions or technical issues</li>
          <li>Third-party merchant disputes</li>
        </ul>
        
        <h3>Termination</h3>
        <p>We reserve the right to terminate or suspend your account for violation of these terms or for any other reason at our discretion.</p>
        
        <h3>Changes to Terms</h3>
        <p>We may update these terms from time to time. Continued use of the app constitutes acceptance of the updated terms.</p>
        
        <h3>Governing Law</h3>
        <p>These terms are governed by the laws of India and subject to the jurisdiction of courts in Chandigarh.</p>
        
        <h3>Contact Information</h3>
        <p>For questions about these terms, contact us at legal@aranyu.in</p>
      </div>
    </div>
  );

  const renderDetailView = () => {
    const currentItem = getCurrentItem();
    
    return (
      <div className="about__detail-view">
        <button 
          className="about__back-btn" 
          onClick={handleBackClick}
          style={{ '--btn-color': currentItem?.color || '#007994' }}
        >
          <FaArrowLeft />
          Back to About
        </button>
        
        {currentView === 'about-aranyu' && renderAboutAranyu()}
        {currentView === 'grievance-policy' && renderGrievancePolicy()}
        {currentView === 'privacy-policy' && renderPrivacyPolicy()}
        {currentView === 'terms-conditions' && renderTermsConditions()}
      </div>
    );
  };

  return (
    <div className="about">
      <div className="about__container">
        {currentView === 'main' ? renderMainView() : renderDetailView()}
      </div>
    </div>
  );
};

export default About;