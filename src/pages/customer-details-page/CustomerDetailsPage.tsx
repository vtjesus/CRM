import { OrdersList } from "./components/order-list/OrderList.tsx";
import orders from "../../orders.json";
import type { Customer } from "../../types/customer.ts";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import customers from "../../customers.json";

export const CustomerDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate("/", { replace: true });
            return;
        }
        const found = customers[Number(id)];
        if (found) setCustomer(found);
    }, [id]);

    if (!customer) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center animate-spin">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <p className="text-2xl font-bold text-white">Loading Entity Data...</p>
                    <div className="flex justify-center gap-2 mt-4">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header with Back Button */}
                <div className="flex items-center gap-6 mb-8">
                    <button
                        onClick={() => navigate("/")}
                        className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 text-white font-semibold rounded-2xl hover:from-slate-600 hover:to-slate-500 transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-500/30"
                    >
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Universe
                    </button>
                    
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">
                                Entity <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Profile</span>
                            </h1>
                            <p className="text-slate-300">Customer identity matrix</p>
                        </div>
                    </div>
                </div>

                {/* Customer Profile Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/90 via-slate-700/90 to-slate-900/90 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl">
                    
                    {/* Header */}
                    <div className="relative px-8 py-6 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight mb-2">
                                    {customer.firstName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{customer.lastName}</span>
                                </h2>
                                <p className="text-cyan-300 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                    {customer.email}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                                <span className="text-sm font-bold text-green-300 uppercase tracking-wide">Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Data Grid */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            
                            {/* Identity */}
                            <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-400/20">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="text-sm font-bold text-emerald-300 uppercase tracking-wide">Identity</span>
                                </div>
                                <p className="text-white font-semibold text-lg">{customer.gender}</p>
                            </div>

                            {/* Location - Country */}
                            <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-400/20">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                                    </svg>
                                    <span className="text-sm font-bold text-blue-300 uppercase tracking-wide">Country</span>
                                </div>
                                <p className="text-white font-semibold text-lg">{customer.country}</p>
                            </div>

                            {/* Location - State */}
                            <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span className="text-sm font-bold text-purple-300 uppercase tracking-wide">State</span>
                                </div>
                                <p className="text-white font-semibold text-lg">{customer.state}</p>
                            </div>

                            {/* City */}
                            <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-400/20">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                                    </svg>
                                    <span className="text-sm font-bold text-pink-300 uppercase tracking-wide">City</span>
                                </div>
                                <p className="text-white font-semibold text-lg">{customer.city}</p>
                            </div>

                            {/* Postal Code */}
                            <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-400/20">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span className="text-sm font-bold text-orange-300 uppercase tracking-wide">Postal</span>
                                </div>
                                <p className="text-white font-semibold text-lg">{customer.postCode}</p>
                            </div>

                            {/* Full Address */}
                            <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-400/20">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm font-bold text-teal-300 uppercase tracking-wide">Address</span>
                                </div>
                                <p className="text-white font-semibold text-lg">
                                    {customer.streetNumber} {customer.street}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Section */}
                <OrdersList orders={orders} />
            </div>
        </div>
    );
};