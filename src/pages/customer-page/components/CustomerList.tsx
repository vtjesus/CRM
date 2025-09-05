import { Customer } from "./Customer.tsx";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll.ts";
import { AutoSizer, InfiniteLoader, List } from "react-virtualized";
import type { Customer as CustomerType } from "../../../types/customer.ts";
import { useNavigate } from "react-router";

export const CustomerList = ({ customers }: { customers: CustomerType[] }) => {
    const navigate = useNavigate();

    const { itemsToDisplay, isRowLoaded, loadMoreRows, totalItems } =
        useInfiniteScroll(customers, 20);

    const rowRenderer = ({
        index,
        key,
        style,
    }: {
        index: number;
        key: string;
        style: React.CSSProperties;
    }) => {
        const customer = itemsToDisplay[index];
        if (!customer) return null;
        return (
            <Customer
                key={key}
                style={style}
                firstName={customer.firstName}
                lastName={customer.lastName}
                email={customer.email}
                onClick={() => navigate(`/customer/${customer.id}`)}
            />
        );
    };

    if (customers.length === 0) {
        return (
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-3xl p-20 text-center shadow-2xl">
                <div className="relative z-10">
                    <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-.83.67-1.5 1.5-1.5S12 9.67 12 10.5V12h2V6.5c0-.83.67-1.5 1.5-1.5S17 5.67 17 6.5V18h2v2H4v-2z"/>
                        </svg>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight">No Customers Found</h3>
                    <p className="text-blue-200 text-lg max-w-md mx-auto leading-relaxed">Looks like your customer database is empty. Time to bring in some clients!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl overflow-hidden">
            <div className="relative bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="relative px-8 py-6 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-b border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-400/5"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"></div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white tracking-tight">
                                    Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Universe</span>
                                </h2>
                                <p className="text-slate-300 text-sm mt-1">
                                    <span className="text-cyan-400 font-semibold">{itemsToDisplay.length}</span> of <span className="text-purple-400 font-semibold">{customers.length}</span> entities loaded
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-400/20 border border-green-400/30">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                                    <span className="text-xs font-bold text-green-300 uppercase tracking-wide">ONLINE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="h-[600px] relative overflow-hidden">
                    <AutoSizer>
                        {({ height, width }) => (
                            <InfiniteLoader
                                isRowLoaded={isRowLoaded}
                                loadMoreRows={loadMoreRows}
                                rowCount={totalItems}
                                threshold={5}
                            >
                                {({ onRowsRendered, registerChild }) => (
                                    <List
                                        height={height}
                                        width={width}
                                        rowHeight={100}
                                        rowCount={itemsToDisplay.length}
                                        rowRenderer={rowRenderer}
                                        onRowsRendered={onRowsRendered}
                                        ref={registerChild}
                                        className="focus:outline-none"
                                        style={{ padding: '16px' }}
                                    />
                                )}
                            </InfiniteLoader>
                        )}
                    </AutoSizer>
                    
                    {itemsToDisplay.length < customers.length && (
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-purple-900/20 to-transparent backdrop-blur-sm">
                            <div className="flex justify-center items-center gap-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce shadow-lg shadow-cyan-400/50"></div>
                                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce shadow-lg shadow-purple-400/50"></div>
                                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce shadow-lg shadow-pink-400/50"></div>
                                </div>
                                <span className="text-white font-bold text-lg tracking-wide">LOADING ENTITIES...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};