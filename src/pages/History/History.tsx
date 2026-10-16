import styles from "./History.module.css";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import PaginationControls from "@/components/PaginationControls/PaginationControls";
import { getPageItems, getTotalPages } from "@/utils/pagination";

const History = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { transactions } = useAuth();
  const totalPages = getTotalPages(transactions.length)
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    document.title = "Transaction History | Bank of CLI";
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionTable isLoading={isLoading} transactions={getPageItems(transactions, page)}></TransactionTable>
        </CardContent>
        <CardFooter>
          <PaginationControls page={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </CardFooter>
      </Card>
    </div>
  );
};
export default History;