import { useCallback, useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";
import type { LocalStorage } from "../types/localStorage.ts";

type LocalStorageUpdate = string | ((prev: string | null) => string);

export const useLocalStorage = <T>({ key }: LocalStorage) => {
    const forceUpdate = useForceUpdate();

    const storedValue = localStorage.getItem(key);

    const setValue = useCallback(
        (update: LocalStorageUpdate) => {
            const currentValue = localStorage.getItem(key);
            const value = typeof update === "function" ? update(currentValue) : update;

            if (value !== currentValue) {
                localStorage.setItem(key, value);
                forceUpdate();
            }
        },
        [key, forceUpdate]
    );

    useEffect(() => {
        const handleStorageChange = () => forceUpdate();
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [forceUpdate]);

    
    const parsedValue = (() => {
        if (!storedValue) return {} as T;
        try {
            return JSON.parse(storedValue) as T;
        } catch {
            return {} as T;
        }
    })();

    return [parsedValue, setValue] as const;
};