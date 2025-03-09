import React from "react";
import {describe, expect, test, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {FilterProvider} from "../../src/context/FilterProvider";
import {useFilter} from "../../src/context/useFilter";

vi.mock("../../src/context/useFilter", () => ({
    useFilter: vi.fn(),
}));

describe("Filter Provider", () => {
    test("should provide filter text context value", () => {
        const mockData = [{name: "Games", checked: false}];
        useFilter.mockReturnValue({
            data: mockData,
            filterText: "",
            setFilterText: vi.fn(),
            handleChecked: vi.fn(),
        });

        render(<FilterProvider><MockComponent/></FilterProvider>);
        expect(screen.queryByText("Games")).toBeInTheDocument();
    });
});

const MockComponent = () => {
    const {data} = useFilter();
    return (<div>{data[0]?.name}</div>);
}