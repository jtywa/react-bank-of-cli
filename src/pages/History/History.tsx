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
  const [loadFailed, setLoadFailed] = useState(false);
  const { transactions, userData, refreshTransactions } = useAuth();

  usePageTitle("Transaction History");

  useEffect(() => {
    refreshTransactions()
      .then(() => setLoadFailed(false))
      .catch(() => setLoadFailed(true));
  }, [refreshTransactions]);

  const items = transactions ?? [];
  const totalPages = getTotalPages(items.length);
  const currentPage = Math.min(page, totalPages);
  const isLoading = transactions === null && !loadFailed;

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {loadFailed ? (
            <p>Couldn't load your transactions. Please try again.</p>
          ) : (
            <TransactionTable
              isLoading={isLoading}
              transactions={getPageItems(items, currentPage)}
              currentUserEmail={userData?.email}
            />
          )}
        </CardContent>
        {transactions && (
          <CardFooter>
            <PaginationControls page={currentPage} totalPages={totalPages} onPageChange={setPage} />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default History;
