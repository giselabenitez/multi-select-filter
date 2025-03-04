interface SearchBarProps {
    filterText: string;
    onTextChange: (text: string) => void;
}

const SearchBar = ({filterText, onTextChange}: SearchBarProps) => {
    return (
        <div>
            <input
                type={"text"}
                value={filterText}
                onChange={event => onTextChange(event.target.value)}
                placeholder={"Zoek op..."}/>
            <img src={"/search.svg"} alt={"search"}/>
        </div>);
}

export default SearchBar;