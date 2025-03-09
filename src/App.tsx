import './App.css';
import MultiSelectFilter from './components/MultiSelectFilter';
import {FilterProvider} from "./context/FilterProvider";
import {ToastContainer} from "react-toastify";

function App() {

    return (
        <FilterProvider>
            <ToastContainer/>
            <MultiSelectFilter/>
        </FilterProvider>
    )
}

export default App
