import {DataItem} from "./DataItem";

export interface FilterContextType {
    data: DataItem[];
    filterText: string;
    setFilterText: (text: string) => void;
    handleChecked: (item: DataItem) => void;
}