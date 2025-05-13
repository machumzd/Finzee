import RegisterComponent from "@/components/auth/register";
import { Typography } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <>
      <Typography variant="h1" textAlign={"center"} pb={2}>
        Create Account
      </Typography>
      <RegisterComponent />
    </>
  );
};

export default Login;
