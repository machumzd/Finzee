import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface Category {
  id: string;
  name: string;
}

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
  },
});

// Actions
export const { setCategories, addCategory } = categoriesSlice.actions;

// Selectors
export const selectCategories = (state: RootState) =>
  state.categories?.categories || [];
export const selectCategoryById = (categoryId: string) => (state: RootState) =>
  state.categories.categories.find(
    (category: Category) => category.id === categoryId
  );

// Reducer
export default categoriesSlice.reducer;
