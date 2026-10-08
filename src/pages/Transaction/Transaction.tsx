import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
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
  const [amount, setAmount] = useState<string>("0");
  const [recipient, setRecipient] = useState<string>("");

  useEffect(() => {
    document.title = "New Transaction | Bank of CLI";
  }, []);
  return (
    <div className={styles.container}>
      <Card className="min-w-1/2 max-w-[600px]">
        <CardHeader className="flex justify-center flex-col items-center">
          <CardTitle className="self-start">New Transaction</CardTitle>
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

              <CardContent className="min-h-[240px]">
                <form id="deposit-form">
                  <div className="flex flex-col gap-5">
                    <div className="grid gap-2">
                      <Label htmlFor="account">To Account</Label>
                      <Input placeholder={`•••• •••• •••• ${user?.accountNumber?.slice(-4)}`} disabled />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input name="amount" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <CardDescription>
                      {Number(amount) > 0
                        ? `Resulting Balance: $${((user?.balance ?? 0) + Number(amount)).toFixed(2)}`
                        : `Current Balance: $${user?.balance}`}
                    </CardDescription>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-4">
                <Button type="submit" form="deposit-form" className="w-1/3">
                  Deposit
                </Button>
              </CardFooter>
            </Card>
          ) : transactionType === "withdrawal" ? (
            <Card className="w-full ">
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
              </CardHeader>

              <CardContent className="min-h-[240px]">
                <form id="withdrawal-form">
                  <div className="flex flex-col gap-5">
                    <div className="grid gap-2">
                      <Label htmlFor="from">From Account</Label>
                      <Input
                        name="from"
                        placeholder={`•••• •••• •••• ${user?.accountNumber?.slice(-4)}`}
                        type="text"
                        disabled
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input name="amount" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>

                    <CardDescription>
                      {Number(amount) > 0
                        ? `Resulting Balance: $${((user?.balance ?? 0) + Number(amount)).toFixed(2)}`
                        : `Current Balance: $${user?.balance}`}
                    </CardDescription>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-4">
                <Button type="submit" form="withdrawal-form" className="w-1/3">
                  Withdraw
                </Button>
              </CardFooter>
            </Card>
          ) : transactionType === "transfer" ? (
            <Card className="w-full ">
              <CardHeader>
                <CardTitle>Transfer Funds</CardTitle>
              </CardHeader>

              <CardContent className="min-h-[240px]">
                <form id="transfer-form">
                  <div className="flex flex-col gap-5">
                    <div className="grid gap-2">
                      <Label htmlFor="from">From Account</Label>
                      <Input name="from" placeholder={`•••• •••• •••• ${user?.accountNumber?.slice(-4)}`} disabled />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="user">To User</Label>
                      <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} name="user" type="text" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input name="amount" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>

                    <CardDescription>
                      {Number(amount) > 0
                        ? `Resulting Balance: $${((user?.balance ?? 0) - Number(amount)).toFixed(2)}`
                        : `Current Balance: $${user?.balance}`}
                    </CardDescription>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-4">
                <Button type="submit" form="transfer-form" className="w-1/3">
                  Transfer {Number(amount) > 0 && `$${amount}`} {recipient && `to ${recipient}`}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default Transaction;
