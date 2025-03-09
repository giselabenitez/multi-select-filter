import './App.css';
import MultiSelectFilter from './components/MultiSelectFilter';
import {FilterProvider} from "./context/FilterProvider.tsx";

function App() {

    return (
        <FilterProvider>
            <MultiSelectFilter/>
        </FilterProvider>
    )
}

export default App
