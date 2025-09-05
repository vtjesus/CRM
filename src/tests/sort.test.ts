import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSort } from "../hooks/useSort";

let params = new URLSearchParams({});

const setParamsMock = vi.fn((newParams: any) => {
    params = new URLSearchParams(newParams);
});

vi.mock("react-router-dom", () => ({
    useSearchParams: () => [params, setParamsMock],
}));

const setStoredMock = vi.fn();
vi.mock("../hooks/useLocalStorage", () => ({
    useLocalStorage: vi.fn(() => [null, setStoredMock]),
}));

type Item = { value: number };

const data: Item[] = [{ value: 20 }, { value: 10 }, { value: 30 }];

describe("useSort (numbers only)", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        params = new URLSearchParams({});
    });

    it("returns unsorted data initially", () => {
        const { result } = renderHook(() => useSort(data));
        expect(result.current.sortedData).toEqual(data);
        expect(result.current.field).toBeUndefined();
        expect(result.current.direction).toBe("asc");
    });

    it("sorts ascending", () => {
        const { result, rerender } = renderHook(() => useSort(data));
        act(() => result.current.setSort("value", "asc"));
        rerender();
        expect(result.current.sortedData.map((d) => d.value)).toEqual([
            10, 20, 30,
        ]);
    });

    it("sorts descending", () => {
        const { result, rerender } = renderHook(() => useSort(data));
        act(() => result.current.setSort("value", "desc"));
        rerender();
        expect(result.current.sortedData.map((d) => d.value)).toEqual([
            30, 20, 10,
        ]);
    });

    it("toggleDirection reverses sort", () => {
        const { result } = renderHook(() => useSort(data));
        act(() => result.current.setSort("value", "asc"));
        act(() => result.current.toggleDirection());
        expect(result.current.direction).toBe("desc");
        expect(result.current.sortedData.map((d) => d.value)).toEqual([
            30, 20, 10,
        ]);
    });

    it("clearSort resets state", () => {
        const { result, rerender } = renderHook(() => useSort(data));
        act(() => result.current.setSort("value", "asc"));
        act(() => result.current.clearSort());
        rerender();
        expect(result.current.field).toBeUndefined();
        expect(result.current.direction).toBe("asc");
        expect(result.current.sortedData).toEqual(data);
    });

    // Только самые важные дополнительные тесты
    it("handles empty data", () => {
        const { result } = renderHook(() => useSort([]));
        act(() => result.current.setSort("value", "asc"));
        expect(result.current.sortedData).toEqual([]);
    });

    it("toggleDirection does nothing without field", () => {
        const { result } = renderHook(() => useSort(data));
        act(() => result.current.toggleDirection());
        expect(result.current.field).toBeUndefined();
        expect(result.current.sortedData).toEqual(data);
    });
});