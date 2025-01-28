export const validateEmail = (email) => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
};
export const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  ) {
    return true;
  }

  return false;
};

export const handleChange = (e, setAlgo) => {
  setAlgo(e.target.value);
};

export const validate_name = (name) => {
  const maxLength = 30;
  const minLength = 3;

  if (name.length < minLength || name.length > maxLength) {
    return false;
  }
  return true;
};

export const validate_Date = (date) => {
  const [day, month, year] = date.split("/");

  if (parseInt(month) > 12 || parseInt(month) < 1) {
    return false;
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (parseInt(day) > daysInMonth) {
    return false;
  }

  return true;
};
