"use client";
import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import {
  AnalysisAmount,
  AnalysisWrapper,
  DashboardWrapper,
} from "./dashboard.styles";
import { baseUrl, getHeaders } from "@/config/api";

const DashboardComponent = () => {
  const [dashboardData, setDashboardData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const headers = await getHeaders();
      const res = await fetch(`${baseUrl}/api/transaction/analysis`, {
        method: "GET",
        headers,
      });
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      if (data?.status) {
        setDashboardData(data.analysis);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardWrapper>
      <h3>Analysis</h3>
      <Stack gap={2} flexDirection="row" justifyContent="space-between">
        <AnalysisWrapper>
          <Typography>Total Income</Typography>
          <AnalysisAmount variant="h5">
            ₹ {dashboardData.totalIncome}
          </AnalysisAmount>
        </AnalysisWrapper>
        <AnalysisWrapper>
          <Typography>Total Expense</Typography>
          <AnalysisAmount variant="h5" color="#0068FF">
            ₹ {dashboardData.totalExpense}
          </AnalysisAmount>
        </AnalysisWrapper>
        <AnalysisWrapper>
          <Typography>Balance</Typography>
          <AnalysisAmount variant="h5" color="#0068FF">
            ₹ {dashboardData.balance}
          </AnalysisAmount>
        </AnalysisWrapper>
      </Stack>
    </DashboardWrapper>
  );
};

export default DashboardComponent;
