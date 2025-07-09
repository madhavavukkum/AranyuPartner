import { FaUser, FaArrowRight, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './OnboardingPage.css';
import onboard1 from '../../assets/onboard1.svg';
import onboard3 from '../../assets/onboard3.svg';

function OnboardingPage() {
  const navigate = useNavigate();

  // Handler for logout button
  const handleLogout = () => {
    navigate('/logout');
  };

  // Handler for starting business registration
  const handleStartRegistration = () => {
    navigate('/business-registration');
  };

  return (
    <div className="onboarding">
      <div className="onboarding__logout">
        <button className="onboarding__logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

      <div className="onboarding__container">
        <div className="onboarding__content">
          <div className="onboarding__header">
            <div className="onboarding__icon">
              <FaUser />
            </div>
            <h1 className="onboarding__title">Welcome to Onboarding!</h1>
            <p className="onboarding__subtitle">Register your Business with Us !!!!</p>
          </div>


          <div className="onboarding__action">
            <button className="onboarding__cta-btn" onClick={handleStartRegistration}>
              <span>Add Your Business</span>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="onboarding__illustrations">
        <div className="onboarding__illustration onboarding__illustration--left">
          <img src={onboard1} alt="Business illustration" />
        </div>
        <div className="onboarding__illustration onboarding__illustration--right">
          <img src={onboard3} alt="Team collaboration illustration" />
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;