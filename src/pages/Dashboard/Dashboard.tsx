import { useAuth } from "@/context/AuthContext";
import { getDate } from "@/utils/utils";
import styles from "./Dashboard.module.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, transactions } = useAuth();

  return (
    <div className={styles.container}>
      <Card className="w-full">
        <CardHeader></CardHeader>
        <CardContent>
          <div className={styles.serif}>Welcome back, {user?.firstName}.</div>
          <div>{getDate()}</div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle>Personal Checking</CardTitle>
              <CardDescription>
                xxxx-{user?.accountNumber?.slice(-4)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={styles.serif}>${user?.balance?.toFixed(2)}</div>
              <div>Available Balance</div>
              <div className="pt-2">
                <div className={styles.buttons}>
                  <Button variant="outline">Deposit</Button>
                  <Button variant="outline">Withdraw</Button>
                  <Button variant="outline">Transfer</Button>
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
