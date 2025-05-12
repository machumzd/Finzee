import Header from "@/components/header";
import { Stack } from "@mui/material";
import React from "react";

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack gap={5}>
      <Header />
      {children}
    </Stack>
  );
};

export default dashboardLayout;
