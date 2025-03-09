import {useMemo} from "react";
import SearchBar from "./SearchBar";
import FilteredList from "./FilteredList";
import "./MultiSelectFilter.scss";
import {useFilter} from "../context/useFilter";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";

const MultiSelectFilter = () => {
    const {data, filterText, setFilterText, handleChecked} = useFilter();
    const filtered = useMemo(() => data.filter((item) => item.name.toLowerCase().includes(filterText.toLowerCase()) && !item.checked),
        [data, filterText]
    );
    const selected = useMemo(() => data.filter((item) => item.checked), [data]);

    const onApplySelected = () => {
        localStorage.setItem("dataItems", JSON.stringify(data));
        toast.success("Je selectie is opgeslagen!", {position: "bottom-right", autoClose: 3000});
    };

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