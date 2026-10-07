import { useAuth } from "@/context/AuthContext";
import { getDate } from "@/utils/utils";
import styles from "./Dashboard.module.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TransactionTable from "@/components/TransactionTable/TransactionTable";


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
            <Button variant="ghost">See All 🡢</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <TransactionTable transactions={transactions}/>
        </CardContent>
      </Card>
    </div>
  );
};
export default Dashboard;
