import React, { useState, useRef } from 'react';
import { Search, Shield, FileText, AlertTriangle, CheckCircle, Clock, Users, DollarSign, Building2, Bell, ChevronRight, TrendingUp, TrendingDown, Eye, Download, Plus, Filter, BarChart3, PieChart, Activity, Settings, LogOut, Menu, X, RefreshCw, ExternalLink, AlertCircle, Info, Zap, FileCheck, Scale, Briefcase, Calendar, MapPin, Phone, Mail, Globe, Award, Flag, Lock, Unlock, Edit, Trash2, Copy, Send, Bot, Sparkles, ShieldCheck, FileWarning, Landmark, CircleDollarSign, ClipboardCheck, UserX, Link2, Paperclip, Upload, File, FileSpreadsheet, Image, Loader2, Table } from 'lucide-react';

// Enhanced Mock data with COI and Insurance/Bonding details per vendor
const mockVendors = [
  {
    id: 'V-2024-001',
    name: 'TechServe Solutions LLC',
    samStatus: 'Active',
    samUEI: 'JKLM123456789',
    riskScore: 23,
    riskLevel: 'Low',
    certifications: ['SDVOSB', '8(a)'],
    state: 'Virginia',
    lastVerified: '2024-01-15',
    contractValue: 2450000,
    activeContracts: 3,
    coi: {
      status: 'Clear',
      lastReview: '2024-01-10',
      nextReview: '2025-01-10',
      disclosures: [
        { date: '2024-01-10', type: 'Annual Disclosure', status: 'Submitted', reviewer: 'Ethics Office', result: 'No conflicts identified' }
      ],
      flags: []
    },
    insurance: {
      generalLiability: { status: 'Current', provider: 'Hartford Insurance', coverage: 2000000, expiration: '2024-12-31', verified: true },
      professionalLiability: { status: 'Current', provider: 'Chubb', coverage: 5000000, expiration: '2024-11-15', verified: true },
      workersComp: { status: 'Current', provider: 'State Farm', coverage: 1000000, expiration: '2024-10-01', verified: true },
      cyberLiability: { status: 'Current', provider: 'AIG', coverage: 3000000, expiration: '2025-02-28', verified: true }
    },
    bonding: {
      performanceBond: { status: 'Active', amount: 1500000, surety: 'Travelers', expiration: '2025-05-31', verified: true },
      paymentBond: { status: 'Active', amount: 1500000, surety: 'Travelers', expiration: '2025-05-31', verified: true },
      bidBond: { status: 'N/A', amount: 0, surety: null, expiration: null, verified: false }
    }
  },
  {
    id: 'V-2024-002',
    name: 'Global Infrastructure Partners',
    samStatus: 'Active',
    samUEI: 'NOPQ987654321',
    riskScore: 67,
    riskLevel: 'Medium',
    certifications: ['HUBZone'],
    state: 'Maryland',
    lastVerified: '2024-01-10',
    contractValue: 8900000,
    activeContracts: 5,
    coi: {
      status: 'Review Needed',
      lastReview: '2023-06-15',
      nextReview: '2024-06-15',
      disclosures: [
        { date: '2023-06-15', type: 'Annual Disclosure', status: 'Submitted', reviewer: 'Ethics Office', result: 'Minor flag - resolved' },
        { date: '2024-01-20', type: 'Contract Award Review', status: 'Pending', reviewer: 'Procurement Officer', result: 'Awaiting review' }
      ],
      flags: [
        { type: 'Organizational', description: 'Subcontractor relationship with agency consultant', severity: 'Medium', dateIdentified: '2024-01-18' }
      ]
    },
    insurance: {
      generalLiability: { status: 'Current', provider: 'Liberty Mutual', coverage: 5000000, expiration: '2024-09-30', verified: true },
      professionalLiability: { status: 'Expiring Soon', provider: 'Zurich', coverage: 10000000, expiration: '2024-02-28', verified: true },
      workersComp: { status: 'Current', provider: 'Nationwide', coverage: 2000000, expiration: '2024-08-15', verified: true },
      cyberLiability: { status: 'Not Required', provider: null, coverage: 0, expiration: null, verified: false }
    },
    bonding: {
      performanceBond: { status: 'Active', amount: 5000000, surety: 'CNA Surety', expiration: '2024-08-31', verified: true },
      paymentBond: { status: 'Active', amount: 5000000, surety: 'CNA Surety', expiration: '2024-08-31', verified: true },
      bidBond: { status: 'Active', amount: 500000, surety: 'CNA Surety', expiration: '2024-12-31', verified: true }
    }
  },
  {
    id: 'V-2024-003',
    name: 'Pinnacle Construction Corp',
    samStatus: 'Expiring',
    samUEI: 'RSTU456789123',
    riskScore: 89,
    riskLevel: 'High',
    certifications: [],
    state: 'Texas',
    lastVerified: '2023-12-01',
    contractValue: 12300000,
    activeContracts: 2,
    coi: {
      status: 'Flagged',
      lastReview: '2023-11-01',
      nextReview: '2024-02-01',
      disclosures: [
        { date: '2023-11-01', type: 'Annual Disclosure', status: 'Incomplete', reviewer: 'Ethics Office', result: 'Missing beneficial ownership info' },
        { date: '2024-01-15', type: 'Investigation', status: 'In Progress', reviewer: 'OIG', result: 'Pending' }
      ],
      flags: [
        { type: 'Personal', description: 'Beneficial owner (J. Martinez) shares address with agency employee (S. Martinez, Facilities Dept)', severity: 'High', dateIdentified: '2024-01-10' },
        { type: 'Financial', description: 'Recent banking information change - new account in different state', severity: 'High', dateIdentified: '2024-01-22' }
      ]
    },
    insurance: {
      generalLiability: { status: 'Expired', provider: 'Travelers', coverage: 10000000, expiration: '2024-01-15', verified: false },
      professionalLiability: { status: 'N/A', provider: null, coverage: 0, expiration: null, verified: false },
      workersComp: { status: 'Current', provider: 'Texas Mutual', coverage: 5000000, expiration: '2024-07-01', verified: true },
      cyberLiability: { status: 'Not Required', provider: null, coverage: 0, expiration: null, verified: false }
    },
    bonding: {
      performanceBond: { status: 'Deficient', amount: 8000000, surety: 'Fidelity & Deposit', expiration: '2024-06-30', verified: false },
      paymentBond: { status: 'Active', amount: 8000000, surety: 'Fidelity & Deposit', expiration: '2024-06-30', verified: true },
      bidBond: { status: 'Expired', amount: 1000000, surety: 'Fidelity & Deposit', expiration: '2024-01-01', verified: false }
    }
  },
  {
    id: 'V-2024-004',
    name: 'DataSecure Technologies',
    samStatus: 'Active',
    samUEI: 'VWXY789123456',
    riskScore: 15,
    riskLevel: 'Low',
    certifications: ['EDWOSB', 'SDVOSB'],
    state: 'California',
    lastVerified: '2024-01-18',
    contractValue: 1850000,
    activeContracts: 4,
    coi: {
      status: 'Clear',
      lastReview: '2024-01-05',
      nextReview: '2025-01-05',
      disclosures: [
        { date: '2024-01-05', type: 'Annual Disclosure', status: 'Submitted', reviewer: 'Ethics Office', result: 'No conflicts identified' },
        { date: '2023-07-15', type: 'Contract Award Review', status: 'Complete', reviewer: 'Procurement Officer', result: 'Cleared' }
      ],
      flags: []
    },
    insurance: {
      generalLiability: { status: 'Current', provider: 'Hiscox', coverage: 2000000, expiration: '2024-08-31', verified: true },
      professionalLiability: { status: 'Current', provider: 'Hiscox', coverage: 5000000, expiration: '2024-08-31', verified: true },
      workersComp: { status: 'Current', provider: 'State Fund', coverage: 1000000, expiration: '2024-12-31', verified: true },
      cyberLiability: { status: 'Current', provider: 'Coalition', coverage: 10000000, expiration: '2024-10-15', verified: true }
    },
    bonding: {
      performanceBond: { status: 'N/A', amount: 0, surety: null, expiration: null, verified: false },
      paymentBond: { status: 'N/A', amount: 0, surety: null, expiration: null, verified: false },
      bidBond: { status: 'N/A', amount: 0, surety: null, expiration: null, verified: false }
    }
  },
  {
    id: 'V-2024-005',
    name: 'Metro Services Group',
    samStatus: 'Pending',
    samUEI: 'ZABC321654987',
    riskScore: 45,
    riskLevel: 'Medium',
    certifications: ['8(a)'],
    state: 'Florida',
    lastVerified: '2024-01-05',
    contractValue: 560000,
    activeContracts: 1,
    coi: {
      status: 'Pending Review',
      lastReview: '2023-12-01',
      nextReview: '2024-03-01',
      disclosures: [
        { date: '2023-12-01', type: 'Annual Disclosure', status: 'Submitted', reviewer: 'Ethics Office', result: 'Under review' }
      ],
      flags: [
        { type: 'Organizational', description: 'Previous employee of contracting agency (within 2 years)', severity: 'Low', dateIdentified: '2023-12-15' }
      ]
    },
    insurance: {
      generalLiability: { status: 'Current', provider: 'Progressive', coverage: 1000000, expiration: '2024-06-30', verified: true },
      professionalLiability: { status: 'Below Minimum', provider: 'Progressive', coverage: 500000, expiration: '2024-06-30', verified: true },
      workersComp: { status: 'Current', provider: 'Florida Workers Comp', coverage: 500000, expiration: '2024-09-15', verified: true },
      cyberLiability: { status: 'Not Required', provider: null, coverage: 0, expiration: null, verified: false }
    },
    bonding: {
      performanceBond: { status: 'Active', amount: 500000, surety: 'Surety One', expiration: '2024-12-31', verified: true },
      paymentBond: { status: 'Active', amount: 500000, surety: 'Surety One', expiration: '2024-12-31', verified: true },
      bidBond: { status: 'N/A', amount: 0, surety: null, expiration: null, verified: false }
    }
  },
];

