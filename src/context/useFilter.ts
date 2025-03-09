import {FilterContextType} from "../types/FilterContextType.ts";
import {useContext} from "react";
import {FilterContext} from "./FilterContext.ts";

export const useFilter = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};