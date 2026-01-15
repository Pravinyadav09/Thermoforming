"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { modules } from '../lib/modules';
import { cn } from '../lib/utils';
import { ChevronRight, LogOut, Search, Menu, X } from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-[100] p-2 bg-blue-500 text-white rounded-lg shadow-lg"
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={cn(
                "w-64 h-screen flex flex-col glass-card border-r border-border fixed left-0 top-0 z-50 transition-transform duration-300 md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 text-sm">
                            I
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight">Indus ERP</h1>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Thermoform</p>
                        </div>
                    </div>

                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Quick Search..."
                            className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-lg py-1.5 pl-9 pr-3 text-xs focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                        />
                    </div>

                    <nav className="space-y-0.5 overflow-y-auto max-h-[calc(100vh-180px)] pr-1 custom-scrollbar">
                        {modules.map((module) => {
                            const Icon = module.icon;
                            const isActive = pathname === module.path;

                            return (
                                <Link
                                    key={module.id}
                                    href={module.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold transition-all group",
                                        isActive
                                            ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                                            : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                                    )}
                                >
                                    <Icon className={cn("w-4 h-4", isActive ? "text-white" : module.color)} />
                                    <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{module.name}</span>
                                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-4 border-t border-border">
                    <button className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
}
