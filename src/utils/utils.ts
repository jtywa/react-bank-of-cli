export const isValidEmail = (email: string) => {
  const emailRegex = /^.+@.+\..+\$/;
  return emailRegex.test(email);
};

export const isValidPass = (pass: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
  return regex.test(pass);
};

export const generateCardNumber = (): string => {
  let result = "";
  for (let i = 0; i < 16; i++) {
    // Generates a random digit between 0 and 9
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

export const getDate = () => {
  const formatted: string = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatted;
}
export const getStringFromDate = (date : Date) => {
// todo:
}

export const getDateFromString = (s : string) => {
  const [year, month, day] = s.split('-').map(Number);
  return new Date(year, month - 1, day); 
}