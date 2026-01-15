import {
    Users,
    Settings2,
    Calculator,
    Box,
    PlayCircle,
    Warehouse,
    RotateCcw,
    ShieldCheck,
    Trash2,
    Truck,
    FileText,
    LayoutDashboard
} from "lucide-react";

export const modules = [
    { id: 'dashboard', name: 'Dashboard', path: '/', icon: LayoutDashboard, color: 'text-blue-500' },
    { id: 'crm', name: 'CRM & Sales', path: '/crm', icon: Users, color: 'text-indigo-500' },
    { id: 'mold', name: 'Mold Management', path: '/mold', icon: Settings2, color: 'text-orange-500' },
    { id: 'costing', name: 'Costing & Job Card', path: '/costing', icon: Calculator, color: 'text-emerald-500' },
    { id: 'inventory', name: 'Procurement & Inventory', path: '/inventory', icon: Warehouse, color: 'text-amber-500' },
    { id: 'production', name: 'Production (Tablet)', path: '/production', icon: PlayCircle, color: 'text-rose-500' },
    { id: 'rts', name: 'Return to Store', path: '/rts', icon: RotateCcw, color: 'text-cyan-500' },
    { id: 'qc', name: 'Quality Assurance', path: '/qc', icon: ShieldCheck, color: 'text-purple-500' },
    { id: 'scrap', name: 'Scrap Management', path: '/scrap', icon: Trash2, color: 'text-slate-500' },
    { id: 'dispatch', name: 'Dispatch & Logistics', path: '/dispatch', icon: Truck, color: 'text-sky-500' },
    { id: 'finance', name: 'Finance & Tally', path: '/finance', icon: FileText, color: 'text-green-500' },
];