// Enhanced contracts with insurance/bonding requirements
const mockContracts = [
  { id: 'CT-2023-089', vendorId: 'V-2024-001', vendor: 'TechServe Solutions LLC', title: 'IT Infrastructure Modernization', value: 1250000, startDate: '2023-06-01', endDate: '2025-05-31', renewalDate: '2025-02-28', status: 'Active', type: 'Services',
    requirements: {
      generalLiability: { required: true, minimum: 1000000, compliant: true },
      professionalLiability: { required: true, minimum: 2000000, compliant: true },
      workersComp: { required: true, minimum: 500000, compliant: true },
      cyberLiability: { required: true, minimum: 2000000, compliant: true },
      performanceBond: { required: true, minimum: 1000000, compliant: true },
      paymentBond: { required: true, minimum: 1000000, compliant: true }
    }
  },
  { id: 'CT-2023-091', vendorId: 'V-2024-001', vendor: 'TechServe Solutions LLC', title: 'Cloud Migration Services', value: 750000, startDate: '2023-09-01', endDate: '2024-08-31', renewalDate: '2024-05-15', status: 'Active', type: 'Services',
    requirements: {
      generalLiability: { required: true, minimum: 1000000, compliant: true },
      professionalLiability: { required: true, minimum: 1000000, compliant: true },
      workersComp: { required: true, minimum: 500000, compliant: true },
      cyberLiability: { required: true, minimum: 1000000, compliant: true },
      performanceBond: { required: false, minimum: 0, compliant: true },
      paymentBond: { required: false, minimum: 0, compliant: true }
    }
  },
  { id: 'CT-2023-095', vendorId: 'V-2024-001', vendor: 'TechServe Solutions LLC', title: 'Help Desk Support', value: 450000, startDate: '2023-10-01', endDate: '2024-09-30', renewalDate: '2024-06-30', status: 'Active', type: 'Services',
    requirements: {
      generalLiability: { required: true, minimum: 500000, compliant: true },
      professionalLiability: { required: true, minimum: 500000, compliant: true },
      workersComp: { required: true, minimum: 500000, compliant: true },
      cyberLiability: { required: false, minimum: 0, compliant: true },
      performanceBond: { required: false, minimum: 0, compliant: true },
      paymentBond: { required: false, minimum: 0, compliant: true }
    }
  },
  { id: 'CT-2023-102', vendorId: 'V-2024-002', vendor: 'Global Infrastructure Partners', title: 'Facility Management Services', value: 4500000, startDate: '2023-09-01', endDate: '2024-08-31', renewalDate: '2024-05-15', status: 'Renewal Due', type: 'Services',
    requirements: {
      generalLiability: { required: true, minimum: 2000000, compliant: true },
      professionalLiability: { required: true, minimum: 5000000, compliant: true },
      workersComp: { required: true, minimum: 1000000, compliant: true },
      cyberLiability: { required: false, minimum: 0, compliant: true },
      performanceBond: { required: true, minimum: 4000000, compliant: true },
      paymentBond: { required: true, minimum: 4000000, compliant: true }
    }
  },
  { id: 'CT-2024-015', vendorId: 'V-2024-004', vendor: 'DataSecure Technologies', title: 'Cybersecurity Assessment', value: 850000, startDate: '2024-01-15', endDate: '2024-12-31', renewalDate: '2024-09-30', status: 'Active', type: 'Services',
    requirements: {
      generalLiability: { required: true, minimum: 1000000, compliant: true },
      professionalLiability: { required: true, minimum: 2000000, compliant: true },
      workersComp: { required: true, minimum: 500000, compliant: true },
      cyberLiability: { required: true, minimum: 5000000, compliant: true },
      performanceBond: { required: false, minimum: 0, compliant: true },
      paymentBond: { required: false, minimum: 0, compliant: true }
    }
  },
  { id: 'CT-2022-156', vendorId: 'V-2024-003', vendor: 'Pinnacle Construction Corp', title: 'Building Renovation Phase II', value: 8750000, startDate: '2022-03-01', endDate: '2024-06-30', renewalDate: '2024-03-15', status: 'Compliance Issue', type: 'Construction',
    requirements: {
      generalLiability: { required: true, minimum: 5000000, compliant: false },
      professionalLiability: { required: false, minimum: 0, compliant: true },
      workersComp: { required: true, minimum: 2000000, compliant: true },
      cyberLiability: { required: false, minimum: 0, compliant: true },
      performanceBond: { required: true, minimum: 8000000, compliant: false },
      paymentBond: { required: true, minimum: 8000000, compliant: true }
    }
  },
  { id: 'CT-2023-178', vendorId: 'V-2024-003', vendor: 'Pinnacle Construction Corp', title: 'Parking Structure Repairs', value: 3550000, startDate: '2023-08-01', endDate: '2024-07-31', renewalDate: '2024-04-30', status: 'Compliance Issue', type: 'Construction',
    requirements: {
      generalLiability: { required: true, minimum: 5000000, compliant: false },
      professionalLiability: { required: false, minimum: 0, compliant: true },
      workersComp: { required: true, minimum: 2000000, compliant: true },
      cyberLiability: { required: false, minimum: 0, compliant: true },
      performanceBond: { required: true, minimum: 3000000, compliant: false },
      paymentBond: { required: true, minimum: 3000000, compliant: true }
    }
  },
  { id: 'CT-2024-003', vendorId: 'V-2024-005', vendor: 'Metro Services Group', title: 'Janitorial Services', value: 560000, startDate: '2024-01-01', endDate: '2024-12-31', renewalDate: '2024-09-30', status: 'Active', type: 'Services',
    requirements: {
      generalLiability: { required: true, minimum: 1000000, compliant: true },
      professionalLiability: { required: true, minimum: 1000000, compliant: false },
      workersComp: { required: true, minimum: 500000, compliant: true },
      cyberLiability: { required: false, minimum: 0, compliant: true },
      performanceBond: { required: true, minimum: 500000, compliant: true },
      paymentBond: { required: true, minimum: 500000, compliant: true }
    }
  },
];

