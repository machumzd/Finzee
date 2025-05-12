import { Box, styled, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export const AnalysisWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "1rem",
  width: "100%",
});

export const DashboardWrapper = styled(Stack)({
  backgroundColor: "#DFF7E2",
  borderRadius: "30px",
  padding: "2rem",
});

export const AnalysisAmount = styled(Typography)({
  fontSize: "2rem",
  fontWeight: 600,
  textAlign: "center",
  width: "100%",
  padding: "0.5rem",
});
