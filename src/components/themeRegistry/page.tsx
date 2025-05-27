"use client";
import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "@/store";
import { ToastContainer } from "react-toastify";

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer/>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};
export default ThemeRegistry;
