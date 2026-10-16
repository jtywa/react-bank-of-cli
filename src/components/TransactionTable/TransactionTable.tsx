import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Transaction } from "@/types/Types";
import { getDateFromString, isToday } from "@/utils/utils";
import { Badge } from "../ui/badge";
import styles from "./TransactionTable.module.css";
import { BanknoteArrowUp, BanknoteX, Repeat } from "lucide-react";
import { capitalize } from "@/utils/utils";
import { useAuth } from "@/context/AuthContext";
import Loadable from "../Loadable/Loadable";

// TODO: add + and -, color to deposit and withdrawal amounts

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const typeConfig = {
  deposit: { Icon: BanknoteArrowUp, color: "text-green-300" },
  withdrawal: { Icon: BanknoteX, color: "text-red-300" },
  transfer: { Icon: Repeat, color: "text-blue-300" },
} as const;

const TransactionTable = ({
  transactions,
  isLoading,
}: TransactionTableProps) => {
  const { user } = useAuth();

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
          {transactions.map((t) => {
            const { Icon, color } = typeConfig[t.type];
            return (
              <TableRow
                className={isToday(t.date) ? "opacity-50" : ""}
                key={t.id}
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
                      <div className="text-[10px] opacity-70">
                        Checking • {user?.accountNumber?.slice(-4)}
                      </div>
                    </Loadable>
                  </div>
                </TableCell>
                <TableCell className={styles.notMobile}>
                  <Loadable loading={isLoading} skeleton="w-[155px] h-[14px]">
                    <span>
                      {getDateFromString(t.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </Loadable>
                </TableCell>
                <TableCell className={styles.mobile}>
                  {getDateFromString(t.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Loadable loading={isLoading} skeleton="w-[85px] h-[34px]">
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
                  </Loadable>
                </TableCell>
                <TableCell className="text-right">
                  <Loadable
                    loading={isLoading}
                    skeleton="h-[14px] w-[48px] ml-auto"
                  >
                    <span>${t.amount.toFixed(2)}</span>
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
