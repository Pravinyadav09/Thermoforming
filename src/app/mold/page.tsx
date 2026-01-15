"use client";

import React, { useState } from 'react';
import {
    Plus,
    Search,
    Database,
    Truck,
    AlertTriangle,
    LayoutGrid,
    History,
    MapPin,
    ChevronRight,
    Upload,
    IndianRupee,
    FileCode,
    ArrowRight,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    XCircle,
    Copy,
    Save
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
import { Progress } from "@/components/ui/progress";

// Status Badge Component for Module 2
const MoldStatusBadge = ({ status }: { status: string }) => {
    const configs: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", className?: string, label: string }> = {
        'under-design': { variant: 'outline', className: 'text-indigo-600 border-indigo-200 bg-indigo-50', label: 'Under Design' },
        'outsourced': { variant: 'outline', className: 'text-blue-600 border-blue-200 bg-blue-50', label: 'Outsourced' },
        'in-trial': { variant: 'outline', className: 'text-amber-600 border-amber-200 bg-amber-50', label: 'In-Trial' },
        'approved': { variant: 'default', className: 'bg-emerald-600 hover:bg-emerald-700', label: 'Approved' },
        'in-production': { variant: 'secondary', className: 'bg-violet-100 text-violet-700 hover:bg-violet-200', label: 'In-Production' },
        'maintenance': { variant: 'destructive', label: 'Maintenance' },
        'scrapped': { variant: 'secondary', className: 'bg-slate-100 text-slate-500', label: 'Scrapped' },
    };

    const config = configs[status.toLowerCase().replace(' ', '-')] || configs['under-design'];
    return (
        <Badge variant={config.variant} className={config.className}>
            {config.label}
        </Badge>
    );
};

