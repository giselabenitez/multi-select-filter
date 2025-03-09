import React from "react";
import {describe, expect, test, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import SearchBar from "../../src/components/SearchBar";

describe("SearchBar", () => {
    test("renders with no filterText set", async () => {
        render(<SearchBar filterText={""} onTextChange={vi.fn()}/>);
        expect(screen.getByPlaceholderText("Zoek op...")).toBeInTheDocument();
    });

    test("renders with filterText", async () => {
        render(<SearchBar filterText={"test"} onTextChange={vi.fn()}/>);
        expect(screen.getByRole("textbox")).toHaveValue("test");
    });

    test("calls onTextChange when text is entered", async () => {
        const mockOnTextChange = vi.fn();
        render(<SearchBar filterText={""} onTextChange={mockOnTextChange}/>);

        fireEvent.change(screen.getByRole("textbox"), {target: {value: "Film"}});
        expect(mockOnTextChange).toHaveBeenCalledWith("Film");
    });
});