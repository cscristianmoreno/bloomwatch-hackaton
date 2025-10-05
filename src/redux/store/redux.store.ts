import { configureStore, type EnhancedStore } from "@reduxjs/toolkit";
import { loadingSlice } from "../slices/loading.slice";

export const store: EnhancedStore = configureStore({
    reducer: {
        [loadingSlice.reducerPath]: loadingSlice.reducer,
    }
});