const mockAlerts = [
  { id: 1, type: 'fraud', severity: 'high', title: 'Payment Diversion Attempt Detected', vendor: 'Pinnacle Construction Corp', description: 'Banking information change request does not match historical patterns. New account registered to different state.', time: '2 hours ago' },
  { id: 2, type: 'insurance', severity: 'high', title: 'Insurance Coverage Lapsed', vendor: 'Pinnacle Construction Corp', description: 'General liability insurance expired on 2024-01-15. Active contracts at risk.', time: '3 hours ago' },
  { id: 3, type: 'compliance', severity: 'medium', title: 'SAM.gov Registration Expiring', vendor: 'Metro Services Group', description: 'Registration expires in 15 days. Vendor must renew to remain eligible.', time: '4 hours ago' },
  { id: 4, type: 'bonding', severity: 'medium', title: 'Performance Bond Deficiency', vendor: 'Pinnacle Construction Corp', description: 'Bond documentation incomplete. Surety verification failed.', time: '6 hours ago' },
  { id: 5, type: 'contract', severity: 'medium', title: 'Contract Renewal Deadline Approaching', vendor: 'Global Infrastructure Partners', description: 'Contract CT-2023-102 requires renewal decision within 90 days.', time: '1 day ago' },
  { id: 6, type: 'coi', severity: 'high', title: 'Conflict of Interest Flag', vendor: 'Pinnacle Construction Corp', description: 'Beneficial owner shares address with agency employee. Manual review required.', time: '1 day ago' },
  { id: 7, type: 'insurance', severity: 'low', title: 'Insurance Below Minimum', vendor: 'Metro Services Group', description: 'Professional liability coverage ($500K) below contract requirement ($1M).', time: '2 days ago' },
  { id: 8, type: 'threshold', severity: 'low', title: 'Threshold Alert', vendor: 'TechServe Solutions LLC', description: 'Cumulative spend approaching $250K micro-purchase threshold.', time: '2 days ago' },
];

const farClauses = [
  { id: 'FAR 52.204-7', title: 'System for Award Management', threshold: 0, required: true, category: 'Registration' },
  { id: 'FAR 52.212-3', title: 'Offeror Representations and Certifications', threshold: 0, required: true, category: 'Certifications' },
  { id: 'FAR 52.219-1', title: 'Small Business Program Representations', threshold: 150000, required: false, category: 'Small Business' },
  { id: 'FAR 52.222-26', title: 'Equal Opportunity', threshold: 10000, required: true, category: 'Labor' },
  { id: 'FAR 52.222-50', title: 'Combating Trafficking in Persons', threshold: 500000, required: true, category: 'Labor' },
  { id: 'FAR 52.225-1', title: 'Buy American—Supplies', threshold: 0, required: true, category: 'Buy American' },
  { id: 'FAR 52.232-33', title: 'Payment by Electronic Funds Transfer', threshold: 0, required: true, category: 'Payment' },
  { id: 'FAR 52.228-5', title: 'Insurance - Work on a Government Installation', threshold: 150000, required: true, category: 'Insurance' },
  { id: 'FAR 52.228-15', title: 'Performance and Payment Bonds - Construction', threshold: 150000, required: true, category: 'Bonding' },
];

const purchasingCodes = {
  federal: [
    { threshold: 10000, name: 'Micro-Purchase', requirement: 'No competition required', color: 'green' },
    { threshold: 250000, name: 'Simplified Acquisition', requirement: 'Minimum 3 quotes required', color: 'yellow' },
    { threshold: Infinity, name: 'Full & Open Competition', requirement: 'Formal RFP/IFB required', color: 'red' },
  ],
  state: [
    { threshold: 5000, name: 'Direct Purchase', requirement: 'Agency discretion', color: 'green' },
    { threshold: 50000, name: 'Informal Quote', requirement: 'Written quotes from 3+ vendors', color: 'yellow' },
    { threshold: 150000, name: 'Formal Bid', requirement: 'Sealed competitive bidding', color: 'orange' },
    { threshold: Infinity, name: 'Full RFP Process', requirement: 'Public notice + evaluation committee', color: 'red' },
  ],
  county: [
    { threshold: 3000, name: 'Petty Cash', requirement: 'No quotes needed', color: 'green' },
    { threshold: 25000, name: 'Small Purchase', requirement: 'Verbal quotes acceptable', color: 'yellow' },
    { threshold: 100000, name: 'Competitive Quote', requirement: 'Written quotes + board notification', color: 'orange' },
    { threshold: Infinity, name: 'Formal Procurement', requirement: 'Board approval + public notice', color: 'red' },
  ],
};

