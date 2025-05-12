"use client";
import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default ThemeRegistry;
