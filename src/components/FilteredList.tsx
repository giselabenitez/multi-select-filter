import {DataItem} from "../types/DataItem.ts";

interface FilteredListProps {
    data: DataItem[];
    checkedList: DataItem[];
    onChecked: (item: DataItem) => void;
}

const FilteredList = ({data, checkedList, onChecked}: FilteredListProps) => {
    const Row = ({item, index}: { item: DataItem, index: number }) => (
        <label key={index} className="list-item">
            <input type={"checkbox"} checked={item.checked} onChange={() => onChecked(item)}/>
            <span className="checkmark"/>
            <span className="item-name">{item.name}</span>
        </label>
    );

    return (
        <div className="filtered-list">
            {checkedList.map((item, index) => (
                <Row item={item} index={index}/>
            ))}
            {data.map((item, index) => (
                <Row item={item} index={index}/>
            ))}
        </div>
    );
}

export default FilteredList;