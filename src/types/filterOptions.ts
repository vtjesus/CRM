export type FilterOptions = {
    country?: string;
    city?: string;
    state?: string;
    gender?: string;
};

export const defaultFilters: FilterOptions = {
    country: "",
    city: "", 
    state: "",
    gender: "",
};

export const hasActiveFilters = (filters: FilterOptions): boolean => {
    return Object.values(filters).some(value => value && value.trim() !== "");
};


export const getActiveFiltersCount = (filters: FilterOptions): number => {
    return Object.values(filters).filter(value => value && value.trim() !== "").length;
};