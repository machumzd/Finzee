"use client";
import { LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { TileWrapper } from "../auth/common/Common.styles";

const DashboardComponent = () => {
  return (
    <Stack maxWidth={600}>
      <TileWrapper>
        <Typography variant="h6">Dashboard</Typography>
        <Stack>
          <Typography variant="h6">Total Income</Typography>
          <Typography variant="h6">500</Typography>
        </Stack>
        <Stack>
          <Typography variant="h6">Total Expense</Typography>
          <Typography variant="h6">500</Typography>
        </Stack>
        {/* <LinearProgress variant="determinate" value={50} /> */}
      </TileWrapper>
    </Stack>
  );
};

export default DashboardComponent;
