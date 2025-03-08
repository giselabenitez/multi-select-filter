import {useEffect, useMemo, useState} from "react";
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
    const filtered = useMemo(() => data.filter((item) => item.name.toLowerCase().includes(filterText.toLowerCase()) && !item.checked),
        [data, filterText]
    );
    const selected = useMemo(() => data.filter((item) => item.checked), [data]);

    const handleChecked = (item: DataItem) => {
        const updatedData: DataItem[] = data.map((i) => item.name === i.name ? {...i, checked: !i.checked} : i);
        setData(updatedData);
        localStorage.setItem("dataItems", JSON.stringify(updatedData));
    }

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