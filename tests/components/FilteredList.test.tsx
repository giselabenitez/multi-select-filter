import React from "react";
import {describe, expect, test, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import FilteredList from "../../src/components/FilteredList";

describe("FilteredList", () => {
    const mockList = [{name: "Thrillers", checked: false}, {name: "Film", checked: false}];

    test("renders correctly without data", async () => {
        render(<FilteredList data={[]} checkedList={[]} onChecked={vi.fn()}/>);
        expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    });

    test("renders correctly with data", async () => {
        render(<FilteredList data={mockList} checkedList={[]} onChecked={vi.fn()}/>);
        expect(screen.queryAllByRole("checkbox")).toHaveLength(2);
    });

    test("onChecked is called when item is clicked", async () => {
        const mockOnChecked = vi.fn();
        render(<FilteredList data={mockList} checkedList={[]} onChecked={mockOnChecked}/>);

        fireEvent.click(screen.getByText("Thrillers"));
        expect(mockOnChecked).toHaveBeenCalled();
    });
});