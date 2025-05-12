"use client";
import { baseUrl } from "@/config/api";
import React, { useEffect, useState } from "react";

const TransactionsComponent = () => {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  const getTransactions = async () => {
    try {
      const res = await fetch(`${baseUrl}/transactions`);
      const data = await res.json();
      if (data?.status) {
        setTransactions(data.transactions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <h3>transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>{transaction.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsComponent;
