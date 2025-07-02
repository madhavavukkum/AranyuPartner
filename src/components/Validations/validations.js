const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>+\-=/])[A-Za-z\d!@#$%^&*(),.?":{}|<>+\-=/]{8,}$/;
const NAME_REGEX = /^[A-Za-z\s]{2,50}$/;
const PHONE_REGEX = /^\d{10}$/;

const validateField = (name, value, signupPassword = '') => {
  let error = '';
  if (name === 'loginEmail' || name === 'signupEmail') {
    if (!value) error = 'Please enter your email address';
    else if (!EMAIL_REGEX.test(value)) error = 'Please enter a valid email (e.g., user@example.com)';
  } else if (name === 'loginPassword' || name === 'signupPassword') {
    if (!value) error = 'Please enter your password';
    else if (value.length < 8) error = 'Password must be at least 8 characters long';
    else if (!PASSWORD_REGEX.test(value))
      error = 'Password must include one uppercase letter, one lowercase letter, one number, and one special character';
  } else if (name === 'signupConfirmPassword') {
    if (!value) error = 'Please confirm your password';
    else if (value !== signupPassword) error = 'Passwords do not match';
  } else if (name === 'signupName') {
    if (!value) error = 'Please enter your full name';
    else if (!NAME_REGEX.test(value)) error = 'Name must be 2-50 characters and contain only letters and spaces';
  } else if (name === 'signupPhoneNumber') {
    if (!value) error = 'Please enter your phone number';
    else if (!PHONE_REGEX.test(value)) error = 'Phone number must be exactly 10 digits (e.g., 1234567890)';
  } else if (name === 'signupState') {
    if (!value) error = 'Please select a state';
  }
  return error;
};

export default validateField;