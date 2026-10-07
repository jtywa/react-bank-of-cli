export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  balance: number;
  accountNumber: string;
};

export interface Transaction {
  type: string;
  amount: number;
  from: number | null;
  to: number | null;
  timestamp: string;
}

export interface DatabaseSchema {
  users: User[];
  transactions: Transaction[];
}

export type Email = `${string}@${string}.${string}`;

//todo: make transaction type work correctly