export default function MoldManagement() {
    const [showForm, setShowForm] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [activeTab, setActiveTab] = useState('all');

    const stats = [
        { label: 'Active Molds', value: '18', change: 'Live Now', icon: Database, color: 'text-blue-600', trend: 'neutral' },
        { label: 'Pending Trials', value: '04', change: 'Critical Samples', icon: History, color: 'text-amber-600', trend: 'up' },
        { label: 'Maint. Alerts', value: '03', change: 'Due for Polish', icon: AlertTriangle, color: 'text-rose-600', trend: 'up' },
        { label: 'Asset Value', value: '₹ 42.5L', change: 'Total Assets', icon: IndianRupee, color: 'text-emerald-600', trend: 'up' },
    ];

    const mockMolds = [
        {
            id: 'MOLD/PET/2024/082',
            article: '10ml Ampoule Tray - 5 Cavity',
            type: 'Final Forming Mold',
            vendor: 'Precision Dies & Tools',
            location: 'Rack A-04',
            impressions: 92450,
            life: 100000,
            status: 'in-production',
            version: 'v2.1',
            linkedId: 'CUT/PET/2024/082',
            lastMaintenance: '20,000 imp ago',
            trialLog: 'Smooth release, edges perfect'
        },
        {
            id: 'MOLD/PVC/2024/085',
            article: 'Vial Tray - medical grade',
            type: 'Wooden Trial Mold',
            vendor: 'Om Industries',
            location: 'In-Trial Bench',
            impressions: 120,
            life: 500,
            status: 'in-trial',
            version: 'v1.0',
            linkedId: 'N/A',
            lastMaintenance: 'Not Required',
            trialLog: 'Pending first run'
        },
        {
            id: 'MOLD/PET/2024/078',
            article: 'Injection Tray (HIPS)',
            type: 'Final Cutting Mold',
            vendor: 'Precision Dies & Tools',
            location: 'Rack B-12',
            impressions: 45000,
            life: 150000,
            status: 'approved',
            version: 'v2.1',
            linkedId: 'FRM/PET/2024/078',
            lastMaintenance: 'Recently Polished',
            trialLog: 'Sharp cutting, no burrs'
        },
        {
            id: 'MOLD/PP/2024/090',
            article: 'Food Grade Container',
            type: 'Forming Phase',
            vendor: 'TATA Dies',
            location: 'Outsourced',
            impressions: 0,
            life: 200000,
            status: 'outsourced',
            version: 'v1.1',
            linkedId: 'MISMATCH ALERT',
            lastMaintenance: 'N/A',
            trialLog: 'Draft design sent'
        }
    ];

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mold & Tooling</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Asset tracking, maintenance schedules, and trial logs.</p>
                </div>
                <div className="w-full md:w-auto">
                    <Button onClick={() => { setFormStep(1); setShowForm(true); }} className="w-full md:w-auto gap-2 bg-slate-900 hover:bg-slate-800">
                        <Plus className="h-4 w-4" />
                        New Mold Asset
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

            {/* Main Content Tabs */}
            <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <TabsList className="flex w-full lg:w-auto h-auto p-1 bg-slate-100 overflow-x-auto no-scrollbar justify-start whitespace-nowrap">
                        <TabsTrigger value="all" className="px-4 py-2 text-xs md:text-sm">All Molds</TabsTrigger>
                        <TabsTrigger value="requests" className="px-4 py-2 text-xs md:text-sm">Requests</TabsTrigger>
                        <TabsTrigger value="in-trial" className="px-4 py-2 text-xs md:text-sm">Trial Log</TabsTrigger>
                        <TabsTrigger value="approved" className="px-4 py-2 text-xs md:text-sm">Approved</TabsTrigger>
                        <TabsTrigger value="maintenance" className="px-4 py-2 text-xs md:text-sm">Maintenance</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-72">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search Mold..." className="pl-8 bg-white h-10 text-sm" />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TabsContent value="all" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {mockMolds.map((mold) => {
                            const usagePercent = Math.min(100, (mold.impressions / mold.life) * 100);
                            const isCritical = usagePercent >= 90;
                            const isMismatch = mold.linkedId === 'MISMATCH ALERT';

                            return (
                                <Card key={mold.id} className="transition-all hover:shadow-md border-slate-200">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col lg:flex-row justify-between gap-6">
                                            {/* Left Column */}
                                            <div className="flex items-start gap-5 w-full lg:w-2/5">
                                                <div className={cn("p-4 rounded-xl border shrink-0",
                                                    isCritical ? "bg-rose-50 border-rose-200 text-rose-500 animate-pulse" : "bg-blue-50 border-blue-200 text-blue-600"
                                                )}>
                                                    <LayoutGrid className="h-6 w-6" />
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="font-semibold text-lg text-slate-900">{mold.id}</h3>
                                                        <MoldStatusBadge status={mold.status} />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-xs text-slate-500 bg-slate-50">{mold.version}</Badge>
                                                        {isMismatch && (
                                                            <Badge variant="destructive" className="items-center gap-1 animate-pulse">
                                                                <AlertTriangle className="h-3 w-3" /> Version Mismatch
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm font-medium text-slate-700 pt-1">{mold.article}</p>
                                                </div>
                                            </div>

                                            {/* Middle Column */}
                                            <div className="w-full lg:w-1/3 flex flex-col justify-center space-y-2 text-sm text-muted-foreground border-l border-slate-100 pl-6">
                                                <div className="flex items-center gap-2">
                                                    <Truck className="h-4 w-4 text-slate-400" />
                                                    <span>{mold.vendor}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-slate-400" />
                                                    <span>{mold.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FileCode className="h-4 w-4 text-slate-400" />
                                                    <span>Set Ref: {mold.linkedId}</span>
                                                </div>
                                            </div>

                                            {/* Right Column */}
                                            <div className="w-full lg:w-1/4 flex flex-col justify-between items-end border-l border-slate-100 pl-6">
                                                <div className="w-full space-y-2">
                                                    <div className="flex justify-between text-xs font-semibold uppercase text-muted-foreground">
                                                        <span>Impressions</span>
                                                        <span className={cn(isCritical ? "text-rose-600" : "text-blue-600")}>
                                                            {mold.impressions.toLocaleString()} / {mold.life.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <Progress value={usagePercent} className="h-2" />
                                                    {isCritical && (
                                                        <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                                                            <AlertTriangle className="h-3 w-3" /> Life Depleted - Replace
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex gap-2 mt-4">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                                        <History className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer / Log */}
                                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                Latest Trial: &quot;{mold.trialLog}&quot;
                                            </div>
                                            {mold.status === 'in-trial' && (
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline" className="h-7 text-xs border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700">Pass Trial</Button>
                                                    <Button size="sm" variant="outline" className="h-7 text-xs border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700">Fail / Rework</Button>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </TabsContent>

                {/* Other tabs can be implemented similarly or just show placeholder for now, preserving the structure */}
                <TabsContent value="requests">
                    <div className="p-12 text-center border border-dashed rounded-lg">No open mold requests.</div>
                </TabsContent>
                <TabsContent value="in-trial">
                    <div className="p-12 text-center border border-dashed rounded-lg">Showing In-Trial items...</div>
                </TabsContent>
                <TabsContent value="approved">
                    <div className="p-12 text-center border border-dashed rounded-lg">Showing Approved items...</div>
                </TabsContent>
                <TabsContent value="maintenance">
                    <div className="p-12 text-center border border-dashed rounded-lg">Showing Maintenance items...</div>
                </TabsContent>
            </Tabs>

            {/* New Mold Asset Modal */}
            <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Mold Asset Entry</DialogTitle>
                        <DialogDescription>
                            Create a new tooling asset. Step {formStep} of 3.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Progress Bar */}
                    <Progress value={(formStep / 3) * 100} className="h-1" />

                    <div className="py-4">
                        {formStep === 1 && (
                            <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold flex items-center gap-2">
                                    <Database className="h-4 w-4" />
                                    Mold Asset Details
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Article Linking</Label>
                                        <Input placeholder="Search product name..." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Mold Type</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="wooden">Wooden (Trial)</SelectItem>
                                                    <SelectItem value="forming">Final Forming</SelectItem>
                                                    <SelectItem value="cutting">Final Cutting</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Cavity Layout</Label>
                                            <Input placeholder="e.g. 2x5 = 10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Material</Label>
                                        <Select>
                                            <SelectTrigger><SelectValue placeholder="Select material" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="wood">Wood</SelectItem>
                                                <SelectItem value="aluminum">Aluminum</SelectItem>
                                                <SelectItem value="steel">Steel</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {formStep === 2 && (
                            <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                                <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold flex items-center gap-2">
                                    <Truck className="h-4 w-4" />
                                    Vendor & Sourcing
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Mold Maker Vendor</Label>
                                        <Input placeholder="Vendor Name" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Asset PO No</Label>
                                            <Input placeholder="PO-2024-..." />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Mold Cost (₹)</Label>
                                            <Input type="number" placeholder="0.00" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Exp. Delivery Date</Label>
                                        <Input type="date" />
                                    </div>

                                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                                        <Upload className="h-6 w-6 text-indigo-400 mb-2" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Upload Design / CAD</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {formStep === 3 && (
                            <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    Storage & Impression
                                </div>
                                <div className="space-y-4">
                                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex gap-3">
                                        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                                        <p className="text-xs text-amber-800 font-medium leading-relaxed">
                                            MANDATORY: Mold cannot be marked &quot;In-Store&quot; without a specific Storage Rack/Bin location.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Storage Location</Label>
                                        <Input placeholder="e.g. RACK-M-142" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Max Life (Imp.)</Label>
                                            <Input type="number" placeholder="100000" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Initial Version</Label>
                                            <Input placeholder="v1.0" />
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <FileCode className="h-4 w-4 text-blue-500" />
                                            <span className="text-xs font-bold text-blue-900 uppercase">Version Control Rule</span>
                                        </div>
                                        <p className="text-xs text-blue-700">
                                            System will enforce matching versions between Cutting and Forming Molds.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="flex justify-between sm:justify-between w-full">
                        {formStep > 1 ? (
                            <Button variant="outline" onClick={() => setFormStep(formStep - 1)}>Back</Button>
                        ) : <div />}

                        {formStep < 3 ? (
                            <Button onClick={() => setFormStep(formStep + 1)} className="gap-2 bg-slate-900 hover:bg-slate-800">
                                Next Step <ArrowRight className="h-3 w-3" />
                            </Button>
                        ) : (
                            <Button onClick={() => { setShowForm(false); setFormStep(1); }} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                                <Save className="h-4 w-4" /> Create Asset
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
