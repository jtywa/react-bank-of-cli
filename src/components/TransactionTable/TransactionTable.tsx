import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Transaction } from "@/types/Types";
import { getDate, getDateFromString } from "@/utils/utils";
import { Badge } from "../ui/badge";
import styles from "./TransactionTable.module.css"

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2">TRANSACTION</TableHead>
          <TableHead className="">DATE</TableHead>
          <TableHead className="">STATUS</TableHead>
          <TableHead className="text-right">AMOUNT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t) => (
          <TableRow key={t.id}>
            <TableCell className="font-medium">{t.type}</TableCell>
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
              {getDateFromString(t.date).toDateString() ===
              new Date().toDateString() ? (
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
  );
};

export default TransactionTable;
