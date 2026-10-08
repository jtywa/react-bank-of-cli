import { useAuth } from "@/context/AuthContext";
import { getDate } from "@/utils/utils";
import styles from "./Dashboard.module.css";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { Link } from "react-router-dom";
import { WalletMinimal } from "lucide-react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, transactions } = useAuth();

  useEffect(() => {
    document.title = "Dashboard | Bank of CLI";
  }, []);

  return (
    <div className={styles.container}>
      <Card className="w-full rounded px-2 py-4">
        <CardHeader></CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="text-[10px] opacity-50">{getDate().toUpperCase()}</div>
          <div className={styles.serif}>Welcome back, {user?.firstName}.</div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WalletMinimal />
                <span>Personal Checking</span>
              </CardTitle>
              <CardDescription>•••• {user?.accountNumber?.slice(-4)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={styles.cash}>${user?.balance?.toFixed(2)}</div>
              <div className="pb-1 text-[10px]">AVAILABLE BALANCE</div>
              <div className="pt-2">
                <div className={styles.buttons}>
                  <Button variant="outline">
                    <Link to="/transaction/deposit">Deposit</Link>
                  </Button>
                  <Button variant="outline">
                    <Link to="/transaction/withdrawal">Withdrawal</Link>
                  </Button>
                  <Button variant="outline">
                    <Link to="/transaction/transfer">Transfer</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
          <TransactionTable transactions={transactions.slice(0, 5)} />
        </CardContent>
      </Card>
    </div>
  );
};
export default Dashboard;
