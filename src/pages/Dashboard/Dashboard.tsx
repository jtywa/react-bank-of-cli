import { useAuth } from "@/context/AuthContext";
import { capitalize, getDate } from "@/utils/utils";
import styles from "./Dashboard.module.css";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountSummary from "@/components/AccountSummary/AccountSummary";

const Dashboard = () => {
  const { user, transactions } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard | Bank of CLI";
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <Card className="w-full rounded px-2 py-4">
        <CardHeader></CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="text-[10px] opacity-50">{getDate().toUpperCase()}</div>
          <div className={styles.serif}>Welcome back, {user && capitalize(user.firstName)}.</div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountSummary user={user} isLoading={isLoading} />
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
          <TransactionTable isLoading={isLoading} transactions={transactions.slice(0, 5)} />
        </CardContent>
      </Card>
    </div>
  );
};
export default Dashboard;
