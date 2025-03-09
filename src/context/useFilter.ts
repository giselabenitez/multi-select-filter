import {FilterContextType} from "../types/FilterContextType";
import {useContext} from "react";
import {FilterContext} from "./FilterContext";

export const useFilter = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};