import type { FC } from "react";
import type { Customer as CustomerType } from "../../../types/customer.ts";
import user from "../../../../public/user.png";

type CustomerProps = Pick<CustomerType, "firstName" | "lastName" | "email"> & {
    style?: React.CSSProperties;
    onClick?: () => void;
};

export const Customer: FC<CustomerProps> = ({
    firstName,
    lastName,
    email,
    onClick,
    style = {},
}) => (
    <div
        className="group relative mx-2 my-1 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-700/90 to-slate-900/90 backdrop-blur-sm border border-white/10 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-500/10"
        style={style}
        onClick={onClick}
    >
        {/* Neon border effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-sm"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" 
                 style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                     backgroundSize: '20px 20px'
                 }}>
            </div>
        </div>
        
        {/* Content */}
        <div className="relative p-6 flex items-center justify-between">
            {/* User info */}
            <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <h3 className="text-lg font-black text-white truncate tracking-tight">
                        {firstName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{lastName}</span>
                    </h3>
                </div>
                <p className="text-slate-300 text-sm font-medium truncate flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    {email}
                </p>
            </div>
            
            {/* Avatar with sci-fi styling */}
            <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-600 group-hover:border-cyan-400/50 transition-colors duration-300 shadow-lg">
                    <img
                        src={user}
                        alt={`${firstName} ${lastName}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
                
                {/* Holographic corners */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Arrow indicator */}
            <div className="ml-4 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300 transform group-hover:translate-x-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"></div>
    </div>
);