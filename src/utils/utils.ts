export const colorSchemes = [
  "badge-primary",
  "badge-secondary",
  "badge-accent",
  "badge-ghost",
  "badge-info",
  "badge-success",
  "badge-warning",
  "badge-error",
];

export const validateEmail = (email: string): boolean => {
  // Email validation using a simple regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Phone number validation using a simple regular expression
  const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  return phoneRegex.test(phoneNumber);
};
