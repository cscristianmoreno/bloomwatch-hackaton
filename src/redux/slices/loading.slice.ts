import { createSlice, type CaseReducerActions, type PayloadAction } from "@reduxjs/toolkit";


// eslint-disable-next-line @typescript-eslint/typedef
export const loadingSlice = createSlice({
    name: "alertSlice",
    initialState: false,
    reducers: {
        setLoading: (loading: boolean, action: PayloadAction<boolean>): boolean => {
            loading = action.payload;
            return loading;
        }
    }
});

export const { setLoading }: CaseReducerActions<{ setLoading: (loading: boolean, action: PayloadAction<boolean>) => boolean }, "loadingSlice" > = loadingSlice.actions;