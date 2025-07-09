const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>+\-=/])[A-Za-z\d!@#$%^&*(),.?":{}|<>+\-=/]{8,}$/;
const NAME_REGEX = /^[A-Za-z\s]{2,50}$/;
const PHONE_REGEX = /^\d{10}$/;
const ADDRESS_REGEX = /^[A-Za-z0-9\s.]{2,100}$/;
const PINCODE_REGEX = /^\d{6}$/;

const validateField = (name, value, signupPassword = '') => {
  let error = '';
  if (name === 'loginEmail' || name === 'signupEmail' || name === 'email') {
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
  } else if (name === 'signupPhoneNumber' || name === 'mobile') {
    if (!value) error = 'Please enter your phone number';
    else if (!PHONE_REGEX.test(value)) error = 'Phone number must be exactly 10 digits (e.g., 1234567890)';
  } else if (name === 'whatsapp') {
    if (value && !PHONE_REGEX.test(value)) error = 'WhatsApp number must be exactly 10 digits (e.g., 1234567890)';
  } else if (name === 'address' || name === 'landmark') {
    if (!value && name === 'address') error = 'Please enter your business address';
    else if (value && !ADDRESS_REGEX.test(value)) 
      error = `${name === 'address' ? 'Address' : 'Landmark'} must be 2-100 characters and contain only letters, numbers, spaces, or periods`;
  } else if (name === 'pincode') {
    if (!value) error = 'Please enter your pin code';
    else if (!PINCODE_REGEX.test(value)) error = 'Pin code must be exactly 6 digits (e.g., 123456)';
  } else if (name === 'signupState' || name === 'state' || name === 'country' || name === 'city') {
    if (!value) error = `Please select a ${name}`;
  }
  return error;
};

export default validateField;