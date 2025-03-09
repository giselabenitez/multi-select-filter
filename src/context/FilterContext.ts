import {createContext} from "react";
import {FilterContextType} from "../types/FilterContextType.ts";

export const FilterContext = createContext<FilterContextType | undefined>(undefined);
