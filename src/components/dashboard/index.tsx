"use client";
import React, { useEffect, useState } from "react";
import { Stack, Typography, CircularProgress } from "@mui/material";
import {
  AnalysisAmount,
  AnalysisWrapper,
  DashboardWrapper,
} from "./dashboard.styles";
import { baseUrl } from "@/config/api";

const DashboardComponent = () => {
  const [dashboardData, setDashboardData] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/dashboard`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setDashboardData(data);
    } catch (err) {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <Stack alignItems="center" mt={5}>
        <CircularProgress />
      </Stack>
    );

  return (
    <DashboardWrapper>
      <h3>Analysis</h3>
      <Stack gap={2} flexDirection="row" justifyContent="space-between">
        <AnalysisWrapper>
          <Typography>Total Income</Typography>
          <AnalysisAmount variant="h5">₹{dashboardData.income}</AnalysisAmount>
        </AnalysisWrapper>
        <AnalysisWrapper>
          <Typography>Total Expense</Typography>
          <AnalysisAmount variant="h5" color="#0068FF">
            ₹{dashboardData.expense}
          </AnalysisAmount>
        </AnalysisWrapper>
        <AnalysisWrapper>
          <Typography>Balance</Typography>
          <AnalysisAmount variant="h5" color="#0068FF">
            ₹{dashboardData.balance}
          </AnalysisAmount>
        </AnalysisWrapper>
      </Stack>
    </DashboardWrapper>
  );
};

export default DashboardComponent;
