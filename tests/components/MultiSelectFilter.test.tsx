import React, {JSX} from "react";
import {beforeEach, describe, expect, test, vi} from "vitest";
import MultiSelectFilter from "../../src/components/MultiSelectFilter";
import {useFilter} from "../../src/context/useFilter";
import {FilterContextType} from "../../src/types/FilterContextType";
import {fireEvent, render, screen} from "@testing-library/react";

vi.mock("../../src/context/useFilter", () => ({
    useFilter: vi.fn<() => FilterContextType>(),
}));

describe("MultiSelectFilter", () => {
    let component: JSX.Element;

    beforeEach(() => {
        global.localStorage = {
            setItem: vi.fn(),
            getItem: vi.fn(),
            clear: vi.fn(),
            removeItem: vi.fn(),
            key: vi.fn(),
            length: 0,
        };

        component = <MultiSelectFilter/>;
    });

    test("renders without crashing when no data", async () => {
        useFilter.mockReturnValue({
            data: [],
            filterText: "",
            setFilterText: vi.fn(),
            handleChecked: vi.fn(),
        });

        render(component);

        expect(screen.getByText("Productgroep")).toBeInTheDocument();
    });

    test("renders with data and no filterText set", async () => {
        useFilter.mockReturnValue({
            data: [{name: "Thrillers", checked: false}, {name: "Fantasy", checked: false}],
            filterText: "",
            setFilterText: vi.fn(),
            handleChecked: vi.fn(),
        });

        const {asFragment} = render(component);

        expect(asFragment()).toMatchSnapshot();
        expect(screen.getByText("Thrillers")).toBeInTheDocument();
        expect(screen.getByText("Fantasy")).toBeInTheDocument();
    });

    test("renders with filter text", async () => {
        useFilter.mockReturnValue({
            data: [{name: "Kinderboeken", checked: false}, {name: "Kookboeken", checked: false}],
            filterText: "Kookboeken",
            setFilterText: vi.fn(),
            handleChecked: vi.fn(),
        });

        const {asFragment} = render(component);

        expect(asFragment()).toMatchSnapshot();
        expect(screen.queryByText("Kinderboeken")).not.toBeInTheDocument();
        expect(screen.queryByText("Kookboeken")).toBeInTheDocument();
    });

    test("filtered list is updated based on filter text", async () => {
        useFilter.mockReturnValue({
            data: [
                {name: "Psychologie", checked: false},
                {name: "Alle boeken", checked: false},
                {name: "Ebooks", checked: false},
                {name: "Alle muziek", checked: false}
            ],
            filterText: "All",
            setFilterText: vi.fn(),
            handleChecked: vi.fn(),
        });

        render(component);
        expect(screen.queryByText("Alle boeken")).toBeInTheDocument();
        expect(screen.queryByText("Alle muziek")).toBeInTheDocument();
        expect(screen.queryByText("Psychologie")).not.toBeInTheDocument();
        expect(screen.queryByText("Ebooks")).not.toBeInTheDocument();
        expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    });

    test("handleChecked is called when the item is clicked", async () => {
        const mockHandleChecked = vi.fn();
        useFilter.mockReturnValue({
            data: [{name: "Film", checked: false}, {name: "Games", checked: false}],
            filterText: "",
            setFilterText: vi.fn(),
            handleChecked: mockHandleChecked,
        });

        const {asFragment} = render(component);

        expect(asFragment()).toMatchSnapshot();
        fireEvent.click(screen.getByText("Games"));
        expect(mockHandleChecked).toHaveBeenCalled();
        expect(mockHandleChecked).toHaveBeenCalledWith({name: "Games", checked: false});
    });

    test("updated data is saved in localStorage when 'Toepassen' button is clicked", async () => {
        const mockLocalStorage = {setItem: vi.fn()};
        global.localStorage = mockLocalStorage;

        useFilter.mockReturnValue({
            data: [{name: "Film", checked: true}],
            filterText: "",
            setFilterText: vi.fn(),
            handleChecked: vi.fn(),
        });

        render(<MultiSelectFilter/>);
        fireEvent.click(screen.getByRole("button", {name: "Toepassen"}));

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
            "dataItems",
            JSON.stringify([{name: "Film", checked: true}])
        );
    });
});