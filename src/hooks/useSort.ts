import { useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

export type SortDirection = "asc" | "desc";

type SortState<T> = {
    field?: keyof T;
    direction?: SortDirection;
};

export const useSort = <T extends Record<string, string | number>>(
    dataset: T[],
    storageKey = "sort"
) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [storedSortState, setStoredSortState] = useLocalStorage<SortState<T>>({ 
        key: storageKey 
    });

    // Получаем активное поле и направление (URL приоритетнее localStorage)
    const activeField = (searchParams.get("field") as keyof T) ?? storedSortState?.field;
    const activeDirection = (searchParams.get("direction") as SortDirection) ?? 
                           storedSortState?.direction ?? 
                           "asc";

    // Устанавливаем сортировку
    const setSortField = useCallback((field: keyof T, direction: SortDirection) => {
        const sortState = { field, direction };
        const urlParams = { field: String(field), direction };
        
        setStoredSortState(JSON.stringify(sortState));
        setSearchParams(urlParams, { replace: true });
    }, [setStoredSortState, setSearchParams]);

    // Переключаем направление сортировки
    const toggleSortDirection = useCallback(() => {
        if (!activeField) return;
        
        const newDirection: SortDirection = activeDirection === "asc" ? "desc" : "asc";
        setSortField(activeField, newDirection);
    }, [activeField, activeDirection, setSortField]);

    // Очищаем сортировку
    const resetSort = useCallback(() => {
        setStoredSortState(JSON.stringify({}));
        setSearchParams({}, { replace: true });
    }, [setStoredSortState, setSearchParams]);

    // Сортируем данные
    const sortedDataset = useMemo(() => {
        if (!activeField) return dataset;
        
        return [...dataset].sort((itemA, itemB) => {
            const valueA = itemA[activeField];
            const valueB = itemB[activeField];

            // Сортировка чисел
            if (typeof valueA === "number" && typeof valueB === "number") {
                return activeDirection === "asc" ? valueA - valueB : valueB - valueA;
            }

            // Сортировка строк (приводим к нижнему регистру)
            const stringA = String(valueA || "").toLowerCase();
            const stringB = String(valueB || "").toLowerCase();
            
            if (stringA < stringB) return activeDirection === "asc" ? -1 : 1;
            if (stringA > stringB) return activeDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [dataset, activeField, activeDirection]);

    // Синхронизация: восстанавливаем параметры из localStorage в URL если URL пустой
    useEffect(() => {
        const hasUrlField = searchParams.has("field");
        const hasUrlDirection = searchParams.has("direction");
        const hasStoredState = storedSortState?.field || storedSortState?.direction;
        
        if (!hasUrlField && !hasUrlDirection && hasStoredState) {
            const urlParams: Record<string, string> = {};
            if (storedSortState?.field) urlParams.field = String(storedSortState.field);
            if (storedSortState?.direction) urlParams.direction = storedSortState.direction;
            
            setSearchParams(urlParams, { replace: true });
        }
    }, [searchParams, storedSortState, setSearchParams]);

    return {
        field: activeField,
        direction: activeDirection,
        setSort: setSortField,
        toggleDirection: toggleSortDirection,
        clearSort: resetSort,
        sortedData: sortedDataset,
    };
};