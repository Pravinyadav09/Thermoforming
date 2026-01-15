"use client";

import React, { useState, useMemo } from 'react';
import {
    Building2,
    Search,
    Plus,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    History,
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    User,
    IndianRupee,
    Clock,
    TrendingUp,
    Zap,
    Scale,
    Calculator,
    FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CreateInquiryDialog } from "@/components/crm/create-inquiry-dialog";
import { Inquiry } from "@/lib/types";

const MOCK_INQUIRIES: Inquiry[] = [
    {
        id: "INQ/24-25/001",
        clientName: "Sun Pharma",
        plantLocation: "Baddi, HP",
        primaryContact: "Amit Sharma",
        designation: "NPD Manager",
        mobile: "9876543210",
        email: "amit.s@sunpharma.com",
        gstNumber: "02AAACS1234A1Z5",
        category: "Pharma Ampoule",
        articleName: "10ml Ampoule Tray",
        substrateType: "PVC",
        colorProfile: "Clear",
        dimensions: { length: 150, width: 80, depth: 15 },
        thickness: 450,
        cavityCount: 5,
        monthlyRequirement: 50000,
        annualForecast: 600000,
        expectedMoq: 10000,
        status: "new",
        followUpDate: "2024-05-20",
        createdAt: "2024-05-14",
        lastActivity: "10 Mins Ago",
        assignedTo: "Rajesh K."
    },
    {
        id: "INQ/24-25/002",
        clientName: "Cipla Ltd",
        plantLocation: "Verna, Goa",
        primaryContact: "Suresh Prabhu",
        designation: "Purchase Head",
        mobile: "9988776655",
        email: "suresh.p@cipla.com",
        gstNumber: "30AAACC1234A1Z1",
        category: "Vial Tray",
        articleName: "Vial Securer",
        substrateType: "PET",
        colorProfile: "Amber",
        dimensions: { length: 200, width: 100, depth: 25 },
        thickness: 350,
        cavityCount: 10,
        monthlyRequirement: 100000,
        annualForecast: 1200000,
        expectedMoq: 25000,
        status: "quoted",
        quoteId: "QT/24-25/082",
        createdAt: "2024-05-08",
        lastActivity: "2 Hours Ago",
        assignedTo: "Anita D.",
        followUpDate: '2024-05-18'
    }
];

export default function SalesCRM() {
    const [activeTab, setActiveTab] = useState('pending');
    const [searchTerm, setSearchTerm] = useState("");
    const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);

    const stats = [
        { label: 'Open Inquiries', value: '₹ 58.2L', change: '+15.8% From Last Month', icon: IndianRupee, color: 'text-cyan-600', trend: 'up' },
        { label: 'Success Ratio', value: '28.4%', change: 'Target: 30%', icon: TrendingUp, color: 'text-emerald-600', trend: 'up' },
        { label: 'Top Material', value: 'RPET (45%)', change: 'Market Demand', icon: Zap, color: 'text-blue-600', trend: 'neutral' },
        { label: 'Aged Pending', value: '03 Cases', change: 'Review Required', icon: Clock, color: 'text-rose-600', trend: 'down' },
    ];

    const filteredInquiries = inquiries.filter(inq => {
        const matchesSearch =
            inq.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inq.articleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inq.id.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'pending') return matchesSearch && inq.status === 'new';
        if (activeTab === 'quoted') return matchesSearch && inq.status === 'quoted';
        return matchesSearch;
    });

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header - EXACTLY LIKE RTS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sales & CRM</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Industrial Business Acquisition</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none gap-2">
                        <Calculator className="h-4 w-4" />
                        Quick Costing
                    </Button>
                    <CreateInquiryDialog onInquiryCreate={(newInq) => setInquiries([newInq, ...inquiries])} />
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
                        <TabsTrigger value="pending" className="px-4 py-2 text-xs md:text-sm">Live Inquiries</TabsTrigger>
                        <TabsTrigger value="active" className="px-4 py-2 text-xs md:text-sm">Won (Active)</TabsTrigger>
                        <TabsTrigger value="lost" className="px-4 py-2 text-xs md:text-sm">Lost Analysis</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-72">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search Inquiry..."
                                className="pl-8 bg-white h-10 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TabsContent value="pending" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {filteredInquiries.map((inq) => (
                            <Card key={inq.id} className="transition-all hover:shadow-md border-slate-200">
                                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-5 w-full">
                                        <div className="p-4 rounded-xl border bg-cyan-50 border-cyan-200 text-cyan-600 shrink-0">
                                            <Building2 className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-lg text-slate-900">{inq.clientName}</h3>
                                                <Badge variant="outline" className="text-cyan-700 bg-cyan-50 border-cyan-200">Awaiting Costing</Badge>
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">{inq.articleName} • {inq.substrateType} ({inq.thickness}μ)</p>
                                            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {inq.primaryContact}</span>
                                                <span className="flex items-center gap-1.5"><History className="h-3.5 w-3.5" /> {inq.lastActivity}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 text-right">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Required Qty</p>
                                            <p className="text-lg font-bold text-slate-900 tracking-tight">{inq.monthlyRequirement.toLocaleString()} Units</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                                        <Button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white min-w-[140px]">
                                            Request Price
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

                <TabsContent value="quoted" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {filteredInquiries.map((inq) => (
                            <Card key={inq.id} className="transition-all hover:shadow-md border-slate-200">
                                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-5 w-full">
                                        <div className="p-4 rounded-xl border bg-purple-50 border-purple-200 text-purple-600 shrink-0">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-lg text-slate-900">{inq.clientName}</h3>
                                                <Badge variant="outline" className="text-purple-700 bg-purple-50 border-purple-200">Price Issued</Badge>
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">{inq.articleName} • {inq.substrateType}</p>
                                            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Quote: {inq.quoteId}</span>
                                                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Valid for 7 Days</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 text-right">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Issued Rate</p>
                                            <p className="text-lg font-bold text-emerald-600 tracking-tight">₹{inq.targetPrice?.toFixed(2) || '4.25'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                                        <Button className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-700 text-white min-w-[140px]">
                                            Download PDF
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

                <TabsContent value="recon">
                    <Card className="border-slate-200">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
                            <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Conversion Reconciliation</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100">
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Ref ID</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Material</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Qty</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {inquiries.map((inq, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors text-sm font-medium text-slate-700">
                                                <td className="px-6 py-4">{inq.id}</td>
                                                <td className="px-6 py-4">{inq.clientName}</td>
                                                <td className="px-6 py-4">{inq.substrateType}</td>
                                                <td className="px-6 py-4 text-right font-bold">{inq.monthlyRequirement.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <Badge variant="outline" className="uppercase text-[10px]">{inq.status}</Badge>
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
        </div>
    );
}
