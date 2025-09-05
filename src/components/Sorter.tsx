export type SortDirection = "asc" | "desc";

type SorterProps<T extends object> = {
    fields: { value: keyof T; label: string }[];
    field: keyof T | null;
    direction: SortDirection;
    onChangeField: (field: keyof T, direction: SortDirection) => void;
    onToggleDirection: () => void;
    onClear: () => void;
};

export const Sorter = <T extends object>({
    fields,
    field,
    direction,
    onChangeField,
    onToggleDirection,
    onClear,
}: SorterProps<T>) => (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl border border-white/10">
        
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                <span className="text-sm font-bold text-cyan-300 uppercase tracking-wide">Sort By</span>
            </div>
            
            <div className="relative">
                <select
                    value={field ? String(field) : ""}
                    onChange={(e) => onChangeField(e.target.value as keyof T, direction)}
                    className="appearance-none bg-slate-700/70 border border-slate-600/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 pr-10 min-w-[140px]"
                >
                    <option value="" disabled className="bg-slate-800 text-slate-300">
                        Select field...
                    </option>
                    {fields.map((f) => (
                        <option key={String(f.value)} value={String(f.value)} className="bg-slate-800 text-white">
                            {f.label}
                        </option>
                    ))}
                </select>
                
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>

        <button
            onClick={onToggleDirection}
            disabled={!field}
            className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-blue-500 disabled:from-slate-600 disabled:to-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
        >
            <svg className={`w-4 h-4 transition-transform duration-300 ${direction === "desc" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span className="hidden sm:inline">
                {direction === "asc" ? "Ascending" : "Descending"}
            </span>
            <span className="sm:hidden">
                {direction === "asc" ? "↑" : "↓"}
            </span>
        </button>

        
        <button
            onClick={onClear}
            disabled={!field}
            className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:from-red-500 hover:to-pink-500 disabled:from-slate-600 disabled:to-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
        >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="hidden sm:inline">Clear Sort</span>
            <span className="sm:hidden">Clear</span>
        </button>

        
        {field && (
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 rounded-full animate-pulse">
                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                    Sorted by {fields.find(f => f.value === field)?.label}
                </span>
            </div>
        )}
    </div>
);