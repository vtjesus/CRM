import type { FilterOptions } from "../types/filterOptions.ts";
import type { Customer } from "../types/customer.ts";

export const filterFn = (
    customer: Pick<Customer, "gender" | "city" | "country" | "state">,
    filters: FilterOptions
) => {
    return (Object.entries(filters) as [keyof FilterOptions, string][]).every(
        ([key, value]) => {
            if (!value || !value.trim()) return true;

            const customerValue = (customer[key] ?? "")
                .toString()
                .toLowerCase()
                .trim();
            const filterValue = value.toLowerCase().trim();

            if (key === "gender") {
                return customerValue === filterValue;
            }

            return customerValue.includes(filterValue);
        }
    );
};

//для подсчета совпадений
export const getFilterMatchCount = (
    customers: Pick<Customer, "gender" | "city" | "country" | "state">[],
    filters: FilterOptions
): number => {
    return customers.filter(customer => filterFn(customer, filters)).length;
};