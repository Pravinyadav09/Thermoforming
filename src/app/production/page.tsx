"use client";

import React, { useState, useEffect } from 'react';
import {
    Clock,
    CheckCircle2,
    User,
    Layers,
    Activity,
    AlertTriangle,
    History,
    ChevronRight,
    Flame,
    Zap,
    Scale,
    Timer,
    Monitor,
    ShieldCheck,
    ArrowLeftRight,
    Barcode,
    XCircle,
    Play,
    Printer,
    ArrowUpRight,
    ArrowDownRight,
    IndianRupee,
    RotateCcw,
    TrendingDown,
    Filter,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

export default function ProductionTablet() {
    const [step, setStep] = useState<'login' | 'setup' | 'running' | 'finish'>('login');
    const [activeTab, setActiveTab] = useState('active');
    const [isStarted, setIsStarted] = useState(false);
    const [showBreakdownModal, setShowBreakdownModal] = useState(false);
    const [productionCount, setProductionCount] = useState(0);
    const [breakdownReason, setBreakdownReason] = useState('');

    // Checklist State
    const [checklist, setChecklist] = useState({
        cleaned: false,
        moldSet: false,
        safety: false
    });

    const machines = ['MACHINE-01 (600 Bed)', 'MACHINE-02 (600 Bed)', 'V-FORM-X', 'V-FORM-Y'];
    const jobCards = ['JC/24/501 (Ampoule)', 'JC/24/505 (Biscuit)', 'JC/24/510 (Vial)'];
    const breakdownReasons = ['Power Cut', 'Mold Alignment Issue', 'Raw Material Jam', 'Heater Issue', 'Tea Break'];

    const canStart = checklist.cleaned && checklist.moldSet && checklist.safety;

    // Timer Logic
    const [time, setTime] = useState(0);
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isStarted) {
            interval = setInterval(() => setTime(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isStarted]);

    const formatTime = (s: number) => {
        const hrs = Math.floor(s / 3600);
        const mins = Math.floor((s % 3600) / 60);
        const secs = s % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // --- Mock Data ---
    const activeJobs = [
        { id: 'JC/24/501', machine: 'M-01', operator: 'Suraj Kumar', material: 'PET 558mm', progress: 7200, target: 25000, time: '2h 15m' },
        { id: 'JC/24/505', machine: 'M-02', operator: 'Vikas Singh', material: 'PP 600mm', progress: 12400, target: 45000, time: '4h 30m' },
    ];

    const stats = [
        { label: 'OEE Status', value: '92.4%', change: 'Production Efficiency', icon: Activity, color: 'text-cyan-600', trend: 'up' },
        { label: 'Active Jobs', value: '04 Lines', change: 'Running Capacity', icon: Timer, color: 'text-blue-600', trend: 'neutral' },
        { label: 'Shift Yield', value: '94.8%', change: 'Low Wastage', icon: ShieldCheck, color: 'text-emerald-600', trend: 'up' },
        { label: 'Stop Logs', value: '02 Issues', change: 'Min. Downtime', icon: AlertTriangle, color: 'text-rose-600', trend: 'down' },
    ];

    if (step === 'login') {
        return (
            <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
                {/* Header - EXACTLY LIKE RTS */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Production Control</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Operator Execution & Tablet Module</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none gap-2">
                            <History className="h-4 w-4" />
                            Shift History
                        </Button>
                        <Button className="flex-1 md:flex-none gap-2 bg-cyan-600 hover:bg-cyan-700 text-white">
                            <Monitor className="h-4 w-4" />
                            Live Monitor
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
                <Tabs defaultValue="active" className="space-y-6" onValueChange={setActiveTab}>
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <TabsList className="flex w-full lg:w-auto h-auto p-1 bg-slate-100 overflow-x-auto no-scrollbar justify-start whitespace-nowrap">
                            <TabsTrigger value="active" className="px-4 py-2 text-xs md:text-sm">Active Lines</TabsTrigger>
                            <TabsTrigger value="planned" className="px-4 py-2 text-xs md:text-sm">Planned Jobs</TabsTrigger>
                            <TabsTrigger value="history" className="px-4 py-2 text-xs md:text-sm">Output Logs</TabsTrigger>
                        </TabsList>

                        <div className="flex items-center gap-2 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-72">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search JC..." className="pl-8 bg-white h-10 text-sm" />
                            </div>
                            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <TabsContent value="active" className="space-y-4">
                        {/* Selection Logic - Premium Card Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {['Day Shift', 'Night Shift'].map((shift) => (
                                <Card
                                    key={shift}
                                    className="rounded-2xl border-slate-200 overflow-hidden relative cursor-pointer hover:shadow-lg transition-all"
                                    onClick={() => setStep('setup')}
                                >
                                    <CardContent className="p-6">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[40px] rounded-full pointer-events-none" />
                                        <div className="flex justify-between items-start mb-6 relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/20">
                                                    <Clock className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-lg font-bold text-slate-900">{shift}</h3>
                                                        <Badge variant="outline" className="border-cyan-500 text-cyan-700">Login Available</Badge>
                                                    </div>
                                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">Industrial Execution Layer</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active Ops</p>
                                                <p className="text-2xl font-bold text-cyan-600">12 Men</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Production Ready</span>
                                            </div>
                                            <Button variant="ghost" className="text-cyan-600 hover:text-cyan-700 text-xs font-bold uppercase tracking-widest gap-2 hover:bg-cyan-50">
                                                Clock In <ArrowLeftRight className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* List View - Exactly like RTS Pending */}
                        <div className="grid grid-cols-1 gap-4">
                            {activeJobs.map((job) => (
                                <Card key={job.id} className="transition-all hover:shadow-md border-slate-200">
                                    <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div className="flex items-center gap-5 w-full">
                                            <div className="p-4 rounded-xl border bg-cyan-50 border-cyan-200 text-cyan-600 shrink-0">
                                                <Zap className="h-6 w-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-semibold text-lg text-slate-900">{job.machine}</h3>
                                                    <Badge variant="outline" className="text-cyan-700 bg-cyan-50 border-cyan-200">Currently Running</Badge>
                                                </div>
                                                <p className="text-sm font-medium text-slate-700">{job.id} • {job.material}</p>
                                                <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {job.operator}</span>
                                                    <span className="flex items-center gap-1.5"><History className="h-3.5 w-3.5" /> {job.time}</span>
                                                </div>
                                            </div>
                                            <div className="text-right hidden sm:block">
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trays Output</p>
                                                <p className="text-xl font-bold text-slate-900">{job.progress.toLocaleString()} / {job.target.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <Button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white min-w-[140px]">
                                                Monitor Line
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
                </Tabs>
            </div>
        );
    }

    if (step === 'setup') {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 pb-12 p-6">
                <div className="flex justify-between items-center">
                    <Button variant="outline" size="icon" onClick={() => setStep('login')} className="rounded-full h-12 w-12 hover:bg-slate-100 border-slate-200">
                        <ArrowLeftRight className="h-5 w-5 rotate-180" />
                    </Button>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">Machine Entry Engine</h2>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1">Initialization & Pre-Check</p>
                    </div>
                    <div className="w-12" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="rounded-2xl border-slate-200 shadow-sm">
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Machine Unit</Label>
                                <Select>
                                    <SelectTrigger className="h-12 bg-white border-slate-200">
                                        <SelectValue placeholder="Machine ID" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {machines.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Job Card</Label>
                                <Select>
                                    <SelectTrigger className="h-12 bg-white border-slate-200">
                                        <SelectValue placeholder="Production Card" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jobCards.map(j => <SelectItem key={j} value={j}>{j}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                                <div className="p-3 bg-amber-100 text-amber-700 rounded-lg">
                                    <Barcode className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Scan RM Roll</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Barcode identification required</p>
                                </div>
                                <Button size="sm" variant="outline" className="ml-auto border-amber-200 text-amber-600 bg-amber-50">Scan Now</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="rounded-2xl border-slate-200 shadow-sm">
                            <CardHeader className="pb-2 border-b border-slate-50 mb-4 py-4 px-6">
                                <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-cyan-600" /> Mandatory Checklist
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 px-6 pb-6">
                                {[
                                    { id: 'cleaned', label: 'Machine cleaning completed?' },
                                    { id: 'moldSet', label: 'Correct mold mounted & aligned?' },
                                    { id: 'safety', label: 'Safety guards & E-stop checked?' },
                                ].map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setChecklist(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof checklist] }))}
                                        className={cn(
                                            "w-full p-4 rounded-xl flex items-center justify-between border cursor-pointer transition-all",
                                            checklist[item.id as keyof typeof checklist]
                                                ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                                                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                                        )}
                                    >
                                        <span className="text-xs font-bold uppercase tracking-tight">{item.label}</span>
                                        {checklist[item.id as keyof typeof checklist]
                                            ? <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                            : <div className="h-5 w-5 rounded-full border-2 border-slate-200" />
                                        }
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Button
                            disabled={!canStart}
                            onClick={() => { setIsStarted(true); setStep('running'); }}
                            className={cn(
                                "w-full h-14 rounded-xl font-bold text-xs uppercase tracking-widest gap-2 shadow-lg transition-all",
                                canStart
                                    ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                            )}
                        >
                            Start Running Operations <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500 space-y-6 pb-12 p-6">
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
                <Card className="flex-1 rounded-2xl border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[40px] rounded-full pointer-events-none" />
                    <CardContent className="p-6 flex items-center gap-5 relative z-10">
                        <div className="h-14 w-14 rounded-xl bg-cyan-600 flex items-center justify-center text-white shadow-lg shadow-cyan-600/30">
                            <User className="h-7 w-7" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Suraj Kumar</h2>
                                <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200">Active Shift</Badge>
                            </div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">M-01 • JC/24/501 (Ampoule)</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1 rounded-2xl border-slate-200 shadow-sm bg-slate-900 text-white border-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[40px] rounded-full pointer-events-none" />
                    <CardContent className="p-6 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-5">
                            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                                <Timer className="h-6 w-6 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Session Timer</p>
                                <p className="text-3xl font-mono font-bold tracking-tighter text-cyan-400">{formatTime(time)}</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowBreakdownModal(true)}
                            className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-widest shadow-lg"
                        >
                            Report Breakdown
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="rounded-3xl border-slate-200 shadow-md bg-white">
                        <CardContent className="p-10 text-center space-y-8">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Total Production Output</p>
                                <h1 className="text-8xl font-black tracking-tighter text-slate-900 leading-none">{productionCount.toLocaleString()}</h1>
                                <p className="text-xs font-medium text-slate-500 mt-4 uppercase tracking-widest">Trays Produced in current session</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {[+1, +10, +100].map(val => (
                                    <Button
                                        key={val}
                                        onClick={() => setProductionCount(c => c + val)}
                                        className="h-20 rounded-2xl bg-white border-slate-100 hover:bg-cyan-600 hover:text-white text-xl font-bold text-slate-900 shadow-sm transition-all"
                                        variant="outline"
                                    >
                                        +{val}
                                    </Button>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setProductionCount(0)}
                                    className="flex-1 h-12 rounded-xl border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-400"
                                >
                                    Reset
                                </Button>
                                <Button className="flex-[2] h-12 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-widest">
                                    Final Log Entry
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-4 bg-rose-50 border-b border-rose-100 flex justify-between items-center">
                                <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Reject Trays</p>
                                <Flame className="h-4 w-4 text-rose-500" />
                            </div>
                            <CardContent className="p-8 flex items-center justify-between">
                                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50">-</Button>
                                <p className="text-4xl font-black text-slate-900">08</p>
                                <Button size="icon" className="h-12 w-12 rounded-xl bg-rose-600 text-white shadow-lg shadow-rose-600/20">+</Button>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-4 bg-amber-50 border-b border-amber-100 flex justify-between items-center">
                                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Scrap Weight</p>
                                <Scale className="h-4 w-4 text-amber-500" />
                            </div>
                            <CardContent className="p-8 flex items-center justify-between">
                                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-amber-200 text-amber-600 hover:bg-amber-50">-</Button>
                                <p className="text-4xl font-black text-slate-900">4.2</p>
                                <Button size="icon" className="h-12 w-12 rounded-xl bg-amber-600 text-white shadow-lg shadow-amber-600/20">+</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="rounded-2xl bg-cyan-600 text-white shadow-xl shadow-cyan-600/20 border-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full pointer-events-none" />
                        <CardContent className="p-8 space-y-8 relative z-10">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Efficiency</p>
                                    <p className="text-3xl font-black text-white">92.4%</p>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold uppercase mb-2 text-white/90">
                                        <span>Completion</span>
                                        <span>7,200 / 25k</span>
                                    </div>
                                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-[28.8%]" />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/10 space-y-3">
                                    <div className="flex justify-between items-center text-xs font-medium">
                                        <span className="text-white/70">Yield %</span>
                                        <span className="font-bold">94.8%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-medium">
                                        <span className="text-white/70">Wastage</span>
                                        <span className="font-bold">5.2%</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-slate-200 shadow-sm">
                        <CardHeader className="pb-2 border-b border-slate-50 mb-4 py-4 px-6">
                            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <History className="h-4 w-4 text-cyan-600" /> Shift Log
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 px-6 pb-6">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">Login Successful</p>
                                <span className="ml-auto text-[10px] font-medium text-slate-400">08:15 AM</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <div className="h-2 w-2 rounded-full bg-amber-500" />
                                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">Reloaded ROLL-082</p>
                                <span className="ml-auto text-[10px] font-medium text-slate-400">10:42 AM</span>
                            </div>
                            <Button
                                onClick={() => setStep('finish')}
                                className="w-full h-12 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest mt-4"
                            >
                                Finish Shift
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog open={showBreakdownModal} onOpenChange={setShowBreakdownModal}>
                <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
                    <div className="p-6 bg-rose-600 text-white flex gap-4 items-center">
                        <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold uppercase tracking-tight text-white">Machine Breakdown</DialogTitle>
                            <DialogDescription className="text-rose-100 text-[10px] font-bold uppercase tracking-widest mt-1">Audit Log Required</DialogDescription>
                        </div>
                    </div>
                    <div className="p-6 gap-2 flex flex-col">
                        {breakdownReasons.map(r => (
                            <Button
                                key={r}
                                variant="outline"
                                onClick={() => { setBreakdownReason(r); setShowBreakdownModal(false); }}
                                className="h-14 justify-between px-6 rounded-xl border-slate-200 hover:border-rose-600 hover:text-rose-600 hover:bg-rose-50 font-bold uppercase tracking-tight text-xs"
                            >
                                {r}
                                <ChevronRight className="h-4 w-4 opacity-50" />
                            </Button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={step === 'finish'} onOpenChange={(val) => !val && setStep('running')}>
                <DialogContent className="max-w-3xl rounded-[2.5rem] p-0 overflow-hidden">
                    <div className="p-10 bg-emerald-600 text-white flex gap-6 items-center">
                        <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center">
                            <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <div>
                            <DialogTitle className="text-3xl font-black uppercase tracking-tight text-white mb-2">Shift Reconciliation</DialogTitle>
                            <DialogDescription className="text-emerald-100 font-bold uppercase tracking-widest text-xs">Final Audit Engine</DialogDescription>
                        </div>
                    </div>

                    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Good Trays (Final)</Label>
                                <Input type="number" defaultValue={productionCount} className="h-12 bg-slate-50 border-none font-bold text-lg text-emerald-600" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rejected (Final)</Label>
                                <Input type="number" defaultValue={8} className="h-12 bg-slate-50 border-none font-bold text-lg text-rose-600" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Return Stock Weight (KG)</Label>
                                <Input type="number" placeholder="0.0" className="h-12 bg-slate-50 border-none font-bold text-lg text-cyan-600" />
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between">
                            <div className="space-y-5">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Audit Summary</h3>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-medium">Input RM</span>
                                    <span className="font-bold">520.0 kg</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-medium">Actual Output</span>
                                    <span className="font-bold text-emerald-400">512.2 kg</span>
                                </div>
                                <div className="h-px bg-slate-800" />
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase text-emerald-400">Verification</span>
                                    <span className="text-lg font-black text-emerald-400">PASSED</span>
                                </div>
                            </div>

                            <Button onClick={() => setStep('login')} className="w-full h-12 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs uppercase tracking-widest mt-8">
                                Lock & Logout
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
