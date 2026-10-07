import { useAuth } from "@/context/AuthContext";
import { getDate } from "@/utils/utils";
import styles from "./Dashboard.module.css";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@base-ui/react";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <Card className="w-full">
        <CardHeader>
          <CardContent>
            <div>Welcome back, {user?.firstName}.</div>
            <div>{getDate()}</div>
          </CardContent>
        </CardHeader>
      </Card>

      <h1>Dashboard</h1>

      <div>Current balance: ${user?.balance}</div>
      <div>Account: xxxx-xxxx-xxxx-{user?.accountNumber?.slice(-4)}</div>
    </div>
  );
};
export default Dashboard;
