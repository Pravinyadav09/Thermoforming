"use client";

import React, { useState } from 'react';
import {
    Trash2,
    Recycle,
    IndianRupee,
    Scale,
    Truck,
    AlertTriangle,
    Package,
    Search,
    Plus,
    Tag,
    Factory,
    ArrowUpRight,
    ArrowDownRight,
    XCircle,
    Filter,
    History,
    Printer
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Types
interface ScrapItem {
    id: string;
    sourceJobId: string;
    materialType: 'PET' | 'PP' | 'PVC' | 'HIPS' | 'Cardboard';
    form: 'Skeleton' | 'Rejected Trays' | 'Floor Dust';
    netWeight: number;
    storageArea: string;
    timestamp: string;
}

export default function ScrapManagement() {
    const [activeTab, setActiveTab] = useState('inventory');
    const [showEntryModal, setShowEntryModal] = useState(false);

    const mockInventory: ScrapItem[] = [
        { id: 'PVC-SCRAP-092', sourceJobId: 'JC/24/505', materialType: 'PVC', form: 'Skeleton', netWeight: 45.0, storageArea: 'Yard A-12', timestamp: '2 Hours Ago' },
        { id: 'PET-SCRAP-088', sourceJobId: 'JC/24/501', materialType: 'PET', form: 'Rejected Trays', netWeight: 22.0, storageArea: 'Yard B-04', timestamp: 'Yesterday' },
    ];

    const stats = [
        { label: 'Scrap Revenue', value: '₹ 1.2L', change: 'This Month', icon: IndianRupee, color: 'text-emerald-600', trend: 'up' },
        { label: 'Stock Weight', value: '2,450 kg', change: 'Value: ~₹85k', icon: Package, color: 'text-amber-600', trend: 'neutral' },
        { label: 'Wastage Rate', value: '11.4%', change: 'Target: <10%', icon: AlertTriangle, color: 'text-rose-600', trend: 'down' },
        { label: 'Recycled Vol', value: '5.2 Tons', change: 'Year to Date', icon: Recycle, color: 'text-cyan-600', trend: 'up' },
    ];

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header - EXACTLY LIKE RTS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Scrap Management</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Industrial Waste Audit & Monetization Engine</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none gap-2">
                        <IndianRupee className="h-4 w-4" />
                        Create Sale
                    </Button>
                    <Button onClick={() => setShowEntryModal(true)} className="flex-1 md:flex-none gap-2 bg-cyan-600 hover:bg-cyan-700 text-white">
                        <Plus className="h-4 w-4" />
                        New Scrap Entry
                    </Button>
                </div>
            </div>

            {/* Stats Grid - EXACTLY LIKE RTS */}
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

            {/* Tabs & Filters - EXACTLY LIKE RTS */}
            <Tabs defaultValue="inventory" className="space-y-6" onValueChange={setActiveTab}>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <TabsList className="flex w-full lg:w-auto h-auto p-1 bg-slate-100 overflow-x-auto no-scrollbar justify-start whitespace-nowrap">
                        <TabsTrigger value="inventory" className="px-4 py-2 text-xs md:text-sm">Live Inventory</TabsTrigger>
                        <TabsTrigger value="sales" className="px-4 py-2 text-xs md:text-sm">Sales History</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-72">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search Scrap..." className="pl-8 bg-white h-10 text-sm" />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TabsContent value="inventory" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {mockInventory.map((item) => (
                            <Card key={item.id} className="transition-all hover:shadow-md border-slate-200">
                                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-5 w-full">
                                        <div className="p-4 rounded-xl border bg-cyan-50 border-cyan-200 text-cyan-600 shrink-0">
                                            <Trash2 className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-lg text-slate-900">{item.id}</h3>
                                                <Badge variant="outline" className="text-cyan-700 bg-cyan-50 border-cyan-200">
                                                    In Yard: {item.storageArea}
                                                </Badge>
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">{item.materialType} • {item.form}</p>
                                            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1.5"><Factory className="h-3.5 w-3.5" /> From {item.sourceJobId}</span>
                                                <span className="flex items-center gap-1.5"><History className="h-3.5 w-3.5" /> {item.timestamp}</span>
                                            </div>
                                        </div>
                                        <div className="text-right hidden sm:block">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Net Weight</p>
                                            <p className="text-xl font-bold text-slate-900">{item.netWeight} kg</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <Button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white min-w-[140px]">
                                            Transfer Stock
                                        </Button>
                                        <Button variant="outline" size="icon" className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 border-slate-200">
                                            <Printer className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Scrap Entry Modal - Entry Engine Design */}
            <Dialog open={showEntryModal} onOpenChange={setShowEntryModal}>
                <DialogContent className="max-w-xl rounded-2xl p-0 overflow-hidden">
                    <div className="p-6 bg-cyan-600 text-white flex justify-between items-center">
                        <div className="flex items-center gap-5">
                            <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">
                                <Scale className="h-7 w-7" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold tracking-tight text-white mb-0.5">Scrap Grading Engine</DialogTitle>
                                <DialogDescription className="text-cyan-100 text-xs font-medium uppercase tracking-widest">Wastage Attribution & Storage Allocation</DialogDescription>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Source Job Card</Label>
                                <Input placeholder="e.g. JC/24/505" className="bg-slate-50 border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Material Grade</Label>
                                <Select>
                                    <SelectTrigger className="bg-slate-50 border-slate-200">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PET">PET Scrap</SelectItem>
                                        <SelectItem value="PP">PP Scrap</SelectItem>
                                        <SelectItem value="PVC">PVC Scrap</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Separator className="bg-slate-100" />

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recorded Weight</Label>
                                    <div className="flex items-baseline gap-2">
                                        <Input type="number" placeholder="0.0" className="w-24 text-xl font-bold bg-white border-slate-200" />
                                        <span className="text-sm font-bold text-slate-400">kg</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100">Ready for Bin</Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100">
                        <Button variant="ghost" onClick={() => setShowEntryModal(false)} className="text-xs font-semibold uppercase tracking-widest text-slate-400">Discard</Button>
                        <div className="flex-1" />
                        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold uppercase tracking-widest text-[10px] px-8">Confirm Entry</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
