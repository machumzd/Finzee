"use client";
import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "@/store";

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};
export default ThemeRegistry;
