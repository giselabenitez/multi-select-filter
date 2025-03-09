import * as React from "react";
import {useEffect, useState} from "react";
import {DataItem} from "../types/DataItem.ts";
import {FilterContext} from "./FilterContext.ts";

const decodeHTML = (text: string) => {
    return new DOMParser().parseFromString(text, "text/html").body.textContent || "";
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [data, setData] = useState<DataItem[]>([]);
    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        const storedData = localStorage.getItem("dataItems");
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            fetch("/items.json")
                .then((items) => items.json())
                .then(({data}) => setData(data.map((item: string) => ({
                    name: decodeHTML(item),
                    checked: false
                } as DataItem))))
                .catch((error) => console.error("Error fetching JSON:", error));
        }
    }, []);

    const handleChecked = (item: DataItem) => {
        setData(prevState => prevState.map((i) =>
            item.name === i.name ? {...i, checked: !i.checked} : i
        ));
    };

    return (
        <FilterContext.Provider value={{data, filterText, setFilterText, handleChecked}}>
            {children}
        </FilterContext.Provider>
    );
}