import {DataItem} from "../types/DataItem";

interface FilteredListProps {
    data: DataItem[];
    checkedList: DataItem[];
    onChecked: (item: DataItem) => void;
}

const FilteredList = ({data, checkedList, onChecked}: FilteredListProps) => {
    const Row = ({item}: { item: DataItem }) => (
        <label className="list-item">
            <input type={"checkbox"} checked={item.checked} onChange={() => onChecked(item)}/>
            <span className="checkmark"/>
            <span className="item-name">{item.name}</span>
        </label>
    );

    return (
        <div className="filtered-list">
            {checkedList.map((item, index) => (
                <Row key={`checked-${item.name}-${index}`} item={item}/>
            ))}
            {data.map((item, index) => (
                <Row key={`data-${item.name}-${index}`} item={item}/>
            ))}
        </div>
    );
}

export default FilteredList;