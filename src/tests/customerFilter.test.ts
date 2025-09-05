import { filterFn } from "../utils/customerFilter.ts";
import type { Customer } from "../types/customer.ts";
import type { FilterOptions } from "../types/filterOptions.ts";

const mockCustomers: Pick<Customer, "city" | "state" | "gender" | "country">[] = [
    {
        gender: "Other",
        country: "Greenland",
        city: "Altamonte Springs",
        state: "Delaware",
    },
    {
        gender: "Male",
        country: "USA",
        city: "New York",
        state: "NY",
    },
    {
        gender: "Female",
        country: "Canada",
        city: "Toronto",
        state: "Ontario",
    },
];

describe("customerFilter", () => {
    describe("empty filters", () => {
        test("returns all customers for completely empty filters", () => {
            const result = mockCustomers.filter((c) => filterFn(c, {}));
            expect(result).toHaveLength(mockCustomers.length);
            expect(result).toEqual(mockCustomers);
        });

        test("ignores empty string filters", () => {
            const filters: FilterOptions = { 
                country: "", 
                city: "", 
                state: "", 
                gender: "" 
            };
            const result = mockCustomers.filter((c) => filterFn(c, filters));
            expect(result).toEqual(mockCustomers);
        });

        test("ignores undefined filters", () => {
            const filters: FilterOptions = { 
                country: undefined, 
                city: undefined 
            };
            const result = mockCustomers.filter((c) => filterFn(c, filters));
            expect(result).toEqual(mockCustomers);
        });
    });

    describe("single field filtering", () => {
        test("filters by country", () => {
            const result = mockCustomers.filter((c) =>
                filterFn(c, { country: "Greenland" })
            );
            expect(result).toEqual([mockCustomers[0]]);
        });

        test("filters by gender", () => {
            const result = mockCustomers.filter((c) =>
                filterFn(c, { gender: "Male" })
            );
            expect(result).toEqual([mockCustomers[1]]);
        });

        test("filters by city", () => {
            const result = mockCustomers.filter((c) =>
                filterFn(c, { city: "Toronto" })
            );
            expect(result).toEqual([mockCustomers[2]]);
        });

        test("filters by state", () => {
            const result = mockCustomers.filter((c) =>
                filterFn(c, { state: "NY" })
            );
            expect(result).toEqual([mockCustomers[1]]);
        });
    });

    describe("multiple field filtering", () => {
        test("filters by city and gender", () => {
            const result = mockCustomers.filter((c) =>
                filterFn(c, { city: "New York", gender: "Male" })
            );
            expect(result).toEqual([mockCustomers[1]]);
        });

        test("filters by country and state", () => {
            const result = mockCustomers.filter((c) =>
                filterFn(c, { country: "Canada", state: "Ontario" })
            );
            expect(result).toEqual([mockCustomers[2]]);
        });
    });

    describe("case sensitivity", () => {
        test("is case-insensitive for city", () => {
            const result = mockCustomers.filter((c) =>
                filterFn(c, { city: "altamonte springs" })
            );
            expect(result).toEqual([mockCustomers[0]]);
        });

        test("is case-insensitive for country", () => {
            const result = mockCustomers.filter((c) =>
                filterFn(c, { country: "usa" })
            );
            expect(result).toEqual([mockCustomers[1]]);
        });
    });

    describe("no matches", () => {
        test("returns empty array when no country matches", () => {
            const result = mockCustomers.filter((c) =>
                filterFn(c, { country: "NonExistentCountry" })
            );
            expect(result).toEqual([]);
        });

        test("returns empty array when multiple filters don't match", () => {
            const result = mockCustomers.filter((c) =>
                filterFn(c, { country: "USA", gender: "Female" })
            );
            expect(result).toEqual([]);
        });
    });
});