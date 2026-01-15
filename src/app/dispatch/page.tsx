"use client";

import React, { useState } from 'react';
import {
    Truck,
    Package,
    CheckCircle2,
    AlertTriangle,
    Scale,
    Barcode,
    FileText,
    Printer,
    Search,
    Plus,
    XCircle,
    MapPin,
    Phone,
    User,
    Clock,
    TrendingUp,
    Box,
    ShieldCheck,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Types for Dispatch Module
interface ShipperBox {
    id: string; // BOX-001
    jobCardId: string;
    itemName: string;
    qtyPerBox: number;
    grossWeight: number;
    netWeight: number;
    boxNumber: number;
    status: 'packed' | 'loaded' | 'dispatched';
}

interface DispatchOrder {
    id: string; // DI-24-105
    customerName: string;
    destination: string;
    totalBoxes: number;
    totalWeight: number;
    transporterName: string;
    vehicleNo: string;
    lrNumber: string;
    status: 'pending' | 'ready' | 'in-transit' | 'delivered';
    qcStatus: 'passed' | 'pending' | 'failed';
    timestamp: string;
}

export default function DispatchLogistics() {
    const [activeTab, setActiveTab] = useState('pending');
    const [showPackingModal, setShowPackingModal] = useState(false);
    const [showDispatchModal, setShowDispatchModal] = useState(false);

    // Form States
    const [boxEntry, setBoxEntry] = useState({
        jobCard: '',
        qtyPerBox: 100,
        grossWeight: 0,
        boxWeight: 0.5, // Standard box tare
        totalBoxes: 0
    });

    const [dispatchForm, setDispatchForm] = useState({
        transporter: '',
        vehicleNo: '',
        driverName: '',
        driverMobile: '',
        lrNumber: ''
    });

    // Constants for deep logic
    const STANDARD_BOX_WEIGHT = 5.5; // kg per box (for 100 trays)
    const WEIGHT_VARIANCE_THRESHOLD = 0.7; // ±700g tolerance

    // Mock Data
    const mockPendingOrders: DispatchOrder[] = [
        { id: 'DI-24-108', customerName: 'Haldiram Foods Ltd', destination: 'Nagpur Plant', totalBoxes: 0, totalWeight: 0, transporterName: '', vehicleNo: '', lrNumber: '', status: 'pending', qcStatus: 'passed', timestamp: '2 Hours Ago' },
        { id: 'DI-24-105', customerName: 'Britannia Industries', destination: 'Bangalore Unit', totalBoxes: 0, totalWeight: 0, transporterName: '', vehicleNo: '', lrNumber: '', status: 'pending', qcStatus: 'passed', timestamp: 'Yesterday' },
    ];

    const mockReadyDispatch: DispatchOrder[] = [
        { id: 'DI-24-102', customerName: 'Amul Dairy', destination: 'Anand, Gujarat', totalBoxes: 85, totalWeight: 467.5, transporterName: 'TCI Express', vehicleNo: 'GJ-05-AB-1234', lrNumber: 'TCI/2024/5501', status: 'ready', qcStatus: 'passed', timestamp: 'Today 10:30 AM' },
    ];

    const mockInTransit: DispatchOrder[] = [
        { id: 'DI-24-098', customerName: 'Parle Products', destination: 'Mumbai', totalBoxes: 120, totalWeight: 660, transporterName: 'BlueDart', vehicleNo: 'MH-04-CV-9988', lrNumber: 'BD/24/8821', status: 'in-transit', qcStatus: 'passed', timestamp: '12 Jan 2024' },
    ];

    const stats = [
        { label: 'Pending Dispatch', value: '12 Orders', change: 'Today', icon: Clock, color: 'text-amber-600', trend: 'neutral' },
        { label: 'Ready to Ship', value: '3 Orders', change: '450 Boxes', icon: Package, color: 'text-cyan-600', trend: 'up' },
        { label: 'In-Transit', value: '8 Vehicles', change: 'Live Tracking', icon: Truck, color: 'text-blue-600', trend: 'neutral' },
        { label: 'OTD Ratio', value: '96.8%', change: 'This Month', icon: TrendingUp, color: 'text-emerald-600', trend: 'up' },
    ];

    const netWeight = Math.max(0, boxEntry.grossWeight - boxEntry.boxWeight);
    const weightVariance = Math.abs(netWeight - STANDARD_BOX_WEIGHT);
    const isWeightAbnormal = netWeight > 0 && weightVariance > WEIGHT_VARIANCE_THRESHOLD;

    const StatusBadge = ({ status, qcStatus }: { status: DispatchOrder['status'], qcStatus?: DispatchOrder['qcStatus'] }) => {
        if (qcStatus === 'failed') return <Badge variant="destructive">QC Failed</Badge>;
        if (qcStatus === 'pending') return <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50">QC Pending</Badge>;

        switch (status) {
            case 'pending': return <Badge variant="secondary" className="bg-slate-100 text-slate-600">Pending</Badge>;
            case 'ready': return <Badge className="bg-cyan-600 hover:bg-cyan-700">Ready to Ship</Badge>;
            case 'in-transit': return <Badge className="bg-blue-600 hover:bg-blue-700 animate-pulse">In Transit</Badge>;
            case 'delivered': return <Badge className="bg-emerald-600 hover:bg-emerald-700">Delivered</Badge>;
            default: return null;
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dispatch & Logistics</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Manage shipments, packing lists, and real-time tracking.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button onClick={() => setShowPackingModal(true)} variant="outline" className="flex-1 md:flex-none gap-2">
                        <Box className="h-4 w-4" />
                        Pack Boxes
                    </Button>
                    <Button onClick={() => setShowDispatchModal(true)} className="flex-1 md:flex-none gap-2 bg-slate-900 hover:bg-slate-800">
                        <Truck className="h-4 w-4" />
                        Create Dispatch
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
            <Tabs defaultValue="pending" className="space-y-6" onValueChange={setActiveTab}>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <TabsList className="flex w-full lg:w-auto h-auto p-1 bg-slate-100 overflow-x-auto no-scrollbar justify-start whitespace-nowrap">
                        <TabsTrigger value="pending" className="px-4 py-2 text-xs md:text-sm">Pending Orders</TabsTrigger>
                        <TabsTrigger value="packing" className="px-4 py-2 text-xs md:text-sm">Ready to Ship</TabsTrigger>
                        <TabsTrigger value="transit" className="px-4 py-2 text-xs md:text-sm">In Transit</TabsTrigger>
                        <TabsTrigger value="delivered" className="px-4 py-2 text-xs md:text-sm">History</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-72">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search Order..." className="pl-8 bg-white h-10 text-sm" />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Content Area - Pending Orders */}
                <TabsContent value="pending" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {mockPendingOrders.map((order) => (
                            <Card key={order.id} className="transition-all hover:shadow-md border-slate-200">
                                <CardContent className="p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
                                    <div className="flex items-start gap-5 w-full">
                                        <div className="p-4 rounded-xl border bg-amber-50 border-amber-200 text-amber-600 shrink-0">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-lg text-slate-900">{order.customerName}</h3>
                                                <StatusBadge status={order.status} qcStatus={order.qcStatus} />
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">{order.id} • <span className="text-muted-foreground">{order.destination}</span></p>
                                            <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {order.destination}</span>
                                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {order.timestamp}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button onClick={() => setShowPackingModal(true)} className="w-full lg:w-auto min-w-[150px] gap-2 bg-cyan-600 hover:bg-cyan-700 text-white">
                                        <Box className="h-4 w-4" />
                                        Start Packing
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Content Area - Ready to Ship */}
                <TabsContent value="packing" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {mockReadyDispatch.map((order) => (
                            <Card key={order.id} className="transition-all hover:shadow-md border-slate-200">
                                <CardContent className="p-6">
                                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                                        <div className="flex items-start gap-5 w-full">
                                            <div className="p-4 rounded-xl border bg-cyan-50 border-cyan-200 text-cyan-600 shrink-0">
                                                <Package className="h-6 w-6" />
                                            </div>
                                            <div className="space-y-4 flex-1">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="font-semibold text-lg text-slate-900">{order.customerName}</h3>
                                                        <StatusBadge status={order.status} />
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{order.id} • LR: {order.lrNumber}</p>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Total Boxes</p>
                                                        <p className="text-lg font-bold text-slate-900">{order.totalBoxes}</p>
                                                    </div>
                                                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Total Weight</p>
                                                        <p className="text-lg font-bold text-slate-900">{order.totalWeight} kg</p>
                                                    </div>
                                                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Transporter</p>
                                                        <p className="text-sm font-medium text-slate-700">{order.transporterName}</p>
                                                    </div>
                                                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Vehicle</p>
                                                        <p className="text-sm font-medium text-slate-700">{order.vehicleNo}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator className="my-6" />

                                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                                        <Button variant="outline" className="gap-2">
                                            <Printer className="h-4 w-4" />
                                            Print Packing List
                                        </Button>
                                        <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2 text-white">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Generate Gate Pass
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Content Area - In-Transit */}
                <TabsContent value="transit" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {mockInTransit.map((order) => (
                            <Card key={order.id} className="transition-all hover:shadow-md border-slate-200">
                                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-start gap-5 w-full">
                                        <div className="p-4 rounded-xl border bg-blue-50 border-blue-200 text-blue-600 shrink-0">
                                            <Truck className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-lg text-slate-900">{order.customerName}</h3>
                                                <StatusBadge status={order.status} />
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">{order.id} • {order.vehicleNo}</p>
                                            <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
                                                <span>{order.totalBoxes} Boxes</span>
                                                <span>•</span>
                                                <span>{order.totalWeight} kg</span>
                                                <span>•</span>
                                                <span>{order.transporterName}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="w-full md:w-auto min-w-[150px] bg-blue-600 hover:bg-blue-700 text-white gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Track Shipment
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="delivered">
                    <div className="flex flex-col items-center justify-center p-12 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-center">
                        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Delivered Orders</h3>
                        <p className="text-muted-foreground max-w-sm mt-1">
                            Shipment history and PODs will appear here.
                        </p>
                    </div>
                </TabsContent>

            </Tabs>

            {/* Packing Modal */}
            <Dialog open={showPackingModal} onOpenChange={setShowPackingModal}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-2 bg-cyan-100 rounded-lg text-cyan-700">
                                <Box className="h-6 w-6" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl">Box Packing</DialogTitle>
                                <DialogDescription>
                                    Record weight and generate box labels.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <Separator />

                    <div className="grid gap-6 py-4">
                        <div className="space-y-2">
                            <Label>Linked Job Card</Label>
                            <div className="relative">
                                <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-9"
                                    placeholder="Scan or Enter JC/24/..."
                                    onChange={(e) => setBoxEntry({ ...boxEntry, jobCard: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Qty per Box</Label>
                                <Input
                                    type="number"
                                    defaultValue={100}
                                    onChange={(e) => setBoxEntry({ ...boxEntry, qtyPerBox: Number(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Total Boxes</Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    onChange={(e) => setBoxEntry({ ...boxEntry, totalBoxes: Number(e.target.value) })}
                                />
                            </div>
                        </div>

                        {/* Weight Section */}
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">Gross Weight</Label>
                                    <Input
                                        type="number"
                                        placeholder="0.0"
                                        className="h-12 text-lg font-bold bg-white"
                                        onChange={(e) => setBoxEntry({ ...boxEntry, grossWeight: Number(e.target.value) })}
                                    />
                                </div>
                                <span className="text-2xl text-slate-300 font-light mx-2">-</span>
                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">Tare</Label>
                                    <Input
                                        type="number"
                                        defaultValue={0.5}
                                        className="h-12 text-lg font-bold bg-white text-right"
                                        onChange={(e) => setBoxEntry({ ...boxEntry, boxWeight: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-sm">Net Weight</span>
                                <span className="text-2xl font-bold text-cyan-600">{netWeight.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">kg</span></span>
                            </div>
                        </div>

                        {/* Deep Logic Alert: Weight Variance */}
                        {isWeightAbnormal && (
                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                                <div className="text-sm text-amber-900">
                                    <p className="font-semibold mb-1">Weight Variance Alert</p>
                                    <p className="text-amber-700 leading-relaxed">
                                        Recorded weight deviates from standard. verify count.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPackingModal(false)}>Cancel</Button>
                        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Record & Print Label</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dispatch Modal */}
            <Dialog open={showDispatchModal} onOpenChange={setShowDispatchModal}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                                <Truck className="h-6 w-6" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl">Create Dispatch</DialogTitle>
                                <DialogDescription>
                                    Enter logistics details to generate invoice.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <Separator />

                    <div className="grid gap-6 py-4">
                        <div className="space-y-2">
                            <Label>Transporter Name</Label>
                            <Select onValueChange={(value) => setDispatchForm({ ...dispatchForm, transporter: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Transporter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tci">TCI Express</SelectItem>
                                    <SelectItem value="bluedart">BlueDart</SelectItem>
                                    <SelectItem value="vrl">VRL Logistics</SelectItem>
                                    <SelectItem value="local">Local Tempo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Vehicle Number</Label>
                                <Input
                                    placeholder="MH-04-AB..."
                                    onChange={(e) => setDispatchForm({ ...dispatchForm, vehicleNo: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>LR Number</Label>
                                <Input
                                    placeholder="LR/2024/..."
                                    onChange={(e) => setDispatchForm({ ...dispatchForm, lrNumber: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Driver Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        className="pl-9"
                                        placeholder="Full Name"
                                        onChange={(e) => setDispatchForm({ ...dispatchForm, driverName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Driver Mobile</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        className="pl-9"
                                        type="tel"
                                        placeholder="9876543210"
                                        onChange={(e) => setDispatchForm({ ...dispatchForm, driverMobile: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                            <span className="text-sm font-semibold text-emerald-900">QC Status Check</span>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                <span className="font-bold text-emerald-700">PASSED</span>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDispatchModal(false)}>Cancel</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Generate Invoice</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
