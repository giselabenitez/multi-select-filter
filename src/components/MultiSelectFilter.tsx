import {useEffect, useState} from "react";

const MultiSelectFilter = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/items.json")
            .then((items) => items.json())
            .then((data) => setData(data.data))
            .catch((error) => console.error("Error fetching JSON:", error));
    }, []);


    return (
        <div>
            <h2>Productgroep</h2>
            <div>
                
            </div>
        </div>
    );
};

export default MultiSelectFilter;