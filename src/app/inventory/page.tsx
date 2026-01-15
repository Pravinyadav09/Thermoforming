"use client";

import React, { useState, useMemo } from 'react';
import {
    Plus,
    Search,
    Barcode,
    ArrowLeftRight,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Warehouse,
    History,
    IndianRupee,
    ShieldCheck,
    Layers,
    Filter,
    User,
    XCircle,
    Navigation,
    Printer,
    Archive,
    AlertTriangle,
    TrendingUp,
    Scale,
    AlertCircle,
    ArrowRightCircle,
    Star,
    MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { SubstrateRoll } from "@/lib/types";

// --- Mock Data ---
const MOCK_INVENTORY: SubstrateRoll[] = [
    {
        id: 'ROLL-PET-082',
        type: 'PET',
        grade: 'Medical',
        width: 558,
        micron: 350,
        density: 1.38,
        batchNo: 'RELP-24-A9',
        inwardWeight: { gross: 535, tare: 15, net: 520 },
        currentWeight: 520,
        location: 'Rack A-12',
        status: 'available',
        vendor: 'Reliance Polymers',
        vendorRating: 4.8,
        inwardDate: '2024-05-10',
        isFIFOFirst: true,
        reorderLevel: 1000
    },
    {
        id: 'ROLL-PP-045',
        type: 'PP',
        grade: 'Food',
        width: 600,
        micron: 450,
        density: 0.91,
        batchNo: 'JIND-PP-K2',
        inwardWeight: { gross: 468, tare: 18, net: 450 },
        currentWeight: 85,
        location: 'Floor-Unit 1',
        status: 'partial',
        vendor: 'Jindal Poly',
        vendorRating: 4.5,
        inwardDate: '2024-04-28',
        isFIFOFirst: false,
        reorderLevel: 250
    },
    {
        id: 'ROLL-PET-090',
        type: 'PET',
        grade: 'Industrial',
        width: 420,
        micron: 250,
        density: 1.34,
        batchNo: 'RELP-24-B1',
        inwardWeight: { gross: 395, tare: 15, net: 380 },
        currentWeight: 380,
        location: 'Rack B-04',
        status: 'available',
        vendor: 'Reliance Polymers',
        vendorRating: 4.8,
        inwardDate: '2024-05-12',
        isFIFOFirst: false,
        reorderLevel: 500
    },
    {
        id: 'ROLL-PVC-115',
        type: 'PVC',
        grade: 'Medical',
        width: 450,
        micron: 400,
        density: 1.42,
        batchNo: 'SUP-PVC-L5',
        inwardWeight: { gross: 410, tare: 10, net: 400 },
        currentWeight: 400,
        location: 'Rack C-01',
        status: 'available',
        vendor: 'Kolsite Extrusion',
        vendorRating: 3.9,
        inwardDate: '2024-05-14',
        isFIFOFirst: false,
        reorderLevel: 200
    },
];

export default function InventoryManagement() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState("");
    const [inventory] = useState<SubstrateRoll[]>(MOCK_INVENTORY);
    const [targetWidth, setTargetWidth] = useState<number>(420);

    const lowStockRolls = useMemo(() => {
        return inventory.filter(roll => roll.currentWeight < roll.reorderLevel);
    }, [inventory]);

    const stats = [
        { label: 'Total Inventory', value: '₹ 28.4L', change: 'Locked Capital', icon: IndianRupee, color: 'text-cyan-600', trend: 'neutral' },
        { label: 'Total Partials', value: '14 Rolls', change: 'Active Assets', icon: ArrowLeftRight, color: 'text-blue-600', trend: 'up' },
        { label: 'Vendor Rating', value: `4.5/5.0`, change: 'Monthly Avg', icon: Star, color: 'text-emerald-600', trend: 'neutral' },
        { label: 'FIFO Compliance', value: '98.5%', change: 'Target: 100%', icon: ShieldCheck, color: 'text-emerald-600', trend: 'up' },
    ];

    const filteredInventory = inventory.filter(roll => {
        const matchesSearch =
            roll.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            roll.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            roll.batchNo.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'partial') return matchesSearch && roll.status === 'partial';
        if (activeTab === 'low-stock') return matchesSearch && roll.currentWeight < roll.reorderLevel;
        return matchesSearch;
    });

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inventory Management</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Material Traceability System</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none gap-2">
                        <Printer className="h-4 w-4" />
                        Print Labels
                    </Button>
                    <Button className="flex-1 md:flex-none gap-2 bg-cyan-600 hover:bg-cyan-700 text-white">
                        <Plus className="h-4 w-4" />
                        New GRN Entry
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="shadow-sm border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                            <stat.icon className={cn("h-4 w-4", stat.color)} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                                {stat.trend === 'up' && <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />}
                                {stat.trend === 'down' && <ArrowDownRight className="mr-1 h-3 w-3 text-rose-500" />}
                                {stat.change}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Low Stock Alert */}
            {lowStockRolls.length > 0 && (
                <Alert variant="destructive" className="rounded-xl border-rose-200 bg-rose-50 animate-pulse">
                    <AlertCircle className="h-5 w-5 text-rose-600" />
                    <AlertTitle>Low Stock Alert</AlertTitle>
                    <AlertDescription className="text-xs">
                        {lowStockRolls.length} materials are below safety reorder level. Immediate procurement required.
                    </AlertDescription>
                </Alert>
            )}

            {/* Tabs & Filters */}
            <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <TabsList className="flex w-full lg:w-auto h-auto p-1 bg-slate-100 overflow-x-auto no-scrollbar justify-start whitespace-nowrap">
                        <TabsTrigger value="all" className="px-4 py-2 text-xs md:text-sm">All Stock</TabsTrigger>
                        <TabsTrigger value="partial" className="px-4 py-2 text-xs md:text-sm">Partial Rolls</TabsTrigger>
                        <TabsTrigger value="low-stock" className="px-4 py-2 text-xs md:text-sm">Low Stock</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-72">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search Roll..." className="pl-8 bg-white h-10 text-sm" />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TabsContent value="all" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {filteredInventory.map((roll) => (
                            <Card key={roll.id} className="transition-all hover:shadow-md border-slate-200">
                                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-5 w-full">
                                        <div className="p-4 rounded-xl border bg-cyan-50 border-cyan-200 text-cyan-600 shrink-0">
                                            <Layers className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-lg text-slate-900">{roll.id}</h3>
                                                <Badge variant="outline" className="text-cyan-700 bg-cyan-50 border-cyan-200">
                                                    {roll.status === 'available' ? 'Store Ready' : 'Partial Return'}
                                                </Badge>
                                                {roll.isFIFOFirst && (
                                                    <Badge className="bg-blue-600 text-white border-none">FIFO Priority</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">{roll.type} {roll.micron}μ • {roll.vendor}</p>
                                            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1.5"><Navigation className="h-3.5 w-3.5" /> {roll.location}</span>
                                                <span className="flex items-center gap-1.5"><History className="h-3.5 w-3.5" /> {roll.inwardDate}</span>
                                            </div>
                                        </div>
                                        <div className="text-right hidden sm:block">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">In Stock</p>
                                            <p className="text-xl font-bold text-slate-900">{roll.currentWeight} kg</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <Button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white min-w-[140px]">
                                            Issue Asset
                                        </Button>
                                        <Button variant="outline" size="icon" className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 border-slate-200">
                                            <XCircle className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="partial" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredInventory.filter(r => r.status === 'partial').map((roll) => (
                            <Card key={roll.id} className="rounded-2xl border-slate-200 overflow-hidden relative">
                                <CardContent className="p-6">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[40px] rounded-full pointer-events-none" />
                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/20">
                                                <Layers className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-bold text-slate-900">{roll.id}</h3>
                                                    <Badge variant="outline" className="border-cyan-500 text-cyan-700">FIFO Priority</Badge>
                                                </div>
                                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">{roll.type} • {roll.micron} Micron</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">In Stock</p>
                                            <p className="text-2xl font-bold text-cyan-600">{roll.currentWeight}kg</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Yield Density</p>
                                            <p className="text-sm font-bold text-slate-700">{roll.density} Yield</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Storage Location</p>
                                            <p className="text-sm font-bold text-slate-700">{roll.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Ready for Issuance</span>
                                        </div>
                                        <Button variant="ghost" className="text-cyan-600 hover:text-cyan-700 text-xs font-bold uppercase tracking-widest gap-2 hover:bg-cyan-50">
                                            Issue Asset <ArrowLeftRight className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="recon">
                    <Card className="border-slate-200">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">Material Reconciliation Report</CardTitle>
                                <Badge variant="destructive" className="uppercase text-[10px] tracking-widest">Wastage High</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100">
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Roll ID</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Vendor</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Inward</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">RTS</th>
                                            <th className="px-6 py-3 text-xs font-bold text-rose-500 uppercase tracking-wider text-right">Loss (KG)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {inventory.map((r, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors text-sm font-medium text-slate-700">
                                                <td className="px-6 py-4">{r.id}</td>
                                                <td className="px-6 py-4">{r.vendor}</td>
                                                <td className="px-6 py-4 text-right">{r.inwardWeight.net}</td>
                                                <td className="px-6 py-4 text-right text-amber-600">{r.currentWeight}</td>
                                                <td className="px-6 py-4 text-right font-bold text-rose-500">2.4 kg</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
