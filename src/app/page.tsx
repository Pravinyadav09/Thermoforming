"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  User,
  ArrowUpRight,
  Factory,
  Users,
  IndianRupee,
  ShieldCheck,
  Warehouse,
  Truck,
  LayoutDashboard,
  Zap,
  TrendingUp,
  Activity,
  ChevronRight,
  SearchCheck,
  Box,
  Printer,
  Filter,
  ArrowDownRight,
  RotateCcw,
  Calculator,
  PlayCircle,
  Scale,
  FileText,
  Target,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const modules = [
  { title: "CRM & Leads", icon: Users, href: "/crm", color: "bg-blue-500", text: "text-blue-600", desc: "Pipeline & Field Tracking", count: "42 Active" },
  { title: "Costing Engine", icon: Calculator, href: "/costing", color: "bg-emerald-500", text: "text-emerald-600", desc: "Smart BOM & Profitability", count: "12 Pending" },
  { title: "Production Hub", icon: Factory, href: "/production", color: "bg-purple-500", text: "text-purple-600", desc: "Shop Floor Interface", count: "3 Live Lines" },
  { title: "Inventory MGMT", icon: Warehouse, href: "/inventory", color: "bg-amber-500", text: "text-amber-600", desc: "Roll Tracking & FIFO", count: "184 Rolls" },
  { title: "Quality Lab", icon: ShieldCheck, href: "/qc", color: "bg-rose-500", text: "text-rose-600", desc: "ISO Lab & COA Issuance", count: "5 In Queue" },
  { title: "Dispatch", icon: Truck, href: "/dispatch", color: "bg-cyan-500", text: "text-cyan-600", desc: "Logistics & Packing", count: "8 Orders" },
  { title: "Mold MGMT", icon: Box, href: "/mold", color: "bg-indigo-500", text: "text-indigo-600", desc: "Asset Life Tracker", count: "12000 Imps" },
  { title: "Scrap & RTS", icon: Zap, href: "/scrap", color: "bg-orange-500", text: "text-orange-600", desc: "Material Recovery", count: "₹ 8.2L Value" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'System Value', value: '₹ 2.4 Cr', change: '+12% vs LY', icon: IndianRupee, color: 'text-cyan-600', trend: 'up' },
    { label: 'Active Jobs', value: '18 JC', change: '8 on Schedule', icon: Activity, color: 'text-blue-600', trend: 'neutral' },
    { label: 'Efficiency', value: '92.4%', change: '-0.5% from Last', icon: TrendingUp, color: 'text-rose-600', trend: 'down' },
    { label: 'Health Score', value: '98.5', change: 'ISO 9001 Compliant', icon: ShieldCheck, color: 'text-emerald-600', trend: 'up' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header - Same to Same as RTS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Indus ERP Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">Central Command & Control System</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Global Traceability..." className="pl-9 h-10" />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </Button>
          <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white shrink-0">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Stats Grid - Same to Same as RTS */}
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

      {/* Main Tabs Area - Same to Same as RTS */}
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <TabsList className="flex w-full lg:w-auto h-auto p-1 bg-slate-100 overflow-x-auto no-scrollbar justify-start whitespace-nowrap">
            <TabsTrigger value="overview" className="px-4 py-2 text-xs md:text-sm">Global Overview</TabsTrigger>
            <TabsTrigger value="modules" className="px-4 py-2 text-xs md:text-sm">Industrial Hub</TabsTrigger>
            <TabsTrigger value="reports" className="px-4 py-2 text-xs md:text-sm">Daily Reports</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <Button variant="outline" className="flex-1 lg:flex-none gap-2 h-10 text-xs">
              <Filter className="h-4 w-4" />
              Analyze
            </Button>
            <Button className="flex-1 lg:flex-none gap-2 h-10 bg-slate-900 hover:bg-slate-800 text-white text-xs">
              <Printer className="h-4 w-4" />
              Audit Log
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Stats or Charts */}
            <Card className="lg:col-span-2 rounded-2xl border-slate-200 overflow-hidden relative min-h-[300px]">
              <CardContent className="p-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Plant Performance Analysis</h2>
                    <p className="text-sm text-muted-foreground mt-1">Real-time breakdown of Shift A & B efficiency</p>
                  </div>
                  <Badge variant="outline" className="border-cyan-500 text-cyan-700 bg-cyan-50">Live Pulse</Badge>
                </div>

                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 relative z-10">
                  {[
                    { label: 'Uptime', val: '98.2%', icon: PlayCircle, color: 'text-emerald-500' },
                    { label: 'Cycle Time', val: '12.4s', icon: Zap, color: 'text-amber-500' },
                    { label: 'Scrap Vol', val: '125 Kg', icon: RotateCcw, color: 'text-rose-500' },
                    { label: 'Energy', val: '42 kWh', icon: Activity, color: 'text-blue-500' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                      <div className="flex items-center gap-2">
                        <item.icon className={cn("h-4 w-4", item.color)} />
                        <p className="text-xl font-bold text-slate-900">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-600 rounded-full" style={{ width: '85%' }} />
                </div>
                <div className="mt-2 flex justify-between items-center text-xs font-medium text-slate-500">
                  <span>Target Completion (85%)</span>
                  <span>Goal: 100%</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts / Activity - styled like RTS list */}
            <Card className="rounded-2xl border-slate-200 overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-widest">System Alerts</CardTitle>
                <span className="text-[10px] font-bold text-slate-400">MAY-2024</span>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {[
                    { id: 'ALRT-01', text: 'QC Batch #892 Rejected', sub: 'High GSM Variance', icon: AlertTriangle, status: 'urgent' },
                    { id: 'ALRT-02', text: 'Roll PET-082 Near Empty', sub: 'Action Required: Inward', icon: Box, status: 'warning' },
                    { id: 'ALRT-03', text: 'New Target Assigned', sub: 'Production Dept', icon: Target, status: 'info' }
                  ].map((item, i) => (
                    <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                      <div className={cn("p-2 rounded-lg border",
                        item.status === 'urgent' ? "bg-rose-50 border-rose-100 text-rose-500" :
                          item.status === 'warning' ? "bg-amber-50 border-amber-100 text-amber-500" :
                            "bg-blue-50 border-blue-100 text-blue-500"
                      )}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900 transition-colors group-hover:text-cyan-600">{item.text}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>
                      </div>
                      <ChevronRight className="h-3 w-3 text-slate-300" />
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full h-12 rounded-none text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-600">View All Command Logs</Button>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Row: Module Quick Grid - RTS Item Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.slice(0, 4).map((mod, i) => (
              <Link key={i} href={mod.href}>
                <Card className="rounded-2xl border-slate-200 overflow-hidden relative group hover:shadow-lg hover:border-cyan-200 transition-all">
                  <CardContent className="p-6">
                    <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[40px] rounded-full pointer-events-none opacity-5", mod.color)} />
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-xl text-white shadow-lg transition-transform group-hover:scale-110", mod.color)}>
                          <mod.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">{mod.title}</h3>
                          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wide mt-0.5">{mod.desc}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 relative z-10">
                      <Badge variant="secondary" className="bg-slate-50 text-slate-600 font-bold text-[10px] uppercase">{mod.count}</Badge>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Enter <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="modules" className="animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((mod, i) => (
              <Link key={i} href={mod.href}>
                <Card className="rounded-2xl border-slate-200 overflow-hidden relative group hover:shadow-lg transition-all">
                  <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-5 w-full">
                      <div className={cn("p-4 rounded-xl border text-white shadow-lg", mod.color)}>
                        <mod.icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-xl text-slate-900 group-hover:text-cyan-600 transition-colors">{mod.title}</h3>
                          <Badge variant="outline" className="text-cyan-700 bg-cyan-50 border-cyan-100">{mod.count}</Badge>
                        </div>
                        <p className="text-sm font-medium text-slate-500">{mod.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" className="text-cyan-600 hover:text-cyan-700 text-xs font-bold uppercase tracking-widest gap-2 hover:bg-cyan-50 h-12 px-6 rounded-xl">
                        Open Module <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="animate-in fade-in duration-300">
          <Card className="border-slate-200 overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-slate-800">Quick Daily Summary</CardTitle>
                <CardDescription>Consolidated reporting for all departments</CardDescription>
              </div>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
                <FileText className="h-4 w-4" />
                Generate PDF
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                      <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Key Metric</th>
                      <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Last Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { d: 'Production', m: '12,400 Units', s: 'On Target', t: '5m Ago' },
                      { d: 'Quality', m: '98.2% Yield', s: 'Healthy', t: '1h Ago' },
                      { d: 'Inventory', m: 'Roll PET-082 Ready', s: 'FIFO Sync', t: '2h Ago' },
                      { d: 'Dispatch', m: '4 Trucks Loaded', s: 'In Transit', t: '10m Ago' },
                    ].map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors text-sm font-medium text-slate-700">
                        <td className="px-8 py-6 font-bold">{r.d}</td>
                        <td className="px-8 py-6 text-slate-600 font-semibold">{r.m}</td>
                        <td className="px-8 py-6">
                          <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 font-bold px-2 py-1 rounded-lg border-none">{r.s}</Badge>
                        </td>
                        <td className="px-8 py-6 text-right text-slate-400">{r.t}</td>
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

// No custom TargetIcon needed - using Target from lucide-react directly in the code above or equivalent.

