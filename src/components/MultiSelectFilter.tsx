import {useEffect, useState} from "react";
import SearchBar from "./SearchBar.tsx";
import FilteredList from "./FilteredList.tsx";
import {DataItem} from "../types/DataItem.ts";
import "./MultiSelectFilter.scss";

const MultiSelectFilter = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [filterText, setFilterText] = useState("");
    const [filtered, setFiltered] = useState<DataItem[]>([]);

    useEffect(() => {
        fetch("/items.json")
            .then((items) => items.json())
            .then((items) => items.data.map((item: string) => ({name: item, checked: false} as DataItem)))
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching JSON:", error));
    }, []);

    useEffect(() => {
        const filteredData = data.filter((item) =>
            item.name.toLowerCase().includes(filterText.toLowerCase()));
        setFiltered(filteredData);
    }, [data, filterText]);

    return (
        <div className={"filter-container"}>
            <h3>Productgroep</h3>
            <SearchBar filterText={filterText} onTextChange={setFilterText}/>
            <FilteredList data={filtered}/>
            <button className="apply-button">Toepassen</button>
        </div>
    );
};

export default MultiSelectFilter;