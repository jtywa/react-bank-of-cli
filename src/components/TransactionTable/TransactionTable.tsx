import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Transaction } from "@/types/Types";
import { getDateFromString } from "@/utils/utils";
import { Badge } from "../ui/badge";
import styles from "./TransactionTable.module.css";
import { Card, CardContent } from "../ui/card";
import { BanknoteArrowUp, BanknoteX, Repeat } from "lucide-react";
import { capitalize } from "@/utils/utils";
import { useAuth } from "@/context/AuthContext";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const { user } = useAuth();

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">TRANSACTION</TableHead>
              <TableHead className="">DATE</TableHead>
              <TableHead className="pl-6">STATUS</TableHead>
              <TableHead className="text-right">AMOUNT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium flex gap-4 items-center">
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

                  <div>
                    <div className="text-sm">{capitalize(t.type)}</div>
                    <div className="text-[10px] opacity-70">Checking • {user?.accountNumber?.slice(-4)}</div>
                  </div>
                </TableCell>
                <TableCell className={styles.notMobile}>
                  {getDateFromString(t.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className={styles.mobile}>
                  {getDateFromString(t.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {getDateFromString(t.date).toDateString() === new Date().toDateString() ? (
                    <Badge className="p-4" variant="ghost">
                      Pending
                    </Badge>
                  ) : (
                    <Badge className="p-4" variant="outline">
                      Complete
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">${t.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
