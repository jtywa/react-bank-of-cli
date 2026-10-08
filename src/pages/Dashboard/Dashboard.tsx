import { useAuth } from "@/context/AuthContext";
import { getDate } from "@/utils/utils";
import styles from "./Dashboard.module.css";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { Link } from "react-router-dom";
import { WalletMinimal } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { user, transactions } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    document.title = "Dashboard | Bank of CLI";
    const timer = setTimeout(() => {
    setIsLoading(false);
  }, 1500);
  return () => clearTimeout(timer); 
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
                {isLoading ? <Skeleton className="h-[24px]  w-[24px] rounded"></Skeleton> : <WalletMinimal />}
                {isLoading ? <Skeleton className="h-[20px] m-[4px] w-[150px] rounded"></Skeleton> :
                <span>Personal Checking</span>}
                
              </CardTitle>
              {isLoading ? <Skeleton className="h-[12px] m-[4px] w-[60px] rounded"></Skeleton> :
              <CardDescription>•••• {user?.accountNumber?.slice(-4)}</CardDescription>
              }
              
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-[44px] m-[4px] w-[150px] rounded"></Skeleton> : <div className={styles.cash}>${user?.balance?.toFixed(2)}</div>}
              
              {isLoading ? <Skeleton className="h-[16px] mb-[4px] w-[100px] rounded"></Skeleton> : <div className="pb-1 text-[10px]">AVAILABLE BALANCE</div>}
              
              
              <div className="pt-2">
                {isLoading ? <Skeleton className="h-[32px] w-[240px] rounded"></Skeleton> : <div className={styles.buttons}>
                  <Button variant="outline">
                    <Link to="/transaction/deposit">Deposit</Link>
                  </Button>
                  <Button variant="outline">
                    <Link to="/transaction/withdrawal">Withdrawal</Link>
                  </Button>
                  <Button variant="outline">
                    <Link to="/transaction/transfer">Transfer</Link>
                  </Button>
                </div>}
                
                
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
          <TransactionTable isLoading={isLoading} transactions={transactions.slice(0, 5)} />
        </CardContent>
      </Card>
    </div>
  );
};
export default Dashboard;
