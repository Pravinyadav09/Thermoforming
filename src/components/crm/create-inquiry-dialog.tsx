"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Plus,
    Building2,
    Calendar,
    ChevronRight,
    Briefcase,
    Settings2,
    ShieldCheck,
    Scale,
    Mail,
    Palette,
    BarChart3,
    Truck,
    CreditCard,
    ChevronLeft,
    CheckCircle2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Inquiry } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CreateInquiryDialog({ onInquiryCreate }: { onInquiryCreate: (inq: Inquiry) => void }) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState<Partial<Inquiry>>({
        category: "Pharma Ampoule",
        substrateType: "PET",
        dimensions: { length: 0, width: 0, depth: 0 },
        thickness: 0,
        cavityCount: 0,
    });

    const categories = ['Pharma Ampoule', 'Injection Tray', 'Vial Tray', 'Food Tray', 'Industrial Hardware'];
    const substrates = ['PET', 'APET', 'RPET', 'PP', 'PVC', 'HIPS'];

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleSubmit = () => {
        const newInquiry: Inquiry = {
            ...formData,
            id: `INQ-24-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            createdAt: new Date().toISOString().split('T')[0],
            lastActivity: "Just Now",
            status: "new",
            assignedTo: "Current User",
            followUpDate: formData.followUpDate || new Date().toISOString().split('T')[0],
        } as Inquiry;

        onInquiryCreate(newInquiry);
        setOpen(false);
        setStep(1);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex-1 md:flex-none gap-2 bg-cyan-600 hover:bg-cyan-700 text-white">
                    <Plus className="h-4 w-4" />
                    New Inquiry Entry
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 bg-cyan-100 rounded-lg text-cyan-700">
                            <Briefcase className="h-6 w-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl">Inquiry Entry Engine</DialogTitle>
                            <DialogDescription>
                                Digital Client Visit & Specs Module
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Separator />

                <div className="grid gap-6 py-4">
                    <Progress value={(step / 3) * 100} className="h-1 bg-cyan-100" />

                    {step === 1 && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Client Name</Label>
                                    <Input
                                        placeholder="Full Legal Name"
                                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Plant Location</Label>
                                    <Input
                                        placeholder="Specific Address"
                                        onChange={(e) => setFormData({ ...formData, plantLocation: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Contact Person</Label>
                                    <Input
                                        placeholder="Manager Name"
                                        onChange={(e) => setFormData({ ...formData, primaryContact: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>GST Number</Label>
                                    <Input
                                        placeholder="Business Tax ID"
                                        onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                            <div className="space-y-2">
                                <Label>Article Name</Label>
                                <Input
                                    placeholder="e.g. 10ml Ampoule Tray"
                                    onChange={(e) => setFormData({ ...formData, articleName: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select
                                        onValueChange={(v: string) => setFormData({ ...formData, category: v as Inquiry['category'] })}
                                        defaultValue={formData.category}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Substrate Type</Label>
                                    <Select
                                        onValueChange={(v: string) => setFormData({ ...formData, substrateType: v as Inquiry['substrateType'] })}
                                        defaultValue={formData.substrateType}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {substrates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-cyan-600" />
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Auto-suggest: Medical Grade PET for Pharma.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="space-y-2">
                                    <Label>Micron</Label>
                                    <Input type="number" placeholder="450" onChange={(e) => setFormData({ ...formData, thickness: Number(e.target.value) })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Cavities</Label>
                                    <Input type="number" placeholder="5" onChange={(e) => setFormData({ ...formData, cavityCount: Number(e.target.value) })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>MOQ</Label>
                                    <Input type="number" placeholder="10000" onChange={(e) => setFormData({ ...formData, expectedMoq: Number(e.target.value) })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                            <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2 text-center">
                                        <Label className="uppercase text-xs text-muted-foreground tracking-wider">Monthly Req.</Label>
                                        <Input
                                            type="number"
                                            onChange={(e) => setFormData({ ...formData, monthlyRequirement: Number(e.target.value) })}
                                            className="h-16 text-2xl font-bold text-center border-slate-200 text-cyan-600"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <Label className="uppercase text-xs text-muted-foreground tracking-wider">Target Price</Label>
                                        <Input
                                            type="number"
                                            onChange={(e) => setFormData({ ...formData, targetPrice: Number(e.target.value) })}
                                            className="h-16 text-2xl font-bold text-center border-slate-200 text-slate-400"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-200 flex justify-between items-center px-2">
                                    <div>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Follow-up Date</p>
                                        <Input
                                            type="date"
                                            className="mt-1 h-8 text-xs border-none bg-transparent font-semibold p-0"
                                            onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">Pipeline Phase</p>
                                        <p className="text-xl font-bold text-rose-500">NEW INQUIRY</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={step === 1 ? () => setOpen(false) : handleBack}>
                        {step === 1 ? "Cancel" : "Back"}
                    </Button>
                    <Button
                        onClick={step === 3 ? handleSubmit : handleNext}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2"
                    >
                        {step === 3 ? "Post Entry" : "Next Module"}
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
