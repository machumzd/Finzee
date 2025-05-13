import LoginComponent from "@/components/auth/login";
import { Typography } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <>
      <Typography variant="h1" textAlign={"center"} pb={2}>
        Welcome
      </Typography>
      <LoginComponent />
    </>
  );
};

export default Login;
