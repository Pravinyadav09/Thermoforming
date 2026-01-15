"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    SearchCheck,
    ArrowRight,
    Clock,
    Link as LinkIcon,
    Factory,
    ShieldCheck,
    Truck,
    FileText,
    Users,
    Zap,
    Box,
    Calculator,
    CheckCircle2,
    RotateCcw,
    Printer,
    History,
    Scale
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export function BibleViewDialog({ trigger }: { trigger: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    const lifecycleSteps = [
        {
            module: "Sales & CRM",
            icon: Users,
            label: "Inquiry & Sample",
            id: "INQ/24/091",
            status: "Completed",
            date: "12 Apr",
            desc: "Client Pfizer requested 10ml tray sample. Approved by Kanchan Ma'am.",
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            module: "Costing",
            icon: Calculator,
            label: "Smart Quotation",
            id: "QT/24/112",
            status: "Won",
            date: "15 Apr",
            desc: "Rate fixed at ₹12.40/unit with 22% margin lockdown.",
            color: "text-emerald-500",
            bg: "bg-emerald-50"
        },
        {
            module: "Mold MGMT",
            icon: Box,
            label: "Mold Allocation",
            id: "MOLD-882",
            status: "Verified",
            date: "18 Apr",
            desc: "2-Up Impression mold issued from Yard B. Last maintenance: 2 days ago.",
            color: "text-indigo-500",
            bg: "bg-indigo-50"
        },
        {
            module: "Production",
            icon: Factory,
            label: "Job Card Execution",
            id: "JC/24/505",
            status: "Finished",
            date: "20 Apr",
            desc: "Shift B (Supervisor: Ashok). Run Time: 8.5hrs. Efficiency: 94.2%.",
            color: "text-purple-500",
            bg: "bg-purple-50"
        },
        {
            module: "Quality (QC)",
            icon: ShieldCheck,
            label: "Lab Certification",
            id: "BATCH-505-QC",
            status: "Certified",
            date: "21 Apr",
            desc: "GSM variance 0.2mg within limit. COA generated for client.",
            color: "text-rose-500",
            bg: "bg-rose-50"
        },
        {
            module: "Logistics",
            icon: Truck,
            label: "Dispatch/Gate Pass",
            id: "GP/24/501",
            status: "Dispatched",
            date: "22 Apr",
            desc: "Vehicle MH-04-AB-1234. Loaded 24,000 units. Ready for Billing.",
            color: "text-cyan-500",
            bg: "bg-cyan-50"
        },
        {
            module: "Finance",
            icon: FileText,
            label: "Final Billing",
            id: "TF/24/0501",
            status: "Synced",
            date: "Today",
            desc: "E-Invoice (IRN) generated. Tally Sales Voucher created automatic.",
            color: "text-slate-900",
            bg: "bg-slate-100"
        }
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                {/* Header - EXACTLY LIKE RTS */}
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 bg-cyan-100 rounded-lg text-cyan-700">
                            <RotateCcw className="h-6 w-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold">The "Bible" Traceability Bridge</DialogTitle>
                            <DialogDescription>
                                End-to-End Asset Recovery & Audit Protocol
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Separator />

                <div className="py-4">
                    <Tabs defaultValue="trace" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100 p-1">
                            <TabsTrigger value="trace">Traceability Lifecycle</TabsTrigger>
                            <TabsTrigger value="recon">Material Recon</TabsTrigger>
                        </TabsList>

                        <TabsContent value="trace" className="mt-0 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
                            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-[19px] before:h-full before:w-0.5 before:bg-slate-100">
                                {lifecycleSteps.map((step, i) => (
                                    <div key={i} className="relative flex items-start gap-6 group">
                                        <div className={cn(
                                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-white shadow-sm z-10",
                                            step.bg, step.color
                                        )}>
                                            <step.icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 space-y-1.5 pb-2">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-sm font-bold text-slate-900 tracking-tight">{step.label}</h4>
                                                <div className="flex items-center gap-2">
                                                    <Badge className="text-[9px] uppercase font-bold bg-emerald-50 text-emerald-700 border-none">{step.status}</Badge>
                                                    <span className="text-[10px] font-bold text-slate-400">{step.date}</span>
                                                </div>
                                            </div>
                                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 tracking-wider">
                                                    {step.module} • ID: <span className="text-slate-700">{step.id}</span>
                                                </p>
                                                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="recon" className="space-y-6 mt-0">
                            {/* Logic Box - EXACTLY LIKE RTS */}
                            <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1 text-center">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-loose">Material Issued</p>
                                        <p className="text-2xl font-black text-slate-900 tracking-tight">450.0 <span className="text-xs font-bold text-slate-400">kg</span></p>
                                    </div>
                                    <div className="space-y-1 text-center">
                                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-loose">FG Weight (Yield)</p>
                                        <p className="text-2xl font-black text-emerald-600 tracking-tight">382.5 <span className="text-xs font-bold">kg</span></p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-200">
                                    <div className="grid grid-cols-2 gap-y-4 px-2">
                                        <div className="space-y-0.5">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Scrap Generated</p>
                                            <p className="text-sm font-bold text-slate-700">62.8 kg (14%)</p>
                                        </div>
                                        <div className="space-y-0.5 text-right">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Asset Return (RTS)</p>
                                            <p className="text-sm font-bold text-cyan-600">4.7 kg Verified</p>
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest">Process Loss</p>
                                            <p className="text-sm font-bold text-rose-500">0.0 kg (Healthy)</p>
                                        </div>
                                        <div className="space-y-0.5 text-right">
                                            <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Variance Audit</p>
                                            <p className="text-sm font-black text-emerald-600 tracking-tight">Perfect Yield (0%)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                                <p className="text-[10px] font-semibold text-emerald-700 leading-relaxed uppercase tracking-tighter">
                                    Material Reconciliation Verified via ISO:9001 Protocol. All weights accounted for in Store Ledger.
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                <DialogFooter className="border-t pt-4">
                    <Button variant="outline" className="text-xs font-bold uppercase tracking-widest gap-2" onClick={() => setOpen(false)}>
                        Close Trace
                    </Button>
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest gap-2 px-8">
                        Print Master Bible <Printer className="h-4 w-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
