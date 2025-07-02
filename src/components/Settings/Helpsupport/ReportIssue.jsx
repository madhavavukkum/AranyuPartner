import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTriangleExclamation, FaUser, FaEnvelope, FaTag, FaCommentDots, FaPaperPlane } from 'react-icons/fa6';
import './ReportIssue.css';

const ReportIssue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reporting the issue. We will get back to you soon!');
    setFormData({ name: '', email: '', issueType: '', description: '' });
  };

  return (
    <div className="report-issue">
      <div className="report-issue__container">
        {/* Header */}
        <div className="report-issue__header">
          <div className="report-issue__header-content">
            <button
              className="report-issue__back-btn"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>
            <div className="report-issue__header-text">
              <h1 className="report-issue__title">Report Issue</h1>
              <p className="report-issue__subtitle">We're here to help resolve any problems</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="report-issue__content">
          <div className="report-issue__intro">
            <div className="report-issue__intro-icon">
              <FaTriangleExclamation />
            </div>
            <h2 className="report-issue__intro-title">We're Here to Help</h2>
            <p className="report-issue__intro-text">
              Encountered a problem or have feedback? Let us know and we'll work to resolve it quickly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="report-issue__form">
            <div className="report-issue__form-group">
              <label className="report-issue__form-label">
                <FaUser className="report-issue__form-icon" />
                Your Name
              </label>
              <input
                type="text"
                name="name"
                className="report-issue__form-input"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="report-issue__form-group">
              <label className="report-issue__form-label">
                <FaEnvelope className="report-issue__form-icon" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="report-issue__form-input"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="report-issue__form-group">
              <label className="report-issue__form-label">
                <FaTag className="report-issue__form-icon" />
                Issue Type
              </label>
              <select
                name="issueType"
                className="report-issue__form-input"
                value={formData.issueType}
                onChange={handleChange}
                required
              >
                <option value="">Select issue type</option>
                <option value="technical">Technical Problem</option>
                <option value="account">Account Issue</option>
                <option value="payment">Payment Problem</option>
                <option value="feature">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="report-issue__form-group">
              <label className="report-issue__form-label">
                <FaCommentDots className="report-issue__form-icon" />
                Describe the Issue
              </label>
              <textarea
                name="description"
                className="report-issue__form-textarea"
                rows="5"
                placeholder="Please provide detailed information about the issue you're experiencing..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="report-issue__submit-btn">
              <FaPaperPlane className="report-issue__btn-icon" />
              Submit Report
            </button>
          </form>

          <div className="report-issue__next-steps">
            <h3 className="report-issue__next-steps-title">What happens next?</h3>
            <ul className="report-issue__next-steps-list">
              <li className="report-issue__next-steps-item">We'll review your report within 24 hours</li>
              <li className="report-issue__next-steps-item">Our support team will investigate the issue</li>
              <li className="report-issue__next-steps-item">You'll receive updates via email</li>
              <li className="report-issue__next-steps-item">We'll work to resolve the issue as quickly as possible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;