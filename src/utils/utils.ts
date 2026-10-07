export const isValidEmail = (email: string) => {
  const emailRegex = /^.+@.+\..+\$/;
  return emailRegex.test(email);
};
