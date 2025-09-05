export const cleanFilters = <T extends Record<string, string>>(
    filters: T
): Partial<T> => {
    return Object.fromEntries(
        Object.entries(filters).filter(
            ([, value]) => value !== undefined && value !== ""
        )
    ) as Partial<T>;
};

export const cleanFiltersWithTrim = <T extends Record<string, string>>(
    filters: T
): Partial<T> => {
    return Object.fromEntries(
        Object.entries(filters).filter(
            ([, value]) => value !== undefined && value.trim() !== ""
        )
    ) as Partial<T>;
};