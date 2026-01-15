"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    Zap,
    ShieldCheck,
    FileText,
    Calculator,
    ArrowRight,
    Search,
    QrCode,
    Database,
    Tag,
    Clock,
    Scale
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function CreateInvoiceDialog() {
    const [open, setOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        toast.loading("Communicating with IRP Portal...");
        await new Promise(r => setTimeout(r, 1500));
        toast.dismiss();
        toast.success("E-Invoice Generated with IRN!");

        toast.loading("Syncing to Tally.ERP 9...");
        await new Promise(r => setTimeout(r, 1000));
        toast.dismiss();
        toast.success("Synced to Tally.");

        setOpen(false);
        setIsProcessing(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
                    <Plus className="h-4 w-4" />
                    New Billing
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                {/* Header - EXACTLY LIKE RTS */}
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 bg-cyan-100 rounded-lg text-cyan-700">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl">Commercial Billing Engine</DialogTitle>
                            <DialogDescription>
                                GST & Compliance Protocol (Module 10)
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Separator />

                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Dispatch Reference</Label>
                            <Select defaultValue="gp-501">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select GP" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="gp-501">GP/24/501 (Pfizer)</SelectItem>
                                    <SelectItem value="gp-502">GP/24/502 (Cipla)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Voucher Type (Tally)</Label>
                            <Select defaultValue="sales">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sales">Sales Voucher</SelectItem>
                                    <SelectItem value="credit">Credit Note</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>HSN Code</Label>
                            <Select defaultValue="3923">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="3923">3923 - Plastic Trays</SelectItem>
                                    <SelectItem value="2922">2922 - Specialized</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Payment Terms</Label>
                            <Select defaultValue="30">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="30">30 Days Credit</SelectItem>
                                    <SelectItem value="45">45 Days Credit</SelectItem>
                                    <SelectItem value="advance">100% Advance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Weight Logic Box equivalent - Financial Logic Box */}
                    <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Taxable Value</p>
                                <p className="text-2xl font-bold text-slate-900">₹ 2,45,000</p>
                            </div>
                            <div className="text-right">
                                <Badge variant="outline" className="border-emerald-500 text-emerald-700 bg-emerald-50">IGST 18% ACTIVE</Badge>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 flex justify-between items-center px-1">
                            <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Payable GST</p>
                                <p className="text-lg font-bold text-slate-700">₹ 44,100</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Final Total</p>
                                <p className="text-2xl font-black text-cyan-600">₹ 2,89,100</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-100 flex items-start gap-3 text-cyan-700">
                        <ShieldCheck className="h-5 w-5 shrink-0" />
                        <p className="text-xs font-medium">Compliance verification active. IRN & Tally syncing will trigger on post.</p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Discard</Button>
                    <Button onClick={handleGenerate} disabled={isProcessing} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                        {isProcessing ? "Post Compliance..." : "Post Bill & Print Invoice"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Missing Plus icon import if needed, or use from lucide-react
import { Plus } from "lucide-react";
