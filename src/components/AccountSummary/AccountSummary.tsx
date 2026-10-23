import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { WalletMinimal } from "lucide-react";
import styles from "./AccountSummary.module.css";
import { money } from "@/utils/utils";
import Loadable from "../Loadable/Loadable";
import type { Account } from "@/api";

interface AccountSummaryProps {
  userData: Account | null;
  isLoading: boolean;
}

const AccountSummary = ({ userData, isLoading }: AccountSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Loadable loading={isLoading} skeleton="h-[24px]  w-[24px]">
            <WalletMinimal />
          </Loadable>

          <Loadable loading={isLoading} skeleton="h-[20px] m-[4px] w-[150px]">
            <span>Personal Checking</span>
          </Loadable>
        </CardTitle>

        <Loadable loading={isLoading} skeleton="h-[12px] m-[4px] w-[60px]">
          <CardDescription>
            •••• 7534
          </CardDescription>
        </Loadable>
      </CardHeader>

      <CardContent>
        <Loadable loading={isLoading} skeleton="h-[44px] m-[4px] w-[150px]">
          <div className={styles.cash}>{userData && money(userData.balanceInCents / 100.00)}</div>
        </Loadable>

        <Loadable loading={isLoading} skeleton="h-[16px] mb-[4px] w-[100px]">
          <div className="pb-1 text-[10px]">AVAILABLE BALANCE</div>
        </Loadable>

        <div className="pt-2">
          <Loadable loading={isLoading} skeleton="h-[32px] w-[240px] rounded">
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
          </Loadable>
        </div>
      </CardContent>
    </Card>
  );
};
export default AccountSummary;
