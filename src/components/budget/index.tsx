"use client";
import React, { useEffect } from "react";
import { TileWrapper } from "../common/Common.styles";
import { LinearProgress, Typography, Box } from "@mui/material";
import { baseUrl, getHeaders } from "@/config/api";

const BudgetComponent = () => {
  const [currentAmount, setCurrentAmount] = React.useState(0);
  const [budgetLimit, setBudgetLimit] = React.useState(0);
  const percentage =
    budgetLimit > 0 ? Math.min((currentAmount / budgetLimit) * 100, 100) : 0;

  const fetchBudgetData = async () => {
    try {
      const headers = await getHeaders();
      const month = new Date().toLocaleString("default", { month: "long" });
      const response = await fetch(`${baseUrl}/api/budget?month=${month}`, {
        method: "GET",
        headers,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch budget data");
      }
      const { budget, currentExpense } = await response.json();
      setCurrentAmount(currentExpense);
      setBudgetLimit(budget.amount);
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, []);

  return (
    <TileWrapper>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <h3>Budget Usage</h3>
        <Typography variant="h6">
          ₹{currentAmount} / ₹{budgetLimit}
        </Typography>
      </Box>
      <LinearProgress value={percentage} variant="determinate" />
    </TileWrapper>
  );
};

export default BudgetComponent;
