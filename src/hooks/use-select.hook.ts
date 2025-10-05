import { useSelector } from "react-redux";
import type { RootState } from "../types/redux.type";

export const useSelect: RootState = <T,>(slice: string): T => useSelector((state: RootState): T => state[slice]);