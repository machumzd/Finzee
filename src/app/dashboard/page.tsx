"use client"
import AddEntry from "@/components/addEntry";
import BudgetComponent from "@/components/budget";
import CategoriesComponent from "@/components/categories";
import DashboardComponent from "@/components/dashboard";
import TransactionsComponent from "@/components/transactions";
import { Stack } from "@mui/material";
import React from "react";

const dashboard = () => {
  return (
    <Stack gap={3}>
      <DashboardComponent />
      {/* <CategoriesComponent />
      <AddEntry />
      <BudgetComponent />
      <TransactionsComponent /> */}
    </Stack>
  );
};

export default dashboard;
