import * as React from "react";
import {useEffect, useState} from "react";
import {Button, Checkbox, Input, List} from "antd";
import toList from "antd/es/_util/toList";

interface DataItem {
    name: string;
    checked: boolean;
}

const SearchBar = () => {
    return (
        <form>
            <Input placeholder={"Zoek op..."} suffix={<img src={"/search.svg"} alt={"search"}/>}/>
        </form>);
}

interface FilteredListProps {
    data: DataItem[];
}

const FilteredList: React.FC<FilteredListProps> = ({data}) => {
    return (
        <List
            style={{
                maxHeight: "300px",
                overflowY: "auto",
                border: "1px solid #ddd",
                padding: "8px",
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Checkbox checked={item.checked}>
                        {item.name}
                    </Checkbox>
                </List.Item>
            )}
        />
    );
}


const MultiSelectFilter = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [filtered, setFiltered] = useState<DataItem[]>([]);

    useEffect(() => {
        fetch("/items.json")
            .then((items) => items.json())
            .then((items) => items.data.map((item: string) => ({name: item, checked: false} as DataItem)))
            .then((data) => setData(toList<DataItem>(data)))
            .catch((error) => console.error("Error fetching JSON:", error));
    }, []);

    return (
        <div>
            <h3>Productgroep</h3>
            <SearchBar/>
            <div>
                <FilteredList data={data}/>
            </div>
            <Button type={"primary"} block>Toepassen</Button>
        </div>
    );
};

export default MultiSelectFilter;