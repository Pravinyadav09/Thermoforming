"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { CreateInvoiceDialog } from "@/components/accounting/create-invoice-dialog";
import { RecordPaymentDialog } from "@/components/accounting/record-payment-dialog";
import { BibleViewDialog } from "@/components/accounting/bible-view-dialog";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import {
    IndianRupee,
    TrendingDown,
    CheckCircle2,
    CreditCard,
    FileText,
    History,
    BarChart3,
    MessageSquare,
    Printer,
    Navigation,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    Plus,
    Zap,
    Scale,
    Activity,
    QrCode,
    Database,
    ShieldCheck,
    ArrowRight,
    Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function FinancePage() {
    const { user } = useAuth();
    const router = useRouter();
    const isCustomer = user?.role === "customer";
    const isAdmin = true;

    const [activeTab, setActiveTab] = useState("invoices");

    // Deep Dashboard Stats - Styled exactly like RTS
    const stats = [
        { label: "Accounts Receivable", value: "₹ 1.28 Cr", change: "Aging: 22 Days Avg", icon: TrendingDown, color: "text-rose-600", trend: "down" },
        { label: "GST Liability (Monthly)", value: "₹ 14.2L", change: "Due in 12 days", icon: ShieldCheck, color: "text-amber-600", trend: "neutral" },
        { label: "Turnover Status", value: "₹ 4.12 Cr", change: "82% Goal Met", icon: Activity, color: "text-blue-600", trend: "up" },
        { label: "Tally Sync", value: "Healthy", change: "2 Entries Pending", icon: Database, color: "text-emerald-600", trend: "up" },
    ];

    const deepInvoices = [
        {
            id: "TF/24-25/0501",
            customer: "Pfizer Ltd (Industrial)",
            amount: "₹ 2,89,100",
            status: "Sent",
            date: "15 May 2024",
            compliance: { irn: true, qr: true, tally: "Synced" },
            profitability: "22.4%"
        },
        {
            id: "TF/24-25/0502",
            customer: "Cipla Pharma Group",
            amount: "₹ 4,12,000",
            status: "Paid",
            date: "12 May 2024",
            compliance: { irn: true, qr: true, tally: "Synced" },
            profitability: "18.5%"
        },
        {
            id: "TF/24-25/0503",
            customer: "Sun Pharma",
            amount: "₹ 1,25,000",
            status: "Overdue",
            date: "02 May 2024",
            compliance: { irn: false, qr: false, tally: "Pending" },
            profitability: "25.1%"
        }
    ];

    const mockAging = [
        { customer: "Sun Pharma Group", balance: "₹ 1.25L", days: 62, status: "Blocked" },
        { customer: "Cadila Health", balance: "₹ 85K", days: 45, status: "Active" },
        { customer: "Zydus Lifesciences", balance: "₹ 12.4L", days: 12, status: "Active" },
    ];

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header - EXACTLY LIKE RTS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Finance & Compliance</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Automated Billing & GST Protocol</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none gap-2" onClick={() => router.push("/reports")}>
                        <BarChart3 className="h-4 w-4" />
                        GST Reports
                    </Button>
                    {isAdmin && <CreateInvoiceDialog />}
                </div>
            </div>

            {/* Stats Grid - EXACTLY LIKE RTS (4 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="shadow-sm border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                            <stat.icon className={cn("h-4 w-4", stat.color)} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                                {stat.trend === 'up' && <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />}
                                {stat.trend === 'down' && <ArrowDownRight className="mr-1 h-3 w-3 text-rose-500" />}
                                {stat.change}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Tabs Area - EXACTLY LIKE RTS */}
            <Tabs defaultValue="invoices" className="space-y-6" onValueChange={setActiveTab}>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <TabsList className="flex w-full lg:w-auto h-auto p-1 bg-slate-100 overflow-x-auto no-scrollbar justify-start whitespace-nowrap">
                        <TabsTrigger value="invoices" className="px-4 py-2 text-xs md:text-sm">Recent Bills</TabsTrigger>
                        <TabsTrigger value="aging" className="px-4 py-2 text-xs md:text-sm">Aging (AR)</TabsTrigger>
                        <TabsTrigger value="profit" className="px-4 py-2 text-xs md:text-sm">Profitability</TabsTrigger>
                        <TabsTrigger value="tally" className="px-4 py-2 text-xs md:text-sm">Tally Sync</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-72">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search Invoice..." className="pl-8 bg-white h-10 text-sm" />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TabsContent value="invoices" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {deepInvoices.map((inv) => (
                            <Card key={inv.id} className="transition-all hover:shadow-md border-slate-200">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div className="flex items-center gap-5 w-full">
                                            <div className={cn(
                                                "p-4 rounded-xl border shrink-0",
                                                inv.status === 'Overdue' ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-cyan-50 border-cyan-200 text-cyan-600"
                                            )}>
                                                <FileText className="h-6 w-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-semibold text-lg text-slate-900">{inv.id}</h3>
                                                    <Badge variant="outline" className={cn(
                                                        "text-[10px] font-bold uppercase tracking-widest",
                                                        inv.status === 'Paid' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                                            inv.status === 'Overdue' ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-blue-50 text-blue-700 border-blue-200"
                                                    )}>
                                                        {inv.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm font-medium text-slate-700">{inv.customer} • {inv.date}</p>
                                                <div className="flex items-center gap-4 pt-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                    <span className="flex items-center gap-1.5">
                                                        <QrCode className={cn("h-3 w-3", inv.compliance.qr ? "text-emerald-500" : "text-slate-300")} />
                                                        IRN Protocol {inv.compliance.irn ? "Active" : "Pending"}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Database className={cn("h-3 w-3", inv.compliance.tally === 'Synced' ? "text-blue-500" : "text-slate-300")} />
                                                        Tally Status: {inv.compliance.tally}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1 text-right sm:text-right">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Gross Value</p>
                                                <p className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{inv.amount}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                                            <BibleViewDialog
                                                trigger={
                                                    <Button className="flex-1 md:flex-none h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-[10px] px-8 rounded-xl min-w-[140px]">
                                                        Trace Bible
                                                    </Button>
                                                }
                                            />
                                            <Button variant="outline" size="icon" className="text-slate-400 hover:text-blue-500 hover:bg-blue-50 border-slate-200 h-11 w-11 rounded-xl shrink-0">
                                                <Printer className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="aging">
                    <Card className="border-slate-200">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest text-rose-500">Accounts Receivable (Aging)</CardTitle>
                                <Badge variant="destructive" className="uppercase text-[10px] tracking-widest">High Risk Alerts</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100">
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Name</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Outstanding Bal</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Aging Days</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Compliance Status</th>
                                            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {mockAging.map((r, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors text-sm font-medium text-slate-700">
                                                <td className="px-6 py-4 font-semibold">{r.customer}</td>
                                                <td className="px-6 py-4">{r.balance}</td>
                                                <td className={cn("px-6 py-4 font-bold", r.days > 30 ? "text-rose-600" : "text-slate-700")}>{r.days} Days</td>
                                                <td className="px-6 py-4">
                                                    <Badge className={cn(
                                                        "text-[9px] uppercase tracking-widest font-black",
                                                        r.status === 'Blocked' ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                                                    )}>
                                                        {r.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="ghost" size="sm" className="text-xs font-bold text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50">
                                                        Follow Up
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

                <TabsContent value="profit">
                    <Card className="border-slate-200">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
                            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">Real-time Job Profitability</CardTitle>
                        </CardHeader>
                        <CardContent className="p-12 text-center space-y-4">
                            <BarChart3 className="h-12 w-12 text-slate-200 mx-auto" />
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-slate-900">Calculating Material + Labor Overheads</p>
                                <p className="text-xs text-muted-foreground">Master audit of Job Cards to determine live margins.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
