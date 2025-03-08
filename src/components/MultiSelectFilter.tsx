import {useEffect, useState} from "react";
import SearchBar from "./SearchBar.tsx";
import FilteredList from "./FilteredList.tsx";
import {DataItem} from "../types/DataItem.ts";
import "./MultiSelectFilter.scss";

const decodeHTML = (text: string) => {
    return new DOMParser().parseFromString(text, "text/html").body.textContent || "";
};

const MultiSelectFilter = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [filterText, setFilterText] = useState("");
    const [filtered, setFiltered] = useState<DataItem[]>([]);
    const [selected, setSelected] = useState<DataItem[]>([]);

    const handleChecked = (item: DataItem) => {
        const updatedData: DataItem[] = data.map((i) => item.name === i.name ? {...i, checked: !i.checked} : i);
        setData(updatedData);
    }

    useEffect(() => {
        fetch("/items.json")
            .then((items) => items.json())
            .then((items) => items.data.map((item: string) => ({name: decodeHTML(item), checked: false} as DataItem)))
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching JSON:", error));
    }, []);

    useEffect(() => {
        const filteredData = data
            .filter((item) => item.name.toLowerCase().includes(filterText.toLowerCase()))
            .filter((item) => !item.checked);
        setFiltered(filteredData);
        setSelected(data.filter(item => item.checked));
    }, [data, filterText]);

    return (
        <div className={"filter-container"}>
            <h3>Productgroep</h3>
            <SearchBar filterText={filterText} onTextChange={setFilterText}/>
            <FilteredList data={filtered} checkedList={selected} onChecked={handleChecked}/>
            <button className="apply-button">Toepassen</button>
        </div>
    );
};

export default MultiSelectFilter;