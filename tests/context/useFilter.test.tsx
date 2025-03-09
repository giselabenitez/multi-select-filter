import React from "react";
import {describe, expect, test} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {useFilter} from "../../src/context/useFilter";
import {FilterProvider} from "../../src/context/FilterProvider";

describe("useFilter", () => {
    test("should update filterText state when setFilterText is called", () => {
        render(
            <FilterProvider>
                <TestComponent/>
            </FilterProvider>
        );

        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: "Computer"}});

        expect(input).toHaveValue("Computer");
    });
});

const TestComponent = () => {
    const {filterText, setFilterText} = useFilter();
    return (
        <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
        />
    );
};