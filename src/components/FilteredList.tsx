import {DataItem} from "../types/DataItem.ts";

interface FilteredListProps {
    data: DataItem[];
}

const FilteredList = ({data}: FilteredListProps) => {
    return (
        <div
            style={{
                maxHeight: "300px",
                overflowY: "auto",
                border: "1px solid #ddd",
                padding: "8px",
            }}>
            {data.map((item, index) => (
                <label key={index}>
                    <input type={"checkbox"} checked={item.checked}/>
                    {item.name}
                </label>
            ))}
        </div>
    );
}

export default FilteredList;