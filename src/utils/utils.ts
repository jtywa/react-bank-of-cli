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



export const isToday = (date: string) => {
  console.log(date);
  console.log(getStringFromDate(new Date()));
  return date === getStringFromDate(new Date());
};

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));