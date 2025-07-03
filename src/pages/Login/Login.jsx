import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Button, Form, InputGroup } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import './Login.css';
import validateField from '../../components/Validations/validations';
import accounts from '../../data/accounts';
import { useAuth } from '../../AuthContext.jsx';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentSignupStep, setCurrentSignupStep] = useState(1);
  const [formState, setFormState] = useState('login-page__form-wrapper--login-enter-to');
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
    signupName: '',
    signupEmail: '',
    signupPhoneNumber: '',
    signupPassword: '',
    signupConfirmPassword: '',
    signupState: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    loginPassword: false,
    signupPassword: false,
    signupConfirmPassword: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const { from } = location.state || { from: { pathname: '/' } };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, formData.signupPassword),
    }));
  };

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    let formErrors = {};
    if (formType === 'login') {
      formErrors = {
        loginEmail: validateField('loginEmail', formData.loginEmail),
        loginPassword: validateField('loginPassword', formData.loginPassword),
      };
      setErrors(formErrors);
      const hasErrors = Object.values(formErrors).some((error) => error);

      if (!hasErrors) {
        const user = accounts.find(
          (account) =>
            account.email === formData.loginEmail &&
            account.password === formData.loginPassword
        );
        if (user) {
          login({ email: user.email });
          toast.success('Login successful! Redirecting...', {
            duration: 2500,
            style: {
              background: '#e0f2fe',
              color: '#0c4a6e',
              border: '1px solidrgb(255, 255, 255)',
              borderRadius: '8px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
            },
          });
          setTimeout(() => navigate(from.pathname), 2500);
        } else {
          toast.error('Invalid email or password.', {
            duration: 3000,
            style: {
              background: '#fee2e2',
              color: '#991b1b',
              border: '1px solid #dc3545',
              borderRadius: '8px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
            },
          });
        }
      }
    } else {
      formErrors = {
        signupName: validateField('signupName', formData.signupName),
        signupEmail: validateField('signupEmail', formData.signupEmail),
        signupPhoneNumber: validateField('signupPhoneNumber', formData.signupPhoneNumber),
        signupPassword: validateField('signupPassword', formData.signupPassword),
        signupConfirmPassword: validateField(
          'signupConfirmPassword',
          formData.signupConfirmPassword,
          formData.signupPassword
        ),
        signupState: validateField('signupState', formData.signupState),
      };
      setErrors(formErrors);
      const hasErrors = Object.values(formErrors).some((error) => error);

      if (!hasErrors) {
        toast.error('Signup is disabled. Please use existing credentials to login.', {
          duration: 3000,
          style: {
            background: '#fee2e2',
            color: '#991b1b',
            border: '1px solid #dc3545',
            borderRadius: '8px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
          },
        });
      }
    }
  };

  const showLogin = (force = false) => {
    if (!isLogin || force) {
      setFormState('login-page__form-wrapper--signup-leave');
      setTimeout(() => {
        setIsLogin(true);
        setCurrentSignupStep(1);
        setFormState('login-page__form-wrapper--login-enter');
      }, 250);
    }
  };

  const showSignup = (force = false) => {
    if (isLogin || force) {
      setFormState('login-page__form-wrapper--login-leave');
      setTimeout(() => {
        setIsLogin(false);
        setFormState('login-page__form-wrapper--signup-step1-enter');
      }, 250);
    }
  };

  const showSignupStep1 = (forceReset = false) => {
    if (currentSignupStep !== 1 || forceReset) {
      setFormState('login-page__form-wrapper--signup-step2-leave');
      setTimeout(() => {
        setCurrentSignupStep(1);
        setFormState('login-page__form-wrapper--signup-step1-enter');
      }, 250);
    } else {
      setFormState('login-page__form-wrapper--signup-step1-enter-to');
    }
  };

  const showSignupStep2 = () => {
    const step1Errors = {
      signupName: validateField('signupName', formData.signupName),
      signupEmail: validateField('signupEmail', formData.signupEmail),
      signupPhoneNumber: validateField('signupPhoneNumber', formData.signupPhoneNumber),
    };
    setErrors(step1Errors);
    if (!Object.values(step1Errors).some((error) => error)) {
      setFormState('login-page__form-wrapper--signup-step1-leave');
      setTimeout(() => {
        setCurrentSignupStep(2);
        setFormState('login-page__form-wrapper--signup-step2-enter');
      }, 250);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    if (isLogin) {
      setFormState('login-page__form-wrapper--login-enter-to');
    } else if (currentSignupStep === 1) {
      setFormState('login-page__form-wrapper--signup-step1-enter-to');
    } else {
      setFormState('login-page__form-wrapper--signup-step2-enter-to');
    }
  }, [isLogin, currentSignupStep]);

  const indianStates = [
    { value: '', label: 'Select State' },
    { value: 'AN', label: 'Andaman and Nicobar Islands' },
    { value: 'AP', label: 'Andhra Pradesh' },
    { value: 'AR', label: 'Arunachal Pradesh' },
    { value: 'AS', label: 'Assam' },
    { value: 'BR', label: 'Bihar' },
    { value: 'CH', label: 'Chandigarh' },
    { value: 'CT', label: 'Chhattisgarh' },
    { value: 'DN', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'DL', label: 'Delhi' },
    { value: 'GA', label: 'Goa' },
    { value: 'GJ', label: 'Gujarat' },
    { value: 'HR', label: 'Haryana' },
    { value: 'HP', label: 'Himachal Pradesh' },
    { value: 'JK', label: 'Jammu and Kashmir' },
    { value: 'JH', label: 'Jharkhand' },
    { value: 'KA', label: 'Karnataka' },
    { value: 'KL', label: 'Kerala' },
    { value: 'LA', label: 'Ladakh' },
    { value: 'LD', label: 'Lakshadweep' },
    { value: 'MP', label: 'Madhya Pradesh' },
    { value: 'MH', label: 'Maharashtra' },
    { value: 'MN', label: 'Manipur' },
    { value: 'ML', label: 'Meghalaya' },
    { value: 'MZ', label: 'Mizoram' },
    { value: 'NL', label: 'Nagaland' },
    { value: 'OR', label: 'Odisha' },
    { value: 'PY', label: 'Puducherry' },
    { value: 'PB', label: 'Punjab' },
    { value: 'RJ', label: 'Rajasthan' },
    { value: 'SK', label: 'Sikkim' },
    { value: 'TN', label: 'Tamil Nadu' },
    { value: 'TS', label: 'Telangana' },
    { value: 'TR', label: 'Tripura' },
    { value: 'UP', label: 'Uttar Pradesh' },
    { value: 'UT', label: 'Uttarakhand' },
    { value: 'WB', label: 'West Bengal' },
  ];

  return (
    <div className="login-page">
      <Toaster position="top-center" reverseOrder={false} />
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
          <div className="login-page__form-section login-page__width--100 login-page__width--md-50 d-flex justify-content-center align-items-center login-page__padding--4 login-page__padding--md-8">
            <div className="login-page__form-container login-page__padding--4 login-page__padding--md-6 login-page__width--100 login-page__width--max-md">
              <div className="login-page__toggle-container d-flex login-page__margin--bottom-6 login-page__border--rounded-lg overflow-hidden login-page__border--sky-200">
                <button
                  className={`login-page__toggle-button login-page__width--50 login-page__padding--y-3 login-page__text--sm login-page__font--semibold ${isLogin ? 'login-page__toggle-button--active' : 'login-page__toggle-button--inactive'}`}
                  onClick={() => showLogin()}
                >
                  Login
                </button>
                <button
                  className={`login-page__toggle-button login-page__width--50 login-page__padding--y-3 login-page__text--sm login-page__font--semibold ${!isLogin ? 'login-page__toggle-button--active' : 'login-page__toggle-button--inactive'}`}
                  onClick={() => showSignup()}
                >
                  Sign Up
                </button>
              </div>
              <div className={`login-page__form-wrapper ${formState}`}>
                {isLogin ? (
                  <div id="loginForm">
                    <h2 className="login-page__text--2xl login-page__font--semibold login-page__text--slate-700 login-page__margin--bottom-6 text-center">Welcome Back!</h2>
                    <Form onSubmit={(e) => handleSubmit(e, 'login')}>
                      <Form.Group className="login-page__margin--bottom-4" controlId="loginEmail">
                        <Form.Label className="block login-page__text--sm login-page__font--medium login-page__text--slate-600 login-page__margin--bottom-1">Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="loginEmail"
                          value={formData.loginEmail}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={`login-page__input-field login-page__width--100 login-page__padding--x-4 login-page__padding--y-2-5 login-page__border--rounded-lg ${errors.loginEmail ? 'login-page__input-field--invalid' : ''}`}
                        />
                        {errors.loginEmail && <div className="login-page__invalid-feedback">{errors.loginEmail}</div>}
                      </Form.Group>
                      <Form.Group className="login-page__margin--bottom-4" controlId="loginPassword">
                        <Form.Label className="block login-page__text--sm login-page__font--medium login-page__text--slate-600 login-page__margin--bottom-1">Password</Form.Label>
                        <InputGroup className={errors.loginPassword ? 'login-page__input-field--invalid' : ''}>
                          <Form.Control
                            type={showPassword.loginPassword ? 'text' : 'password'}
                            name="loginPassword"
                            value={formData.loginPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="login-page__input-field login-page__password-input login-page__border--rounded-lg login-page__border--end-0"
                          />
                          <InputGroup.Text
                            onClick={() => togglePasswordVisibility('loginPassword')}
                            className="login-page__password-toggle"
                          >
                            {showPassword.loginPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                          </InputGroup.Text>
                        </InputGroup>
                        {errors.loginPassword && <div className="login-page__invalid-feedback">{errors.loginPassword}</div>}
                      </Form.Group>
                      <div className="d-flex align-items-center justify-content-between login-page__margin--bottom-6">
                        <Form.Check>
                          <Form.Check.Input
                            id="rememberMe"
                            name="remember-me"
                            type="checkbox"
                            className="login-page__checkbox login-page__height--4 login-page__width--4 login-page__text--sky-500 login-page__border--slate-300 login-page__border--rounded login-page__background--slate-50"
                          />
                          <Form.Check.Label className="login-page__margin--left-2 block login-page__text--sm login-page__text--slate-600" htmlFor="rememberMe">
                            Remember me
                          </Form.Check.Label>
                        </Form.Check>
                        <a className="login-page__text--sm login-page__text--sky-500 login-page__text--sky-600--hover login-page__font--medium" href="#">
                          Forgot Password?
                        </a>
                      </div>
                      <Button
                        type="submit"
                        className="login-page__button--primary login-page__width--100 login-page__text--white login-page__font--semibold login-page__padding--y-3 login-page__padding--x-4 login-page__border--rounded-lg d-flex align-items-center justify-content-center"
                      >
                        <span className="material-icons login-page__margin--right-2">login</span> Login
                      </Button>
                      <p className="login-page__margin--top-6 text-center login-page__text--sm login-page__text--slate-500">
                        New to Aranyu Partner?{' '}
                        <button
                          className="login-page__font--semibold login-page__text--sky-500 login-page__text--sky-600--hover bg-transparent border-0"
                          onClick={() => showSignup(true)}
                        >
                          Create an account
                        </button>
                      </p>
                    </Form>
                  </div>
                ) : currentSignupStep === 1 ? (
                  <div id="signupFormStep1">
                    <h2 className="login-page__text--2xl login-page__font--semibold login-page__text--slate-700 login-page__margin--bottom-6 text-center">Join Our Travel Community!</h2>
                    <Form>
                      <Form.Group className="login-page__margin--bottom-4" controlId="signupName">
                        <Form.Label className="block login-page__text--sm login-page__font--medium login-page__text--slate-600 login-page__margin--bottom-1">Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="signupName"
                          value={formData.signupName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`login-page__input-field login-page__width--100 login-page__padding--x-4 login-page__padding--y-2-5 login-page__border--rounded-lg ${errors.signupName ? 'login-page__input-field--invalid' : ''}`}
                        />
                        {errors.signupName && <div className="login-page__invalid-feedback">{errors.signupName}</div>}
                      </Form.Group>
                      <Form.Group className="login-page__margin--bottom-4" controlId="signupEmail">
                        <Form.Label className="block login-page__text--sm login-page__font--medium login-page__text--slate-600 login-page__margin--bottom-1">Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="signupEmail"
                          value={formData.signupEmail}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={`login-page__input-field login-page__width--100 login-page__padding--x-4 login-page__padding--y-2-5 login-page__border--rounded-lg ${errors.signupEmail ? 'login-page__input-field--invalid' : ''}`}
                        />
                        {errors.signupEmail && <div className="login-page__invalid-feedback">{errors.signupEmail}</div>}
                      </Form.Group>
                      <Form.Group className="login-page__margin--bottom-6" controlId="signupPhoneNumber">
                        <Form.Label className="block login-page__text--sm login-page__font--medium login-page__text--slate-600 login-page__margin--bottom-1">Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="signupPhoneNumber"
                          value={formData.signupPhoneNumber}
                          onChange={handleChange}
                          placeholder="1234567890"
                          className={`login-page__input-field login-page__width--100 login-page__padding--x-4 login-page__padding--y-2-5 login-page__border--rounded-lg ${errors.signupPhoneNumber ? 'login-page__input-field--invalid' : ''}`}
                        />
                        {errors.signupPhoneNumber && <div className="login-page__invalid-feedback">{errors.signupPhoneNumber}</div>}
                      </Form.Group>
                      <Button
                        type="button"
                        className="login-page__button--primary login-page__width--100 login-page__text--white login-page__font--semibold login-page__padding--y-3 login-page__padding--x-4 login-page__border--rounded-lg d-flex align-items-center justify-content-center"
                        onClick={showSignupStep2}
                      >
                        Continue <span className="material-icons login-page__margin--left-2">arrow_forward</span>
                      </Button>
                      <p className="login-page__margin--top-6 text-center login-page__text--sm login-page__text--slate-500">
                        Already have an account?{' '}
                        <button
                          className="login-page__font--semibold login-page__text--sky-500 login-page__text--sky-600--hover bg-transparent border-0"
                          onClick={() => showLogin(true)}
                        >
                          Login here
                        </button>
                      </p>
                    </Form>
                  </div>
                ) : (
                  <div id="signupFormStep2">
                    <h2 className="login-page__text--2xl login-page__font--semibold login-page__text--slate-700 login-page__margin--bottom-6 text-center">Join Our Travel Community!</h2>
                    <Form onSubmit={(e) => handleSubmit(e, 'signup')}>
                      <Form.Group className="login-page__margin--bottom-4" controlId="signupPassword">
                        <Form.Label className="block login-page__text--sm login-page__font--medium login-page__text--slate-600 login-page__margin--bottom-1">Password</Form.Label>
                        <InputGroup className={errors.signupPassword ? 'login-page__input-field--invalid' : ''}>
                          <Form.Control
                            type={showPassword.signupPassword ? 'text' : 'password'}
                            name="signupPassword"
                            value={formData.signupPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="login-page__input-field login-page__password-input login-page__border--rounded-lg login-page__border--end-0"
                          />
                          <InputGroup.Text
                            onClick={() => togglePasswordVisibility('signupPassword')}
                            className="login-page__password-toggle"
                          >
                            {showPassword.signupPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                          </InputGroup.Text>
                        </InputGroup>
                        {errors.signupPassword && <div className="login-page__invalid-feedback">{errors.signupPassword}</div>}
                      </Form.Group>
                      <Form.Group className="login-page__margin--bottom-4" controlId="signupConfirmPassword">
                        <Form.Label className="block login-page__text--sm login-page__font--medium login-page__text--slate-600 login-page__margin--bottom-1">Confirm Password</Form.Label>
                        <InputGroup className={errors.signupConfirmPassword ? 'login-page__input-field--invalid' : ''}>
                          <Form.Control
                            type={showPassword.signupConfirmPassword ? 'text' : 'password'}
                            name="signupConfirmPassword"
                            value={formData.signupConfirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="login-page__input-field login-page__password-input login-page__border--rounded-lg login-page__border--end-0"
                          />
                          <InputGroup.Text
                            onClick={() => togglePasswordVisibility('signupConfirmPassword')}
                            className="login-page__password-toggle"
                          >
                            {showPassword.signupConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                          </InputGroup.Text>
                        </InputGroup>
                        {errors.signupConfirmPassword && <div className="login-page__invalid-feedback">{errors.signupConfirmPassword}</div>}
                      </Form.Group>
                      <Form.Group className="login-page__margin--bottom-6" controlId="signupState">
                        <Form.Label className="block login-page__text--sm login-page__font--medium login-page__text--slate-600 login-page__margin--bottom-1">State</Form.Label>
                        <Form.Select
                          name="signupState"
                          value={formData.signupState}
                          onChange={handleChange}
                          className={`login-page__input-field login-page__width--100 login-page__padding--x-4 login-page__padding--y-2-5 login-page__border--rounded-lg ${errors.signupState ? 'login-page__input-field--invalid' : ''}`}
                        >
                          {indianStates.map((state) => (
                            <option key={state.value} value={state.value}>
                              {state.label}
                            </option>
                          ))}
                        </Form.Select>
                        {errors.signupState && <div className="login-page__invalid-feedback">{errors.signupState}</div>}
                      </Form.Group>
                      <Button
                        type="submit"
                        className="login-page__button--primary login-page__width--100 login-page__text--white login-page__font--semibold login-page__padding--y-3 login-page__padding--x-4 login-page__border--rounded-lg d-flex align-items-center justify-content-center login-page__margin--bottom-4"
                      >
                        <span className="material-icons login-page__margin--right-2">person_add</span> Sign Up
                      </Button>
                      <Button
                        type="button"
                        className="login-page__button--secondary login-page__width--100 login-page__text--slate-700 login-page__font--semibold login-page__padding--y-3 login-page__padding--x-4 login-page__border--rounded-lg d-flex align-items-center justify-content-center"
                        onClick={() => showSignupStep1()}
                      >
                        <span className="material-icons login-page__margin--right-2">arrow_back</span> Back
                      </Button>
                      <p className="login-page__margin--top-6 text-center login-page__text--sm login-page__text--slate-500">
                        Already have an account?{' '}
                        <button
                          className="login-page__font--semibold login-page__text--sky-500 login-page__text--sky-600--hover bg-transparent border-0"
                          onClick={() => showLogin(true)}
                        >
                          Login here
                        </button>
                      </p>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </div>
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