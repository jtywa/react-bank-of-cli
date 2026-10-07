import { useParams } from "react-router-dom";
import { useState } from "react";

const Transaction = () => {
  const { chosenType } = useParams();
  const [transactionType, setTransactionType] = useState(chosenType);
  return <div>
    <h1>Make a Transaction</h1>
    {transactionType === "deposit" && <div></div>}
  </div>;
};
export default Transaction;
