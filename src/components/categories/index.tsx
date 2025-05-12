"use client";
import { List, ListItem, Stack, TextField } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import { CustomButton, TileWrapper } from "../common/Common.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "@/config/api";
import { CategoryWrapper } from "./Categories.styles";
import { useDispatch } from "react-redux";

let token: string | null = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const CategoriesComponent = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const dispatch = useDispatch();

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const { category } = await response.json();

      const formattedCategories = category.map(
        (cat: { name: string }) => cat.name
      );
      setCategories(formattedCategories);
      await dispatch(setCategories(formattedCategories));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
  const formik = useFormik({
    initialValues: { category: "" },
    validationSchema: Yup.object({
      category: Yup.string()
        .trim()
        .required("Category name is required")
        .max(30, "Max 30 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await fetch(`${baseUrl}/api/category/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: values.category }),
        });

        setCategories((prev) => [...prev, values.category]);
        resetForm();
        setAddCategory(false);
      } catch (err) {
        console.error("Failed to add category:", err);
      }
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <TileWrapper>
      <h3>Categories</h3>

      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <CategoryWrapper key={index}>{cat}</CategoryWrapper>
          ))
        ) : (
          <ListItem>No categories yet</ListItem>
        )}
      </List>

      {addCategory ? (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Add Category"
            name="category"
            variant="filled"
            fullWidth
            placeholder="Enter category name"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
            sx={{ mb: 2 }}
          />
          <CustomButton type="submit">Submit</CustomButton>
        </form>
      ) : (
        <CustomButton onClick={() => setAddCategory(true)}>
          Add Category
        </CustomButton>
      )}
    </TileWrapper>
  );
};

export default CategoriesComponent;
