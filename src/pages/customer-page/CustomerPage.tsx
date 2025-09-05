import { CustomerFilters } from "./components/CustomerFilters.tsx";
import { CustomerList } from "./components/CustomerList.tsx";
import { useFilter } from "../../hooks/useFilter.ts";
import type { Customer } from "../../types/customer.ts";
import type { FilterOptions } from "../../types/filterOptions.ts";
import customers from "../../customers.json";
import { filterFn } from "../../utils/customerFilter.ts";
import { Sidebar } from "../../components/Sidebar.tsx";

export const CustomerPage = () => {
    const [filters, setFilters, resetFilters, filteredCustomers] = useFilter<
        Customer,
        FilterOptions
    >("customerFilters", customers, filterFn);

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Sidebar />
            
            {/* Main content area with responsive padding */}
            <div className="flex-1 overflow-auto lg:ml-0">
                
                <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
                    {/* Mobile padding to account for burger menu button */}
                    <div className="max-w-7xl mx-auto px-6 lg:px-6 py-6 pt-20 lg:pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-xl lg:text-2xl font-black text-white tracking-tight">
                                        Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Portal</span>
                                    </h1>
                                    <p className="text-slate-300 text-sm hidden sm:block">Manage your customer universe</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 lg:gap-4">
                                <div className="px-2 lg:px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-600/30">
                                    <span className="text-slate-300 text-xs lg:text-sm">
                                        <span className="text-cyan-400 font-semibold">{filteredCustomers.length}</span> / <span className="text-purple-400 font-semibold">{customers.length}</span>
                                    </span>
                                </div>
                                
                                <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="hidden lg:inline">Add Customer</span>
                                    <span className="lg:hidden">Add</span>
                                </button>

                                {/* Mobile add button - just icon */}
                                <button className="sm:hidden p-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>

                                <div className="relative">
                                    <button className="p-2 lg:p-3 bg-slate-800/50 rounded-xl border border-slate-600/30 hover:bg-slate-700/50 transition-all duration-300 group">
                                        <svg className="w-4 h-4 lg:w-5 lg:h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.406-3.406A2.8 2.8 0 0016 12V9a4 4 0 10-8 0v3a2.8 2.8 0 00-.594 1.594L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </button>
                                    
                                    <div className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-xs font-bold text-white">3</span>
                                    </div>
                                </div>

                                <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 border border-green-400/30 rounded-full">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-bold text-green-300 uppercase">Live</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto p-4 lg:p-6">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
                        
                        <div className="xl:col-span-1">
                            <div className="xl:sticky xl:top-24">
                                <CustomerFilters
                                    filters={filters}
                                    setFilters={setFilters}
                                    resetFilters={resetFilters}
                                />
                            </div>
                        </div>
                        
                        <div className="xl:col-span-2">
                            <CustomerList customers={filteredCustomers} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};