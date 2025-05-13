"use client";
import { baseUrl, getHeaders } from "@/config/api";
import React, { useEffect, useState } from "react";
import { TileWrapper } from "../common/Common.styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { TransactionProps } from "./transactions.types";

const TransactionsComponent = () => {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  const getTransactions = async () => {
    try {
      const headers = await getHeaders();
      const res = await fetch(`${baseUrl}/api/transaction`, {
        method: "GET",
        headers,
      });
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
    <TileWrapper>
      <h3>transactions</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650,borderRadius:"20px"}} aria-label="simple table">
          <TableHead sx={{
            backgroundColor: "#DFF7E2",
            borderRadius: "20px",
          }}>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.category}
                </TableCell>
                <TableCell>
                  {dayjs(row.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: row.type === "Income" ? "#00D09E" : "#FF4D4D",
                    fontWeight: 600,
                  }}
                >
                  {row.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TileWrapper>
  );
};

export default TransactionsComponent;
