"use client";
import { CircularProgress, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { CardWrapper, CustomButton } from "../../common/Common.styles";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "@/config/api";
import { toast } from "react-toastify";

const LoginComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (data.status) {
          toast.success("Login successful");
          document.cookie = `token=${data.token}`;
          localStorage.setItem("token", data.token);
          router.push("/dashboard");
        } else {
          toast.error(data.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An error occurred during login. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Stack width={"100%"} alignItems={"center"}>
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
        <Stack direction="row" gap={2} justifyContent="flex-start" width="100%">
          <CustomButton
            type="submit"
            disabled={loading}
            onClick={() => formik.handleSubmit()}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Log In"
            )}
          </CustomButton>
          <CustomButton
            bgcolor="#DFF7E2"
            disabled={loading}
            onClick={() => router.push("/auth/register")}
          >
            Sign Up
          </CustomButton>
        </Stack>
      </CardWrapper>
    </Stack>
  );
};

export default LoginComponent;
