import { configureStore, Store } from "@reduxjs/toolkit";

 const store =configureStore({
    reducer: {
        categories: require("./categories.slice").default,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;