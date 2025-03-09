import React from "react";
import {describe, expect, Mock, test, vi} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {FilterProvider} from "../../src/context/FilterProvider";
import {useFilter} from "../../src/context/useFilter";

vi.mock("../../src/context/useFilter", () => ({
    useFilter: vi.fn(),
}));

globalThis.fetch = vi.fn();

describe("Filter Provider", () => {
    test("should provide filter text context value", async () => {
        const mockData = [{name: "Games", checked: false}];

        (globalThis.fetch as Mock).mockResolvedValueOnce({
            json: vi.fn().mockResolvedValue({data: mockData}),
        });

        (useFilter as Mock).mockReturnValue({
            data: mockData,
            filterText: "",
            setFilterText: vi.fn(),
            handleChecked: vi.fn(),
        });

        await act(async () => {
            render(<FilterProvider><MockComponent/></FilterProvider>);
        });
        expect(screen.queryByText("Games")).toBeInTheDocument();
    });
});

const MockComponent = () => {
    const {data} = useFilter();
    return (<div>{data[0]?.name}</div>);
}