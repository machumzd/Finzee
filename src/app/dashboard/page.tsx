import AddTransaction from "@/components/transactions/addTransaction";
import CategoriesComponent from "@/components/categories";
import DashboardComponent from "@/components/dashboard";
import TransactionsComponent from "@/components/transactions";
import { Stack } from "@mui/material";
import React from "react";
import AddBudget from "@/components/budget/addBudget";
import BudgetComponent from "@/components/budget";

const dashboard = () => {
  return (
    <Stack p={4} flexWrap={"wrap"} gap={3} flexDirection={"row"}>
      <Stack direction={"column"} gap={3} p={3} flex={1}>
        <DashboardComponent />
        <BudgetComponent />
        <CategoriesComponent />
        <TransactionsComponent />
      </Stack>
      <Stack direction={"column"} gap={3} p={3} flex={1}>
        <AddTransaction />
        <AddBudget />
      </Stack>
    </Stack>
  );
};

export default dashboard;
