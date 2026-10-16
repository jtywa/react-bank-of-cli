import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import type { User } from "../../types/Types";
import { WalletMinimal } from "lucide-react";
import styles from "./AccountSummary.module.css";
import { money } from "@/utils/utils";

interface AccountSummaryProps {
  user: Omit<User, "password"> | null;
  isLoading: boolean;
}

const AccountSummary = ({ user, isLoading }: AccountSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isLoading ? <Skeleton className="h-[24px]  w-[24px] rounded"></Skeleton> : <WalletMinimal />}
          {isLoading ? (
            <Skeleton className="h-[20px] m-[4px] w-[150px] rounded"></Skeleton>
          ) : (
            <span>Personal Checking</span>
          )}
        </CardTitle>
        {isLoading ? (
          <Skeleton className="h-[12px] m-[4px] w-[60px] rounded"></Skeleton>
        ) : (
          <CardDescription>•••• {user?.accountNumber?.slice(-4)}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[44px] m-[4px] w-[150px] rounded"></Skeleton>
        ) : (
          <div className={styles.cash}>{user && money(user.balance)}</div>
        )}

        {isLoading ? (
          <Skeleton className="h-[16px] mb-[4px] w-[100px] rounded"></Skeleton>
        ) : (
          <div className="pb-1 text-[10px]">AVAILABLE BALANCE</div>
        )}

        <div className="pt-2">
          {isLoading ? (
            <Skeleton className="h-[32px] w-[240px] rounded"></Skeleton>
          ) : (
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default AccountSummary;
