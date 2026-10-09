import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./Transaction.module.css";
import { useEffect } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { popToast } from "@/lib/popToast";
import { isValidAmount, money } from "@/utils/utils";

const Transaction = () => {
  const { chosenType } = useParams();
  const [transactionType, setTransactionType] = useState(
    chosenType || "deposit",
  );
  const { user, deposit, withdraw, transfer } = useAuth();
  const [amount, setAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidAmount, setInvalidAmount] = useState<boolean>(false);

  const clearFields = () => {
    setAmount("");
    setRecipient("");
  };

  const handleDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    const success = deposit(Number(amount));
    if (success) clearFields();
    popToast(success, "Deposit successful!", "Deposit failed");
  };

  const handleWithdrawal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    const success = withdraw(Number(amount));
    if (success) clearFields();
    popToast(success, "Withdrawal successful!", "Withdrawal failed");
  };

  const handleTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    const success = transfer(Number(amount), recipient);
    if (success) clearFields();
    popToast(success, "Transfer successful!", "Transfer failed");
  };

  const handleAmount = (value: string) => {
    if (isValidAmount(value) || !amount) setInvalidAmount(false);
    else setInvalidAmount(true);
  };

  useEffect(() => {
    document.title = "New Transaction | Bank of CLI";
  }, []);
  return (
    <div className={styles.container}>
      <Card className="min-w-[400px] max-w-[90dvh]">
        <CardHeader className="flex justify-center flex-col items-center">
          <Tabs defaultValue={transactionType}>
            <TabsList className="gap-1">
              <TabsTrigger
                className="min-w-24"
                value="deposit"
                onClick={() => setTransactionType("deposit")}
              >
                Deposit
              </TabsTrigger>
              <TabsTrigger
                className="min-w-24"
                value="withdrawal"
                onClick={() => setTransactionType("withdrawal")}
              >
                Withdrawal
              </TabsTrigger>
              <TabsTrigger
                className="min-w-24"
                value="transfer"
                onClick={() => setTransactionType("transfer")}
              >
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
                <form id="deposit-form" onSubmit={handleDeposit}>
                  <div className="flex flex-col gap-5">
                    <div className="grid gap-2">
                      <Label htmlFor="account">To Account</Label>
                      <Input
                        placeholder={`•••• •••• •••• ${user?.accountNumber?.slice(-4)}`}
                        disabled
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        name="amount"
                        type="text"
                        value={amount}
                        disabled={isLoading ? true : false}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          handleAmount(e.target.value);
                        }}
                        className={invalidAmount ? "border-red-500" : ""}
                      />
                      {invalidAmount && (
                        <Alert
                          className="border-none p-0"
                          variant="destructive"
                        >
                          <AlertTitle>
                            Amount must be a positive value
                          </AlertTitle>
                        </Alert>
                      )}
                    </div>
                    <CardDescription>
                      {Number(amount) > 0 && Number.isFinite(Number(amount))
                        ? `Resulting Balance: ${money((user?.balance ?? 0) + Number(amount))}`
                        : `Current Balance: ${user && money(user.balance)}`}
                    </CardDescription>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-4">
                <Button
                  type="submit"
                  form="deposit-form"
                  className="w-1/3"
                  disabled={isLoading ? true : false}
                >
                  {isLoading && <Spinner className="size-6" />}
                  {isLoading ? "Depositing..." : "Deposit"}
                </Button>
              </CardFooter>
            </Card>
          ) : transactionType === "withdrawal" ? (
            <Card className="w-full ">
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
              </CardHeader>

              <CardContent className="min-h-[240px]">
                <form id="withdrawal-form" onSubmit={handleWithdrawal}>
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
                      <Input
                        name="amount"
                        type="text"
                        value={amount}
                        disabled={isLoading ? true : false}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          handleAmount(e.target.value);
                        }}
                        className={invalidAmount ? "border-red-500" : ""}
                      />
                      {invalidAmount && (
                        <Alert
                          className="border-none p-0"
                          variant="destructive"
                        >
                          <AlertTitle>
                            Amount must be a positive value
                          </AlertTitle>
                        </Alert>
                      )}
                    </div>

                    <CardDescription>
                      {Number(amount) > 0 && Number.isFinite(Number(amount))
                        ? `Resulting Balance: ${money((user?.balance ?? 0) - Number(amount))}`
                        : `Current Balance: ${user && money(user.balance)}`}
                    </CardDescription>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-4">
                <Button
                  type="submit"
                  form="withdrawal-form"
                  className="w-1/3"
                  disabled={isLoading ? true : false}
                >
                  {isLoading && <Spinner className="size-6" />}
                  {isLoading ? "Withdrawing..." : "Withdraw"}
                </Button>
              </CardFooter>
            </Card>
          ) : transactionType === "transfer" ? (
            <Card className="w-full ">
              <CardHeader>
                <CardTitle>Transfer Funds</CardTitle>
              </CardHeader>

              <CardContent className="min-h-[240px]">
                <form id="transfer-form" onSubmit={handleTransfer}>
                  <div className="flex flex-col gap-5">
                    <div className="grid gap-2">
                      <Label htmlFor="from">From Account</Label>
                      <Input
                        name="from"
                        placeholder={`•••• •••• •••• ${user?.accountNumber?.slice(-4)}`}
                        disabled
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="user">
                        Recipient (Username or Email)
                      </Label>
                      <Input
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        name="user"
                        type="text"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        name="amount"
                        type="text"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          handleAmount(e.target.value);
                        }}
                        className={invalidAmount ? "border-red-500" : ""}
                      />
                      {invalidAmount && (
                        <Alert
                          className="border-none p-0"
                          variant="destructive"
                        >
                          <AlertTitle>
                            Amount must be a positive value
                          </AlertTitle>
                        </Alert>
                      )}
                    </div>

                    <CardDescription>
                      {Number(amount) > 0
                        ? `Resulting Balance: ${money((user?.balance ?? 0) - Number(amount))}`
                        : `Current Balance: ${user && money(user.balance)}`}
                    </CardDescription>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-4">
                <Button
                  type="submit"
                  form="transfer-form"
                  className="w-1/3"
                  disabled={isLoading ? true : false}
                >
                  {isLoading && <Spinner className="size-6" />}
                  {isLoading
                    ? "Transferring"
                    : "Transfer"}
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
