"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00d09e",
    },
    secondary: {
      main: "#093030",
    },
  },
  typography: {
    allVariants: {
      color: "#093030",
    },
    h1: {
      fontSize: "1.875rem",
      fontWeight: 600,
      textTransform: "capitalize",
    },
    h6: {
      fontWeight: 600,
      textTransform: "capitalize",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "filled", // use "filled" to match the background style
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          border: "none",
          backgroundColor: "#DFF7E2", // light greenish background
          borderRadius: "20px 20px 0 0",
          paddingLeft: "12px",
          outline: "none",
          "&:hover": {
            backgroundColor: "#D5F0DB",
          },
          "&.Mui-focused": {
            backgroundColor: "#D0EFD6",
            boxShadow: "0 0 0 2px rgba(9, 48, 48, 0.1)",
          },
        },
        input: {
          color: "#093030",
          "&::placeholder": {
            color: "#93A29B", // placeholder style
            opacity: 1,
          },
        },
      },
    },
  },
});

export default theme;
