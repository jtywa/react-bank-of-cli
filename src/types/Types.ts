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
  id: number;
  type: string;
  amount: number;
  from: number | null;
  to: number | null;
  date: string;
}

export interface DatabaseSchema {
  users: User[];
  transactions: Transaction[];
}

export type Email = `${string}@${string}.${string}`;

//todo: make transaction type work correctly
