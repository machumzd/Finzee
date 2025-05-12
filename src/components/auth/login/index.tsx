"use client";
import { Box, Stack, TextField } from "@mui/material";
import React from "react";
import { CardWrapper, CustomButton } from "../common/Common.styles";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "@/config/api";

const LoginComponent = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (data.status) {
          alert("Login successful");
          // Save token to localStorage/cookies if needed
          router.push("/dashboard");
        } else {
          alert("Login failed: " + data.message);
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong.");
      }
    },
  });

  return (
    <Stack>
      <form onSubmit={formik.handleSubmit}>
        <CardWrapper>
          <TextField
            label="Email"
            fullWidth
            variant="filled"
            placeholder="example@example.com"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            fullWidth
            variant="filled"
            placeholder="password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Stack direction="row" gap={2}>
            <CustomButton bgcolor="#00D09E" type="submit">
              Log In
            </CustomButton>
            <CustomButton
              bgcolor="#DFF7E2"
              onClick={() => router.push("/auth/register")}
            >
              Sign Up
            </CustomButton>
          </Stack>
        </CardWrapper>
      </form>
    </Stack>
  );
};

export default LoginComponent;
