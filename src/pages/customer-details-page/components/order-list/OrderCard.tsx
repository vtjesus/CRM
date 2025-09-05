import type { FC } from "react";
import type { Order } from "../../../../types/order";
import { Formatter } from "../../../../utils/Formatter.ts";

type OrderCardProps = {
    order: Order;
};

const formatter = new Formatter();

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/70 via-slate-700/70 to-slate-900/70 backdrop-blur-sm border border-white/10 hover:border-orange-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10">
            
            
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 blur-sm"></div>
            
            
            <div className="absolute top-4 right-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-400/20 border border-green-400/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-xs font-bold text-green-300 uppercase tracking-wide">Shipped</span>
                </div>
            </div>

            
            <div className="relative p-6">
                
                
                <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300">
                            {order.itemName}
                        </h3>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="font-medium">#{order.number}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span className="font-medium">Qty: {order.amount}</span>
                        </div>
                    </div>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    
                    <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span className="text-xs font-bold text-green-300 uppercase tracking-wide">Value</span>
                        </div>
                        <p className="text-white font-black text-lg">
                            {formatter.formatCurrency(order.price, order.currency)}
                        </p>
                    </div>

                    
                    <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-bold text-blue-300 uppercase tracking-wide">Ordered</span>
                        </div>
                        <p className="text-white font-semibold">
                            {formatter.formatDate(order.createdAt)}
                        </p>
                    </div>

                    
                    <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">Shipped</span>
                        </div>
                        <p className="text-white font-semibold">
                            {formatter.formatDate(order.shippedAt)}
                        </p>
                    </div>
                </div>

                
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};