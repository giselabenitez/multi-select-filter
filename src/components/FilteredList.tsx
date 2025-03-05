import {DataItem} from "../types/DataItem.ts";

interface FilteredListProps {
    data: DataItem[];
}

const FilteredList = ({data}: FilteredListProps) => {
    return (
        <div className="filtered-list">
            {data.map((item, index) => (
                <label key={index} className="list-item">
                    <input type={"checkbox"} checked={item.checked}/>
                    {item.name}
                </label>
            ))}
        </div>
    );
}

export default FilteredList;