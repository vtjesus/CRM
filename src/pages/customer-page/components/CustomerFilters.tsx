import type { FC } from "react";
import type { FilterOptions } from "../../../types/filterOptions.ts";

const genderOptions = ["Male", "Female", "Other", "Fluid"];

type CustomerFiltersProps = {
    filters: FilterOptions;
    setFilters: (filters: FilterOptions) => void;
    resetFilters: () => void;
};

export const CustomerFilters: FC<CustomerFiltersProps> = ({
    filters,
    setFilters,
    resetFilters,
}) => {
    const handleChange = (field: keyof FilterOptions, value: string) => {
        setFilters({ [field]: value || undefined });
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>
                <div className="absolute top-0 left-0 w-full h-full" 
                     style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                         backgroundSize: '20px 20px'
                     }}>
                </div>
            </div>
            
            <div className="relative p-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">
                            Search <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Matrix</span>
                        </h2>
                        <p className="text-slate-300 text-sm">Filter through the customer universe</p>
                    </div>
                </div>

                {/* Filter Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Country Input */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-cyan-300 uppercase tracking-wide">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                            </svg>
                            Country
                        </label>
                        <input
                            type="text"
                            value={filters.country ?? ""}
                            onChange={(e) => handleChange("country", e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-sm transition-all duration-300"
                            placeholder="Enter country code..."
                        />
                    </div>

                    {/* State Input */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-purple-300 uppercase tracking-wide">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            State
                        </label>
                        <input
                            type="text"
                            value={filters.state ?? ""}
                            onChange={(e) => handleChange("state", e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 backdrop-blur-sm transition-all duration-300"
                            placeholder="Enter state code..."
                        />
                    </div>

                    {/* City Input */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-pink-300 uppercase tracking-wide">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                            </svg>
                            City
                        </label>
                        <input
                            type="text"
                            value={filters.city ?? ""}
                            onChange={(e) => handleChange("city", e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-pink-400/50 focus:ring-2 focus:ring-pink-400/20 backdrop-blur-sm transition-all duration-300"
                            placeholder="Enter city name..."
                        />
                    </div>

                    {/* Gender Select */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-emerald-300 uppercase tracking-wide">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Identity
                        </label>
                        <div className="relative">
                            <select
                                value={filters.gender ?? ""}
                                onChange={(e) => handleChange("gender", e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 backdrop-blur-sm transition-all duration-300 appearance-none cursor-pointer"
                            >
                                <option value="" className="bg-slate-800 text-slate-300">Select identity type...</option>
                                {genderOptions.map((g) => (
                                    <option key={g} value={g} className="bg-slate-800 text-white">
                                        {g}
                                    </option>
                                ))}
                            </select>
                            {/* Custom dropdown arrow */}
                            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        onClick={resetFilters}
                        className="group w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-black text-lg rounded-2xl hover:from-red-400 hover:to-pink-400 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/25 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-white/20 to-red-400/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className="relative flex items-center justify-center gap-3">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            RESET MATRIX
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};