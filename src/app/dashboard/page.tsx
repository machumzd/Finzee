import AddEntry from "@/components/addEntry";
import BudgetComponent from "@/components/addBudget";
import CategoriesComponent from "@/components/categories";
import DashboardComponent from "@/components/dashboard";
import TransactionsComponent from "@/components/transactions";
import { Stack, Typography } from "@mui/material";
import React from "react";

const dashboard = () => {
  return (
    <Stack p={3} flexWrap={"wrap"} gap={3} flexDirection={"row"}>

      <Stack direction={"column"} gap={3} p={3} flex={1}>
        <Typography variant="h1">Dashboard</Typography>
        <DashboardComponent />
        <CategoriesComponent />
        <TransactionsComponent />
      </Stack>
      <Stack direction={"column"} gap={3} p={3} pt={5} flex={1}>
        <AddEntry />
        <BudgetComponent />
      </Stack>
    </Stack>
  );
};

export default dashboard;
