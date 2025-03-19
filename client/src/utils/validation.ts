export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/;
  return emailRegex.test(email);
};

export const passwordValidation = (password: string): boolean => {
  return password.length >= 8;
};

export const arePasswordsMatching = (
  password: string,
  repassword: string
): boolean => {
  return password === repassword;
};
