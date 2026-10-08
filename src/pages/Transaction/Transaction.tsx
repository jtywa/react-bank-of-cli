import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./Transaction.module.css";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@base-ui/react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Transaction = () => {
  const { chosenType } = useParams();
  const [transactionType, setTransactionType] = useState(chosenType || "deposit");
  const { user } = useAuth();

  useEffect(() => {
    document.title = "New Transaction | Bank of CLI";
  }, []);
  return (
    <div className={styles.container}>
      <Card className="min-w-1/2">
        <CardHeader className="flex justify-center flex-col items-center">
          <div className={styles.serif}>Make a Transaction</div>
          <Tabs defaultValue={transactionType}>
            <TabsList className="gap-1">
              <TabsTrigger className="min-w-24" value="deposit" onClick={() => setTransactionType("deposit")}>
                Deposit
              </TabsTrigger>
              <TabsTrigger className="min-w-24" value="withdrawal" onClick={() => setTransactionType("withdrawal")}>
                Withdrawal
              </TabsTrigger>
              <TabsTrigger className="min-w-24" value="transfer" onClick={() => setTransactionType("transfer")}>
                Transfer
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {transactionType === "deposit" ? (
            <Card className="w-full ">
              <CardHeader>
                <CardTitle>Deposit Funds</CardTitle>
              </CardHeader>

              <CardContent>
                <form id="login-form">
                  <div className="flex flex-col gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor="username">To Account</Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder={`•••• •••• •••• ${user?.accountNumber?.slice(-4)}`}
                        type="text"
                        disabled
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="password">Amount</Label>
                      <Input />
                    </div>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-4">
                <Button type="submit" form="login-form" className="w-1/3">
                  Deposit
                </Button>
              </CardFooter>
            </Card>
          ) : transactionType === "withdrawal" ? (
            <Card className="w-full ">
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
              </CardHeader>

              <CardContent>
                <form id="login-form">
                  <div className="flex flex-col gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor="username">From Account</Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder={`•••• •••• •••• ${user?.accountNumber?.slice(-4)}`}
                        type="text"
                        disabled
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="password">Amount</Label>
                      <Input />
                    </div>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-4">
                <Button type="submit" form="login-form" className="w-1/3">
                  Withdraw
                </Button>
              </CardFooter>
            </Card>
          ) : transactionType === "transfer" ? (
            "transfer"
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default Transaction;
