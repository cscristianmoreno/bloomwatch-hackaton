import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { loadingSlice, setLoading } from "../redux/slices/loading.slice"
import { useSelect } from "./use-select.hook"
import { useDispatch } from "react-redux";

export const useLoading = () => {
    
    const loading: boolean = useSelect(loadingSlice.name);
    const dispatch: Dispatch<UnknownAction> = useDispatch();

    const onSetLoading = (loading: boolean) => {
        dispatch(setLoading(loading));
    }

    return {
        loading,
        onSetLoading
    }
}