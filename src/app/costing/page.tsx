"use client";

import React, { useState } from 'react';
import {
    Calculator,
    FileText,
    TrendingUp,
    Plus,
    Search,
    CheckCircle2,
    Layers,
    Clock,
    Zap,
    ArrowRight,
    ShieldAlert,
    History,
    XCircle,
    Box,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Printer
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Types
interface CostingData {
    id: string;
    client: string;
    article: string;
    netWeight: number; // grams
    scrapFactor: number; // percentage
    rmRate: number; // per kg
    margin: number; // percentage
    status: 'draft' | 'approved' | 'low-margin' | 'archived';
}

interface JobCard {
    id: string;
    article: string;
    targetQty: number;
    machine: string;
    completionDate: string;
    aging: number; // days
    status: 'planned' | 'processing' | 'hold';
}

export default function CostingJobCard() {
    const [activeTab, setActiveTab] = useState('costing');
    const [showCalculator, setShowCalculator] = useState(false);

    // States for Calculator
    const [netWeight, setNetWeight] = useState(24.5);
    const [scrap, setScrap] = useState(15);
    const [rmRate, setRmRate] = useState(115);
    const [rollWidth, setRollWidth] = useState("558");
    const [margin, setMargin] = useState(22);

    // Mock Data
    const mockCosting: CostingData[] = [
        { id: 'CST/2024/091', client: 'GlaxoSmithKline', article: '10ml Ampoule Tray (v2)', netWeight: 18.2, scrapFactor: 12, rmRate: 110, margin: 25, status: 'approved' },
        { id: 'CST/2024/092', client: 'Cipla Ltd', article: 'Vial Insert (PET)', netWeight: 22.5, scrapFactor: 15, rmRate: 115, margin: 12, status: 'low-margin' },
    ];

    const stats = [
        { label: 'Avg Margin', value: '22.4%', change: 'Projected vs Actual', icon: TrendingUp, color: 'text-cyan-600', trend: 'up' },
        { label: 'Scrap Rate', value: '14.2%', change: 'Monthly Global Avg', icon: ShieldAlert, color: 'text-rose-600', trend: 'down' },
        { label: 'Active Quotations', value: '12 Items', change: 'Awaiting Approval', icon: FileText, color: 'text-blue-600', trend: 'neutral' },
        { label: 'Efficiency Index', value: '92%', change: 'Unit Load Factor', icon: Zap, color: 'text-emerald-600', trend: 'up' },
    ];

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header - EXACTLY LIKE RTS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Costing & Planning</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Industrial Pricing Engine & Production Allocation</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none gap-2">
                        <History className="h-4 w-4" />
                        Revisions
                    </Button>
                    <Button onClick={() => setShowCalculator(true)} className="flex-1 md:flex-none gap-2 bg-cyan-600 hover:bg-cyan-700 text-white">
                        <Calculator className="h-4 w-4" />
                        New Costing
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
            <Tabs defaultValue="costing" className="space-y-6" onValueChange={setActiveTab}>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <TabsList className="flex w-full lg:w-auto h-auto p-1 bg-slate-100 overflow-x-auto no-scrollbar justify-start whitespace-nowrap">
                        <TabsTrigger value="costing" className="px-4 py-2 text-xs md:text-sm">Active Costing</TabsTrigger>
                        <TabsTrigger value="history" className="px-4 py-2 text-xs md:text-sm">Historical Log</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-72">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search Quote..." className="pl-8 bg-white h-10 text-sm" />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TabsContent value="costing" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {mockCosting.map((cost) => (
                            <Card key={cost.id} className="transition-all hover:shadow-md border-slate-200">
                                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-5 w-full">
                                        <div className={cn(
                                            "p-4 rounded-xl border shrink-0",
                                            cost.status === 'low-margin' ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-cyan-50 border-cyan-200 text-cyan-600"
                                        )}>
                                            <Calculator className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-lg text-slate-900">{cost.id}</h3>
                                                <Badge variant="outline" className={cn(
                                                    cost.status === 'approved' ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-rose-700 bg-rose-50 border-rose-200"
                                                )}>
                                                    {cost.status === 'approved' ? 'Margin Healthy' : 'Low Margin Alert'}
                                                </Badge>
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">{cost.client} • {cost.article}</p>
                                            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" /> {cost.netWeight}g Net</span>
                                                <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> RM: ₹{cost.rmRate}/kg</span>
                                            </div>
                                        </div>
                                        <div className="text-right hidden sm:block">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Profit Margin</p>
                                            <p className={cn("text-xl font-bold", cost.margin < 15 ? "text-rose-600" : "text-slate-900")}>
                                                {cost.margin}%
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <Button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white min-w-[140px]">
                                            Open Analysis
                                        </Button>
                                        <Button variant="outline" size="icon" className="text-slate-400 hover:text-blue-500 hover:bg-blue-50 border-slate-200">
                                            <History className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Smart Costing Modal - Entry Engine Design */}
            <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
                <DialogContent className="max-w-xl rounded-2xl p-0 overflow-hidden">
                    <div className="p-6 bg-cyan-600 text-white flex justify-between items-center">
                        <div className="flex items-center gap-5">
                            <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">
                                <Calculator className="h-7 w-7" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold tracking-tight text-white mb-0.5">Smart Pricing Engine</DialogTitle>
                                <DialogDescription className="text-cyan-100 text-xs font-medium uppercase tracking-widest">Wastage & Margin Protocol Active</DialogDescription>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Tray Net Weight (g)</Label>
                                <Input type="number" placeholder="0.00" className="bg-slate-50 h-11" value={netWeight} onChange={(e) => setNetWeight(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Scrap Factor (%)</Label>
                                <Input type="number" placeholder="0" className="bg-slate-50 h-11" value={scrap} onChange={(e) => setScrap(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">RM Rate (₹/kg)</Label>
                                <Input type="number" placeholder="0" className="bg-slate-50 h-11" value={rmRate} onChange={(e) => setRmRate(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Desired Margin (%)</Label>
                                <Input type="number" placeholder="0" className="bg-slate-50 h-11" value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
                            </div>
                        </div>

                        <Separator className="bg-slate-100" />

                        <div className="p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[40px] rounded-full pointer-events-none" />
                            <div className="flex justify-between items-center relative z-10">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target Sales Price</p>
                                    <p className="text-3xl font-bold text-emerald-400">₹{(((netWeight * (1 + scrap / 100)) / 1000) * rmRate * (1 + margin / 100)).toFixed(3)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Unit Cost</p>
                                    <p className="text-xl font-bold text-blue-400">₹{(((netWeight * (1 + scrap / 100)) / 1000) * rmRate).toFixed(3)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100">
                        <Button variant="ghost" onClick={() => setShowCalculator(false)} className="text-xs font-semibold uppercase tracking-widest text-slate-400">Discard</Button>
                        <div className="flex-1" />
                        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold uppercase tracking-widest text-[10px] px-8">Save & Approve</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
