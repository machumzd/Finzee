"use client";
import React, { useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { CustomButton, TileWrapper } from "../common/Common.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { selectCategories } from "@/store/categories.slice";
import { baseUrl, getHeaders } from "@/config/api";
import { useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const [categories, setCategories] = React.useState<string[]>([""]);
  const categoriesCheck = useAppSelector(selectCategories);

  const formik = useFormik({
    initialValues: {
      title: "",
      amount: "",
      type: "",
      category: "",
      note: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      amount: Yup.number()
        .typeError("Amount must be a number")
        .positive("Amount must be positive")
        .required("Amount is required"),
      type: Yup.string().required("Type is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const headers = await getHeaders();
        const res = await fetch(`${baseUrl}/api/transaction/add`, {
          method: "POST",
          headers,
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Transaction added successfully!");
          window.location.reload();
          resetForm();
        } else {
          toast.error(data.message || "Failed to add transaction");
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error("An error occurred while adding the transaction");
      }
    },
  });

  const types = ["Income", "Expense"];

  useEffect(() => {
    if (categoriesCheck.length > 0) {
      const categoriesList = categoriesCheck.map(
        (category: { name: string }) => category.name
      );
      setCategories(categoriesList);
    }
  }, [categoriesCheck]);

  return (
    <TileWrapper>
      <h3>Add Entry</h3>

      <TextField
        label="Title"
        name="title"
        variant="filled"
        fullWidth
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

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

      <TextField
        select
        label="Type"
        name="type"
        variant="filled"
        fullWidth
        value={formik.values.type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
      >
        {types.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Category"
        name="category"
        variant="filled"
        fullWidth
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.category && Boolean(formik.errors.category)}
        helperText={formik.touched.category && formik.errors.category}
      >
        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Note (optional)"
        name="note"
        variant="filled"
        fullWidth
        multiline
        value={formik.values.note}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <CustomButton onClick={() => formik.handleSubmit()}>Submit</CustomButton>
    </TileWrapper>
  );
};

export default AddTransaction;
