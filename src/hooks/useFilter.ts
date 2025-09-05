import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { cleanFilters } from "../utils/cleanFilters.ts";

export const useFilter = <T, F extends Record<string, string>>(
    storageKey: string,
    dataset: T[],
    filterFunction: (item: T, filters: F) => boolean
) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [localFilters, setLocalFilters] = useLocalStorage<F>({ key: storageKey });

    
    const activeFilters: F = useMemo(() => ({
        ...localFilters,
        ...Object.fromEntries(searchParams.entries()),
    } as F), [localFilters, searchParams]);

    
    const updateFilters = useCallback((newFilters: F) => {
        const cleanedFilters = cleanFilters<F>({
            ...activeFilters,
            ...newFilters,
        });
        
        
        const urlParams = new URLSearchParams(cleanedFilters as Record<string, string>);
        setSearchParams(urlParams, { replace: true });
        setLocalFilters(JSON.stringify(cleanedFilters));
    }, [activeFilters, setSearchParams, setLocalFilters]);

    
    const clearAllFilters = useCallback(() => {
        setSearchParams({});
        setLocalFilters(JSON.stringify({}));
    }, [setSearchParams, setLocalFilters]);

    
    useEffect(() => {
        const hasUrlParams = searchParams.size > 0;
        const hasLocalFilters = Object.keys(localFilters).length > 0;
        
        if (!hasUrlParams && hasLocalFilters) {
            const urlParams = new URLSearchParams(localFilters as Record<string, string>);
            setSearchParams(urlParams, { replace: true });
        }
    }, [searchParams, localFilters, setSearchParams]);

    
    const filteredResults = useMemo(() => 
        dataset.filter((item) => filterFunction(item, activeFilters)),
        [dataset, activeFilters, filterFunction]
    );

    return [activeFilters, updateFilters, clearAllFilters, filteredResults] as const;
};