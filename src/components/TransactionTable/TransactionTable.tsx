import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Transaction } from "@/types/Types";
import { getDateFromString, isToday } from "@/utils/utils";
import { Badge } from "../ui/badge";
import styles from "./TransactionTable.module.css";
import { Card, CardContent } from "../ui/card";
import { BanknoteArrowUp, BanknoteX, Repeat } from "lucide-react";
import { capitalize } from "@/utils/utils";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "../ui/skeleton";

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const TransactionTable = ({ transactions, isLoading }: TransactionTableProps) => {
  const { user } = useAuth();

  return (
    <Card className="min-h-[370px] max-w-[90dvw]">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2 min-w-[160px]">TRANSACTION</TableHead>
              <TableHead className="min-w-[200px]">DATE</TableHead>
              <TableHead className="pl-6 min-w-[110px]">STATUS</TableHead>
              <TableHead className="text-right min-w-[180px]">AMOUNT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t) => (
              <TableRow className={isToday(t.date) ? "opacity-50" : ""} key={t.id}>
                <TableCell className="font-medium flex gap-4 items-center">
                  {isLoading ? (
                    <Skeleton className="w-[42px] h-[42px] rounded"></Skeleton>
                  ) : (
                    <div className="p-2 border-1 rounded">
                      {t.type === "deposit" ? (
                        <BanknoteArrowUp className="text-green-300" />
                      ) : t.type === "withdrawal" ? (
                        <BanknoteX className="text-red-300" />
                      ) : t.type === "transfer" ? (
                        <Repeat className="text-blue-300" />
                      ) : (
                        ""
                      )}
                    </div>
                  )}

                  <div>
                    {isLoading ? (
                      <>
                        <Skeleton className="w-[72px] h-[12px] my-[4px] rounded"></Skeleton>
                        <Skeleton className="w-[64px] h-[9px] my-[2px] rounded"></Skeleton>
                      </>
                    ) : (
                      <>
                        <div className="text-sm">{capitalize(t.type)}</div>
                        <div className="text-[10px] opacity-70">Checking • {user?.accountNumber?.slice(-4)}</div>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className={styles.notMobile}>
                  {isLoading ? (
                    <Skeleton className="w-[155px] h-[14px] rounded"></Skeleton>
                  ) : (
                    <span>
                      {getDateFromString(t.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </TableCell>
                <TableCell className={styles.mobile}>
                  {getDateFromString(t.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {isLoading ? (
                    <Skeleton className="w-[85px] h-[34px] rounded"></Skeleton>
                  ) : (
                    <span>
                      {isToday(t.date) ? (
                        <Badge className="p-4" variant="ghost">
                          Pending
                        </Badge>
                      ) : (
                        <Badge className="p-4" variant="outline">
                          Complete
                        </Badge>
                      )}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {isLoading ? (
                    <Skeleton className="h-[14px] w-[48px] rounded ml-auto"></Skeleton>
                  ) : (
                    <span>${t.amount.toFixed(2)}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
