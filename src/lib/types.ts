export interface Inquiry {
    id: string; // INQ/24-25/001
    clientName: string;
    plantLocation: string;
    primaryContact: string;
    designation: string;
    mobile: string;
    email: string;
    gstNumber: string;

    // Thermoform Specs
    category: 'Pharma Ampoule' | 'Injection Tray' | 'Vial Tray' | 'Food Tray' | 'Industrial Hardware' | 'Other';
    articleName: string;
    substrateType: 'PET' | 'APET' | 'RPET' | 'PP' | 'PVC' | 'HIPS';
    colorProfile: string; // Clear, Amber, Opaque, Custom
    dimensions: {
        length: number;
        width: number;
        depth: number;
    };
    thickness: number; // Microns
    cavityCount: number;

    // Commercials
    monthlyRequirement: number;
    annualForecast: number;
    expectedMoq: number;
    targetPrice?: number;

    // System Status
    status: 'new' | 'quoted' | 'sample' | 'negotiation' | 'won' | 'lost';
    lossReason?: string;

    // Tracking
    followUpDate: string;
    createdAt: string;
    lastActivity: string;
    assignedTo: string;

    // Linked Quote
    quoteId?: string;
}

export interface Quote {
    id: string; // QT/24-25/001
    inquiryId: string;
    date: string;
    validUntil: string;
    gstRate: 12 | 18;
    paymentTerms: string;
    freight: 'Ex-factory' | 'FOR';
    leadTime: string;
    lineItems: Array<{
        articleName: string;
        rate: number;
        unit: string;
    }>;
    totalValue: number;
}

export interface SubstrateRoll {
    id: string; // ROLL-PET-082
    type: 'PET' | 'PP' | 'PVC' | 'HIPS';
    grade: 'Medical' | 'Food' | 'Industrial';
    width: number; // mm
    micron: number;
    density: number; // g/cm3 - Critical for yield
    batchNo: string;
    inwardWeight: {
        gross: number;
        tare: number;
        net: number;
    };
    currentWeight: number; // kg
    location: string;
    status: 'available' | 'issued' | 'partial' | 'blocked';
    vendor: string;
    vendorRating: number; // 1-5 Performance Metric
    inwardDate: string;
    isFIFOFirst: boolean;
    reorderLevel: number; // kg
}

export interface Lead {
    id: string;
    customerName: string;
    companyName: string;
    mobile: string;
    address: string;
    source: string;
    status: string;
    productInterest: string[];
    lastActivity: string;
}

export interface Invoice {
    id: string; // TF/24-25/0501
    jobCardId: string;
    clientName: string;
    tallyLedgerName: string;
    date: string;
    dueDate: string;
    paymentTerms: string;
    hsnCode: string;

    // Tax Breakdown
    taxableValue: number;
    gstRate: 12 | 18;
    cgst?: number;
    sgst?: number;
    igst?: number;
    totalAmount: number;

    // E-Invoicing (Legal Compliance)
    irn?: string; // 64 char code
    qrCode?: string; // Signed string from IRP
    ackNo?: string;
    ackDate?: string;
    eWayBillNo?: string;

    // Tally Integration
    tallySyncStatus: 'Pending' | 'Synced' | 'Error';
    tallyVoucherType: 'Sales Voucher' | 'Credit Note';
    lastSyncedAt?: string;

    // Payment Tracking
    status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Partially Paid';
    amountReceived: number;
}

export interface CustomerCreditRecord {
    clientId: string;
    clientName: string;
    outstandingAmount: number;
    creditLimit: number;
    lastPaymentDate: string;
    overdueDays: number;
    isBlocked: boolean;
}


export type UserRole =
    | 'super_admin'
    | 'sales_manager'
    | 'senior_sales_rep'
    | 'finance_user'
    | 'service_engineer'
    | 'customer';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}
