import db from "@/data/db.json";
import type { User, Transaction } from "@/types/Types";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { generateCardNumber, getDateFromString, isValidAmount } from "@/utils/utils";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(db.users);
  const [userId, setUserId] = useState<number | null>(null);
  const user = useMemo(() => users.find((u) => u.id === userId) ?? null, [users, userId]);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(db.transactions);

  const transactions = useMemo(() => {
    if (!user) return [];

    return allTransactions
      .filter((t) => t.from === user.id || t.to === user.id)
      .sort((a, b) => getDateFromString(b.date).getTime() - getDateFromString(a.date).getTime());
  }, [allTransactions, user]);

  const login = (username: string, password: string) => {
    const foundUser = users.find((u: User) => u.username === username && u.password === password);
    if (foundUser) {
      setUserId(foundUser.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUserId(null);
  };

  const updateBalance = (id: number, newBalance: number) => {
    setUsers((prev) =>
      prev.map((account) => (account.id === user?.id ? { ...account, balance: newBalance } : account)),
    );
  };

  const deposit = (amount: number) => {
    if (!isValidAmount(amount) || !user) return false;
    updateBalance(user.id, user.balance + amount);
    return true;
  };

  const withdraw = (amount: number) => {
    const balance = user ? user.balance : 0;
    if (!isValidAmount(amount, balance) || !user) return false;
    updateBalance(user.id, user.balance - amount);
    return true;
  };

  const transfer = (amount: number, recipient: string) => {
    const balance = user ? user.balance : 0;
    if (!user || !isValidAmount(amount, balance)) return false;

    const otherUser = users.find((u: User) => u.username === recipient || u.email === recipient);
    if (!otherUser || otherUser.id === user.id) return false;

    setUsers((prev) =>
      prev.map((account) => {
        if (account.id === user.id) {
          return { ...account, balance: account.balance - amount };
        }
        if (account.id === otherUser.id) {
          return { ...account, balance: account.balance + amount };
        }
        return account;
      }),
    );
    return true;
  };

  const signup = (firstName: string, lastName: string, email: string, username: string, password: string) => {
    console.log("ran signup");
    const userExists = users.find((u: User) => u.username === username);
    if (userExists) return false;
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
      accountNumber: generateCardNumber(),
    };

    setUsers((prev: User[]) => [...prev, newUser]);

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        deposit,
        withdraw,
        transfer,
        users,
        setUsers,
        transactions,
        setAllTransactions,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// todo: should probably make setters for data private
