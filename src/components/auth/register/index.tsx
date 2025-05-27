"use client";
import { CircularProgress, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { CardWrapper, CustomButton } from "../../common/Common.styles";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "@/config/api";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const trimmedValues = {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      };
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/auth/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trimmedValues),
        });

        const data = await response.json();
        if (data.status) {
          toast.success("Registration successful");
          router.push("/auth");
        } else {
          toast.error(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Stack width={"100%"} alignItems={"center"}>
      <CardWrapper>
        <TextField
          label="Name"
          fullWidth
          variant="filled"
          onChange={formik.handleChange}
          value={formik.values.name}
          name="name"
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          placeholder="John Doe"
        />
        <TextField
          label="Email"
          fullWidth
          variant="filled"
          onChange={formik.handleChange}
          value={formik.values.email}
          name="email"
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          placeholder="example@example.com"
        />
        <TextField
          label="Password"
          fullWidth
          variant="filled"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          placeholder="password"
        />
        <TextField
          label="Confirm Password"
          fullWidth
          variant="filled"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          name="confirmPassword"
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          placeholder="confirm password"
        />
        <Stack
          direction={"row"}
          gap={2}
          justifyContent="flex-start"
          width="100%"
        >
          <CustomButton
            type="submit"
            disabled={loading}
            onClick={() => formik.handleSubmit()}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </CustomButton>
          <CustomButton
            disabled={loading}
            bgcolor="#DFF7E2"
            onClick={() => router.push("/auth")}
          >
            Log In
          </CustomButton>
        </Stack>
      </CardWrapper>
    </Stack>
  );
};

export default RegisterComponent;
