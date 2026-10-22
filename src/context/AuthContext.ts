import { createContext, useContext } from "react";
import type { Transaction, User } from "@/types/Types";

interface AuthContextType {
  user: Omit<User, "password"> | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  deposit: (amount: number) => boolean;
  withdraw: (amount: number) => boolean;
  transfer: (amount: number, recipient: string) => boolean;
  users: User[];
  setUsers: React.Dispatch<User[]>;
  transactions: Transaction[];
  setAllTransactions: React.Dispatch<Transaction[]>;
  signup: (email: string, firstName: string, lastName: string, password: string) => Promise<void>;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
