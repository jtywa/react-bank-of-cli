import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Transaction } from "@/api";
import { getDateFromString, isToday } from "@/utils/utils";
import { Badge } from "../ui/badge";
import styles from "./TransactionTable.module.css";
import { BanknoteArrowUp, BanknoteX, Repeat } from "lucide-react";
import { capitalize } from "@/utils/utils";
import Loadable from "../Loadable/Loadable";

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
  currentUserEmail?: string;
}

const typeConfig = {
  DEPOSIT: { Icon: BanknoteArrowUp, color: "text-green-300" },
  WITHDRAWAL: { Icon: BanknoteX, color: "text-red-300" },
  TRANSFER: { Icon: Repeat, color: "text-blue-300" },
} as const;

const formatAmount = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });


const getDirection = (t: Transaction, currentUserEmail?: string): 1 | -1 => {
  if (t.type === "DEPOSIT") return 1;
  if (t.type === "WITHDRAWAL") return -1;
  return t.senderAccountEmail === currentUserEmail ? -1 : 1;
};

const placeholderRows: Transaction[] = Array.from({ length: 5 }, (_, i) => ({
  id: -(i + 1),
  type: "DEPOSIT",
  amountInCents: 0,
  timestamp: new Date().toISOString(),
}));

const TransactionTable = ({
  transactions,
  isLoading,
  currentUserEmail,
}: TransactionTableProps) => {
  const showPlaceholders = isLoading && transactions.length === 0;
  const rows = showPlaceholders ? placeholderRows : transactions;

  return (
    <div className="min-h-[340px]">
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
          {!isLoading && rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center opacity-70">
                No transactions yet.
              </TableCell>
            </TableRow>
          )}

          {rows.map((t) => {
            const { Icon, color } = typeConfig[t.type];
            const direction = getDirection(t, currentUserEmail);
            const subtitle =
              t.type === "TRANSFER"
                ? direction === -1
                  ? `To ${t.recipientAccountEmail}`
                  : `From ${t.senderAccountEmail}`
                : "Checking";

            return (
              <TableRow
                className={!isLoading && isToday(t.timestamp) ? "opacity-50" : ""}
                key={`${t.type}-${t.id}`}
              >
                <TableCell className="font-medium flex gap-4 items-center">
                  <Loadable loading={isLoading} skeleton="w-[42px] h-[42px]">
                    <div className="p-2 border-1 rounded">
                      <Icon className={color} />
                    </div>
                  </Loadable>

                  <div>
                    <Loadable
                      loading={isLoading}
                      skeleton="w-[72px] h-[12px] my-[4px]"
                    >
                      <div className="text-sm">{capitalize(t.type)}</div>
                    </Loadable>
                    <Loadable
                      loading={isLoading}
                      skeleton="w-[64px] h-[9px] my-[2px]"
                    >
                      <div className="text-[10px] opacity-70">{subtitle}</div>
                    </Loadable>
                  </div>
                </TableCell>

                <TableCell className={styles.notMobile}>
                  <Loadable loading={isLoading} skeleton="w-[155px] h-[14px]">
                    <span>
                      {getDateFromString(t.timestamp).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </Loadable>
                </TableCell>

                <TableCell className={styles.mobile}>
                  <Loadable loading={isLoading} skeleton="w-[60px] h-[14px]">
                    <span>
                      {getDateFromString(t.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </Loadable>
                </TableCell>

                <TableCell>
                  <Loadable loading={isLoading} skeleton="w-[85px] h-[34px]">
                    <span>
                      {isToday(t.timestamp) ? (
                        <Badge className="p-4" variant="ghost">
                          Pending
                        </Badge>
                      ) : (
                        <Badge className="p-4" variant="outline">
                          Complete
                        </Badge>
                      )}
                    </span>
                  </Loadable>
                </TableCell>

                <TableCell className="text-right">
                  <Loadable
                    loading={isLoading}
                    skeleton="h-[14px] w-[48px] ml-auto"
                  >
                    <span
                      className={direction === 1 ? "text-green-400" : "text-red-400"}
                    >
                      {direction === 1 ? "+" : "−"}
                      {formatAmount(t.amountInCents)}
                    </span>
                  </Loadable>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;