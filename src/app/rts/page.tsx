"use client";

import React, { useState } from 'react';
import {
    RotateCcw,
    ArrowLeftRight,
    Scale,
    Barcode,
    Warehouse,
    Printer,
    Search,
    Plus,
    ShieldCheck,
    IndianRupee,
    XCircle,
    History,
    TrendingDown,
    AlertTriangle,
    User,
    ArrowUpRight,
    ArrowDownRight,
    Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Types for RTS Module
interface RTSEntry {
    id: string; // TAG-PRT-001
    originalRollId: string;
    jobCardId: string;
    materialType: string;
    issuedWeight: number;
    grossReturnWeight: number;
    coreWeight: number;
    netReturnWeight: number;
    actualConsumed: number;
    location: string;
    status: 'pending' | 'accepted' | 'issued-next';
    timestamp: string;
    operator: string;
}

export default function ReturnToStore() {
    const [activeTab, setActiveTab] = useState('pending');
    const [showRTSForm, setShowRTSForm] = useState(false);

    // Form State
    const [grossWeight, setGrossWeight] = useState<number>(0);
    const [coreWeight, setCoreWeight] = useState<number>(2.0); // Standard core weight
    const [issuedWeightInput, setIssuedWeightInput] = useState<number>(500); // Check Issued Weight

    const mockPendingRTS = [
        { id: 'ROLL-PET-082', jc: 'JC/24/501', material: 'PET 558mm', issued: 520, operator: 'Suraj Kumar', time: '10 Mins Ago' },
        { id: 'ROLL-PP-104', jc: 'JC/24/508', material: 'PP 600mm', issued: 450, operator: 'Vikas Singh', time: '2 Hours Ago' },
    ];

    const mockPartials: RTSEntry[] = [
        { id: 'TAG-PRT-102', originalRollId: 'ROLL-PET-012', jobCardId: 'JC/24/495', materialType: 'PET 420mm', issuedWeight: 400, grossReturnWeight: 142, coreWeight: 2, netReturnWeight: 140, actualConsumed: 260, location: 'Rack B-Partial-01', status: 'accepted', timestamp: '2024-05-14', operator: 'Rahul M.' },
        { id: 'TAG-PRT-105', originalRollId: 'ROLL-PVC-099', jobCardId: 'JC/24/500', materialType: 'PVC 558mm', issuedWeight: 380, grossReturnWeight: 202, coreWeight: 2, netReturnWeight: 200, actualConsumed: 180, location: 'Rack B-Partial-04', status: 'accepted', timestamp: '2024-05-13', operator: 'Suraj K.' },
    ];

    const mockRecon = [
        { jc: 'JC/24/501', issued: 520, return: 200, used: 320, fg: 290, scrap: 25, loss: 5, status: 'Warning' },
        { jc: 'JC/24/498', issued: 400, return: 150, used: 250, fg: 230, scrap: 18, loss: 2, status: 'Healthy' },
    ];

    const stats = [
        { label: 'Locked Capital', value: '₹ 8.2L', change: 'Partial Rolls', icon: IndianRupee, color: 'text-cyan-600', trend: 'neutral' },
        { label: 'Total Partials', value: '18 Rolls', change: 'Active Assets', icon: RotateCcw, color: 'text-blue-600', trend: 'up' },
        { label: 'Invisible Loss', value: '2.4%', change: 'Monthly Avg', icon: TrendingDown, color: 'text-rose-600', trend: 'down' },
        { label: 'Recon Rate', value: '98.5%', change: 'Target: 100%', icon: ShieldCheck, color: 'text-emerald-600', trend: 'up' },
    ];

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Return to Store (RTS)</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Material Recovery System</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none gap-2">
                        <Printer className="h-4 w-4" />
                        Print Labels
                    </Button>
                    <Button onClick={() => setShowRTSForm(true)} className="flex-1 md:flex-none gap-2 bg-cyan-600 hover:bg-cyan-700 text-white">
                        <Plus className="h-4 w-4" />
                        New RTS Entry
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

            {/* Tabs & Filters */}
            <Tabs defaultValue="pending" className="space-y-6" onValueChange={setActiveTab}>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <TabsList className="flex w-full lg:w-auto h-auto p-1 bg-slate-100 overflow-x-auto no-scrollbar justify-start whitespace-nowrap">
                        <TabsTrigger value="pending" className="px-4 py-2 text-xs md:text-sm">Pending</TabsTrigger>
                        <TabsTrigger value="partials" className="px-4 py-2 text-xs md:text-sm">In-Store Partials</TabsTrigger>
                        <TabsTrigger value="recon" className="px-4 py-2 text-xs md:text-sm">Reconciliation</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-72">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search Roll ID..." className="pl-8 bg-white h-10 text-sm" />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TabsContent value="pending" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {mockPendingRTS.map((roll) => (
                            <Card key={roll.id} className="transition-all hover:shadow-md border-slate-200">
                                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-5 w-full">
                                        <div className="p-4 rounded-xl border bg-cyan-50 border-cyan-200 text-cyan-600 shrink-0">
                                            <Scale className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-lg text-slate-900">{roll.id}</h3>
                                                <Badge variant="outline" className="text-cyan-700 bg-cyan-50 border-cyan-200">Awaiting Store Approval</Badge>
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">{roll.material} • From {roll.jc}</p>
                                            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {roll.operator}</span>
                                                <span className="flex items-center gap-1.5"><History className="h-3.5 w-3.5" /> {roll.time}</span>
                                            </div>
                                        </div>
                                        <div className="text-right hidden sm:block">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Original Issue</p>
                                            <p className="text-xl font-bold text-slate-900">{roll.issued} kg</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <Button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white min-w-[140px]">
                                            Approve Entry
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

                <TabsContent value="partials" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockPartials.map((partial) => (
                            <Card key={partial.id} className="rounded-2xl border-slate-200 overflow-hidden relative">
                                <CardContent className="p-6">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[40px] rounded-full pointer-events-none" />
                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/20">
                                                <RotateCcw className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-bold text-slate-900">{partial.id}</h3>
                                                    <Badge variant="outline" className="border-cyan-500 text-cyan-700">FIFO Priority</Badge>
                                                </div>
                                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">{partial.originalRollId} • {partial.materialType}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">In Stock</p>
                                            <p className="text-2xl font-bold text-cyan-600">{partial.netReturnWeight}kg</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Last Job Usage</p>
                                            <p className="text-sm font-bold text-slate-700">{partial.actualConsumed} kg Used</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Storage Location</p>
                                            <p className="text-sm font-bold text-slate-700">{partial.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Ready for Issuance</span>
                                        </div>
                                        <Button variant="ghost" className="text-cyan-600 hover:text-cyan-700 text-xs font-bold uppercase tracking-widest gap-2 hover:bg-cyan-50">
                                            Issuance Next <ArrowLeftRight className="h-3.5 w-3.5" />
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
                                <Badge variant="destructive" className="uppercase text-[10px] tracking-widest">Invisible Loss High</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100">
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Job Card</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Issued</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">RTS (Return)</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Actual Used</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">FG Weight</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Scrap</th>
                                            <th className="px-6 py-3 text-xs font-bold text-rose-500 uppercase tracking-wider">Loss (Galti)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {mockRecon.map((r, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors text-sm font-medium text-slate-700">
                                                <td className="px-6 py-4 font-semibold">{r.jc}</td>
                                                <td className="px-6 py-4">{r.issued}kg</td>
                                                <td className="px-6 py-4 text-cyan-600 font-semibold">{r.return}kg</td>
                                                <td className="px-6 py-4">{r.used}kg</td>
                                                <td className="px-6 py-4 text-emerald-600 font-semibold">{r.fg}kg</td>
                                                <td className="px-6 py-4 text-amber-600 font-semibold">{r.scrap}kg</td>
                                                <td className={cn("px-6 py-4 font-bold", r.loss > 3 ? "text-rose-500" : "text-slate-500")}>{r.loss}kg</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* RTS Entry Modal */}
            <Dialog open={showRTSForm} onOpenChange={setShowRTSForm}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-2 bg-cyan-100 rounded-lg text-cyan-700">
                                <Scale className="h-6 w-6" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl">RTS Entry Engine</DialogTitle>
                                <DialogDescription>
                                    Asset Recovery & Recon Module
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <Separator />

                    <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Original Roll ID</Label>
                                <div className="relative">
                                    <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-9 text-xs uppercase font-medium" placeholder="Scan Label..." />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Issued Wt (Check)</Label>
                                <Input
                                    type="number"
                                    defaultValue={500}
                                    onChange={(e) => setIssuedWeightInput(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Storage Location (Rack/Bin)</Label>
                            <div className="relative">
                                <Warehouse className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-9" placeholder="e.g. Rack B-12..." />
                            </div>
                        </div>

                        {/* Weight Logic Section */}
                        <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2 text-center">
                                    <Label className="uppercase text-xs text-muted-foreground tracking-wider">Gross Return (Kg)</Label>
                                    <Input
                                        type="number"
                                        onChange={(e) => setGrossWeight(Number(e.target.value))}
                                        className="h-16 text-2xl font-bold text-center border-slate-200 text-cyan-600"
                                        placeholder="0.0"
                                    />
                                </div>
                                <div className="space-y-2 text-center">
                                    <Label className="uppercase text-xs text-muted-foreground tracking-wider">Core/Tare Weight</Label>
                                    <Input
                                        type="number"
                                        defaultValue={2.0}
                                        onChange={(e) => setCoreWeight(Number(e.target.value))}
                                        className="h-16 text-2xl font-bold text-center border-slate-200 text-slate-400"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-200 flex justify-between items-center px-2">
                                <div>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Net Return Asset</p>
                                    <p className="text-3xl font-bold text-slate-900">{Math.max(0, grossWeight - coreWeight).toFixed(1)} <span className="text-sm font-medium text-muted-foreground">kg</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">Actual Consumed</p>
                                    <p className="text-xl font-bold text-rose-500">
                                        {grossWeight > 0 ? (issuedWeightInput - (grossWeight - coreWeight)).toFixed(1) : '--'} kg
                                    </p>
                                </div>
                            </div>
                        </div>

                        {grossWeight - coreWeight > issuedWeightInput && (
                            <div className="p-4 rounded-lg bg-rose-50 border border-rose-100 flex items-center gap-3 text-rose-600 animate-pulse">
                                <AlertTriangle className="h-5 w-5 shrink-0" />
                                <p className="text-xs font-semibold">ERROR: Net return ({(grossWeight - coreWeight).toFixed(1)}kg) exceeds Issued Weight ({issuedWeightInput}kg).</p>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowRTSForm(false)}>Cancel</Button>
                        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
                            Post RTS Entry & Print Label <Printer className="h-4 w-4" />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
