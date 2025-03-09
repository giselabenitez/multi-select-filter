import {createContext} from "react";
import {FilterContextType} from "../types/FilterContextType";

export const FilterContext = createContext<FilterContextType | undefined>(undefined);
