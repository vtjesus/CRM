import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useInfiniteScroll from "../hooks/useInfiniteScroll.ts";
import type { Customer } from "../types/customer.ts";

const createMockCustomers = (count: number): Customer[] =>
    Array.from({ length: count }, (_, i) => ({
        id: i,
        firstName: `First${i}`,
        lastName: `Last${i}`,
        email: `user${i}@example.com`,
        gender: "Other",
        country: "Country",
        city: "City",
        state: "State",
        postCode: "0000",
        street: "Street",
        streetNumber: "1",
    }));

describe("useInfiniteScroll", () => {
    describe("initialization", () => {
        it("initializes with correct first batch", () => {
            const mockData = createMockCustomers(50);
            const { result } = renderHook(() => useInfiniteScroll(mockData, 20));

            expect(result.current.itemsToDisplay).toHaveLength(20);
            expect(result.current.totalItems).toBe(50);
            expect(result.current.loadedCount).toBe(20);
            expect(result.current.hasMore).toBe(true);
            expect(result.current.progress).toBe(40); 
        });

        it("handles small datasets correctly", () => {
            const mockData = createMockCustomers(5);
            const { result } = renderHook(() => useInfiniteScroll(mockData, 20));

            expect(result.current.itemsToDisplay).toHaveLength(5);
            expect(result.current.totalItems).toBe(5);
            expect(result.current.loadedCount).toBe(5);
            expect(result.current.hasMore).toBe(false);
            expect(result.current.progress).toBe(100);
        });

        it("handles empty dataset", () => {
            const { result } = renderHook(() => useInfiniteScroll([], 20));

            expect(result.current.itemsToDisplay).toHaveLength(0);
            expect(result.current.totalItems).toBe(0);
            expect(result.current.loadedCount).toBe(0);
            expect(result.current.hasMore).toBe(false);
            expect(result.current.progress).toBe(0);
        });
    });

    describe("loading more rows", () => {
        it("loads additional batches correctly", async () => {
            const mockData = createMockCustomers(50);
            const { result } = renderHook(() => useInfiniteScroll(mockData, 20));

            expect(result.current.itemsToDisplay).toHaveLength(20);
            expect(result.current.hasMore).toBe(true);

            await act(async () => {
                await result.current.loadMoreRows({ startIndex: 20 });
            });

            expect(result.current.itemsToDisplay).toHaveLength(40);
            expect(result.current.loadedCount).toBe(40);
            expect(result.current.hasMore).toBe(true);
            expect(result.current.progress).toBe(80);

            await act(async () => {
                await result.current.loadMoreRows({ startIndex: 40 });
            });

            expect(result.current.itemsToDisplay).toHaveLength(50);
            expect(result.current.loadedCount).toBe(50);
            expect(result.current.hasMore).toBe(false);
            expect(result.current.progress).toBe(100);
        });

        it("handles loading beyond available data", async () => {
            const mockData = createMockCustomers(25);
            const { result } = renderHook(() => useInfiniteScroll(mockData, 20));

            await act(async () => {
                await result.current.loadMoreRows({ startIndex: 60 });
            });

            expect(result.current.itemsToDisplay).toHaveLength(20);
            expect(result.current.loadedCount).toBe(20);
        });

        it("prevents duplicate loading", async () => {
            const mockData = createMockCustomers(50);
            const { result } = renderHook(() => useInfiniteScroll(mockData, 20));

            
            await act(async () => {
                await Promise.all([
                    result.current.loadMoreRows({ startIndex: 20 }),
                    result.current.loadMoreRows({ startIndex: 20 }),
                    result.current.loadMoreRows({ startIndex: 20 }),
                ]);
            });

            expect(result.current.itemsToDisplay).toHaveLength(40);
        });
    });

    describe("isRowLoaded", () => {
        it("correctly identifies loaded rows", () => {
            const mockData = createMockCustomers(50);
            const { result } = renderHook(() => useInfiniteScroll(mockData, 20));

            expect(result.current.isRowLoaded({ index: 0 })).toBe(true);
            expect(result.current.isRowLoaded({ index: 10 })).toBe(true);
            expect(result.current.isRowLoaded({ index: 19 })).toBe(true);

            
            expect(result.current.isRowLoaded({ index: 20 })).toBe(false);
            expect(result.current.isRowLoaded({ index: 25 })).toBe(false);
            expect(result.current.isRowLoaded({ index: 49 })).toBe(false);
        });

        it("updates after loading more rows", async () => {
            const mockData = createMockCustomers(50);
            const { result } = renderHook(() => useInfiniteScroll(mockData, 20));

            expect(result.current.isRowLoaded({ index: 25 })).toBe(false);

            await act(async () => {
                await result.current.loadMoreRows({ startIndex: 20 });
            });

            expect(result.current.isRowLoaded({ index: 25 })).toBe(true);
            expect(result.current.isRowLoaded({ index: 39 })).toBe(true);
            expect(result.current.isRowLoaded({ index: 40 })).toBe(false);
        });
    });

    describe("data updates", () => {
        it("resets when data changes", () => {
            const initialData = createMockCustomers(50);
            const { result, rerender } = renderHook(
                ({ data }) => useInfiniteScroll(data, 20),
                { initialProps: { data: initialData } }
            );

            expect(result.current.itemsToDisplay).toHaveLength(20);

            
            const newData = createMockCustomers(30);
            rerender({ data: newData });

            expect(result.current.itemsToDisplay).toHaveLength(20);
            expect(result.current.totalItems).toBe(30);
            expect(result.current.loadedCount).toBe(20);
        });

        it("adjusts to smaller datasets on update", () => {
            const initialData = createMockCustomers(50);
            const { result, rerender } = renderHook(
                ({ data }) => useInfiniteScroll(data, 20),
                { initialProps: { data: initialData } }
            );

            
            const smallData = createMockCustomers(5);
            rerender({ data: smallData });

            expect(result.current.itemsToDisplay).toHaveLength(5);
            expect(result.current.totalItems).toBe(5);
            expect(result.current.hasMore).toBe(false);
            expect(result.current.progress).toBe(100);
        });
    });
});