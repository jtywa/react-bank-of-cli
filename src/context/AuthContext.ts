import { createContext, useContext } from "react";
import type { Transaction, User } from "@/types/Types";

interface AuthContextType {
  user: Omit<User, "password"> | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  users: User[];
  setUsers: React.Dispatch<User[]>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<Transaction[]>;
  signup: (firstName: string, lastName: string, email: string, username: string, password: string) => boolean;
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
