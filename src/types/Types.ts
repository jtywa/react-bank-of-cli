export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: Email;
  password: string;
  balance: number;
  accountNumber: number;
};

export type Transaction = {
  transactionType: TransactionType;
  amount: number;
  from: number;
  to: number;
  timestamp: string;
};

export type Email = `${string}@${string}.${string}`;

export type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
