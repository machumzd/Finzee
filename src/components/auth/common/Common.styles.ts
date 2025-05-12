import { Box, Button, styled } from "@mui/material";

export const CardWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "70vw",
  gap: 12,
  padding:"8rem",
  backgroundColor: "#F1FFF3",
  height: "70vh",
  borderRadius:30,
});

export const CustomButton = styled(Button)<{ bgcolor?: string }>(
  ({ bgcolor = "#00D09E" }) => ({
    backgroundColor: bgcolor,
    padding:12,
    fontSize:20,
    fontWeight:600,
    color:"#093030",
    borderRadius:30,
    width:207,
    textTransform:"capitalize",
  })
);

  export const TileWrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: 12,
    padding:"1rem",
    backgroundColor: "#F1FFF3",
    borderRadius:30,
  });
  

