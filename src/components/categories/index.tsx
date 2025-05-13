"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { List, ListItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomButton, TileWrapper } from "../common/Common.styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl, getHeaders } from "@/config/api";
import { CategoryWrapper } from "./categories.styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addCategory, setCategories } from "@/store/categories.slice";

const CategoriesComponent = () => {
  const [isAddCategoryClicked, setIsAddCategoryClicked] = useState(false);
  const [categoriesData, setCategoriesData] = useState<string[]>([]);

  const dispatch: AppDispatch = useDispatch();

  const dispatchCategory = (categories: []) => {
    dispatch(setCategories(categories));
  };

  const fetchCategories = async () => {
    try {
      const headers = await getHeaders();
      const response = await fetch(`${baseUrl}/api/category`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const { category } = await response.json();

      const formattedCategories = category.map(
        (cat: { name: string }) => cat.name
      );

      setCategoriesData(formattedCategories);
      await dispatchCategory(category);
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
        const headers = await getHeaders();
        await fetch(`${baseUrl}/api/category/add`, {
          method: "POST",
          headers,
          body: JSON.stringify({ name: values.category }),
        });

        setCategoriesData((prev) => [...prev, values.category]);
        await dispatch(addCategory({ id: Math.random().toString(), name: values.category }));
        resetForm();
        setIsAddCategoryClicked(false);
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
        {categoriesData.length > 0 ? (
          categoriesData.map((cat, index) => (
            <CategoryWrapper key={index}>{cat}</CategoryWrapper>
          ))
        ) : (
          <ListItem>No categories yet</ListItem>
        )}
      </List>

      {isAddCategoryClicked ? (
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
        <CustomButton onClick={() => setIsAddCategoryClicked(true)}>
          Add Category
        </CustomButton>
      )}
    </TileWrapper>
  );
};

export default CategoriesComponent;
