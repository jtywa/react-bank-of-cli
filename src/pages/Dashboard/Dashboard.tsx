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
} from "@/components/ui/card";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const { user } = useAuth();

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
    </div>
  );
};
export default Dashboard;
