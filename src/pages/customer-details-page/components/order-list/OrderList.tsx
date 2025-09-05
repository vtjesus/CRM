import { type FC } from "react";
import type { Order } from "../../../../types/order";
import { OrderCard } from "./OrderCard";
import { LazyRender } from "../../../../components/LazyRender.tsx";
import { Sorter } from "../../../../components/Sorter.tsx";
import { useSort } from "../../../../hooks/useSort.ts";

type OrdersListProps = {
    orders: Order[];
};

const orderFields: { value: keyof Order; label: string }[] = [
    { value: "price", label: "Price" },
    { value: "createdAt", label: "Ordered" },
    { value: "shippedAt", label: "Shipped" },
];

export const OrdersList: FC<OrdersListProps> = ({ orders }) => {
    const {
        field,
        direction,
        setSort,
        toggleDirection,
        clearSort,
        sortedData,
    } = useSort(orders, "orderSort");

    if (!orders.length) {
        return (
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/90 via-slate-700/90 to-slate-900/90 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl p-16 text-center">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11v4a4 4 0 008 0v-4M8 11h8" />
                    </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">No Transaction Records</h3>
                <p className="text-slate-300 text-lg max-w-md mx-auto">This entity has no recorded purchase history in the system.</p>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/90 via-slate-700/90 to-slate-900/90 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl">
           
            <div className="relative px-8 py-6 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-red-400/5"></div>
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-red-500/25">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight">
                                Transaction <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">History</span>
                            </h2>
                            <p className="text-slate-300 text-sm mt-1">
                                <span className="text-orange-400 font-semibold">{orders.length}</span> total transactions
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-400/20 to-red-400/20 border border-orange-400/30">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse shadow-lg shadow-orange-400/50"></div>
                                <span className="text-xs font-bold text-orange-300 uppercase tracking-wide">Records</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
            <div className="px-8 py-6 border-b border-white/5 bg-gradient-to-r from-slate-900/20 to-slate-800/20">
                <Sorter<Order>
                    fields={orderFields}
                    field={field}
                    direction={direction}
                    onChangeField={setSort}
                    onToggleDirection={toggleDirection}
                    onClear={clearSort}
                />
            </div>

            
            <div className="p-6 max-h-[600px] overflow-y-auto">
                <div className="space-y-4">
                    {sortedData.map((order, index) => (
                        <LazyRender key={order.number}>
                            <div 
                                className="transform transition-all duration-300 hover:scale-[1.02]"
                                style={{
                                    animationDelay: `${index * 50}ms`
                                }}
                            >
                                <OrderCard order={order} />
                            </div>
                        </LazyRender>
                    ))}
                </div>

                
                {orders.length > 5 && (
                    <div className="flex justify-center mt-8 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m0 0l7-7" />
                            </svg>
                            Scroll for more transactions
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};