import {useMemo} from "react";
import SearchBar from "./SearchBar.tsx";
import FilteredList from "./FilteredList.tsx";
import "./MultiSelectFilter.scss";
import {useFilter} from "../context/useFilter.ts";

const MultiSelectFilter = () => {
    const {data, filterText, setFilterText, handleChecked} = useFilter();
    const filtered = useMemo(() => data.filter((item) => item.name.toLowerCase().includes(filterText.toLowerCase()) && !item.checked),
        [data, filterText]
    );
    const selected = useMemo(() => data.filter((item) => item.checked), [data]);

    const onApplySelected = () => localStorage.setItem("dataItems", JSON.stringify(data));

    return (
        <div className={"filter-container"}>
            <h3>Productgroep</h3>
            <SearchBar filterText={filterText} onTextChange={setFilterText}/>
            <FilteredList data={filtered} checkedList={selected} onChecked={handleChecked}/>
            <button className="apply-button" onClick={onApplySelected}>Toepassen</button>
        </div>
    );
};

export default MultiSelectFilter;