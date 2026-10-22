import db from "@/data/db.json";
import type { User, Transaction } from "@/types/Types";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { getDateFromString, getStringFromDate } from "@/utils/utils";
import { isValidAmount } from "@/utils/validation";
import * as api from "@/api";

function readSession(): { id: number; email: string } | null {
  const token = api.getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    if (payload.exp * 1000 < Date.now()) {
      api.clearToken();
      return null;
    }
    return { id: Number(payload.sub), email: String(payload.email) };
  } catch {
    api.clearToken();
    return null;
  }
}

const MOCK_ID_OFFSET = 1_000_000;
const sessionToUser = (s: { id: number; email: string }): User => ({
  id: s.id + MOCK_ID_OFFSET,
  firstName: s.email.split("@")[0],
  lastName: "",
  email: s.email,
  username: s.email,
  password: "",
  balance: 0,
  accountNumber: "",
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [initialSession] = useState(readSession);
  const [users, setUsers] = useState<User[]>(() =>
    initialSession ? [...db.users, sessionToUser(initialSession)] : db.users,
  );
  const [userId, setUserId] = useState<number | null>(initialSession ? initialSession.id + MOCK_ID_OFFSET : null);
  const user = useMemo(() => users.find((u) => u.id === userId) ?? null, [users, userId]);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(db.transactions as Transaction[]);

  const transactions = useMemo(() => {
    if (!user) return [];

    return allTransactions
      .filter((t) => t.from === user.id || t.to === user.id)
      .sort((a, b) => getDateFromString(b.date).getTime() - getDateFromString(a.date).getTime());
  }, [allTransactions, user]);

  const login = async (email: string, password: string) => {
    await api.login(email, password);
    const session = readSession();
    if (!session) throw new Error("Login succeeded but the token could not be read.");
    const mockUser = sessionToUser(session);
    setUsers((prev) => (prev.some((u) => u.id === mockUser.id) ? prev : [...prev, mockUser]));
    setUserId(mockUser.id);
  };

  const logout = () => {
    api.clearToken();
    setUserId(null);
  };

  const signup = async (email: string, firstName: string, lastName: string, password: string) => {
    await api.register({ firstName, lastName, email, password });
  };

  const updateBalance = (id: number, newBalance: number) => {
    setUsers((prev) => prev.map((a) => (a.id === id ? { ...a, balance: newBalance } : a)));
  };

  const deposit = (amount: number) => {
    if (!isValidAmount(amount) || !user) return false;
    updateBalance(user.id, user.balance + amount);
    logTransaction("deposit", amount, null, user.username);
    return true;
  };

  const withdraw = (amount: number) => {
    const balance = user ? user.balance : 0;
    if (!isValidAmount(amount, balance) || !user) return false;
    updateBalance(user.id, user.balance - amount);
    logTransaction("withdrawal", amount, user.username, null);
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
    logTransaction("transfer", amount, user.username, recipient);
    return true;
  };

  const getUserId = (value: string) => {
    const foundUser = users.find((u: User) => u.username === value);
    if (foundUser) return foundUser.id;
    const foundUserByEmail = users.find((u: User) => u.email === value);
    if (foundUserByEmail) return foundUserByEmail.id;
    return null;
  };

  const logTransaction = (type: string, amount: number, from?: string | null, to?: string | null) => {
    const fromId = from ? getUserId(from) : null;
    const toId = to ? getUserId(to) : null;
    const transactionId = Date.now();
    const now = getStringFromDate(new Date());

    let t: Transaction;
    switch (type) {
      case "deposit":
        t = { id: transactionId, type: "deposit", amount: amount, from: null, to: toId, date: now };
        break;
      case "withdrawal":
        t = { id: transactionId, type: "withdrawal", amount: amount, from: fromId, to: null, date: now };
        break;
      case "transfer":
        t = { id: transactionId, type: "transfer", amount: amount, from: fromId, to: toId, date: now };
        break;
      default:
        break;
    }
    setAllTransactions((prev: Transaction[]) => [...prev, t]);
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
