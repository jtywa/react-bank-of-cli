import { useAuth } from "@/context/AuthContext";
import { capitalize, getDate } from "@/utils/utils";
import styles from "./Dashboard.module.css";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AccountSummary from "@/components/AccountSummary/AccountSummary";
import { usePageTitle } from "@/hooks/usePageTitle";

const Dashboard = () => {
  const [isLoading] = useState(false);
  const { transactions, userData, refreshTransactions } = useAuth();

  useEffect(() => {
    refreshTransactions();
  }, [refreshTransactions]);

  usePageTitle("Dashboard");

  return (
    <div className={styles.container}>
      <Card className="w-full rounded px-2 py-4">
        <CardHeader></CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="text-[10px] opacity-50">{getDate().toUpperCase()}</div>
          <div className={styles.serif}>Welcome back, {userData && capitalize(userData.firstName)}.</div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountSummary userData={userData} isLoading={isLoading} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardAction>
            <Button variant="ghost">
              <Link to="/history">See All 🡢</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {transactions && <TransactionTable isLoading={isLoading} transactions={transactions.slice(0, 5)} />}
        </CardContent>
      </Card>
    </div>
  );
};
export default Dashboard;
