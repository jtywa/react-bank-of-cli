import { useAuth } from "@/context/AuthContext";
import { capitalize } from "@/utils/utils";
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
      <div className={styles.serif}>Welcome back, {userData && capitalize(userData.firstName)}</div>
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <AccountSummary userData={userData} isLoading={isLoading} />
        <div className="border-1 border-gray bg-white">
          <div className="border-b-1 border-b-gray flex justify-between px-6 py-4 items-center text-[10px] font-bold opacity-70">
            PENDING SUMMARY
          </div>
          <div className="px-6 py-3">
            <div className="flex gap-[1px] bg-black/10 flex-col">
              <div className="flex justify-between items-center bg-white py-2">
                <div className="text-[12px] opacity-70">Pending credits</div>
                <div className="text-[13px] opacity-70 text-primary">+$100.00</div>
              </div>
              <div className="flex justify-between items-center bg-white py-2">
                <div className="text-[12px] opacity-70">Pending debits</div>
                <div className="text-[13px] opacity-70 text-primary">-$1.00</div>
              </div>
              <div className="flex justify-between items-center bg-white py-2">
                <div className="text-[12px] font-bold">Net Pending</div>
                <div className="text-[13px] opacity-70 text-primary font-bold">+$99</div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
