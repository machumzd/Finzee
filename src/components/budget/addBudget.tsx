"use client";
import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { CustomButton, TileWrapper } from "../common/Common.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl, getHeaders } from "@/config/api";
import { toast } from "react-toastify";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AddBudget = () => {
  const formik = useFormik({
    initialValues: {
      month: "",
      amount: "",
    },
    validationSchema: Yup.object({
      month: Yup.string().required("Month is required"),
      amount: Yup.number()
        .typeError("Amount must be a number")
        .positive("Amount must be positive")
        .required("Amount is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const headers = await getHeaders();
        const res = await fetch(`${baseUrl}/api/budget/add`, {
          method: "POST",
          headers,
          body: JSON.stringify(values),
        });

        const data = await res.json();
        if (res.ok) {
          toast.success("Budget added successfully!");
          window.location.reload();
          resetForm();
        } else {
          toast.error(data.message || "Failed to add budget");
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error("An error occurred while adding the budget");
      }
    },
  });

  return (
    <TileWrapper>
      <h3>Add Budget</h3>

      <TextField
        select
        label="Budget Month"
        name="month"
        variant="filled"
        fullWidth
        value={formik.values.month}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.month && Boolean(formik.errors.month)}
        helperText={formik.touched.month && formik.errors.month}
      >
        {months.map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Amount"
        name="amount"
        variant="filled"
        fullWidth
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.amount && Boolean(formik.errors.amount)}
        helperText={formik.touched.amount && formik.errors.amount}
      />

      <CustomButton onClick={() => formik.handleSubmit()}>Submit</CustomButton>
    </TileWrapper>
  );
};

export default AddBudget;
