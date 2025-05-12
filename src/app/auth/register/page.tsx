import LoginComponent from "@/components/auth/login";
import RegisterComponent from "@/components/auth/register";
import { Typography } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <div>
      <Typography variant="h1" textAlign={"center"} pb={2}>
        Create Account
      </Typography>
      <RegisterComponent />
    </div>
  );
};

export default Login;
