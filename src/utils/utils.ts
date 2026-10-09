const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 24;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 16;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 32;

export const isValidEmail = (email: string) => {
  const emailRegex = /^.+@.+\..+$/;
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
};

export const getStringFromDate = (date: Date) => {
  const string = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  return string;
};

export const getDateFromString = (s: string) => {
  const [year, month, day] = s.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const capitalize = (s: string) => {
  s = s.charAt(0).toUpperCase() + s.slice(1);
  return s;
};

export const money = (amount: string | number) => {
  return `$${Number(amount).toFixed(2)}`;
};

export const isValidAmount = (amount: string | number, balance?: string | number) => {
  if (balance) return Number(amount) > 0 && Number.isFinite(Number(amount)) && Number(amount) <= Number(balance);
  return Number(amount) > 0 && Number.isFinite(Number(amount));
};

export const isToday = (date: string) => {
  console.log(date);
  console.log(getStringFromDate(new Date()));
  return date === getStringFromDate(new Date());
};


export const isValidName = (name: string) => {
  return (/^[A-Za-z\s'-]+$/.test(name) && name.length >= NAME_MIN_LENGTH && name.length <= NAME_MAX_LENGTH);
}

export const isValidUsername = (username: string) => {
  return (/^[a-zA-Z0-9]+$/.test(username) && username.length >= USERNAME_MIN_LENGTH && username.length <= USERNAME_MAX_LENGTH);
}

export const isValidPassword = (password: string) => {
  return (/^[a-zA-Z0-9!_#]+$/.test(password) && password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH);
}