import styles from "./History.module.css";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import PaginationControls from "@/components/PaginationControls/PaginationControls";
import { getPageItems, getTotalPages } from "@/utils/pagination";
import { usePageTitle } from "@/hooks/usePageTitle";

const History = () => {
  const [page, setPage] = useState(1);
  const [isLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const { transactions, refreshTransactions } = useAuth();
const items = transactions ?? [];
const totalPages = getTotalPages(items.length);
const currentPage = Math.min(page, totalPages);

useEffect(() => {
    refreshTransactions().catch(() => setLoadFailed(true));
  }, [refreshTransactions]);

  usePageTitle("Transaction History");

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        {transactions && (
          <>
          <CardContent>
          {loadFailed ? (
            <p>Couldn't load your transactions. Please try again.</p>
          ) : (
            <TransactionTable isLoading={isLoading} transactions={getPageItems(items, currentPage)} />
          )}
        </CardContent>
        <CardFooter>
          <PaginationControls page={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </CardFooter>
        </>
  )}
        
      </Card>
    </div>
  );
};
export default History;