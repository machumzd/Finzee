import { Box, Button, Stack, styled } from "@mui/material";

export const CardWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "70vw",
  gap: 16,
  padding: "8rem",
  backgroundColor: "#F1FFF3",
  height: "70vh",
  borderRadius: 30,
});

export const CustomButton = styled(Button)<{ bgcolor?: string }>(
  ({ bgcolor = "#00D09E" }) => ({
    backgroundColor: bgcolor,
    padding: 12,
    fontSize: 20,
    fontWeight: 600,
    whiteSpace:"nowrap",
    color: "#093030",
    borderRadius: 30,
    width: "100%",
    maxWidth: "12rem",
    textTransform: "capitalize",
  })
);

export const TileWrapper = styled(Stack)({
  backgroundColor: "#ffffff",
  borderRadius: "30px",
  padding: "2rem",
  height: "100%",
  gap: 16,
  width: "100%",
});