// Utility Components
const Badge = ({ children, variant = 'default', size = 'sm' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
  };
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = '', onClick }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`} onClick={onClick}>
    {children}
  </div>
);

const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, onClick, disabled, className = '' }) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-gray-600 hover:bg-gray-100',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

const ProgressRing = ({ value, max = 100, size = 80, strokeWidth = 8, color = 'indigo' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / max) * circumference;
  const colors = {
    indigo: 'text-indigo-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    red: 'text-red-600',
  };
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} stroke="currentColor" fill="none" className="text-gray-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} stroke="currentColor" fill="none" strokeLinecap="round" className={colors[color]} style={{ strokeDasharray: circumference, strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-900">{value}</span>
      </div>
    </div>
  );
};

const Tabs = ({ tabs, activeTab, onChange }) => (
  <div className="border-b border-gray-200">
    <div className="flex gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === tab.id
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);

// Dashboard Component
const Dashboard = ({ setActiveTab, setSelectedVendor }) => {
  const stats = [
    { label: 'Active Vendors', value: '247', change: '+12', trend: 'up', icon: Building2, color: 'indigo' },
    { label: 'Compliance Alerts', value: '11', change: '+5', trend: 'up', icon: AlertTriangle, color: 'red' },
    { label: 'Pending Renewals', value: '14', change: '-2', trend: 'down', icon: Clock, color: 'amber' },
    { label: 'Active Contracts', value: '$47.2M', change: '+$2.1M', trend: 'up', icon: FileText, color: 'emerald' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className={`flex items-center gap-1 mt-2 text-sm ${stat.trend === 'up' ? (stat.color === 'red' ? 'text-red-600' : 'text-emerald-600') : 'text-emerald-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change} this month</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <Card className="col-span-2">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Risk & Compliance Alerts</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {mockAlerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex gap-3">
                  <div className={`p-2 rounded-lg ${alert.severity === 'high' ? 'bg-red-100' : alert.severity === 'medium' ? 'bg-amber-100' : 'bg-blue-100'}`}>
                    {alert.type === 'fraud' ? <Shield className={`w-5 h-5 ${alert.severity === 'high' ? 'text-red-600' : 'text-amber-600'}`} /> :
                     alert.type === 'coi' ? <Users className="w-5 h-5 text-red-600" /> :
                     alert.type === 'insurance' ? <FileWarning className={`w-5 h-5 ${alert.severity === 'high' ? 'text-red-600' : 'text-amber-600'}`} /> :
                     alert.type === 'bonding' ? <Landmark className="w-5 h-5 text-amber-600" /> :
                     alert.type === 'compliance' ? <FileCheck className="w-5 h-5 text-amber-600" /> :
                     <Clock className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 truncate">{alert.title}</p>
                      <Badge variant={alert.severity === 'high' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'info'}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{alert.vendor}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{alert.description}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance Overview */}
        <Card>
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Vendor Compliance Status</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ProgressRing value={94} color="emerald" size={60} strokeWidth={6} />
                <div>
                  <p className="font-medium text-gray-900">SAM.gov Verified</p>
                  <p className="text-sm text-gray-500">232 of 247 vendors</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ProgressRing value={87} color="indigo" size={60} strokeWidth={6} />
                <div>
                  <p className="font-medium text-gray-900">COI Cleared</p>
                  <p className="text-sm text-gray-500">215 of 247 vendors</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ProgressRing value={91} color="emerald" size={60} strokeWidth={6} />
                <div>
                  <p className="font-medium text-gray-900">Insurance Current</p>
                  <p className="text-sm text-gray-500">225 of 247 vendors</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ProgressRing value={78} color="amber" size={60} strokeWidth={6} />
                <div>
                  <p className="font-medium text-gray-900">Bonding Compliant</p>
                  <p className="text-sm text-gray-500">145 of 186 required</p>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <Button variant="secondary" className="w-full" onClick={() => setActiveTab('vendors')}>
                View Vendor Details
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Vendor Risk Distribution & Contract Timeline */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Vendor Risk Distribution</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-emerald-600">186</span>
                </div>
                <p className="text-sm font-medium text-gray-600">Low Risk</p>
                <p className="text-xs text-gray-400">75%</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-amber-600">49</span>
                </div>
                <p className="text-sm font-medium text-gray-600">Medium Risk</p>
                <p className="text-xs text-gray-400">20%</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-red-600">12</span>
                </div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-xs text-gray-400">5%</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Contracts with Compliance Issues</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {mockContracts.filter(c => c.status === 'Compliance Issue' || c.status === 'Renewal Due').slice(0, 3).map((contract) => (
              <div key={contract.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => setActiveTab('vendors')}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{contract.title}</p>
                    <p className="text-sm text-gray-500">{contract.vendor}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={contract.status === 'Compliance Issue' ? 'danger' : 'warning'}>
                      {contract.status}
                    </Badge>
                    <p className="text-xs text-gray-400 mt-1">${(contract.value / 1000000).toFixed(2)}M</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// Enhanced Vendor Risk Intelligence Component with COI and Insurance/Bonding
const VendorIntelligence = ({ selectedVendor, setSelectedVendor }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState('overview');

  const filteredVendors = mockVendors.filter(v =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getVendorContracts = (vendorId) => mockContracts.filter(c => c.vendorId === vendorId);

  const runVerification = () => {
    setVerificationInProgress(true);
    setTimeout(() => setVerificationInProgress(false), 2000);
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'Low': return 'emerald';
      case 'Medium': return 'amber';
      case 'High': return 'red';
      default: return 'gray';
    }
  };

  const getInsuranceStatusColor = (status) => {
    switch(status) {
      case 'Current': return 'success';
      case 'Expiring Soon': return 'warning';
      case 'Expired': return 'danger';
      case 'Below Minimum': return 'warning';
      case 'N/A':
      case 'Not Required': return 'default';
      default: return 'default';
    }
  };

  const getBondStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'success';
      case 'Expiring Soon': return 'warning';
      case 'Expired': return 'danger';
      case 'Deficient': return 'danger';
      case 'N/A': return 'default';
      default: return 'default';
    }
  };

  const getCOIStatusColor = (status) => {
    switch(status) {
      case 'Clear': return 'success';
      case 'Pending Review': return 'info';
      case 'Review Needed': return 'warning';
      case 'Flagged': return 'danger';
      default: return 'default';
    }
  };

  const detailTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'contracts', label: 'Contracts' },
    { id: 'coi', label: 'COI Management' },
    { id: 'insurance', label: 'Insurance & Bonding' },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Vendor List */}
      <Card className="col-span-1">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Vendor Directory</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
          {filteredVendors.map((vendor) => {
            const hasIssues = vendor.coi.status === 'Flagged' ||
                            vendor.insurance.generalLiability.status === 'Expired' ||
                            vendor.bonding.performanceBond.status === 'Deficient';
            return (
              <div
                key={vendor.id}
                onClick={() => { setSelectedVendor(vendor); setActiveDetailTab('overview'); }}
                className={`p-4 cursor-pointer transition-colors ${selectedVendor?.id === vendor.id ? 'bg-indigo-50 border-l-4 border-indigo-600' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{vendor.name}</p>
                      {hasIssues && <AlertCircle className="w-4 h-4 text-red-500" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{vendor.id} • {vendor.state}</p>
                  </div>
                  <Badge variant={vendor.riskLevel === 'Low' ? 'success' : vendor.riskLevel === 'Medium' ? 'warning' : 'danger'}>
                    {vendor.riskScore}
                  </Badge>
                </div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {vendor.certifications.map((cert, i) => (
                    <Badge key={i} variant="purple" size="sm">{cert}</Badge>
                  ))}
                  <Badge variant={getCOIStatusColor(vendor.coi.status)} size="sm">
                    COI: {vendor.coi.status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Vendor Details */}
      <Card className="col-span-2">
        {selectedVendor ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedVendor.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">UEI: {selectedVendor.samUEI} • {selectedVendor.state}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" icon={RefreshCw} onClick={runVerification}>
                    {verificationInProgress ? 'Verifying...' : 'Re-verify'}
                  </Button>
                  <Button variant="primary" size="sm" icon={ExternalLink}>
                    View in SAM.gov
                  </Button>
                </div>
              </div>
              <Tabs tabs={detailTabs} activeTab={activeDetailTab} onChange={setActiveDetailTab} />
            </div>

            <div className="p-6 overflow-y-auto max-h-[550px]">
              {/* Overview Tab */}
              {activeDetailTab === 'overview' && (
                <div className="space-y-6">
                  {/* Quick Status Cards */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className={`p-4 rounded-xl ${selectedVendor.coi.status === 'Clear' ? 'bg-emerald-50' : selectedVendor.coi.status === 'Flagged' ? 'bg-red-50' : 'bg-amber-50'}`}>
                      <Users className={`w-6 h-6 mb-2 ${selectedVendor.coi.status === 'Clear' ? 'text-emerald-600' : selectedVendor.coi.status === 'Flagged' ? 'text-red-600' : 'text-amber-600'}`} />
                      <p className="text-xs text-gray-500">COI Status</p>
                      <p className="font-semibold text-gray-900">{selectedVendor.coi.status}</p>
                    </div>
                    <div className={`p-4 rounded-xl ${selectedVendor.insurance.generalLiability.status === 'Current' ? 'bg-emerald-50' : selectedVendor.insurance.generalLiability.status === 'Expired' ? 'bg-red-50' : 'bg-amber-50'}`}>
                      <ShieldCheck className={`w-6 h-6 mb-2 ${selectedVendor.insurance.generalLiability.status === 'Current' ? 'text-emerald-600' : selectedVendor.insurance.generalLiability.status === 'Expired' ? 'text-red-600' : 'text-amber-600'}`} />
                      <p className="text-xs text-gray-500">Insurance</p>
                      <p className="font-semibold text-gray-900">{selectedVendor.insurance.generalLiability.status}</p>
                    </div>
                    <div className={`p-4 rounded-xl ${selectedVendor.bonding.performanceBond.status === 'Active' || selectedVendor.bonding.performanceBond.status === 'N/A' ? 'bg-emerald-50' : selectedVendor.bonding.performanceBond.status === 'Deficient' ? 'bg-red-50' : 'bg-amber-50'}`}>
                      <Landmark className={`w-6 h-6 mb-2 ${selectedVendor.bonding.performanceBond.status === 'Active' || selectedVendor.bonding.performanceBond.status === 'N/A' ? 'text-emerald-600' : selectedVendor.bonding.performanceBond.status === 'Deficient' ? 'text-red-600' : 'text-amber-600'}`} />
                      <p className="text-xs text-gray-500">Bonding</p>
                      <p className="font-semibold text-gray-900">{selectedVendor.bonding.performanceBond.status}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50">
                      <FileText className="w-6 h-6 mb-2 text-indigo-600" />
                      <p className="text-xs text-gray-500">Active Contracts</p>
                      <p className="font-semibold text-gray-900">{selectedVendor.activeContracts}</p>
                    </div>
                  </div>

                  {/* Risk Score Section */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-5">
                      <h4 className="font-semibold text-gray-900 mb-4">Risk Assessment</h4>
                      <div className="flex items-center gap-6">
                        <ProgressRing
                          value={selectedVendor.riskScore}
                          color={getRiskColor(selectedVendor.riskLevel)}
                          size={100}
                          strokeWidth={10}
                        />
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Risk Level:</span>
                            <Badge variant={selectedVendor.riskLevel === 'Low' ? 'success' : selectedVendor.riskLevel === 'Medium' ? 'warning' : 'danger'} size="md">
                              {selectedVendor.riskLevel}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">
                            Score based on financial stability, performance, COI, and compliance
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5">
                      <h4 className="font-semibold text-gray-900 mb-4">Verification Status</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm">SAM.gov Registration</span>
                          </div>
                          <Badge variant={selectedVendor.samStatus === 'Active' ? 'success' : selectedVendor.samStatus === 'Expiring' ? 'warning' : 'info'}>
                            {selectedVendor.samStatus}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm">OFAC Sanctions Check</span>
                          </div>
                          <Badge variant="success">Clear</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm">Debarment List</span>
                          </div>
                          <Badge variant="success">Not Listed</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Small Business Certifications</h4>
                    <div className="flex gap-2 flex-wrap">
                      {selectedVendor.certifications.length > 0 ? (
                        selectedVendor.certifications.map((cert, i) => (
                          <div key={i} className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg">
                            <Award className="w-5 h-5 text-purple-600" />
                            <span className="font-medium text-purple-900">{cert}</span>
                            <Badge variant="success" size="sm">Verified</Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 italic">No small business certifications on file</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Contracts Tab */}
              {activeDetailTab === 'contracts' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">Active Contracts ({getVendorContracts(selectedVendor.id).length})</h4>
                    <p className="text-sm text-gray-500">Total Value: ${(selectedVendor.contractValue / 1000000).toFixed(2)}M</p>
                  </div>

                  {getVendorContracts(selectedVendor.id).map((contract) => {
                    const complianceIssues = Object.entries(contract.requirements).filter(([key, req]) => req.required && !req.compliant);
                    const isCompliant = complianceIssues.length === 0;

                    return (
                      <div key={contract.id} className={`border rounded-xl p-4 ${!isCompliant ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900">{contract.title}</p>
                              <Badge variant={contract.type === 'Construction' ? 'purple' : 'info'} size="sm">{contract.type}</Badge>
                            </div>
                            <p className="text-sm text-gray-500">{contract.id}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={isCompliant ? 'success' : 'danger'}>
                              {isCompliant ? 'Compliant' : 'Non-Compliant'}
                            </Badge>
                            <p className="text-lg font-semibold text-gray-900 mt-1">${(contract.value / 1000000).toFixed(2)}M</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-500">Start Date</p>
                            <p className="font-medium">{contract.startDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">End Date</p>
                            <p className="font-medium">{contract.endDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Renewal By</p>
                            <p className="font-medium">{contract.renewalDate}</p>
                          </div>
                        </div>

                        {/* Insurance/Bonding Requirements */}
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <p className="text-xs font-medium text-gray-500 uppercase mb-2">Insurance & Bonding Requirements</p>
                          <div className="grid grid-cols-3 gap-2">
                            {Object.entries(contract.requirements).map(([key, req]) => {
                              if (!req.required) return null;
                              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                              return (
                                <div key={key} className="flex items-center gap-2">
                                  {req.compliant ?
                                    <CheckCircle className="w-4 h-4 text-emerald-500" /> :
                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                  }
                                  <span className={`text-xs ${req.compliant ? 'text-gray-600' : 'text-red-600 font-medium'}`}>
                                    {label} (${(req.minimum / 1000000).toFixed(1)}M)
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {!isCompliant && (
                          <div className="mt-3 p-3 bg-red-100 rounded-lg">
                            <p className="text-sm font-medium text-red-800">Compliance Issues:</p>
                            <ul className="mt-1 text-sm text-red-700">
                              {complianceIssues.map(([key, req]) => {
                                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                                return <li key={key}>• {label}: Below required minimum of ${(req.minimum / 1000000).toFixed(1)}M</li>;
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* COI Management Tab */}
              {activeDetailTab === 'coi' && (
                <div className="space-y-6">
                  {/* COI Status Header */}
                  <div className={`rounded-xl p-5 ${selectedVendor.coi.status === 'Clear' ? 'bg-emerald-50 border border-emerald-200' : selectedVendor.coi.status === 'Flagged' ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {selectedVendor.coi.status === 'Clear' ?
                          <CheckCircle className="w-10 h-10 text-emerald-600" /> :
                          selectedVendor.coi.status === 'Flagged' ?
                          <AlertTriangle className="w-10 h-10 text-red-600" /> :
                          <AlertCircle className="w-10 h-10 text-amber-600" />
                        }
                        <div>
                          <p className="text-lg font-semibold text-gray-900">COI Status: {selectedVendor.coi.status}</p>
                          <p className="text-sm text-gray-600">
                            Last Review: {selectedVendor.coi.lastReview} • Next Review: {selectedVendor.coi.nextReview}
                          </p>
                        </div>
                      </div>
                      <Button variant={selectedVendor.coi.status === 'Clear' ? 'secondary' : 'primary'} size="sm">
                        {selectedVendor.coi.status === 'Clear' ? 'View History' : 'Start Review'}
                      </Button>
                    </div>
                  </div>

                  {/* Active Flags */}
                  {selectedVendor.coi.flags.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Active COI Flags ({selectedVendor.coi.flags.length})</h4>
                      <div className="space-y-3">
                        {selectedVendor.coi.flags.map((flag, i) => (
                          <div key={i} className={`p-4 rounded-xl border ${flag.severity === 'High' ? 'bg-red-50 border-red-200' : flag.severity === 'Medium' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <Flag className={`w-5 h-5 mt-0.5 ${flag.severity === 'High' ? 'text-red-600' : flag.severity === 'Medium' ? 'text-amber-600' : 'text-blue-600'}`} />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium text-gray-900">{flag.type} Conflict</p>
                                    <Badge variant={flag.severity === 'High' ? 'danger' : flag.severity === 'Medium' ? 'warning' : 'info'}>{flag.severity}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-700 mt-1">{flag.description}</p>
                                  <p className="text-xs text-gray-500 mt-2">Identified: {flag.dateIdentified}</p>
                                </div>
                              </div>
                              <Button variant="secondary" size="sm">Investigate</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Disclosure History */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Disclosure History</h4>
                    <div className="space-y-2">
                      {selectedVendor.coi.disclosures.map((disclosure, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileCheck className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{disclosure.type}</p>
                              <p className="text-xs text-gray-500">{disclosure.date} • Reviewer: {disclosure.reviewer}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={disclosure.status === 'Submitted' || disclosure.status === 'Complete' ? 'success' : disclosure.status === 'Pending' ? 'warning' : 'danger'}>
                              {disclosure.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">{disclosure.result}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* COI Checklist */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">COI Review Checklist</h4>
                    <div className="space-y-2">
                      {[
                        { item: 'Annual disclosure form submitted', complete: selectedVendor.coi.disclosures.some(d => d.type === 'Annual Disclosure' && d.status !== 'Incomplete') },
                        { item: 'Beneficial ownership verified', complete: selectedVendor.coi.status !== 'Flagged' },
                        { item: 'Employee relationship screening', complete: !selectedVendor.coi.flags.some(f => f.type === 'Personal') },
                        { item: 'Organizational conflict review', complete: !selectedVendor.coi.flags.some(f => f.type === 'Organizational') },
                        { item: 'Financial interest disclosure', complete: !selectedVendor.coi.flags.some(f => f.type === 'Financial') },
                      ].map((check, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {check.complete ?
                            <CheckCircle className="w-5 h-5 text-emerald-500" /> :
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          }
                          <span className={`text-sm ${check.complete ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>{check.item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Insurance & Bonding Tab */}
              {activeDetailTab === 'insurance' && (
                <div className="space-y-6">
                  {/* Insurance Section */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Insurance Coverage</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedVendor.insurance).map(([key, policy]) => {
                        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        if (policy.status === 'N/A' || policy.status === 'Not Required') {
                          return (
                            <div key={key} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900">{label}</p>
                                <Badge variant="default">Not Required</Badge>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={key} className={`p-4 rounded-xl border ${policy.status === 'Current' ? 'bg-emerald-50 border-emerald-200' : policy.status === 'Expired' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                            <div className="flex items-start justify-between mb-2">
                              <p className="font-medium text-gray-900">{label}</p>
                              <Badge variant={getInsuranceStatusColor(policy.status)}>{policy.status}</Badge>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Provider</span>
                                <span className="font-medium">{policy.provider}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Coverage</span>
                                <span className="font-medium">${(policy.coverage / 1000000).toFixed(1)}M</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Expiration</span>
                                <span className={`font-medium ${policy.status !== 'Current' ? 'text-red-600' : ''}`}>{policy.expiration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Verified</span>
                                <span>{policy.verified ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bonding Section */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Bonding</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(selectedVendor.bonding).map(([key, bond]) => {
                        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        if (bond.status === 'N/A') {
                          return (
                            <div key={key} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900">{label}</p>
                                <Badge variant="default">N/A</Badge>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={key} className={`p-4 rounded-xl border ${bond.status === 'Active' ? 'bg-emerald-50 border-emerald-200' : bond.status === 'Expired' || bond.status === 'Deficient' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                            <div className="flex items-start justify-between mb-2">
                              <p className="font-medium text-gray-900">{label}</p>
                              <Badge variant={getBondStatusColor(bond.status)}>{bond.status}</Badge>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Surety</span>
                                <span className="font-medium">{bond.surety}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Amount</span>
                                <span className="font-medium">${(bond.amount / 1000000).toFixed(1)}M</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Expiration</span>
                                <span className={`font-medium ${bond.status !== 'Active' ? 'text-red-600' : ''}`}>{bond.expiration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Verified</span>
                                <span>{bond.verified ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contract Requirements Summary */}
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-indigo-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-indigo-900">Contract Compliance Summary</h4>
                        <div className="mt-3 space-y-2">
                          {getVendorContracts(selectedVendor.id).map((contract) => {
                            const issues = Object.entries(contract.requirements).filter(([_, req]) => req.required && !req.compliant).length;
                            return (
                              <div key={contract.id} className="flex items-center justify-between text-sm">
                                <span className="text-indigo-800">{contract.title}</span>
                                <Badge variant={issues === 0 ? 'success' : 'danger'}>
                                  {issues === 0 ? 'All Requirements Met' : `${issues} Issue${issues > 1 ? 's' : ''}`}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full py-20">
            <div className="text-center">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a vendor to view details</p>
              <p className="text-sm text-gray-400 mt-1">View contracts, COI status, and insurance/bonding compliance</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

// AI Solicitation Generator Component
const SolicitationGenerator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    estimatedValue: '',
    category: '',
    dueDate: '',
    jurisdiction: 'federal'
  });
  const [generatedClauses, setGeneratedClauses] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [analyzingFiles, setAnalyzingFiles] = useState(false);
  const [fileInsights, setFileInsights] = useState([]);
  const fileInputRef = useRef(null);

  // File type icon mapping
  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (['pdf'].includes(ext)) return FileText;
    if (['xls', 'xlsx', 'csv'].includes(ext)) return FileSpreadsheet;
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return Image;
    if (['doc', 'docx'].includes(ext)) return FileText;
    return File;
  };

  // File type category
  const getFileCategory = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (['pdf'].includes(ext)) return 'PDF Document';
    if (['xls', 'xlsx'].includes(ext)) return 'Spreadsheet';
    if (['csv'].includes(ext)) return 'Data File';
    if (['doc', 'docx'].includes(ext)) return 'Word Document';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'Image';
    return 'Document';
  };

  // Simulated file upload handler
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      type: file.type,
      category: getFileCategory(file.name),
      status: 'uploaded',
      analyzed: false
    }));
    setAttachedFiles([...attachedFiles, ...newFiles]);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Remove attached file
  const removeFile = (fileId) => {
    setAttachedFiles(attachedFiles.filter(f => f.id !== fileId));
    setFileInsights(fileInsights.filter(i => i.fileId !== fileId));
  };

  // Analyze attached documents with AI
  const analyzeDocuments = () => {
    if (attachedFiles.length === 0) return;

    setAnalyzingFiles(true);

    // Simulate AI analysis
    setTimeout(() => {
      const insights = attachedFiles.map(file => {
        // Generate mock insights based on file type
        let extractedInfo = [];

        if (file.name.toLowerCase().includes('sow') || file.name.toLowerCase().includes('scope')) {
          extractedInfo = [
            { type: 'Scope Item', content: 'Network infrastructure upgrade across 12 locations', confidence: 95 },
            { type: 'Deliverable', content: 'Installation of fiber optic backbone', confidence: 92 },
            { type: 'Timeline', content: '18-month implementation period identified', confidence: 88 },
            { type: 'Requirement', content: 'NIST 800-53 compliance required', confidence: 97 }
          ];
        } else if (file.name.toLowerCase().includes('spec') || file.name.toLowerCase().includes('requirement')) {
          extractedInfo = [
            { type: 'Technical Spec', content: 'Minimum 10Gbps throughput required', confidence: 94 },
            { type: 'Certification', content: 'FedRAMP High authorization required', confidence: 96 },
            { type: 'Standard', content: 'Must comply with Section 508 accessibility', confidence: 91 }
          ];
        } else if (file.name.toLowerCase().includes('budget') || file.category === 'Spreadsheet') {
          extractedInfo = [
            { type: 'Budget Item', content: 'Hardware costs: $450,000 estimated', confidence: 89 },
            { type: 'Budget Item', content: 'Labor costs: $280,000 estimated', confidence: 87 },
            { type: 'Cost Element', content: 'Contingency: 10% included', confidence: 93 }
          ];
        } else if (file.name.toLowerCase().includes('previous') || file.name.toLowerCase().includes('past')) {
          extractedInfo = [
            { type: 'Historical Data', content: 'Previous contract value: $1.2M', confidence: 98 },
            { type: 'Lesson Learned', content: 'Extend proposal response time to 45 days', confidence: 85 },
            { type: 'Clause Reference', content: 'Include FAR 52.232-40 for financing', confidence: 90 }
          ];
        } else {
          extractedInfo = [
            { type: 'Content', content: 'Document contains relevant procurement information', confidence: 75 },
            { type: 'Recommendation', content: 'Manual review recommended for specific details', confidence: 70 }
          ];
        }

        return {
          fileId: file.id,
          fileName: file.name,
          insights: extractedInfo,
          summary: `Analyzed ${file.category.toLowerCase()} and extracted ${extractedInfo.length} relevant items for solicitation.`
        };
      });

      setFileInsights(insights);
      setAttachedFiles(attachedFiles.map(f => ({ ...f, analyzed: true, status: 'analyzed' })));
      setAnalyzingFiles(false);
    }, 2500);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const value = parseInt(formData.estimatedValue) || 0;
      const applicableClauses = farClauses.filter(c => value >= c.threshold);
      setGeneratedClauses(applicableClauses);
      setStep(2);
      setIsGenerating(false);
    }, 1500);
  };

  const generateDocument = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedDocument({
        title: formData.title,
        type: formData.type,
        content: `
SOLICITATION NUMBER: SOL-2024-${Math.floor(Math.random() * 10000)}
ISSUE DATE: ${new Date().toLocaleDateString()}
RESPONSE DUE: ${formData.dueDate}

SECTION A - SOLICITATION/CONTRACT FORM

${formData.type.toUpperCase()} FOR ${formData.title.toUpperCase()}

Estimated Value: $${parseInt(formData.estimatedValue).toLocaleString()}

SECTION B - SUPPLIES OR SERVICES AND PRICES

${formData.description}

SECTION C - DESCRIPTION/SPECIFICATIONS

[AI-generated specifications based on procurement requirements...]

SECTION D - PACKAGING AND MARKING

Standard commercial packaging unless otherwise specified.

SECTION I - CONTRACT CLAUSES

${generatedClauses.map(c => `${c.id} - ${c.title}`).join('\n')}

SECTION J - INSURANCE AND BONDING REQUIREMENTS

Based on contract value and type, the following are required:
- General Liability Insurance: $${parseInt(formData.estimatedValue) >= 500000 ? '2,000,000' : '1,000,000'} minimum
- Professional Liability Insurance: $${parseInt(formData.estimatedValue) >= 500000 ? '2,000,000' : '1,000,000'} minimum
- Workers Compensation: Statutory limits
${parseInt(formData.estimatedValue) >= 150000 ? '- Performance Bond: 100% of contract value\n- Payment Bond: 100% of contract value' : ''}

SECTION K - REPRESENTATIONS AND CERTIFICATIONS

The offeror shall complete the representations and certifications in SAM.gov...
        `
      });
      setStep(3);
      setIsGenerating(false);
    }, 2000);
  };

  const getThresholdRequirement = () => {
    const value = parseInt(formData.estimatedValue) || 0;
    const codes = purchasingCodes[formData.jurisdiction];
    for (const code of codes) {
      if (value < code.threshold) {
        return code;
      }
    }
    return codes[codes.length - 1];
  };

  const requirement = formData.estimatedValue ? getThresholdRequirement() : null;

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Panel - Form */}
      <Card className="col-span-1">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">AI Solicitation Builder</h3>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Solicitation Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select type...</option>
              <option value="RFP">Request for Proposal (RFP)</option>
              <option value="RFQ">Request for Quote (RFQ)</option>
              <option value="IFB">Invitation for Bid (IFB)</option>
              <option value="RFI">Request for Information (RFI)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., IT Infrastructure Services"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Describe the goods or services required..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jurisdiction</label>
            <select
              value={formData.jurisdiction}
              onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="federal">Federal (FAR)</option>
              <option value="state">State</option>
              <option value="county">County/Local</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value ($)</label>
            <input
              type="number"
              value={formData.estimatedValue}
              onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
              placeholder="e.g., 150000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Response Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Document Attachment Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4" />
                <span>Attach Documents</span>
              </div>
            </label>
            <p className="text-xs text-gray-500 mb-2">Upload SOW, specs, previous solicitations, or budget docs for AI analysis</p>

            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag files</p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOC, XLSX, CSV supported</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Attached Files List */}
            {attachedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachedFiles.map((file) => {
                  const FileIcon = getFileIcon(file.name);
                  return (
                    <div key={file.id} className={`flex items-center justify-between p-2 rounded-lg ${file.analyzed ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="flex items-center gap-2 min-w-0">
                        <FileIcon className={`w-5 h-5 flex-shrink-0 ${file.analyzed ? 'text-emerald-600' : 'text-gray-400'}`} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.category} • {(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.analyzed && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                        <button onClick={() => removeFile(file.id)} className="text-gray-400 hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Analyze Button */}
                {attachedFiles.some(f => !f.analyzed) && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    icon={analyzingFiles ? Loader2 : Sparkles}
                    onClick={analyzeDocuments}
                    disabled={analyzingFiles}
                  >
                    {analyzingFiles ? 'Analyzing Documents...' : `Analyze ${attachedFiles.filter(f => !f.analyzed).length} Document(s) with AI`}
                  </Button>
                )}
              </div>
            )}
          </div>

          {requirement && (
            <div className={`p-3 rounded-lg ${requirement.color === 'green' ? 'bg-emerald-50 border border-emerald-200' : requirement.color === 'yellow' ? 'bg-amber-50 border border-amber-200' : requirement.color === 'orange' ? 'bg-orange-50 border border-orange-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-start gap-2">
                <Scale className={`w-5 h-5 ${requirement.color === 'green' ? 'text-emerald-600' : requirement.color === 'yellow' ? 'text-amber-600' : requirement.color === 'orange' ? 'text-orange-600' : 'text-red-600'}`} />
                <div>
                  <p className="font-medium text-gray-900">{requirement.name}</p>
                  <p className="text-sm text-gray-600">{requirement.requirement}</p>
                </div>
              </div>
            </div>
          )}

          <Button
            variant="primary"
            className="w-full"
            icon={Sparkles}
            onClick={handleGenerate}
            disabled={!formData.type || !formData.title || !formData.estimatedValue || isGenerating}
          >
            {isGenerating ? 'Analyzing Requirements...' : 'Generate Solicitation'}
          </Button>
        </div>
      </Card>

      {/* Right Panel - Generated Content */}
      <Card className="col-span-2">
        {step === 1 && (
          <div className="flex items-center justify-center h-full py-12">
            <div className="text-center max-w-lg">
              <div className="flex justify-center gap-4 mb-6">
                <div className="p-4 bg-indigo-100 rounded-xl">
                  <FileText className="w-10 h-10 text-indigo-600" />
                </div>
                <div className="p-4 bg-cyan-100 rounded-xl">
                  <Paperclip className="w-10 h-10 text-cyan-600" />
                </div>
                <div className="p-4 bg-purple-100 rounded-xl">
                  <Sparkles className="w-10 h-10 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Solicitation Generation</h3>
              <p className="text-gray-500 mb-6">
                Fill in the procurement details and our AI will analyze requirements,
                identify applicable FAR/state clauses, and generate a compliant solicitation document
                with insurance and bonding requirements.
              </p>

              <div className="bg-gray-50 rounded-xl p-4 text-left">
                <h4 className="font-medium text-gray-900 mb-3">For best results, attach supporting documents:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Scope of Work (SOW)</p>
                      <p className="text-xs text-gray-500">AI extracts deliverables & timelines</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Technical Specifications</p>
                      <p className="text-xs text-gray-500">AI identifies requirements & standards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Budget Documents</p>
                      <p className="text-xs text-gray-500">AI extracts cost elements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Previous Solicitations</p>
                      <p className="text-xs text-gray-500">AI learns from past procurements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Required Clauses & Compliance</h3>
                  <p className="text-sm text-gray-500">Based on ${parseInt(formData.estimatedValue).toLocaleString()} {formData.jurisdiction} procurement</p>
                </div>
                <Button variant="primary" icon={FileText} onClick={generateDocument} disabled={isGenerating}>
                  {isGenerating ? 'Generating...' : 'Generate Document'}
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
              {/* Purchasing Code Check */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-semibold text-indigo-900">Purchasing Code Compliance Check</h4>
                </div>
                <div className="space-y-2">
                  {purchasingCodes[formData.jurisdiction].map((code, i) => {
                    const value = parseInt(formData.estimatedValue) || 0;
                    const isApplicable = value < code.threshold && (i === 0 || value >= purchasingCodes[formData.jurisdiction][i - 1].threshold);
                    return (
                      <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${isApplicable ? 'bg-white border-2 border-indigo-400' : 'bg-indigo-25'}`}>
                        <div className="flex items-center gap-2">
                          {isApplicable ? <CheckCircle className="w-4 h-4 text-indigo-600" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                          <span className={`text-sm ${isApplicable ? 'font-semibold text-indigo-900' : 'text-gray-600'}`}>
                            {code.name} {code.threshold !== Infinity ? `(< $${code.threshold.toLocaleString()})` : ''}
                          </span>
                        </div>
                        <span className={`text-xs ${isApplicable ? 'text-indigo-700' : 'text-gray-500'}`}>{code.requirement}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FAR Clauses */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Applicable Clauses ({generatedClauses.length})</h4>
                <div className="space-y-2">
                  {generatedClauses.map((clause, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="font-medium text-gray-900">{clause.id}</p>
                          <p className="text-sm text-gray-500">{clause.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={clause.required ? 'danger' : 'info'}>{clause.required ? 'Required' : 'Recommended'}</Badge>
                        <Badge variant="default">{clause.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insurance/Bonding Requirements */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-purple-900">Insurance & Bonding Requirements</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">General Liability</p>
                    <p className="text-lg font-semibold text-purple-600">${parseInt(formData.estimatedValue) >= 500000 ? '2M' : '1M'} min</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Professional Liability</p>
                    <p className="text-lg font-semibold text-purple-600">${parseInt(formData.estimatedValue) >= 500000 ? '2M' : '1M'} min</p>
                  </div>
                  {parseInt(formData.estimatedValue) >= 150000 && (
                    <>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">Performance Bond</p>
                        <p className="text-lg font-semibold text-purple-600">100% of value</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">Payment Bond</p>
                        <p className="text-lg font-semibold text-purple-600">100% of value</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Document Insights from AI Analysis */}
              {fileInsights.length > 0 && (
                <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileCheck className="w-5 h-5 text-cyan-600" />
                    <h4 className="font-semibold text-cyan-900">Extracted from Attached Documents</h4>
                    <Badge variant="info">{fileInsights.length} file(s) analyzed</Badge>
                  </div>
                  <div className="space-y-4">
                    {fileInsights.map((fileInsight, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-cyan-100">
                        <div className="flex items-center gap-2 mb-2">
                          <File className="w-4 h-4 text-cyan-600" />
                          <p className="text-sm font-medium text-gray-900">{fileInsight.fileName}</p>
                        </div>
                        <div className="space-y-2">
                          {fileInsight.insights.map((insight, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <Badge variant={insight.confidence >= 90 ? 'success' : insight.confidence >= 80 ? 'info' : 'warning'} size="sm">
                                {insight.type}
                              </Badge>
                              <p className="text-sm text-gray-700 flex-1">{insight.content}</p>
                              <span className="text-xs text-gray-400">{insight.confidence}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Recommendations */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900">AI Recommendations</h4>
                    <ul className="mt-2 space-y-1 text-sm text-amber-800">
                      <li>• Consider adding FAR 52.219-8 if small business subcontracting is expected</li>
                      <li>• For IT services, include FAR 52.239-1 (Privacy or Security Safeguards)</li>
                      <li>• Based on historical data, similar procurements received 8-12 responses</li>
                      <li>• Cyber liability insurance recommended for contracts involving data handling</li>
                      {fileInsights.length > 0 && (
                        <li className="text-cyan-700">• Document analysis complete - {fileInsights.reduce((acc, f) => acc + f.insights.length, 0)} items extracted and incorporated</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 3 && generatedDocument && (
          <>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-semibold text-gray-900">Solicitation Generated</h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" icon={Edit}>Edit</Button>
                  <Button variant="secondary" icon={Copy}>Copy</Button>
                  <Button variant="primary" icon={Download}>Download</Button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <pre className="bg-gray-50 rounded-xl p-4 text-sm font-mono whitespace-pre-wrap overflow-auto max-h-[500px]">
                {generatedDocument.content}
              </pre>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

// Compliance Checker Component
const ComplianceChecker = () => {
  const [amount, setAmount] = useState('');
  const [jurisdiction, setJurisdiction] = useState('federal');

  const getApplicableCode = () => {
    const value = parseInt(amount) || 0;
    const codes = purchasingCodes[jurisdiction];
    for (const code of codes) {
      if (value < code.threshold) {
        return { ...code, value };
      }
    }
    return { ...codes[codes.length - 1], value };
  };

  const applicable = amount ? getApplicableCode() : null;

  return (
    <div className="grid grid-cols-2 gap-6">
      <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Purchasing Threshold Calculator</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction</label>
            <div className="grid grid-cols-3 gap-2">
              {['federal', 'state', 'county'].map((j) => (
                <button
                  key={j}
                  onClick={() => setJurisdiction(j)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    jurisdiction === j
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {j.charAt(0).toUpperCase() + j.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {applicable && (
            <div className={`rounded-xl p-5 ${
              applicable.color === 'green' ? 'bg-emerald-50 border-2 border-emerald-300' :
              applicable.color === 'yellow' ? 'bg-amber-50 border-2 border-amber-300' :
              applicable.color === 'orange' ? 'bg-orange-50 border-2 border-orange-300' :
              'bg-red-50 border-2 border-red-300'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <Scale className={`w-8 h-8 ${
                  applicable.color === 'green' ? 'text-emerald-600' :
                  applicable.color === 'yellow' ? 'text-amber-600' :
                  applicable.color === 'orange' ? 'text-orange-600' :
                  'text-red-600'
                }`} />
                <div>
                  <p className="text-xl font-bold text-gray-900">{applicable.name}</p>
                  <p className="text-sm text-gray-600">{applicable.requirement}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-700">
                  <strong>For ${parseInt(amount).toLocaleString()}</strong> {jurisdiction} procurement:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  {applicable.color === 'green' && (
                    <>
                      <li>• No formal competition required</li>
                      <li>• Document purchase rationale</li>
                      <li>• Ensure fair and reasonable pricing</li>
                    </>
                  )}
                  {applicable.color === 'yellow' && (
                    <>
                      <li>• Obtain minimum 3 written quotes</li>
                      <li>• Document vendor selection rationale</li>
                      <li>• Maintain quote comparison records</li>
                    </>
                  )}
                  {applicable.color === 'orange' && (
                    <>
                      <li>• Formal sealed bidding process</li>
                      <li>• Public notice required</li>
                      <li>• Board/management notification</li>
                    </>
                  )}
                  {applicable.color === 'red' && (
                    <>
                      <li>• Full competitive procurement</li>
                      <li>• Formal evaluation committee</li>
                      <li>• Public notice and bid opening</li>
                      <li>• Board/council approval required</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Threshold Reference Guide</h3>
        </div>
        <div className="p-4 space-y-4">
          {Object.entries(purchasingCodes).map(([key, codes]) => (
            <div key={key}>
              <h4 className="font-medium text-gray-900 mb-2 capitalize">{key} Thresholds</h4>
              <div className="space-y-2">
                {codes.map((code, i) => (
                  <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${
                    jurisdiction === key ? 'bg-indigo-50' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        code.color === 'green' ? 'bg-emerald-500' :
                        code.color === 'yellow' ? 'bg-amber-500' :
                        code.color === 'orange' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`} />
                      <span className="text-sm font-medium">{code.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {code.threshold === Infinity ? '> Previous' : `< $${code.threshold.toLocaleString()}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Note on Compliance</p>
                <p className="mt-1">
                  Thresholds shown are illustrative. Actual thresholds vary by jurisdiction,
                  agency, and procurement type. Always consult your agency's procurement policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Main Application Component
export default function ProcurementComplianceApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'vendors', label: 'Vendor Intelligence', icon: Building2 },
    { id: 'solicitations', label: 'AI Solicitation Builder', icon: FileText },
    { id: 'compliance', label: 'Compliance Checker', icon: Scale },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`bg-slate-900 text-white transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="font-bold text-lg">ProcureGuard</h1>
                <p className="text-xs text-slate-400">AI Compliance Platform</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
            {!sidebarCollapsed && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {navItems.find(n => n.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-gray-500">
                {activeTab === 'dashboard' && 'Overview of procurement compliance, vendor risk, and insurance/bonding status'}
                {activeTab === 'vendors' && 'Vendor profiles with COI management, contracts, and insurance/bonding compliance'}
                {activeTab === 'solicitations' && 'Generate compliant RFP/RFQ documents with AI'}
                {activeTab === 'compliance' && 'Federal, state, and local purchasing threshold checks'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">JD</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Jane Doe</p>
                  <p className="text-gray-500 text-xs">Procurement Officer</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} setSelectedVendor={setSelectedVendor} />}
          {activeTab === 'vendors' && <VendorIntelligence selectedVendor={selectedVendor} setSelectedVendor={setSelectedVendor} />}
          {activeTab === 'solicitations' && <SolicitationGenerator />}
          {activeTab === 'compliance' && <ComplianceChecker />}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>ProcureGuard v1.0 • AI-Driven Procurement Compliance Platform</span>
            <span>Last data sync: {new Date().toLocaleString()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
