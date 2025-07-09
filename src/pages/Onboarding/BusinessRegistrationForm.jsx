import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaPhone, 
  FaEnvelope, 
  FaWhatsapp,
  FaMapMarkerAlt,
  FaGlobe,
  FaClock,
  FaCheck,
  FaUtensils,
  FaCar,
  FaBed,
  FaCampground,
  FaWifi,
  FaLeaf,
  FaSnowflake,
  FaFirstAid,
  FaCamera,
  FaLanguage,
  FaTrash
} from 'react-icons/fa';
import { useAuth } from '../../AuthContext.jsx';
import { showSuccessToast, showErrorToast } from '../../App.jsx';
import validateField from '../../components/Validations/validations.js'; // Import the validation function
import './BusinessRegistrationForm.css';

function BusinessRegistrationForm({ onBack = () => {}, onComplete = () => {} }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    whatsapp: '',
    address: '',
    landmark: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    seasonalAvailability: 'allYear',
    businessHours: '24hours',
    openTime: '09:00',
    closeTime: '18:00',
    category: '',
    services: []
  });
  const [errors, setErrors] = useState({}); // State to store validation errors

  const { login } = useAuth();
  const navigate = useNavigate();

  const COMPLETED_KEY = 'businessRegistrations';
  const DRAFT_KEY = 'businessRegistrationDraft';

  // Log props for debugging
  useEffect(() => {
    console.log('BusinessRegistrationForm props:', { onBack, onComplete });
  }, [onBack, onComplete]);

  // Load draft data on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft.formData || formData);
        setCurrentStep(parsedDraft.currentStep || 1);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validate the field and update errors
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const nextStep = () => {
    if (isStepValid() && currentStep < 6) {
      setCurrentStep(currentStep + 1);
      // Save draft to localStorage
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ formData, currentStep: currentStep + 1 }));
    } else if (!isStepValid()) {
      showErrorToast('Please fill all required fields correctly before proceeding.');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Save draft to localStorage
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ formData, currentStep: currentStep - 1 }));
    }
  };

  const handleBackClick = () => {
    if (currentStep === 1) {
      const shouldClear = window.confirm('Do you want to clear your form data before going back?');
      if (shouldClear) {
        clearDraft();
      }
      onBack();
    } else {
      prevStep();
    }
  };

  // Save completed registration
  const saveCompletedRegistration = (data) => {
    const registrationData = {
      ...data,
      registrationDate: new Date().toISOString(),
      id: Date.now().toString(),
      status: 'completed'
    };
    
    const existingRegistrations = JSON.parse(localStorage.getItem(COMPLETED_KEY) || '[]');
    existingRegistrations.push(registrationData);
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(existingRegistrations));
    
    return registrationData;
  };

  // Clear draft after successful completion or form reset
  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  // Clear all form data
  const clearForm = () => {
    const shouldClear = window.confirm('Are you sure you want to clear all form data? This action cannot be undone.');
    if (shouldClear) {
      setFormData({
        mobile: '',
        email: '',
        whatsapp: '',
        address: '',
        landmark: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        seasonalAvailability: 'allYear',
        businessHours: '24hours',
        openTime: '09:00',
        closeTime: '18:00',
        category: '',
        services: []
      });
      setCurrentStep(1);
      setErrors({}); // Clear errors
      clearDraft();
      showSuccessToast('Form data cleared successfully!');
    }
  };

  const handleSubmit = () => {
    try {
      if (isStepValid()) {
        const savedRegistration = saveCompletedRegistration(formData);
        console.log('Saved registration:', savedRegistration);
        clearDraft();
        login({ email: formData.email });
        showSuccessToast('Registration completed successfully!');
        if (typeof onComplete === 'function') {
          onComplete(savedRegistration);
        } else {
          console.warn('onComplete is not a function, skipping call');
        }
        console.log('Navigating to /');
        navigate('/', { replace: true });
      } else {
        showErrorToast('Please ensure all required fields are filled correctly.');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      showErrorToast('An error occurred during registration.');
    }
  };

  const getSavedRegistrations = () => {
    return JSON.parse(localStorage.getItem(COMPLETED_KEY) || '[]');
  };

  const hasDraft = () => {
    return localStorage.getItem(DRAFT_KEY) !== null;
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          !errors.mobile && formData.mobile.trim() !== '' &&
          !errors.email && formData.email.trim() !== '' &&
          (!formData.whatsapp || !errors.whatsapp) // Only check whatsapp error if field is not empty
        );
      case 2:
        return (
          !errors.address && formData.address.trim() !== '' &&
          !errors.landmark &&
          !errors.country && formData.country !== '' &&
          !errors.state && formData.state !== '' &&
          !errors.city && formData.city !== '' &&
          !errors.pincode && formData.pincode.trim() !== ''
        );
      case 3:
        if (formData.businessHours === 'custom') {
          return formData.openTime !== '' && formData.closeTime !== '';
        }
        return true;
      case 4:
        return formData.category !== '';
      case 5:
        return formData.services.length > 0;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Contact' },
      { number: 2, title: 'Location' },
      { number: 3, title: 'Availability' },
      { number: 4, title: 'Category' },
      { number: 5, title: 'Services' },
      { number: 6, title: 'Complete' }
    ];

    return (
      <div className="business-form__steps">
        <div className="business-form__steps-mobile d-block d-md-none">
          <div className="business-form__step-current">
            <span className="business-form__step-current-text">Step {currentStep} of 6</span>
            <span className="business-form__step-current-title">{steps[currentStep - 1].title}</span>
          </div>
        </div>
        <div className="business-form__steps-desktop d-none d-md-flex">
          {steps.map((step) =>(
            <div 
              key={step.number}
              className={`business-form__step ${currentStep >= step.number ? 'business-form__step--active' : ''} ${currentStep > step.number ? 'business-form__step--completed' : ''}`}
            >
              <div className="business-form__step-number">
                {currentStep > step.number ? <FaCheck /> : step.number}
              </div>
              <span className="business-form__step-title">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContactDetails = () => (
    <div className="business-form__step-content">
      <div className="business-form__step-header">
        <div className="business-form__step-icon business-form__step-icon--contact">
          <FaPhone />
        </div>
        <div>
          <h2 className="business-form__step-title">Contact Details</h2>
          <p className="business-form__step-subtitle">Step 1/5 - How can customers reach you?</p>
        </div>
      </div>

      <div className="business-form__fields">
        <div className="business-form__field">
          <label className="business-form__label business-form__label--required">Mobile Number</label>
          <input
            type="tel"
            className={`business-form__input form-control ${errors.mobile ? 'is-invalid' : ''}`}
            value={formData.mobile}
            onChange={(e) => handleInputChange('mobile', e.target.value)}
            placeholder="Enter your mobile number"
            required
          />
          {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
        </div>

        <div className="business-form__field">
          <label className="business-form__label business-form__label--required">Email Address</label>
          <input
            type="email"
            className={`business-form__input form-control ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email address"
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="business-form__field">
          <label className="business-form__label">WhatsApp Number</label>
          <input
            type="tel"
            className={`business-form__input form-control ${errors.whatsapp ? 'is-invalid' : ''}`}
            value={formData.whatsapp}
            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
            placeholder="Enter your WhatsApp number (optional)"
          />
          {errors.whatsapp && <div className="invalid-feedback">{errors.whatsapp}</div>}
        </div>
      </div>
    </div>
  );

  const renderLocationDetails = () => (
    <div className="business-form__step-content">
      <div className="business-form__step-header">
        <div className="business-form__step-icon business-form__step-icon--location">
          <FaMapMarkerAlt />
        </div>
        <div>
          <h2 className="business-form__step-title">Location Details</h2>
          <p className="business-form__step-subtitle">Step 2/5 - Where is your business located?</p>
        </div>
      </div>

      <div className="business-form__fields">
        <div className="business-form__field">
          <label className="business-form__label business-form__label--required">Business Address</label>
          <input
            type="text"
            className={`business-form__input form-control ${errors.address ? 'is-invalid' : ''}`}
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter your business address"
            required
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <div className="business-form__field">
          <label className="business-form__label">Landmark</label>
          <input
            type="text"
            className={`business-form__input form-control ${errors.landmark ? 'is-invalid' : ''}`}
            value={formData.landmark}
            onChange={(e) => handleInputChange('landmark', e.target.value)}
            placeholder="Enter nearby landmark"
          />
          {errors.landmark && <div className="invalid-feedback">{errors.landmark}</div>}
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="business-form__field">
              <label className="business-form__label business-form__label--required">Country</label>
              <select
                className={`business-form__select form-select ${errors.country ? 'is-invalid' : ''}`}
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                required
              >
                <option value="">Select Country</option>
                <option value="india">India</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
              </select>
              {errors.country && <div className="invalid-feedback">{errors.country}</div>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="business-form__field">
              <label className="business-form__label business-form__label--required">State</label>
              <select
                className={`business-form__select form-select ${errors.state ? 'is-invalid' : ''}`}
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                required
              >
                <option value="">Select State</option>
                <option value="karnataka">Karnataka</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="tamil-nadu">Tamil Nadu</option>
                <option value="kerala">Kerala</option>
              </select>
              {errors.state && <div className="invalid-feedback">{errors.state}</div>}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="business-form__field">
              <label className="business-form__label business-form__label--required">City</label>
              <select
                className={`business-form__select form-select ${errors.city ? 'is-invalid' : ''}`}
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
              >
                <option value="">Select City</option>
                <option value="bangalore">Bangalore</option>
                <option value="mumbai">Mumbai</option>
                <option value="chennai">Chennai</option>
                <option value="kochi">Kochi</option>
              </select>
              {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="business-form__field">
              <label className="business-form__label business-form__label--required">Pin Code</label>
              <input
                type="text"
                className={`business-form__input form-control ${errors.pincode ? 'is-invalid' : ''}`}
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                placeholder="Enter pin code"
                required
              />
              {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAvailabilityDetails = () => (
    <div className="business-form__step-content">
      <div className="business-form__step-header">
        <div className="business-form__step-icon business-form__step-icon--availability">
          <FaClock />
        </div>
        <div>
          <h2 className="business-form__step-title">Availability Details</h2>
          <p className="business-form__step-subtitle">Step 3/5 - When is your business available?</p>
        </div>
      </div>

      <div className="business-form__fields">
        <div className="business-form__field">
          <label className="business-form__label business-form__label--required">Seasonal Availability</label>
          <div className="business-form__radio-group">
            <label className={`business-form__radio-option ${formData.seasonalAvailability === 'allYear' ? 'business-form__radio-option--selected' : ''}`}>
              <input
                type="radio"
                name="seasonalAvailability"
                value="allYear"
                checked={formData.seasonalAvailability === 'allYear'}
                onChange={(e) => handleInputChange('seasonalAvailability', e.target.value)}
                className="business-form__radio-input"
              />
              <span className="business-form__radio-label">Open All Year</span>
            </label>
            <label className={`business-form__radio-option ${formData.seasonalAvailability === 'summer' ? 'business-form__radio-option--selected' : ''}`}>
              <input
                type="radio"
                name="seasonalAvailability"
                value="summer"
                checked={formData.seasonalAvailability === 'summer'}
                onChange={(e) => handleInputChange('seasonalAvailability', e.target.value)}
                className="business-form__radio-input"
              />
              <span className="business-form__radio-label">Summer Only</span>
            </label>
            <label className={`business-form__radio-option ${formData.seasonalAvailability === 'winter' ? 'business-form__radio-option--selected' : ''}`}>
              <input
                type="radio"
                name="seasonalAvailability"
                value="winter"
                checked={formData.seasonalAvailability === 'winter'}
                onChange={(e) => handleInputChange('seasonalAvailability', e.target.value)}
                className="business-form__radio-input"
              />
              <span className="business-form__radio-label">Winter Only</span>
            </label>
            <label className={`business-form__radio-option ${formData.seasonalAvailability === 'rainy' ? 'business-form__radio-option--selected' : ''}`}>
              <input
                type="radio"
                name="seasonalAvailability"
                value="rainy"
                checked={formData.seasonalAvailability === 'rainy'}
                onChange={(e) => handleInputChange('seasonalAvailability', e.target.value)}
                className="business-form__radio-input"
              />
              <span className="business-form__radio-label">Rainy Only</span>
            </label>
          </div>
        </div>

        <div className="business-form__field">
          <label className="business-form__label business-form__label--required">Business Hours</label>
          <div className="business-form__radio-group">
            <label className={`business-form__radio-option ${formData.businessHours === '24hours' ? 'business-form__radio-option--selected' : ''}`}>
              <input
                type="radio"
                name="businessHours"
                value="24hours"
                checked={formData.businessHours === '24hours'}
                onChange={(e) => handleInputChange('businessHours', e.target.value)}
                className="business-form__radio-input"
              />
              <span className="business-form__radio-label">24 Hours</span>
            </label>
            <label className={`business-form__radio-option ${formData.businessHours === 'custom' ? 'business-form__radio-option--selected' : ''}`}>
              <input
                type="radio"
                name="businessHours"
                value="custom"
                checked={formData.businessHours === 'custom'}
                onChange={(e) => handleInputChange('businessHours', e.target.value)}
                className="business-form__radio-input"
              />
              <span className="business-form__radio-label">Custom Hours</span>
            </label>
          </div>
        </div>

        {formData.businessHours === 'custom' && (
          <div className="business-form__time-inputs row">
            <div className="col-md-6">
              <div className="business-form__field">
                <label className="business-form__label business-form__label--required">Opening Time</label>
                <input
                  type="time"
                  className="business-form__input form-control"
                  value={formData.openTime}
                  onChange={(e) => handleInputChange('openTime', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="business-form__field">
                <label className="business-form__label business-form__label--required">Closing Time</label>
                <input
                  type="time"
                  className="business-form__input form-control"
                  value={formData.closeTime}
                  onChange={(e) => handleInputChange('closeTime', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCategorySelection = () => (
    <div className="business-form__step-content">
      <div className="business-form__step-header">
        <div className="business-form__step-icon business-form__step-icon--category">
          <FaUtensils />
        </div>
        <div>
          <h2 className="business-form__step-title">Select Category</h2>
          <p className="business-form__step-subtitle">Step 4/5 - What type of business do you run?</p>
        </div>
      </div>

      <div className="business-form__fields">
        <div className="business-form__field">
          <label className="business-form__label business-form__label--required">Business Category</label>
          <div className="business-form__radio-group">
            <label className={`business-form__radio-option ${formData.category === 'traditional-bamboo' ? 'business-form__radio-option--selected' : ''}`}>
              <input
                type="radio"
                name="category"
                value="traditional-bamboo"
                checked={formData.category === 'traditional-bamboo'}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="business-form__radio-input"
              />
              <span className="business-form__radio-label">Traditional Bamboo Foods</span>
            </label>
            <label className={`business-form__radio-option ${formData.category === 'south-indian' ? 'business-form__radio-option--selected' : ''}`}>
              <input
                type="radio"
                name="category"
                value="south-indian"
                checked={formData.category === 'south-indian'}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="business-form__radio-input"
              />
              <span className="business-form__radio-label">South Indian Foods</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServicesSelection = () => {
    const services = [
      { id: 'food', label: 'Food', icon: FaUtensils },
      { id: 'travel', label: 'Travel', icon: FaGlobe },
      { id: 'vehicle', label: 'Vehicle', icon: FaCar },
      { id: 'room', label: 'Room', icon: FaBed },
      { id: 'camping', label: 'Camping Tent', icon: FaCampground },
      { id: 'wifi', label: 'Free Wi-Fi', icon: FaWifi },
      { id: 'vegetarian', label: 'Vegetarian Meals', icon: FaLeaf },
      { id: 'ac', label: 'Air Conditioning', icon: FaSnowflake },
      { id: 'transport', label: 'Transport Included', icon: FaCar },
      { id: 'firstaid', label: 'First Aid Kit', icon: FaFirstAid },
      { id: 'photography', label: 'Photography Guidance', icon: FaCamera },
      { id: 'multilingual', label: 'Multilingual Guide', icon: FaLanguage },
      { id: 'lodging', label: 'Comfortable Lodging', icon: FaBed }
    ];

    return (
      <div className="business-form__step-content">
        <div className="business-form__step-header">
          <div className="business-form__step-icon business-form__step-icon--services">
            <FaCheck />
          </div>
          <div>
            <h2 className="business-form__step-title">Available Services</h2>
            <p className="business-form__step-subtitle">Step 5/5 - Select all services your business offers</p>
          </div>
        </div>

        <div className="business-form__fields">
          <div className="business-form__services-grid">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className={`business-form__service-card ${formData.services.includes(service.id) ? 'business-form__service-card--selected' : ''}`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <div className="business-form__service-card-icon">
                    <IconComponent />
                  </div>
                  <span className="business-form__service-card-label">{service.label}</span>
                  <div className="business-form__service-card-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service.id)}
                      onChange={() => handleServiceToggle(service.id)}
                      className="business-form__checkbox-input"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderCompletionStep = () => (
    <div className="business-form__step-content">
      <div className="business-form__completion-content">
        <div className="business-form__completion-icon">
          <FaCheck />
        </div>
        <h2 className="business-form__completion-title">Registration Complete!</h2>
        <p className="business-form__completion-subtitle">
          Your business registration has been completed successfully. 
          You can now start managing your business profile.
        </p>
        
        <div className="business-form__completion-summary">
          <h3>Registration Summary:</h3>
          <div className="business-form__summary-item">
            <strong>Business Category:</strong> {formData.category === 'traditional-bamboo' ? 'Traditional Bamboo Foods' : 'South Indian Foods'}
          </div>
          <div className="business-form__summary-item">
            <strong>Services:</strong> {formData.services.length} services selected
          </div>
          <div className="business-form__summary-item">
            <strong>Location:</strong> {formData.city}, {formData.state}
          </div>
          <div className="business-form__summary-item">
            <strong>Contact:</strong> {formData.mobile}
          </div>
        </div>
      </div>
    </div>
  );

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 1: return renderContactDetails();
      case 2: return renderLocationDetails();
      case 3: return renderAvailabilityDetails();
      case 4: return renderCategorySelection();
      case 5: return renderServicesSelection();
      case 6: return renderCompletionStep();
      default: return renderContactDetails();
    }
  };

  return (
    <div className="business-form">
      <div className="container-fluid">
        <div className="business-form__container">
          <div className="business-form__header">
            <div className="business-form__header-content">
              <button className="business-form__back-btn" onClick={handleBackClick}>
                <FaArrowLeft />
              </button>
              <div className="business-form__header-text">
                <h1 className="business-form__title">Business Registration</h1>
                <p className="business-form__subtitle">Complete your business profile in a few simple steps</p>
              </div>
              <div className="business-form__header-actions">
                <button className="business-form__action-btn business-form__action-btn--clear" onClick={clearForm} title="Clear Form">
                  <FaTrash className="business-form__action-btn-icon" />
                  <span className="business-form__action-btn-text">Clear</span>
                </button>
              </div>
            </div>
          </div>

          {renderStepIndicator()}

          <div className="business-form__content">
            {getCurrentStepContent()}
          </div>

          <div className="business-form__actions">
            <div className="business-form__btn-group">
              {currentStep > 1 && currentStep < 6 && (
                <button className="btn btn-outline-primary business-form__btn business-form__btn--secondary" onClick={prevStep}>
                  <FaArrowLeft className="me-2" />
                  <span>Previous</span>
                </button>
              )}
              
              {currentStep < 5 && (
                <button 
                  className="btn btn-primary business-form__btn business-form__btn--primary" 
                  onClick={nextStep}
                  disabled={!isStepValid()}
                >
                  <span>Next</span>
                  <FaArrowRight className="ms-2" />
                </button>
              )}
              
              {currentStep === 5 && (
                <button 
                  className="btn btn-success business-form__btn business-form__btn--success" 
                  onClick={nextStep}
                  disabled={!isStepValid()}
                >
                  <span>Finish</span>
                  <FaCheck className="ms-2" />
                </button>
              )}

              {currentStep === 6 && (
                <button 
                  className="btn btn-success business-form__btn business-form__btn--success" 
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                >
                  <span>Complete Registration</span>
                  <FaCheck className="ms-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessRegistrationForm;