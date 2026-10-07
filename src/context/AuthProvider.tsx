import { useState } from "react";
import db from "@/data/db.json";
import type { User, Transaction } from "@/types/Types";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { generateCardNumber, isValidEmail, isValidPass } from "@/utils/utils";
import type { DatabaseSchema } from "@/types/Types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(db.users);
  const [transactions, setTransactions] = useState<Transaction[]>(db.transactions);

  const login = (username: string, password: string) => {
    const foundUser = users.find((u: User) => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (firstName: string, lastName: string, email: string, username: string, password: string) => {
    console.log("ran signup");
    const userExists = users.find((u: User) => u.username === username);
    if (userExists) throw new Error("User already exists");
    // if (!isValidEmail(email)) throw new Error("Invalid email"); //todo: something wrong here
    // if (!isValidPass(password)) throw new Error("Invalid Password"); //todoL this doesn't work either
    // if (!isValidName(firstName) || !isValidName(lastName)) return; // throw invalid name error

    const newUser: User = {
      id: Date.now(), // generate a random number to use for the id
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
      balance: 0,
      accountNumber: Number(generateCardNumber()),
    };

    setUsers((prev: User[]) => [...prev, newUser]);

    console.log(users);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, users, setUsers, transactions, setTransactions, isLoggedIn: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// todo: should probably make setters for data private
