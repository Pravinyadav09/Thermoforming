"use client";

import React, { useState } from 'react';
import {
    ShieldCheck,
    Microscope,
    FileCheck,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    TestTube,
    ScrollText,
    Printer,
    Search,
    Thermometer,
    Scale,
    Eye,
    History,
    FileX,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    Monitor,
    Zap,
    Activity,
    Factory,
    ChevronRight,
    SquareStack,
    Clock,
    Plus,
    User
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

// Types for QA Module
interface QCBatch {
    id: string; // BATCH-24-001
    jobCardId: string;
    productName: string;
    batchSize: number; // kg
    operator: string;
    timestamp: string;
    status: 'pending' | 'lab-testing' | 'approved' | 'rejected' | 'hold';
    priority: 'normal' | 'urgent';
    visualChecks?: {
        printRegistration: boolean;
        colorMatching: boolean;
        textLegibility: boolean;
        surfaceDefects: boolean;
    };
    labData?: {
        gsm?: number;
        bondStrength?: number;
        cof?: number;
    };
    rejectionReason?: string;
}

export default function QualityAssurance() {
    const [activeTab, setActiveTab] = useState('pending');
    const [showInspectionModal, setShowInspectionModal] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState<QCBatch | null>(null);

    // Inspection Form State
    const [visualChecks, setVisualChecks] = useState({
        printRegistration: false,
        colorMatching: false,
        textLegibility: false,
        surfaceDefects: false,
    });
    const [labData, setLabData] = useState({
        gsm: 0,
        bondStrength: 0,
        cof: 0,
    });

    const mockPendingQC: QCBatch[] = [
        { id: 'BATCH-24-892', jobCardId: 'JC/24/505', productName: 'Ampoule Tray PET', batchSize: 450, operator: 'Amit Kumar', timestamp: '15 Mins Ago', status: 'pending', priority: 'urgent' },
        { id: 'BATCH-24-893', jobCardId: 'JC/24/502', productName: 'Vial Tray HIPS', batchSize: 320, operator: 'Suresh P.', timestamp: '1 Hour Ago', status: 'pending', priority: 'normal' },
    ];

    const mockLabTesting: QCBatch[] = [
        { id: 'BATCH-24-890', jobCardId: 'JC/24/498', productName: 'Food Container PP', batchSize: 500, operator: 'Vikram Singh', timestamp: '2 Hours Ago', status: 'lab-testing', priority: 'normal', visualChecks: { printRegistration: true, colorMatching: true, textLegibility: true, surfaceDefects: true } },
    ];

    const mockApprovedCOA: QCBatch[] = [
        { id: 'BATCH-24-885', jobCardId: 'JC/24/480', productName: 'Medical Device Insert', batchSize: 1200, operator: 'Rahul M.', timestamp: 'Yesterday', status: 'approved', priority: 'normal', visualChecks: { printRegistration: true, colorMatching: true, textLegibility: true, surfaceDefects: true }, labData: { gsm: 52, bondStrength: 4.5, cof: 0.25 } },
    ];

    const stats = [
        { label: 'Pending Queue', value: '5 Batches', change: 'Urgent: 2', icon: Microscope, color: 'text-amber-500', trend: 'neutral' },
        { label: 'Reject Rate', value: '1.2%', change: 'Last 30 Days', icon: AlertTriangle, color: 'text-rose-500', trend: 'down' },
        { label: 'Inspection Yield', value: '98.4%', change: 'Target: 100%', icon: FileCheck, color: 'text-cyan-600', trend: 'up' },
        { label: 'Verified Output', value: '1.2 Tons', change: 'Total Shift', icon: Scale, color: 'text-emerald-500', trend: 'up' },
    ];

    const handleInspectionStart = (batch: QCBatch) => {
        setSelectedBatch(batch);
        setShowInspectionModal(true);
        setVisualChecks({ printRegistration: false, colorMatching: false, textLegibility: false, surfaceDefects: false });
        setLabData({ gsm: 0, bondStrength: 0, cof: 0 });
    };

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header - EXACTLY LIKE RTS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Quality Assurance</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Certified Batch Inspection Protocol</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none gap-2">
                        <History className="h-4 w-4" />
                        Audit History
                    </Button>
                    <Button className="flex-1 md:flex-none gap-2 bg-cyan-600 hover:bg-cyan-700 text-white">
                        <FileCheck className="h-4 w-4" />
                        Issue Manual COA
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
            <Tabs defaultValue="pending" className="space-y-6" onValueChange={setActiveTab}>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <TabsList className="flex w-full lg:w-auto h-auto p-1 bg-slate-100 overflow-x-auto no-scrollbar justify-start whitespace-nowrap">
                        <TabsTrigger value="pending" className="px-4 py-2 text-xs md:text-sm">Pending Batches</TabsTrigger>
                        <TabsTrigger value="lab" className="px-4 py-2 text-xs md:text-sm">Lab Certification</TabsTrigger>
                        <TabsTrigger value="approved" className="px-4 py-2 text-xs md:text-sm">COA Archive</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-72">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search Batch..." className="pl-8 bg-white h-10 text-sm" />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TabsContent value="pending" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {mockPendingQC.map((batch) => (
                            <Card key={batch.id} className="transition-all hover:shadow-md border-slate-200">
                                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-5 w-full">
                                        <div className={cn(
                                            "p-4 rounded-xl border shrink-0",
                                            batch.priority === 'urgent' ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-cyan-50 border-cyan-200 text-cyan-600"
                                        )}>
                                            <Microscope className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-lg text-slate-900">{batch.id}</h3>
                                                <Badge variant="outline" className={cn(
                                                    batch.priority === 'urgent' ? "text-rose-700 bg-rose-50 border-rose-200 animate-pulse" : "text-cyan-700 bg-cyan-50 border-cyan-200"
                                                )}>
                                                    {batch.priority === 'urgent' ? 'CRITICAL URGENT' : 'Awaiting Review'}
                                                </Badge>
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">{batch.productName} • From {batch.jobCardId}</p>
                                            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {batch.operator}</span>
                                                <span className="flex items-center gap-1.5"><History className="h-3.5 w-3.5" /> {batch.timestamp}</span>
                                            </div>
                                        </div>
                                        <div className="text-right hidden sm:block">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Batch Size</p>
                                            <p className="text-xl font-bold text-slate-900">{batch.batchSize} kg</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <Button
                                            onClick={() => handleInspectionStart(batch)}
                                            className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white min-w-[140px]"
                                        >
                                            Start Analysis
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

                <TabsContent value="history" className="space-y-4">
                    <Card className="border-slate-200">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
                            <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wider">QC Batch Audit Log</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100">
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Batch ID</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Result</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">COA</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {mockApprovedCOA.map((r, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors text-sm font-medium text-slate-700">
                                                <td className="px-6 py-4">{r.id}</td>
                                                <td className="px-6 py-4">{r.productName}</td>
                                                <td className="px-6 py-4">
                                                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100">Certified</Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold">PASS</td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="ghost" size="sm" className="text-cyan-600 hover:bg-cyan-50">
                                                        <Printer className="h-4 w-4 mr-2" /> View
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Analysis Modal - Entry Engine Design */}
            <Dialog open={showInspectionModal} onOpenChange={setShowInspectionModal}>
                <DialogContent className="max-w-2xl rounded-2xl p-0 overflow-hidden">
                    <div className="p-6 bg-cyan-600 text-white flex justify-between items-center">
                        <div className="flex items-center gap-5">
                            <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">
                                <ShieldCheck className="h-7 w-7" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold tracking-tight text-white mb-0.5">Lab Analysis Engine</DialogTitle>
                                <DialogDescription className="text-cyan-100 text-xs font-medium uppercase tracking-widest">Protocol ISO-9001 Batch: {selectedBatch?.id}</DialogDescription>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                        {/* Visual Checks Section */}
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">1. Visual Verification Protocol</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {Object.entries(visualChecks).map(([key, value]) => (
                                    <div
                                        key={key}
                                        onClick={() => setVisualChecks(prev => ({ ...prev, [key]: !value }))}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                                            value ? "bg-emerald-50 border-emerald-300 text-emerald-800" : "bg-white border-slate-200 hover:bg-slate-50"
                                        )}
                                    >
                                        <span className="text-xs font-bold uppercase tracking-tight">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        {value ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <div className="h-5 w-5 rounded-full border-2 border-slate-200" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator className="bg-slate-100" />

                        {/* Lab Data Section - "Weight Logic Box" Style */}
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">2. Technical Parameter Audit</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">GSM Index</Label>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        className="bg-white font-bold h-10"
                                        value={labData.gsm || ''}
                                        onChange={(e) => setLabData({ ...labData, gsm: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Bond (N/15)</Label>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        className="bg-white font-bold h-10"
                                        value={labData.bondStrength || ''}
                                        onChange={(e) => setLabData({ ...labData, bondStrength: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">COF Coeff</Label>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        className="bg-white font-bold h-10"
                                        value={labData.cof || ''}
                                        onChange={(e) => setLabData({ ...labData, cof: parseFloat(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100">
                        <Button variant="ghost" onClick={() => setShowInspectionModal(false)} className="text-xs font-semibold uppercase tracking-widest text-slate-400">Cancel</Button>
                        <div className="flex-1" />
                        <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 font-bold uppercase tracking-widest text-[10px] px-6">Reject Batch</Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-[10px] px-8">Approve & Issue COA</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
